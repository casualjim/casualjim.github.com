---
date: '2008-02-05 09:16:52'
layout: post
slug: using-ruby-to-generate-lightspeed-models
status: publish
comments: true
title: Using Ruby to Generate LightSpeed models - Part 2
wordpress_id: '203'
categories:
- IronRuby
- Lightspeed
- Ruby
---

This is the [](http://flanders.co.nz/blog/archive/2008/02/05/using-ruby-to-generate-lightspeed-models---part-1.aspx)second post in the series on generating [LightSpeed](http://www.mindscape.co.nz/Products/lightspeed/default.aspx) entities with the help from ruby.  

In the [previous post](http://flanders.co.nz/blog/archive/2008/02/05/using-ruby-to-generate-lightspeed-models---part-1.aspx) we connected successfully to the database and were able to execute some sql.

At the end of the series I'll make the code downloadable.

Today I'd like to talk about the metadata we'll be needing from the database. We're going to need a list of tables, we're going to need to know about the columns of each table. Furthermore we want to exclude the primary keys in the case of LightSpeed. And we also want to know about relationships whether they are has many, belongs to or has many and belongs to many.

I put all this in a separate module because I'll probably need that meta data for another thing later :). The above requirements translate in the following spec:

    LightSpeedRepository DB::MetaData  

    - should have meta data  

    - should resolve the table name from a string  

    - should resolve the table name from a hash  

    - should identify a given column as not being a foreign key  

    - should identify a foreign key given a valid column info  

    - should not identify a given column as being a primary key  

    - should identify a given column as being a primary key  

    - should not identify a table as a join table under the correct conditions  

    - should identify a table as a join table under the correct conditions  

    - should return an empty array of has many relations when there are none  

    - should return the has many relations given a table  

    - should return the end point tables for a given through association  

    - should return the through associations  

The first thing we're going to need are the sql statements. At this point I only need the statements for sql 2005 so and these are the ones I used.
    
``` ruby     
def self.sql_statements 
  {
    :tables => "SELECT table_name as name FROM information_schema.Tables Where table_type='Base Table' ORDER BY table_name",
    :column_info => "select object_name(c.object_id) as table_name, c.column_id, c.name, type_name(system_type_id) as sql_type, max_length, is_nullable, precision, scale, 
          convert(bit,(Select COUNT(*) from sys.indexes as i 
            inner join sys.index_columns as ic
              on ic.index_id = i.index_id and ic.object_id = i.object_id 
            inner join sys.columns as c2 on ic.column_id = c2.column_id and i.object_id = c2.object_id
          WHERE i.is_primary_key = 0 
            and i.is_unique_constraint = 0 and ic.column_id = c.column_id and i.object_id=c.object_id)) as is_index,
          is_identity, 
          is_computed, 
          convert(bit,(Select Count(*) from sys.indexes as i inner join sys.index_columns as ic
              on ic.index_id = i.index_id and ic.object_id = i.object_id 
            inner join sys.columns as c2 on ic.column_id = c2.column_id and i.object_id = c2.object_id
          WHERE (i.is_unique_constraint = 1) and ic.column_id = c.column_id and i.object_id=c.object_id)) as is_unique
          from sys.columns as c
          WHERE object_name(c.object_id)  in (select table_name	FROM information_schema.Tables WHERE table_type = 'Base Table') 
          order by table_name",
    :primary_keys => "SELECT i.name AS index_name,ic.index_column_id,key_ordinal,c.name AS column_name,TYPE_NAME(c.user_type_id)AS column_type 
                ,is_identity,OBJECT_NAME(i.object_id) as table_name FROM sys.indexes AS i INNER JOIN sys.index_columns AS ic ON 
                i.object_id = ic.object_id AND i.index_id = ic.index_id INNER JOIN sys.columns AS c ON ic.object_id = c.object_id
                AND c.column_id = ic.column_id WHERE i.is_primary_key = 1 order by table_name",
    :foreign_keys => "SELECT f.name AS foreign_key_name, object_name(f.parent_object_id) AS table_name , col_name(fc.parent_object_id, fc.parent_column_id) AS child_id
                ,object_name (f.referenced_object_id) AS parent_table ,col_name(fc.referenced_object_id, fc.referenced_column_id) AS parent_id FROM sys.foreign_keys AS f
                INNER JOIN sys.foreign_key_columns AS fc ON f.object_id = fc.constraint_object_id where OBJECT_NAME(f.parent_object_id) not in ('sysdiagrams')  order by table_name"
  }
end
```

Those statements contain all the data we need an probably a little bit more too, if we add a little metaprogramming we can have ruby generate that metadata data for us :)

``` ruby        
def populate
  DB::MetaData.sql_statements.each do |key, value|
    instance_variable_set("@"+key.to_s, @db.fetch_all(value))				
  end
end

sql_statements.each_key do |key|
   define_method("#{key}_for") do |table|
     send(key, table).select { |item| item[:table_name] == table_name(table) }
   end unless key == :tables
 end
```    

So now we've satisfied our first spec the module now contains all the meta data we need. The rest of the specs require far less code than what we wrote here. Below you'll find the code needed to satisfy all of the specs. It are just a couple of methods that check some conditions and a couple of predicates we're going to need later on. The get_endpoint_tables method is the only one that doesn't explain itself easily. That method returns the table names from tables that are the second level in a has many and belongs to many scenario.

``` ruby     
module DB
  module MetaData
    attr_accessor :tables, :primary_keys, :foreign_keys, :column_info

    def initialize
      @db = DB::DbiSqlServer.new 
      populate
    end
    
    def populate
      DB::MetaData.sql_statements.each do |key, value|
        instance_variable_set("@"+key.to_s, @db.fetch_all(value))				
      end
    end
    
    def collect_has_many_relations(table)
      fks = foreign_keys.select { |fk| fk[:parent_table] ==  table_name(table)  }
      
      fks.collect  do |fk| 
        unless fk[:table_name].nil? 
          { :table_name => fk[:table_name].underscore, :class_name => fk[:table_name].singularize.underscore.camelize }
        end
       end.compact
    end
    
    def collect_through_associations(table)
      fks = foreign_keys.select { |fk| fk[:parent_table] ==  table_name(table)  }
      
      fks.collect do |fk| 
          { :through_table => fk[:table_name].underscore, :end_tables => get_endpoint_tables(table, fk[:table_name]) } if join_table?(fk[:table_name])
      end.compact
    end
    
    def get_endpoint_tables(table, through_table)
      fks = foreign_keys.select { |fk| fk[:table_name] == table_name(through_table) and fk[:parent_table] != table_name(table)  }
      fks.collect { |fk| fk[:parent_table].underscore unless fk[:parent_table].nil?  }.compact
    end
    
    def get_belongs_to_table(table, column_name)
      fks = foreign_keys.select { |fk|  fk[:table_name] == table_name(table) and fk[:child_id] = column_name }
      return fks[0][:parent_table] if fks.size > 0
      nil
    end
    
    def join_table?(table)
      fks = foreign_keys_for table_name(table)
      fks.size > 1
    end
    
    def primary_key?(column_info)
      pks = primary_keys.select { |pk| pk[:table_name] == column_info[:table_name] and pk[:column_name] == column_info[:name]   }
      
      pks.size > 0
    end
    
    def foreign_key?(column_info)
      fks = foreign_keys.select { |fk| fk[:table_name] == column_info[:table_name] and fk[:child_id] == column_info[:name]  }
      fks.size > 0
    end
    
    def table_name(table)
      table.is_a?(Hash) ? table[:name] : table
    end
    
    def self.sql_statements 
      {
        :tables => "SELECT table_name as name FROM information_schema.Tables Where table_type='Base Table' ORDER BY table_name",
        :column_info => "select object_name(c.object_id) as table_name, c.column_id, c.name, type_name(system_type_id) as sql_type, max_length, is_nullable, precision, scale, 
              convert(bit,(Select COUNT(*) from sys.indexes as i 
                inner join sys.index_columns as ic
                  on ic.index_id = i.index_id and ic.object_id = i.object_id 
                inner join sys.columns as c2 on ic.column_id = c2.column_id and i.object_id = c2.object_id
              WHERE i.is_primary_key = 0 
                and i.is_unique_constraint = 0 and ic.column_id = c.column_id and i.object_id=c.object_id)) as is_index,
              is_identity, 
              is_computed, 
              convert(bit,(Select Count(*) from sys.indexes as i inner join sys.index_columns as ic
                  on ic.index_id = i.index_id and ic.object_id = i.object_id 
                inner join sys.columns as c2 on ic.column_id = c2.column_id and i.object_id = c2.object_id
              WHERE (i.is_unique_constraint = 1) and ic.column_id = c.column_id and i.object_id=c.object_id)) as is_unique
              from sys.columns as c
              WHERE object_name(c.object_id)  in (select table_name	FROM information_schema.Tables WHERE table_type = 'Base Table') 
              order by table_name",
        :primary_keys => "SELECT i.name AS index_name,ic.index_column_id,key_ordinal,c.name AS column_name,TYPE_NAME(c.user_type_id)AS column_type 
                    ,is_identity,OBJECT_NAME(i.object_id) as table_name FROM sys.indexes AS i INNER JOIN sys.index_columns AS ic ON 
                    i.object_id = ic.object_id AND i.index_id = ic.index_id INNER JOIN sys.columns AS c ON ic.object_id = c.object_id
                    AND c.column_id = ic.column_id WHERE i.is_primary_key = 1 order by table_name",
        :foreign_keys => "SELECT f.name AS foreign_key_name, object_name(f.parent_object_id) AS table_name , col_name(fc.parent_object_id, fc.parent_column_id) AS child_id
                    ,object_name (f.referenced_object_id) AS parent_table ,col_name(fc.referenced_object_id, fc.referenced_column_id) AS parent_id FROM sys.foreign_keys AS f
                    INNER JOIN sys.foreign_key_columns AS fc ON f.object_id = fc.constraint_object_id where OBJECT_NAME(f.parent_object_id) not in ('sysdiagrams')  order by table_name"
       }
     end
     
     sql_statements.each_key do |key|
       define_method("#{key}_for") do |table|
         send(key, table).select { |item| item[:table_name] == table_name(table) }
       end unless key == :tables
     end

  end
  
end
```    
