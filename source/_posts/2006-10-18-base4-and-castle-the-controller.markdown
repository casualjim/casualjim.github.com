---
date: '2006-10-18 08:14:07'
layout: post
slug: base4-and-castle-the-controller
status: publish
title: Base4 and Castle... the controller
wordpress_id: '67'
categories:
- Base4
- Castle
---

The next bit for pages in general is that often they represent a list. Often this list is a really long list that you'd like to page through.

I put this functionality into a generic base controller class. The whole idea of my set up is to provide a technique called progressive enhancement of forms.  In short you create an application that works completely without javascript using hyperlinks for gets and submit buttons etc.  Then you attach some css selector classes to the different bits of functionality and you attach these behaviors to the html elements on your page. 

I thought that that is a really nice way of enriching the experience of people that allow it to be enriched ;)  And that is the explanation of the ajaxCall bool variable on some of the methods

The first thing is the interface for the class : 

using System;

namespace NBlogr.Presenter

{

    public interface INBlogrController

    {

        bool IsCompositeView{get;}

        void Delete(T item, int pageNumber, int pageSize);

        void Delete(T item, int pageNumber, int pageSize, bool ajaxCall);

        void Edit(Guid Id);

        void Edit(Guid Id, bool ajaxCall);

        void JumpToPage(int pageNumber, int pageSize);

        void JumpToPage(int pageNumber, int pageSize, bool ajaxCall);

        void List();

        void List(bool ajaxCall);

        void NavigateBack(int pageNumber, int pageSize);

        void NavigateFirst(int pageSize);

        void NavigateNext(int pageNumber, int pageSize);

        void NavigateBack(int pageNumber, int pageSize, bool ajaxCall);

        void NavigateFirst(int pageSize, bool ajaxCall);

        void NavigateNext(int pageNumber, int pageSize, bool ajaxCall);

        void Show();

        void Show(bool ajaxCall);

        void Save(T item, int pageNumber, int pageSize);

        void Save(T item, int pageNumber, int pageSize, bool ajaxCall);

        void CreateNew();

        void CreateNew(bool ajaxCall);

    }

}

And the next thing is the base class again :   


using System;

using System.Collections.Generic;

using System.Text;

using Base4.Storage;

 

namespace NBlogr.Presenter.Abstract

{

    public abstract class AbstractAdminController : AbstractController, INBlogrController where T: class, IItem, new()

    {

        bool compositeView;

        int _pageSize;

 

        public AbstractAdminController()

            : base()

        {

            this.compositeView = false;

            _pageSize = 10;

        }

 

        public AbstractAdminController(bool compositeView) : base()

        {

            this.compositeView = compositeView;

            _pageSize = 10;

        }

 

        internal abstract void getList(int pageNumber, int pageSize, bool skipLayout);

 

 

        internal void getList(int pageNumber, int pageSize)

        {

            getList(pageNumber, pageSize, false);

 

        }

        #region INBlogrController Members

 

        public bool IsCompositeView

        {

            get

            {

                return compositeView;

            }

        }

        public int PageSize

        {

            get

            {

                return _pageSize;

            }

            set

            {

                _pageSize = value;

            }

        }

 

        public void Delete(T item, int pageNumber, int pageSize)

        {

            Delete(item,pageNumber,pageSize,false);

        }

 

        public abstract void Delete(T item, int pageNumber, int pageSize, bool ajaxCall);

 

        public void CreateNew()

        {

            CreateNew(false);

        }

 

        public virtual void CreateNew(bool ajaxCall)

        {

            Edit(Guid.NewGuid(), ajaxCall);

        }

 

        public void Edit(Guid Id)

        {

            Edit(Id, false);

        }

 

        public abstract void Edit(Guid Id, bool ajaxCall);

 

        public void JumpToPage(int pageNumber, int pageSize)

        {

            getList(pageNumber, pageSize);

        }

 

        public virtual void JumpToPage(int pageNumber, int pageSize, bool ajaxCall)

        {

            getList(pageNumber, pageSize, ajaxCall);

        }

 

        public void List()

        {

            getList(1, _pageSize);

        }

 

        public virtual void List(bool ajaxCall)

