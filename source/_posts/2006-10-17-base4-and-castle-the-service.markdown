---
date: '2006-10-17 06:38:35'
layout: post
slug: base4-and-castle-the-service
status: publish
title: Base4 and Castle ... The service
wordpress_id: '68'
categories:
- Base4
- Castle
---

_UPDATE: THE SERVICE CLASS HAS CHANGED AGAIN_**.  
**_Scratch the update.. it assumes that the object is already in the database which isn't always the case. For this type of synchronisation to work I need some more time. So I reverted this back to the old version_

This post continues my previous posts on using base4 and castle together.

I'm sorry but there is no Active record in the base4 way of doing things.

The previous posts you would be intrested in can be found here : 

[Hosting base4 inside your web application  
](http://www.flanders.co.nz/Blog/2006/10/12/HostingBase4InsideYourWebApplication.aspx)[Base4 and Castle continued... The facility](http://www.flanders.co.nz/Blog/2006/10/16/Base4OnCastleContinuedTheFacility.aspx)

Today I want to show you the abstract service class that I use so the controller only talks to the service and never to the dataobject directly.  

It is not a very big class but i found it pretty useful.  As it turns out almost all my service classes in a previous project started to look very much alike so I grouped that functionality in an abstract class. There is one thing you have to look out for and that is if you have something like audit fields (Created, LastModified,.....) you need to first get the object from the datastore and then set just the changed properties on the retrieved object.

The first thing you need is the contract/interface for the service. I expect this interface to grow over time so keep checking NBlogr for updates but this where I am at now :)

using System;

namespace NBlogr.Service

{

    public interface IService

    where T : class, Base4.Storage.IItem, new()

    {

        void Delete(T item);

        Base4.Storage.IItemList GetAll(string sortExpression, int pageNumber, int pageSize, out int pageCount);

        T GetById(Guid Id);

        T Save(T item);

    }

}

And here's the abstract class :

using Base4.Storage;

using Castle.Core.Logging;

using NBlogr.Common.Base4Integration;

 

using User = NBlogr.Core.User;

using Castle.Services.Transaction;

using Base4.Storage.Utils;

 

namespace NBlogr.Service.Abstract

{

 

    [Transactional]

    public abstract class AbstractService : IService where T : class,IItem,new()

    {

        internal readonly ILogger logger;

        internal IDataObject dao;

 

 

        public AbstractService(ILogger logger, IDataObject dao)

        {

            this.logger = logger;

            this.dao = dao;

        }

 

        [Transaction(TransactionMode.Requires)]

        public virtual T Save(T item)

        {

            return dao.Save(internalPrepareSave(item));

        }

 

        internal abstract T internalPrepareSave(T item);

 

        [Transaction(TransactionMode.Requires)]

        public virtual void Delete(T item)

        {

            dao.Delete(item);

        }

 

        public virtual IItemList GetAll(string sortExpression, int pageNumber, int pageSize, out int pageCount)

        {

            return dao.FindAll(sortExpression, pageNumber, pageSize, out pageCount);

        }

 

        public virtual T GetById(Guid Id)

        {

            return dao.GetById(Id);

        }

 

 

    }

}

And the last bit could be an implementation of this service.  I don't have companies in NBlogr. I took this class from another project : 

using System;

using Castle.Services.Transaction;

using Castle.Core.Logging;

using NBlogr.Common.Base4Integration;

using NBlogr.Core;

 

namespace NBlogr.Service

{

    [Transactional]

    public class BlogService : Abstract.AbstractService<Blog>

    {

 

        public BlogService(ILogger logger, IDataObject<Blog> dao)

            : base(logger, dao)

        {

 

        }

 

        internal override Blog internalPrepareSave(Blog item)

        {

            Blog itemToSave = GetById(item.Id);

 

            if (!itemToSave.Internals.InDatabase)

            {

                itemToSave.Created = DateTime.Now;

                itemToSave.Creator = CurrentUser;

            }

 

            itemToSave.AkismetKey = item.AkismetKey;

            //TODO: finish mapping properties

 

            return itemToSave;

        }

    }

}

This concludes the service for use with base4.  I hope you find it as useful as I do.  
If somebody knows improvements etc. Please let me know I am always keen to learn.

I also realise that I can just call save on an IItem object but i like every tier to have it's specific task so the dataobject doesn't do much else than call IItem.Save() for now
