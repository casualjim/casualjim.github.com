---
date: '2008-02-05 20:51:04'
layout: post
slug: using-ruby-to-generate-lightspeed-models-part-3
status: publish
comments: true
title: Using Ruby to Generate LightSpeed Models - Part 3
wordpress_id: '204'
categories:
- IronRuby
- Lightspeed
- Ruby
---

First off I'm writing with windows live writer again, ecto wasn't up to the job. It tried to "clean" my html, granted it was messy but it should leave my text untouched. The whole editing experience wasn't satisfying enough. And Ecto already seemed like the best blog editor for mac, slim pickings indeed. From my tools I expect foremost that they stay out of my way and it didn't. I just talked with [Simone](http://codeclimber.net.nz) about looking at making a .NET based client that runs on mono, we'll see where that plan goes because I don't really have time to do that for the moment.

In the previous posts in this series ([part 1](http://flanders.co.nz/blog/archive/2008/02/05/using-ruby-to-generate-lightspeed-models---part-1.aspx), [part 2](http://flanders.co.nz/blog/archive/2008/02/05/using-ruby-to-generate-lightspeed-models.aspx)) we discovered how to connect to the database and how to get the meta data about that database out. Maybe I should also explain why I'm doing this series with [LightSpeed](http://www.mindscape.co.nz/Products/lightspeed/default.aspx) instead of [ActiveRecord](http://castleproject.org/activerecord/index.html) from [Castle](http://castleproject.org/) or [SubSonic](http://www.subsonicproject.com/) or Linq2Sql for that matter. I will definitely touch on all those orms in the coming week, but I started with LightSpeed because it's the easiest ORM I've ever used.

This post will deal with actually doing something useful with that meta data. Today we're going to generate the represenation of the entities and their properties. Tomorrow we'll deal with actually generating the files from the the in-memory presentation we're generating today. 

We're going to need 2 classes in addition to the LightSpeedRepository class. One to represent an entity and one to represent a property. The goal is for tomorrow to render the entities as complete as possible with validation attributes etc.

And without further ado here are the specs we're going to build:      

    LightSpeedRepository Conversion      
    - should convert a given table to light speed metadata       
    - should convert a given table without relations to a light speed entity definition       
    - should convert a given table with a m:1 relation to a light speed entity definition       
    - should convert a given table with a 1:m relation to a light speed entity definition       
    - should convert a given table with a m:n relation to a light speed entity definition 

     

    LightSpeedProperty      
    - should allow for a property to be set       
    - should return a predicate for booleans       
    - should return a predicate for booleans       
    - should return a sql type       
    - should be a lightSpeed property 

     

    LightSpeedEntity      
    - should have properties, has many, belongs to and through associations       
    - should create a valid property name if one doesn't exists already in the through association properties       
    - should create a valid property name if one doesn't exists already in the has many properties       
    - should create a valid property name if one doesn't exists already in the belongs to properties       
    - should create a valid property name if one doesn't exists already in the properties       
    - should create a valid property name if one already exists in the through association properties       
    - should create a valid property name if one already exists in the has many properties       
    - should create a valid property name if one already exists in the belongs to properties       
    - should create a valid property name if one already exists in the properties       
    - should create a valid property name if two already exist in the through association properties       
    - should create a valid property name if two already exist in the has many properties       
    - should create a valid property name if two already exist in the belongs to properties       
    - should create a valid property name if two already exist in the properties

Let's start with looking at the LightSpeedProperty first. The attributes on this class are implemented using some simple [metaprogramming](http://en.wikipedia.org/wiki/Metaprogramming). This class will represent a field in a LightSpeed entity and will take care of rendering that properly into the c# file. We actually create the data in the LightSpeedRepository class.

 
``` ruby    
class LightSpeedProperty
  
  attr_accessor :attributes
  
  def initialize(params = {})
    @attributes = params
    LightSpeedProperty.create_methods params
    
  end
  
  def [](attribute)
    attributes[attribute]
  end
  
  def self.create_methods(params)
    
    params.each do |k, v|
      define_method("#{k}=") do |val|
        @attributes[k]= val
      end
      
      predicate = %w(primary_key foreign_key unique nullable).any? { |o| o === k.to_s }
      
      define_method(predicate ? "#{k}?" : "#{k}") do
        @attributes[k]
      end
      
    end
  end

end
```

In the LightSpeed entity class we describe the actual Entity. I monkey patched Array so that I could ask it the question if it has a particular property. To avoid naming conflicts we check for properties that exist already and otherwise give them a generic new name by appending a number.

``` ruby    
class Array
  
  def has_property?(name)
    exists = false
    
    each do |hm|
      exists = hm[:name] == name
      break if exists
    end
    
    exists
  end
end

class LightSpeedEntity
  attr_accessor :properties, :belongs_to, :has_many, :through_associations, :name, :namespace


  def initialize
    @properties = []
    @belongs_to = []
    @has_many = []
    @through_associations =[]
  end
  
  def create_property_name_from(from, idx=0)
    tname = build_property_name_from from, idx
    idx += 1 #when the property exists try with a higher number
    return create_property_name_from(from, idx) if has_property?(tname)
    tname
  end
  
  private
    
    def has_property?(tname)
      properties.has_property? tname or has_many.has_property? tname or belongs_to.has_property? tname or through_associations.has_property? tname
    end
  
    def build_property_name_from(from, idx)
      if idx == 0
        from
      else
        "#{from}#{idx}"
      end
    end
  
  
end
```

And this brings us to our last class of today the Repository class. We mixin the DB::MetaData module we created yesterday. Define a read_only property entities, make sure we can set a namespace for our generated entities. The first step is to transform the meta data into data that we can use to represent a LightSpeed Entity. The second and last step of today is to generate the entities with the lightspeed meta data. We have to skip the primary key because that is defined by convention in LightSpeed.

``` ruby    
class LightSpeedRepository

  include DB::MetaData
  
  attr_reader :entities
  attr_accessor :namespace
  

  def initialize()
    @entities = []
    super
  end
  
  def to_light_speed_meta_data
    tables.collect do |table|
      col_infos = column_info_for table[:name]
      
      field_infos = col_infos.collect do |col_info|
        {
          :name => col_info[:name].underscore,
          :sql_type => col_info[:sql_type],
          :max_length => col_info[:max_length].to_i,
          :nullable => !col_info[:is_nullable].to_i.zero?,  
          :precision => col_info[:precision],
          :foreign_key => foreign_key?(col_info),
          :primary_key => primary_key?(col_info),
          :unique => !col_info[:is_unique].to_i.zero?
        }
      end
      
      { :table_name => table[:name], :class_name => table[:name].singularize.camelize, :fields => field_infos }
    end
  end
  
  def generate_entities
    meta_data = to_light_speed_meta_data
    meta_data.each do |md|
      @entities << generate_entity(md)
    end
    @entities
  end
  
  def generate_entity(meta_data)
    entity = LightSpeedEntity.new
    entity.name = meta_data[:class_name]
    entity.namespace = namespace

    meta_data[:fields].each do |fi|
      prop = LightSpeedProperty.new(fi)
      
      prop.name = entity.create_property_name_from prop.name.underscore.camelize
      entity.properties << prop unless prop.primary_key?
      entity.belongs_to << generate_belongs_to_relation(meta_data, fi, entity) if prop.foreign_key?

    end
    
    entity.has_many = generate_has_many_relations meta_data, entity
    generate_through_associations meta_data, entity
    
    entity
  end
  
 
  
  private
  
    def generate_belongs_to_relation(meta_data, field_info, entity)
      { 
        :name => entity.create_property_name_from(field_info[:name].underscore.humanize.titleize.gsub(/\s/,'')), 
        :class_name => get_belongs_to_table(meta_data[:table_name], field_info[:name]).underscore.camelize.singularize
      }
    end
  
    def generate_has_many_relations(meta_data, entity)
      hms = collect_has_many_relations meta_data[:table_name]
      hms.collect do |hm|
         hm[:name] = entity.create_property_name_from hm[:class_name].pluralize
         hm
      end
      
    end
    
    def generate_through_associations(meta_data, entity)
      tas = collect_through_associations(meta_data[:table_name]) 
      tas.each do |ta|
        ta[:end_tables].each do |et|
          entity.through_associations << {
            :through => ta[:through_table].classify.singularize, 
            :class_name => et.camelize.singularize, 
            :name => entity.create_property_name_from(et.camelize)
          }
        end
      end
    end
end
```
