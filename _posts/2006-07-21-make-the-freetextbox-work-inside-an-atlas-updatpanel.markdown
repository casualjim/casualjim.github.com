---
date: '2006-07-21 00:03:21'
layout: post
slug: make-the-freetextbox-work-inside-an-atlas-updatpanel
status: publish
title: Make the freetextbox work inside an atlas updatpanel
wordpress_id: '107'
categories:
- .NET 2.0
- Atlas
---

A while ago I blogged about [making the freetextbox work inside an updatepanel](http://www.flanders.co.nz/Blog/2006/05/22/ATLASContinuedGetTheFreetextboxGoing.aspx). I didn't put the code at that time because it wasn't what it should be.

For the NBlogr engine I do need a working version of that control. And it should work on firefox and internet explorer. Now I have it somewhat working.  I thought it would be best to share this, as I'm sure that there are others that are facing the same problem.

You basically wrap it in an iframe so that it loads it's script in a page that does not have an update panel on it.
through javascript you get the value of the entered in the freetextbox and set it in an hiddenfield. and voila you're done.

FreeTextBoxWrapper.ascx :

<


iframe


runat
="server"


id
="ifrmTxt"


width
="600"


height
="400"


frameborder
="0"


>
iframe
> 

<


asp
:
HiddenField


ID
="hfFtbValue"


runat
="server"


/>

And the codebehind for the ascx :







12 [ValidationProperty("Text")]




13 publicpartialclassApp_Components_FreeTextBoxWrapper : System.Web.UI.UserControl




14 {




15 publicstringText




16 {




17 get




18 {




19 returnhfFtbValue.Value;




20 }




21 set




22 {




23 hfFtbValue.Value = value;




24 }




25 }




26 publicstringWidth




27 {




28 get




29 {




30 returnifrmTxt.Attributes["width"];




31 }




32 set




33 {




34 ifrmTxt.Attributes["width"] = value;




35 }




36 }




37 publicstringHeight




38 {




39 get




40 {




41 returnifrmTxt.Attributes["height"];




42 }




43 set




44 {




45 ifrmTxt.Attributes["height"] = value;




46 }




47 }




48 protectedvoidPage_Load(objectsender, EventArgse)




49 {




50 //load the freetextbox page that has no theme and no masterpage set. The background color is the one I chose to blend in with my design 




51 ifrmTxt.Attributes["Src"] = ResolveUrl(string.Format("~/App_Components/FreeTextBox.aspx?hf={0}&w={1}&h={2}", hfFtbValue.ClientID,Width,Height));




52 ifrmTxt.Attributes["Name"] = ifrmTxt.ClientID;




53




54 if (!IsPostBack)




55 {




56 Session[hfFtbValue.ClientID] = hfFtbValue.Value;




57 }




58 }




59




60 protectedoverridevoidOnDataBinding(EventArgse)




61 {




62 base.OnDataBinding(e);




63 Session[hfFtbValue.ClientID] = hfFtbValue.Value;




64 }




65 }















And the page that contains the freetextbox control : 



<%


@


Page


Language
="C#"


AutoEventWireup
="true"


Theme
=""


CodeFile
="FreeTextBox.aspx.cs"


Inherits
="App_Components_FreeTextBox"


ValidateRequest
="false"
%>


DOCTYPE


html


PUBLIC


"-//W3C//DTD XHTML 1.0 Transitional//EN"


"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<
html


xmlns
="http://www.w3.org/1999/xhtml"


>
<
head


runat
="server">

<
title
>
A wrapper for the freetextbox in an atlas:updatepanel

title
>

<
style


type
="text/css">

body
{

background
: 
#ffdaa0
;//Set your color here

margin
:
0
;
}


style
>

head
>
<
body
>

<
form


id
="form1"


runat
="server">

<
div
>

<
FTB
:
FreeTextBox


ID
="ftb"


runat
="server"


SupportFolder
="~/"


ClientSideTextChanged
="onFtbClientTextChanged">

FTB
:
FreeTextBox
>


div
>



<
script


type
="text/javascript">

//The lengthy constructor is there so that firefox also knows where to get the text.

function


onFtbClientTextChanged
(){

window
.
parent
.
document
.
getElementById
(
'<%= MainPageField %>'
).
value
= 
document
.
getElementById
(
'<%= ftb.ClientID %>_designEditor'
).
contentWindow
.
document
.
body
.
innerHTML
;
}; 


if
(
navigator
.
userAgent
.
indexOf
(
"Firefox"
)!=-1)

document
.
getElementById
(
"<%= ftb.ClientID %>_htmlEditorArea"
).
addEventListener
(
'change'
, 
onFtbClientTextChanged
, 
true
); 
//for firefox


script
>




form
>

body
>

html
>

With it's codebehind:





12 publicpartialclassApp_Components_FreeTextBox : System.Web.UI.Page




13 {




14 protectedstringMainPageField;




15




16 protectedvoidPage_Load(objectsender, EventArgse)




17 {




18 MainPageField = Request.QueryString["hf"];




19




20 if (!IsPostBack)




21 {




22 //When the page first loads we need to set the freetextbox with the value from the hiddenfield for databinding etc.




23 stringsetTextScript = string.Empty;




24 if(Request.Browser.Browser != "IE")//for firefox we need to reach the freetextbox design editor to place our html




25 setTextScript = string.Format("document.getElementById('{0}_designEditor').contentWindow.document.body.innerHTML = window.parent.document.getElementById('{1}').value;\r\n", ftb.ClientID, MainPageField);




26 else




27 setTextScript = string.Format("document.getElementById('{0}').innerHTML = window.parent.document.getElementById('{1}').value;\r\n", ftb.ClientID, MainPageField);




28




29 Page.ClientScript.RegisterStartupScript(this.GetType(), "setText", setTextScript, true);




30 ftb.Text = Session[MainPageField].ToString();




31 }




32 //Set the width to 99% so that the freetextbox displays completely




33 ftb.Width = Unit.Percentage(99);




34




35 //Get the height and widht and set the height relative to the width of the iframe (the toolbars move)




36 intheight = int.Parse(Request.QueryString["h"]);




37 intwidth = int.Parse(Request.QueryString["w"]);




38 if (width < 550)




39 ftb.Height = Unit.Pixel(height - 130);




40 elseif (width < 600)




41 ftb.Height = Unit.Pixel(height - 120);




42 else




43 ftb.Height = Unit.Pixel(height - 90);




44




45 }




46




47 }







