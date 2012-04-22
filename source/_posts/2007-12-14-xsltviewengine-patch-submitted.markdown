---
date: '2007-12-14 17:29:30'
layout: post
slug: xsltviewengine-patch-submitted
status: publish
title: ASP.NET MVC XsltViewEngine, patch submitted to the contrib project
wordpress_id: '194'
categories:
- .NET 3.5
- C#
- General
---

I just submitted a patch to the [mvc contrib project](http://mvccontrib.org) that contains the xslt view engine I wrote for [Xero](http://xero.com) without any of the dependencies from our own libraries or commercial components.




The bulk of the work is done in a class called XmlResponseBuilder which builds the xml document that is going to be transformed by the xsl stylesheet. Almost all the rest of the code is there just to build up this document.




The implementation of IView and IViewFactory were the easy bits :)




To use the View engine you need to take the following steps:




1. Get the MVC Contrib project from google code




repository url: [http://mvccontrib.googlecode.com/svn/trunk/](http://mvccontrib.googlecode.com/svn/trunk/)




2. If the patch hasn't been applied yet you can download it from: [http://www.codeplex.com/Project/Download/FileDownload.aspx?ProjectName=MVCContrib&DownloadId;=23748](http://www.codeplex.com/Project/Download/FileDownload.aspx?ProjectName=MVCContrib&DownloadId=23748)




After downloading the patch you can apply it to the downloaded mvc contrib project.




3. I use a base controller to ensure that the correct data is passed to the view factory. This is the base controller class:







public abstract class XeroControllerBase : Controller




    {




        private readonly XsltViewData vData = new XsltViewData();




 




        protected IHttpSessionState Session




        {




            get { return ControllerContext.HttpContext.Session; }




        }




 




        public XeroControllerBase()




        {




            ViewFactory = new XsltViewFactory();   




        }




 




        #region Add datasource methods




 




        protected void AddDataSource(IXmlConvertible dataSource)




        {




            vData.DataSources.Add(new XslDataSource(dataSource));




        }




 




        protected void AddDataSource(IXmlConvertible dataSource, string rootName)




        {




            vData.DataSources.Add(new XslDataSource(rootName, dataSource));




        }




 




        #endregion




 




        #region Add variable methods




 




        protected void AddPageVar(string key, string value)




        {




            vData.PageVars.Add(key, value);




        }




 




        #endregion




 




        #region Add message methods




 




 




        protected void AddErrorMessage(string message)




        {




            vData.Messages.Add(new ErrorMessage(message));




        }




 




        protected void AddErrormessage(string message, string controlID)




        {




            vData.Messages.Add(new ErrorMessage(message, controlID));




        }




 




        protected void AddInfoMessage(string message)




        {




            vData.Messages.Add(new InfoMessage(message));




        }




 




        protected void AddInfoMessage(string message, string controlID)




        {




            vData.Messages.Add(new InfoMessage(message, controlID));




        }




 




        protected void AddAlertMessage(string message)




        {




            vData.Messages.Add(new AlertMessage(message));




        }




 




        protected void AddAlertMessage(string message, string controlID)




        {




            vData.Messages.Add(new AlertMessage(message, controlID));




        }




 




        protected void AddInfoHtmlMessage(string message)




        {




            vData.Messages.Add(new InfoHtmlMessage(message));




        }




 




        protected void AddInfoHtmlMessage(string message, string controlID)




        {




            vData.Messages.Add(new InfoHtmlMessage(message, controlID));




        }




 




        protected void AddErrorHtmlMessage(string message)




        {




            vData.Messages.Add(new ErrorHtmlMessage(message));




        }




 




        protected void AddErrorHtmlmessage(string message, string controlID)




        {




            vData.Messages.Add(new ErrorHtmlMessage(message, controlID));




        }




 




        protected void AddAlertHtmlMessage(string message)




        {




            vData.Messages.Add(new AlertHtmlMessage(message));




        }




 




        protected void AddAlertHtmlMessage(string message, string controlID)




        {




            vData.Messages.Add(new AlertHtmlMessage(message, controlID));




        }




 




        #endregion




 




        #region RenderView method hides




 




        protected new virtual void RenderView(string viewName)




        {




            RenderView(viewName, string.Empty, vData);




        }




 




        protected new void RenderView(string viewName, string masterName)




        {




            RenderView(viewName, string.Empty, vData);




        }




 




        protected new void RenderView(string viewName, object viewData)




        {




            RenderView(viewName, string.Empty, vData);




        }




 




        #endregion 




    }




 




del.icio.us Tags: [aspnetmvc](http://del.icio.us/popular/aspnetmvc)







 




[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2fblog%2farchive%2f2007%2f12%2f15%2fxsltviewengine-patch-submitted.aspx)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2fblog%2farchive%2f2007%2f12%2f15%2fxsltviewengine-patch-submitted.aspx)
