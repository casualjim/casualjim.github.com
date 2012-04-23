
	
	
	// hide #back-top first
	$("#back-top").hide();
	
	// fade in #back-top

	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
	
	// illuminate button effect
	$(document).ready(function(){
		
		// blue	
		$('a.illuminatebtn.blue').illuminate({
			'intensity': '0.5',
			'color': '#00ccff',
			'blink': 'true',
			'blinkSpeed': '1200',
			'outerGlow': 'true',
			'outerGlowSize': '10px',
			'outerGlowColor': '#dddddd'
		});
		
		// green	
		$('a.illuminatebtn.green').illuminate({
			'intensity': '0.5',
			'color': '#00ff00',
			'blink': 'true',
			'blinkSpeed': '1200',
			'outerGlow': 'true',
			'outerGlowSize': '10px',
			'outerGlowColor': '#dddddd'
		});
		
		// orange	
		$('a.illuminatebtn.orange').illuminate({
			'intensity': '0.5',
			'color': '#ff9900',
			'blink': 'true',
			'blinkSpeed': '1200',
			'outerGlow': 'true',
			'outerGlowSize': '10px',
			'outerGlowColor': '#dddddd'
		});
		
		// pink	
		$('a.illuminatebtn.pink').illuminate({
			'intensity': '0.5',
			'color': '#ff00cc',
			'blink': 'true',
			'blinkSpeed': '1200',
			'outerGlow': 'true',
			'outerGlowSize': '10px',
			'outerGlowColor': '#dddddd'
		});
		
		// red	
		$('a.illuminatebtn.red').illuminate({
			'intensity': '0.5',
			'color': '#ff0000',
			'blink': 'true',
			'blinkSpeed': '1200',
			'outerGlow': 'true',
			'outerGlowSize': '10px',
			'outerGlowColor': '#dddddd'
		});
				
	});
	
	 // DOM ready
	 $(function() {
	   
      // Create the dropdown base
      $("<select />").appendTo("nav");
      
      // Create default option "Go to..."
      $("<option />", {
         "selected": "selected",
         "value"   : "",
         "text"    : "Go to..."
      }).appendTo("nav select");
      
      // Populate dropdown with menu items
      $("nav a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav select");
      });
      
	   // To make dropdown actually work
	   // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
      $("nav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });
	 
	 });
	 
$(document).ready(function(){ 


	
/*********************
	tabs, toggle accordion
	*********************/
	$(".tabs").tabs(".panes > div", {effect: 'fade'});

	$("#accordion").tabs("#accordion div.pane", {tabs: 'h6', effect: 'slide', initialIndex: null});
	


	//Hide (Collapse) the toggle containers on load
	$(".toggle div.pane").hide(); 

	//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
	$(".toggle h6.title").click(function(){
		$(this).toggleClass("active").next().slideToggle("normal");
		return false; //Prevent the browser jump to the link anchor
	});
	

	
	var tabs = $('ul.tabs');

	tabs.each(function(i) {

		//Get all tabs
		var tab = $(this).find('> li > a');
		tab.click(function(e) {

			//Get Location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {

				e.preventDefault();

				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');

				//Show Tab Content & add active class
				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');

			}
		});
	});

});

