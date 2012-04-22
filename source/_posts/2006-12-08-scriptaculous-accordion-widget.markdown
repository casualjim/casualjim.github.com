---
date: '2006-12-08 18:23:41'
layout: post
slug: scriptaculous-accordion-widget
status: publish
title: Scriptaculous accordion widget
wordpress_id: '47'
---

Today I needed an accordion widget. I searched the internet but didn't really find one that was based  on scriptaculous and did what i wanted it to do and how i wanted.

You need scriptaculous for this widget. Example markup is shown in the comments. Just add the javascript to a page and it will find the accordion just fine.

I thought I'd share the code:

 
    
    <span style="color: rgb(0,128,0)">/**
     * @author Ivan Porto Carrero
     * 
     *
     * Styles:
     * *******
     * .accordeon{
     *         border: 1px solid #1F669B;
     
     *        font-family: Trebuchet MS, Arial, Helvetica, sans-serif;
     *        font-size: 11px;
     *        overflow:auto;
     *    }
     * h5 {
     *     font-size:12px;
     *    padding: 3px 5px 3px 5px;
     *     margin: 0;
     *     border-style: solid none solid none;
     *     border-top-color:#BDC7E7;
     *     border-bottom-color:#a1bbe4;
     *    border-width: 1px 0px 1px 0px;
     *    color:#fff;
     *    background-color: #63699C;
     *    cursor:pointer;
     * }
     * .panel_header{
     *     color:#878285;
     *     background-color: #63699C;
     *     background:url(images/shade.gif) 0 0 repeat-x;
     * }
     * .panel{
     *     margin: 0;
     *    padding-bottom:0;
     *    border: none;
     * }
     * .panel_body{padding:5px;}
     *
     *
     * Markup:
     * *******
     * 
     * <div class="accordeon">
     *    <div id="panel1" class="panel">
     *        <h5 class="panel_header">Accordian 1 Title</h5>
     *        <div id="panel1-body" class="panel_body visible">
     *            <div>Content goes here</div>
     *        </div>
     *    </div>
     *    <div id="panel2" class="panel">
     *        <h5 class="panel_header">Accordian 2 Title</h5>
     *        <div id="panel2-body" class="panel_body">
     *            <div>Content goes here</div>
     *        </div>
     *    </div>
     *    <div id="panel3" class="panel">
     *        <h5 class="panel_header">Accordian 3 Title</h5>
     *        <div id="panel3-body" class="panel_body">
     *            <div>Content goes here</div>
     *        </div>
     *    </div>
     *    <div id="panel4" class="panel">
     *        <h5 class="panel_header">Accordian 4 Title</h5>
     *        <div id="panel4-body" class="panel_body">
     *            <div>Content goes here</div>
     *        </div>
     *    </div>
     * </div>
     */
    </span>Accordeon = Class.create();
    Accordeon.prototype = {
        initialize:<span style="color: rgb(0,0,255)">function</span>(element, options){
            <span style="color: rgb(0,0,255)">this</span>.options = {
                onBeforeSwitch:<span style="color: rgb(0,0,255)">null</span>,
                onAfterSwitch:<span style="color: rgb(0,0,255)">null</span>,
                activePanel:<span style="color: rgb(0,0,255)">null</span>,
                panelClass:<span style="color: rgb(163,21,21)">'panel'</span>,
                headerClass:<span style="color: rgb(163,21,21)">'panel_header'</span>,
                bodyClass: <span style="color: rgb(163,21,21)">'panel_body'</span>,
                activePanelClass:<span style="color: rgb(163,21,21)">'active'</span>,
                showAnim:<span style="color: rgb(0,0,255)">false
    </span>        };
            Object.extend(<span style="color: rgb(0,0,255)">this</span>.options,options||{});        
            
            <span style="color: rgb(0,0,255)">this</span>.accordeon = $(element);
            <span style="color: rgb(0,0,255)">this</span>.accordeon.panels = <span style="color: rgb(0,0,255)">new</span> Array();
            <span style="color: rgb(0,0,255)">var</span> pnls = $A(<span style="color: rgb(0,0,255)">this</span>.accordeon.childNodes);
            pnls.each(
                <span style="color: rgb(0,0,255)">function</span>(pnl){
                    
                    <span style="color: rgb(0,0,255)">var</span> ele = $(pnl);
    
                    <span style="color: rgb(0,0,255)">var</span> headers = ele.getElementsByClassName(<span style="color: rgb(0,0,255)">this</span>.options.headerClass);
                    <span style="color: rgb(0,0,255)">if</span>(headers.length > 0){
                        <span style="color: rgb(0,0,255)">var</span> header = headers[0];
                        ele.header = header;
                        Event.observe(header,<span style="color: rgb(163,21,21)">'click'</span>, <span style="color: rgb(0,0,255)">this</span>.onChange.bindAsEventListener(<span style="color: rgb(0,0,255)">this</span>))
                    }
                    
                    <span style="color: rgb(0,0,255)">var</span> bodies = ele.getElementsByClassName(<span style="color: rgb(0,0,255)">this</span>.options.bodyClass);
                    <span style="color: rgb(0,0,255)">if</span>(bodies.length > 0){
                        <span style="color: rgb(0,0,255)">var</span> body = bodies[0];
                        ele.body = body;
                        body.hide();
                    }
    
                    <span style="color: rgb(0,0,255)">if</span>(ele.tagName.toLowerCase() == <span style="color: rgb(163,21,21)">'div'</span> && Element.hasClassName(ele,<span style="color: rgb(0,0,255)">this</span>.options.panelClass)){
                        <span style="color: rgb(0,0,255)">this</span>.accordeon.panels.push(ele);
                    }
                }.bind(<span style="color: rgb(0,0,255)">this</span>)
            );
            <span style="color: rgb(0,0,255)">this</span>.setActivePanel(pnls[0],<span style="color: rgb(0,0,255)">false</span>);
            
        },
        onChange:<span style="color: rgb(0,0,255)">function</span>(ev){
            <span style="color: rgb(0,0,255)">var</span> ele = Event.element(ev);
            <span style="color: rgb(0,0,255)">var</span> parents = ele.ancestors();
            <span style="color: rgb(0,0,255)">var</span> panel;
            
            parents.each(
                <span style="color: rgb(0,0,255)">function</span>(elm){                
                    <span style="color: rgb(0,0,255)">var</span> obj = $(elm);
                    <span style="color: rgb(0,0,255)">if</span>(obj.hasClassName(<span style="color: rgb(0,0,255)">this</span>.options.panelClass)){
                        panel = obj;
                        <span style="color: rgb(0,0,255)">return</span>;
                    }                
                        
                }.bind(<span style="color: rgb(0,0,255)">this</span>)            
            );
            <span style="color: rgb(0,0,255)">this</span>.setActivePanel(panel,<span style="color: rgb(0,0,255)">true</span>);
        },
        setActivePanel:<span style="color: rgb(0,0,255)">function</span>(panel,showAnim){
            <span style="color: rgb(0,0,255)">if</span>(<span style="color: rgb(0,0,255)">this</span>.onBeforeSwitch)
                <span style="color: rgb(0,0,255)">this</span>.onBeforeSwitch();
                
            <span style="color: rgb(0,0,255)">if</span>(<span style="color: rgb(0,0,255)">this</span>.activePanel && <span style="color: rgb(0,0,255)">this</span>.activePanel.id != panel.id ){    
                <span style="color: rgb(0,0,255)">var</span> hideAnim = <span style="color: rgb(0,0,255)">null</span>;
                <span style="color: rgb(0,0,255)">if</span>(<span style="color: rgb(0,0,255)">this</span>.options.showAnim)        
                    <span style="color: rgb(0,0,255)">new</span> Effect.toggle(<span style="color: rgb(0,0,255)">this</span>.activePanel.body,<span style="color: rgb(163,21,21)">'blind'</span>,{duration:0.3});
                <span style="color: rgb(0,0,255)">else
    </span>                <span style="color: rgb(0,0,255)">this</span>.activePanel.body.hide();
                <span style="color: rgb(0,0,255)">this</span>._activatePanel(panel,showAnim,hideAnim);                
            }
            <span style="color: rgb(0,0,255)">else</span> <span style="color: rgb(0,0,255)">if</span> (!<span style="color: rgb(0,0,255)">this</span>.activePanel){
                <span style="color: rgb(0,0,255)">this</span>._activatePanel(panel,showAnim);
            }
            <span style="color: rgb(0,0,255)">if</span>(<span style="color: rgb(0,0,255)">this</span>.onAfterSwitch)
                <span style="color: rgb(0,0,255)">this</span>.onAfterSwitch();
            
        },
        _activatePanel:<span style="color: rgb(0,0,255)">function</span>(panel,showAnim,panelToHide){
            panel.body.addClassName(<span style="color: rgb(0,0,255)">this</span>.options.activePanelClass);
            <span style="color: rgb(0,0,255)">if</span>(showAnim && <span style="color: rgb(0,0,255)">this</span>.options.showAnim){
                <span style="color: rgb(0,0,255)">new</span> Effect.toggle(panel.body,<span style="color: rgb(163,21,21)">'blind'</span>,{duration:0.3});        
            }
            <span style="color: rgb(0,0,255)">else</span>{
                panel.body.show();
            }
            <span style="color: rgb(0,0,255)">this</span>.activePanel = panel;
        }
    };
        
    Accordeon.Widget = Class.create();
    Accordeon.Widget.prototype = {
        initialize:<span style="color: rgb(0,0,255)">function</span>(options){
            <span style="color: rgb(0,0,255)">this</span>.options={
                containerClass:<span style="color: rgb(0,0,255)">null
    </span>        };
            Object.extend(<span style="color: rgb(0,0,255)">this</span>.options,options||{});
            
            <span style="color: rgb(0,0,255)">this</span>.accordeons = <span style="color: rgb(0,0,255)">new</span> Array();
            $$(<span style="color: rgb(163,21,21)">'.'</span> + <span style="color: rgb(0,0,255)">this</span>.options.containerClass).each(
                <span style="color: rgb(0,0,255)">function</span>(accordeon){
                    <span style="color: rgb(0,0,255)">this</span>.accordeons.push(<span style="color: rgb(0,0,255)">new</span> Accordeon(accordeon,<span style="color: rgb(0,0,255)">this</span>.options));
                }.bind(<span style="color: rgb(0,0,255)">this</span>)
            );
            
        }
    };
    
    Event.observe(window,<span style="color: rgb(163,21,21)">'load'</span>,<span style="color: rgb(0,0,255)">function</span>(){    
        <span style="color: rgb(0,0,255)">var</span> options = {
                
                panelClass:<span style="color: rgb(163,21,21)">'panel'</span>,
                headerClass:<span style="color: rgb(163,21,21)">'panel_header'</span>,
                bodyClass: <span style="color: rgb(163,21,21)">'panel_body'</span>,
                activePanelClass:<span style="color: rgb(163,21,21)">'active'</span>,
                showAnim:<span style="color: rgb(0,0,255)">true</span>,
                containerClass:<span style="color: rgb(163,21,21)">'accordeon'
    </span>        };
        <span style="color: rgb(0,0,255)">new</span> Accordeon.Widget(options);
    }.bindAsEventListener(<span style="color: rgb(0,0,255)">this</span>));
    
    <font color="#008000"></font>

[](http://11011.net/software/vspaste)
