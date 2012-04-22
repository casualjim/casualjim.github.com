---
date: '2006-12-16 12:11:04'
layout: post
slug: a-scriptaculous-multi-file-selector-class
status: publish
title: A scriptaculous multi file selector class
wordpress_id: '42'
---

For nblogr I wanted to provice a way to upload multiple files but just display one input field at a time.  So I worked out the following javascript class.

Usage : 
    
    <span style="color: rgb(0,0,255)">new</span> NBlogr.MultiSelector( <span style="color: rgb(163,21,21)">element(id)</span>, maxNumberOfFiles or -1 for unlimited );




The MultiSelector class: 
    
    NBlogr.MultiSelector = Class.create();
    NBlogr.MultiSelector.prototype = {
        initialize : <span style="color: rgb(0,0,255)">function</span>(file, max){
            <span style="color: rgb(0,0,255)">this</span>.options = {
                max : -1,
                container:<span style="color: rgb(0,0,255)">null,<br></br></span>            file:<span style="color: rgb(0,0,255)">null<br></br></span>        };
            
            <span style="color: rgb(0,0,255)">this</span>.options.file = $(file);<br></br>        <span style="color: rgb(0,0,255)">this</span>.id = <span style="color: rgb(0,0,255)">0</span>;
            <span style="color: rgb(0,0,255)">this</span>.count=0;
            <span style="color: rgb(0,0,255)">this</span>.initializeContainer();
            <span style="color: rgb(0,0,255)">if</span>(max){
                <span style="color: rgb(0,0,255)">this</span>.options.max = max;
            }
            <span style="color: rgb(0,0,255)">else</span>{
                <span style="color: rgb(0,0,255)">this</span>.options.max = -1;
            }
        },
        initializeContainer : <span style="color: rgb(0,0,255)">function</span>(){
            <span style="color: rgb(0,0,255)">if</span>(<span style="color: rgb(0,0,255)">this</span>.options.file){
                <span style="color: rgb(0,0,255)">var</span> ele = <span style="color: rgb(0,0,255)">this</span>.options.file;
                <span style="color: rgb(0,0,255)">this</span>.options.container = Builder.node(<span style="color: rgb(163,21,21)">'div'</span>,{id:ele.id + <span style="color: rgb(163,21,21)">'_container'</span>,
                    style:<span style="color: rgb(163,21,21)">'background:transparent;display:inline;width:250px;font-size:small'</span>});
                
                ele.parentNode.insertBefore(<span style="color: rgb(0,0,255)">this</span>.options.container,ele);
                <span style="color: rgb(0,0,255)">this</span>.options.container.appendChild(ele);
                
                <span style="color: rgb(0,0,255)">if</span>(!<span style="color: rgb(0,0,255)">this</span>.list){
                    <span style="color: rgb(0,0,255)">this</span>.list = Builder.node(<span style="color: rgb(163,21,21)">'div'</span>,{id:ele.id+<span style="color: rgb(163,21,21)">'_list'</span>,style:<span style="color: rgb(163,21,21)">'display:block'</span>});
                }
                <span style="color: rgb(0,0,255)">this</span>.options.container.appendChild(<span style="color: rgb(0,0,255)">this</span>.list);
                <span style="color: rgb(0,0,255)">this</span>.initializeFile(ele);
            }
        },
        initializeFile:<span style="color: rgb(0,0,255)">function</span>(element){        
            
            <span style="color: rgb(0,0,255)">if</span>( element && element.tagName == <span style="color: rgb(163,21,21)">'INPUT'</span> && element.type == <span style="color: rgb(163,21,21)">'file'</span> ){
                element.name = <span style="color: rgb(163,21,21)">'file_'</span> + <span style="color: rgb(0,0,255)">element</span>.id;
                element.id = <span style="color: rgb(163,21,21)">'file_'</span> + <span style="color: rgb(0,0,255)"><span style="color: rgb(0,0,255)">element</span></span>.id++;
                
                
                Event.observe(element,<span style="color: rgb(163,21,21)">'change'</span>,<span style="color: rgb(0,0,255)">this</span>.addFile.bindAsEventListener(<span style="color: rgb(0,0,255)">this</span>));
                
                <span style="color: rgb(0,0,255)">if</span>( <span style="color: rgb(0,0,255)">this</span>.max != -1 && <span style="color: rgb(0,0,255)">this</span>.count >= <span style="color: rgb(0,0,255)">this</span>.max ){
                    element.disabled = <span style="color: rgb(0,0,255)">true</span>;
                };
                <span style="color: rgb(0,0,255)">this</span>.count++;            
            } <span style="color: rgb(0,0,255)">else</span> {
                alert( <span style="color: rgb(163,21,21)">'Error: not a file input element'</span> );
            };
        },
        addFile:<span style="color: rgb(0,0,255)">function</span>(ev){
            <span style="color: rgb(0,0,255)">var</span> ele = Event.element(ev);
            
            <span style="color: rgb(0,0,255)">var</span> new_element = document.createElement( <span style="color: rgb(163,21,21)">'input'</span> );
            new_element.type = <span style="color: rgb(163,21,21)">'file'</span>;
            ele.parentNode.insertBefore( new_element, ele );
            <span style="color: rgb(0,0,255)">this</span>.initializeFile( new_element );
            <span style="color: rgb(0,0,255)">this</span>.addListRow( ele );
            ele.style.position = <span style="color: rgb(163,21,21)">'absolute'</span>;
            ele.style.left = <span style="color: rgb(163,21,21)">'-1000px'</span>;
            
            <span style="color: rgb(0,0,255)">if</span>(ev) Event.stop(ev);
        },
        removeFile:<span style="color: rgb(0,0,255)">function</span>(ev){
            <span style="color: rgb(0,0,255)">var</span> ele = Event.element(ev); 
    
            ele.parentNode.parentNode.removeChild( ele.parentNode );
            <span style="color: rgb(0,0,255)">this</span>.options.file.disabled = <span style="color: rgb(0,0,255)">false</span>;
            <span style="color: rgb(0,0,255)">this</span>.count--;        
            
            <span style="color: rgb(0,0,255)">if</span>(ev) Event.stop(ev);
        },
        addListRow : <span style="color: rgb(0,0,255)">function</span>( element ){
            <span style="color: rgb(0,0,255)">var</span> new_row_button = Builder.node(<span style="color: rgb(163,21,21)">'a'</span>,{href:<span style="color: rgb(163,21,21)">'javascript:;;'</span>,
                title:<span style="color: rgb(163,21,21)">'Remove this file from the list'</span>},<span style="color: rgb(163,21,21)">'Remove'</span>);
            <span style="color: rgb(0,0,255)">var</span> new_row = Builder.node(<span style="color: rgb(163,21,21)">'div'</span>,{element:element},[$F(element) + <span style="color: rgb(163,21,21)">' | '</span>, new_row_button]);
            Event.observe(new_row_button,<span style="color: rgb(163,21,21)">'click'</span>,<span style="color: rgb(0,0,255)">this</span>.removeFile.bindAsEventListener(<span style="color: rgb(0,0,255)">this</span>));
            <span style="color: rgb(0,0,255)">this</span>.list.appendChild( new_row );
            
        }
    };
    
    

[](http://11011.net/software/vspaste)
