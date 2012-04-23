---
date: '2006-05-20 13:24:08'
layout: post
slug: intellisense-for-atlas-xml-script
status: publish
title: Intellisense for Atlas Xml Script
wordpress_id: '127'
categories:
- .NET 2.0
- Atlas
---

I've come across a french guy's blog who has created an intellisens xsd generator for the atlas framework.




He says it's not perfect but I'll take whatever I can get that saves me from writing full words. It's not perfect in the sense that it doesn't show you if something is allowed there or not.




The link to the article about the intellisense generator:  
[http://blogs.developpeur.org/cyril/archive/2006/04/19/Intellisense_pour_Atlas_c_est_possible_generation_schema_xsd_en_javascript.aspx](http://blogs.developpeur.org/cyril/archive/2006/04/19/Intellisense_pour_Atlas_c_est_possible_generation_schema_xsd_en_javascript.aspx)  
  
To install the xsd just extract [this file](http://www.cyrildurand.net/divers/fichiers/AtlasIntelissense.xsd.zip) to _C:\Program Files\Microsoft Visual Studio 8\Xml\Schemas_




The next step is to separate the xml script from your aspx page so it doesn't look so cluttered anymore. Also the intellisense will only work in the xml editor.  The same guy has written another post on how to do just that.




The link to his article : [http://blogs.developpeur.org/cyril/archive/2006/04/29/Atlas_Charge_un_fichier_xml_script_externe_dans_une_application_ATLAS_grace_a_Ajax.aspx](http://blogs.developpeur.org/cyril/archive/2006/04/29/Atlas_Charge_un_fichier_xml_script_externe_dans_une_application_ATLAS_grace_a_Ajax.aspx)  





The english explanation :   
link to your atlas xml file like this : <link type="text/xml-script" href="DynamicLoad.atlas" />




And next add some javascript to the page :




Sys.Application.load.add(function(){  
     var linkElements = document.getElementsByTagName('link');  
       
     for (var i = 0; i < linkElements.length; i++){  
            linkElement = linkElements[i];   
            if (linkElement.type= 'text/xml-script' && linkElement.href){  
                   var request = new Sys.Net.WebRequest();  
                   request.set_url(linkElement.href);  
                   request.completed.add(function(e){  
                        Sys.MarkupParser.processDocumentScripts(Sys.Application.getMarkupContext(), e.get_xml().childNodes, null);  
                  });     
                  request.invoke();   
           }  
     }   
  
});