        {

            getList(1, _pageSize, ajaxCall);

        }

 

        public void NavigateBack(int pageNumber, int pageSize)

        {

            getList(--pageNumber, pageSize);

        }

 

        public void NavigateFirst(int pageSize)

        {

            getList(1, pageSize);

        }

 

        public void NavigateNext(int pageNumber, int pageSize)

        {

            getList(++pageNumber, pageSize);

        }

 

        public virtual void NavigateBack(int pageNumber, int pageSize, bool ajaxCall)

        {

            getList(--pageNumber, pageSize, ajaxCall);

        }

 

        public virtual void NavigateFirst(int pageSize, bool ajaxCall)

        {

            getList(1, pageSize, ajaxCall);

        }

 

        public virtual void NavigateNext(int pageNumber, int pageSize, bool ajaxCall)

        {

            getList(++pageNumber, pageSize, ajaxCall);

        }

 

        public void Show()

        {

            getList(1, _pageSize);

        }

 

        public virtual void Show(bool ajaxCall)

        {

            getList(1, _pageSize, ajaxCall);

        }

 

 

        public void Save(T item, int pageNumber, int pageSize)

        {

            Save(item, pageNumber, pageSize, false);

        }

 

        public abstract void Save(T item, int pageNumber, int pageSize, bool ajaxCall);

 

 

        #endregion

    }

}

Now onto the concrete implementation of my controller class

 

using System;

using System.Collections.Generic;

using System.Text;

using NBlogr.Core;

using NBlogr.Service;

using Base4.Storage;

using Castle.MonoRail.Framework;

using NBlogr.Common.Base4Integration;

using Castle.Services.Transaction;

 

namespace NBlogr.Presenter

{

 

    public class BlogController : Abstract.AbstractAdminController<Blog>

    {

        BlogService blogService;

        

        public BlogController(IService<Blog> blogService)

            : base(true)

        {

            this.blogService = blogService as BlogService;

             

             

        }

 

        private void internalGetList(int pageNumber, int pageSize)

        {

            int pageCount;

 

            IItemList<Blog> blog = blogService.GetAll("Name", pageNumber, pageSize, out pageCount);

 

            internalMapProperties(blog , pageNumber,pageSize, pageCount);

        }

 

        private void internalMapProperties(IItemList<Blog> blogs, int pageNumber, int pageSize, int pageCount)

        {

            int totalCount = blogs.Count;

 

            if (PropertyBag["blog"] == null)

                PropertyBag.Add("blog", new Blog());

            

            PropertyBag.Add("blogs", pageNumber);

            PropertyBag.Add("index", pageNumber);

            PropertyBag.Add("count", totalCount);

            PropertyBag.Add("pageCount", pageCount);

            PropertyBag.Add("pageSize", pageSize);

        }

 

        internal override void getList(int pageNumber, int pageSize, bool skipLayout)

        {

 

            internalGetList(pageNumber, pageSize);

 

            if (!skipLayout)

                RenderView("Show", false);

            else

                RenderView("List", true);

        }

 

 

 

 

        public override void Edit(Guid Id, bool ajaxCall)

        {

            Blog blog = blogService.GetById(Id);

 

            PropertyBag.Add("blog", blog);

             

            if (!ajaxCall)

            {

                getList(1, 0);

            }

            else

                RenderView("Save", ajaxCall);

 

        }

 

        public override void Delete([DataBind("blog")] Blog item, int pageNumber, int pageSize, bool ajaxCall)

        {

            blogService.Delete(item);

 

            if (!ajaxCall)

            {

                getList(1, 0);

            }

            else

                RenderText(getJsonResponse("Contract deleted successfully"));

 

        }

 

        public override void Save([DataBind("blog")] Blog item, int pageNumber, int pageSize, bool ajaxCall)

        {

            PropertyBag.Add("blog", blogService.Save(item));

 

            if (!ajaxCall)

            {

                getList(1, 0);

            }

            else

                RenderText(getJsonResponse("Contract saved successfully"));

        }

 

        private string getJsonResponse(string message)

        {

            return "{result: true, content: '" + message + "'}";

        }

 

    }

}
