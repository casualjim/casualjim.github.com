---
date: '2008-02-04 11:00:27'
layout: post
slug: using-ruby-to-generate-lightspeed-models-part-1
status: publish
comments: true
title: Using Ruby to Generate LightSpeed Models - Part 1
wordpress_id: '201'
categories:
- IronRuby
- Lightspeed
- Ruby
---

This is the first in a multi-part post on a little ruby application I wrote to generate models for [LightSpeed](http://www.mindscape.co.nz/Products/lightspeed/default.aspx). 

The ultimate goal is to consume the entities we generate in this series with IronRuby and perform some data access.

Today I'll post the code I wrote for creating the database connection. At this moment there is only code there to connect tho sql server. But I may want to add providers later if I decide to keep using this code. That's why some bits are in a separate module.

This are the specs I wrote for the connection manager. The connection manager is the class that reads the database config, gets a connection and executes sql statements. I think this code is pretty simple so I won't put a line-by-line explanation.

It uses DBI to connect to the database and reads out the results of the executed sql statement. In the next post I'll talk about getting the metadata that is required from sql server.

    DB::DbiSqlServer  
    - should return a connection  
    - should say it's an ODBC connection when a dsn is provided  
    - should return the correct connection string for an ODBC connection

``` ruby
module DB
    
    module SqlConnectionManager

        DEFAULT_CONFIG_PATH = File.dirname(__FILE__) + '/../config/database.yml'
        
        attr_reader :connection_string, :connection
            
        def initialize(config=DEFAULT_CONFIG_PATH)
          if config.is_a? Hash
            initialize_config config
          else
            read_config config
        end
        end
        
        def read_config(config_path, config_name = 'sqlserver')
            initialize_config(YAML::load(File.open(config_path || DEFAULT_CONFIG_PATH))[config_name])
        end
        
        def initialize_config(config)
          @config = config
            @connection=nil
      end
        
        def odbc?
          return true unless @config.nil? || @config['dsn'].nil?
          false
        end
    
    
    end
    
    
    class DbiSqlServer 
        include SqlConnectionManager
        
        
        def connection
            if @connection.nil?
              @connection = DBI.connect(connection_string, @config['username'], @config['password'])
            end
            @connection
        end
        
        def connection_string
          if odbc?
            "DBI:ODBC:#{@config['dsn']}"
          else
            "DBI:ADO:Provider=SQLOLEDB;Data Source=#{@config['host']};Initial Catalog=#{@config['database']};User ID=#{@config['username']};Password=#{@config['password']};"
        end
      end
        
        def fetch_all(sql_statement)
            result = []
            connection.execute sql_statement do |statement|
                while row = statement.fetch do 
                    r = {}
                    row.each_with_name do |val, name|
                        r[name.to_sym] = val
                    end
                    result << r
                end
            end
            result
        end
        
        def execute_non_query(sql_statement)
          connection.do sql_statement
        end
        
    end
    
end
```
    