(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:!1,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){this.getPanes().slideUp(200),this.getPanes().eq(a).slideDown(400,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c;a.tools.tabs.addEffect("horizontal",function(b,d){c||(c=this.getPanes().eq(0).width()),this.getCurrentPane().animate({width:0},function(){a(this).hide()}),this.getPanes().eq(b).animate({width:c},function(){a(this).show(),d.call()})});function d(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(c,d){var i=h.eq(c);typeof c=="string"&&c.replace("#","")&&(i=h.filter("[href*="+c.replace("#","")+"]"),c=Math.max(h.index(i),0));if(e.rotate){var k=h.length-1;if(c<0)return f.click(k,d);if(c>k)return f.click(0,d)}if(!i.length){if(j>=0)return f;c=e.initialIndex,i=h.eq(c)}if(c===j)return f;d=d||a.Event(),d.type="onBeforeClick",g.trigger(d,[c]);if(!d.isDefaultPrevented()){b[e.effect].call(f,c,function(){d.type="onClick",g.trigger(d,[c])}),j=c,h.removeClass(e.current),i.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.unbind(e.event).removeClass(e.current),i.find("a[href^=#]").unbind("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).bind(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=#]").bind("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href="+location.hash+"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var e=this.data("tabs");e&&(e.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){e=new d(a(this),b,c),a(this).data("tabs",e)});return c.api?e:this}})(jQuery);


 // tumbnail hover caption effect:
$(document).ready(function() {


	$('.thumb-item').hover(function() {

		$(this).find('div.caption').stop(false,true).fadeIn(300);
	},
	function() {
	
		$(this).find('div.caption').stop(false,true).fadeOut(400);
	});

});
		
		
		
/* ---------- social network hover effect ------------- */

$(document).ready(function(){

    //Set opacity on each span to 0%
    $(".fb-rollover").css({'opacity':'0','filter':'alpha(opacity=0)'});

	$('.social_network a').hover(
		function() {
			$(this).find('.fb-rollover').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.fb-rollover').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".twitter-rollover").css({'opacity':'0'});

	$('.social_network a').hover(
		function() {
			$(this).find('.twitter-rollover').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.twitter-rollover').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".google-rollover").css({'opacity':'0'});

	$('.social_network a').hover(
		function() {
			$(this).find('.google-rollover').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.google-rollover').stop().fadeTo(500, 0);
		}
	)
    //Set opacity on each span to 0%
    $(".flickr-rollover").css({'opacity':'0'});

	$('.social_network a').hover(
		function() {
			$(this).find('.flickr-rollover').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.flickr-rollover').stop().fadeTo(500, 0);
		}
	)

	
	
	// list of partner 
	
    //Set opacity on each span to 0%
    $(".client1").css({'opacity':'0'});

	$('.clients a').hover(
		function() {
			$(this).find('.client1').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.client1').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".client2").css({'opacity':'0'});

	$('.clients a').hover(
		function() {
			$(this).find('.client2').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.client2').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".client3").css({'opacity':'0'});

	$('.clients a').hover(
		function() {
			$(this).find('.client3').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.client3').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".client4").css({'opacity':'0'});

	$('.clients a').hover(
		function() {
			$(this).find('.client4').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.client4').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".client5").css({'opacity':'0'});

	$('.clients a').hover(
		function() {
			$(this).find('.client5').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.client5').stop().fadeTo(500, 0);
		}
	)
	
    //Set opacity on each span to 0%
    $(".client6").css({'opacity':'0'});

	$('.clients a').hover(
		function() {
			$(this).find('.client6').stop().fadeTo(500, 1);
		},
		function() {
			$(this).find('.client6').stop().fadeTo(500, 0);
		}
	)

	
 });	
 
 
 $(document).ready(function(){ 
	
	/*********************
	Contact Form
	*********************/
	$('form.validateform').submit(function(){

		var f = $(this).find('.cform li'), 
		ferror = false, 
		emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

		f.children('input').each(function(){ // run all inputs

		    var i = $(this); // current input
		    var rule = i.attr('data-rule');

		    if( rule != undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
			    var exp = rule.substr( pos+1, rule.length );
			    rule = rule.substr(0, pos);
			}else{
			    rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
			    case 'required':
				if( i.val()=='' ){ ferror=ierror=true; }
				break;

			    case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;

			    case 'email':
				if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
				break;


			    case 'checked':
				if( !i.attr('checked') ){ ferror=ierror=true; }
				break;
				
			    case 'regexp':
				exp = new RegExp(exp);
				if( !exp.test(i.val()) ){ ferror=ierror=true; }
				break;
			  }
			  i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
		    }
		});
		f.children('textarea').each(function(){ // run all inputs

		    var i = $(this); // current input
		    var rule = i.attr('data-rule');

		    if( rule != undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
			    var exp = rule.substr( pos+1, rule.length );
			    rule = rule.substr(0, pos);
			}else{
			    rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
			    case 'required':
				if( i.val()=='' ){ ferror=ierror=true; }
				break;

			    case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;
			  }
			  i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
		    }
		});
		if( ferror ) return false; 
			else var str = $(this).serialize();
		
			   $.ajax({
			   type: "POST",
			   url: "contact/contact.php",
			   data: str,
			   success: function(msg){
			
			$("#errormessage").ajaxComplete(function(event, request, settings){
		
			if(msg == 'OK')
			{
				$('#errormessage').hide();	
				$("#sendmessage").show('blind');
				
			}
			else
			{
				$('#errormessage').show('blind');
				result = msg;
			}
		
			$(this).html(result);});}});
				return false;
	});
	

	


	

	
});		

var github = (function(){
  function render(target, repos){
    var i = 0, fragment = '';

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+'</p></li>';
    }
    target.html(fragment);
  }
  return {
    showRepos: function(options){
      $.getJSON("https://api.github.com/users/"+options.user+"/repos?callback=?",
        function(data) {
        	var repos = [];
          if (!data || !data.data) { return; }
          for (var i = 0; i < data.data.length; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.updated_at).valueOf(),
                bDate = new Date(b.updated_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }).error(function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); });
    }
  };
})();



function renderDeliciousLinks(items) {
  var output = "<ul>";
  for (var i=0,l=items.length; i<l; i++) {
    output += '<li><a href="' + items[i].u + '" title="Tags: ' + (items[i].t == "" ? "" : items[i].t.join(', ')) + '">' + items[i].d + '</a></li>';
  }
  output += "</ul>";
  $('#delicious').html(output);
}


