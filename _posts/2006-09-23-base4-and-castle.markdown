---
date: '2006-09-23 10:08:32'
layout: post
slug: base4-and-castle
status: publish
title: Base4 and Castle
wordpress_id: '78'
categories:
- Base4
- Castle
---

Something I found very useful to use in [castle](http://www.castleproject.org/) is [Base4](http://www.base4.net/) 

And as it so happens [Nic Wise](http://www.fastchicken.co.nz/blog/) just asked me if you could use the 2 together. The answer is yes you can.

I know they support [nhibernate](http://www.nhibernate.org/) but that is not really the same :)  [Base4](http://www.base4.net/) just goes that extra mile.

Since data access is always the same. And the examples on the castle site use concrete implementations of data access objects. I thought I really don't need a facility for the moment and can just use base4.

Anyway here is the class I use to do all my data access. it's an abstract class that has concrete implementations so that I can extend the functionality if I need to.

The interface for the class (the colors look different on my screen I swear  the gray bits should be some type of blue and the yellow also isn't quite right): 

 

using System;

namespace TimeSheets.Application.Contract.Data

{

    public interface IDataObject<T>

    where T : class, Base4.Storage.IItem, new()

    {

        void Delete(T item);

        Base4.Storage.IItemList<T> Find(string oPath, string sortExpression, int pageNumber, int pageSize, out int pageCount);

        Base4.Storage.IItemList<T> Find(string oPath, string sortExpression);

        Base4.Storage.IItemList<T> Find(string oPath);

        Base4.Storage.IItemList<T> FindAll(string sortExpression, int pageNumber, int pageSize, out int pageCount);

        Base4.Storage.IItemList<T> FindAll(string sortExpression);

        Base4.Storage.IItemList<T> FindAll();

        Base4.Storage.IItemList<T> FindById(Guid Id);

        T GetById(Guid Id);

        T GetOne(string oPath);

        T Insert(T item);

        string SortExpression { get; set; }

        T Update(T item);

    }

}

 

And this is the abstract class :

 

using System;

using System.Collections.Generic;

using System.Text;

using Base4.Storage;

using System.ComponentModel;

 

namespace TimeSheets.Application.Base

{

 

    ///

    /// A generic class that handles data access through Base4

    ///

    ///

    public abstract class BaseDataObject<T> : Base.DataObject, Contract.Data.IDataObject<T> where T : class,IItem, new()

    {

        private string m_SortExpression;

 

        ///

        /// Gets or sets the sort expression.

        ///

        /// The sort expression.

        public virtual string SortExpression

        {

            get { return m_SortExpression; }

            set { m_SortExpression = value; }

        }

 

        ///

        /// Finds the specified in the object path.

        ///

        /// The Object path.

        ///

        public virtual IItemList<T> Find(string oPath)

        {

            //set the default sort expression to none

            this.m_SortExpression = string.Empty;

 

            //Get my stuff

            return StorageContext.Find<T>(initialiseObjectPath(new ObjectPath(oPath)));

        }

 

        ///

        /// Finds the specified Object path sorted by the provided sort expression.

        ///

        /// The Object path.

        /// The sort expression.

        ///

        public virtual IItemList<T> Find(string oPath, string sortExpression)

        {

            //Set the default sort expression

            this.m_SortExpression = sortExpression;

 

            //Get the data out

            return StorageContext.Find<T>(initialiseObjectPath(new ObjectPath(oPath)));

        }

 

        ///

        /// Finds the specified Object path with server side paging.

        ///

        /// The Object path.

        /// The sort expression.

        /// The page number.

        /// Size of the page.

        /// The page count.

        ///

        public virtual IItemList<T> Find(string oPath, string sortExpression, int pageNumber, int pageSize, out int pageCount)

        {

            //initialise the pagecount parameter

            pageCount = 0;

 

            //Set the pagecount parameter tot he actual value

            pageCount = (int)Math.Ceiling(Convert.ToDouble(getCount() / pageSize));

 

            //if we got a sort expression do initialize with it please

            if (!string.IsNullOrEmpty(sortExpression))

                m_SortExpression = sortExpression;

 

            //initialise the object pathe with the provide oPath parameter and initialise the order by

            ObjectPath path = initialiseObjectPath(new ObjectPath(oPath));

 

            //Tell Base4 which page to retrieve

            path.PageSize = pageSize;

            path.PageNumber = pageNumber;

 

            //Get the items

            return StorageContext.Find<T>(path);

        }

 

        ///

        /// Finds all items.

        ///

        ///

        public virtual IItemList<T> FindAll()

        {

            this.m_SortExpression = string.Empty;

            return StorageContext.Find<T>(initialiseObjectPath());

        }

 

        ///

        /// Finds all the items sorted.

        ///

        /// The sort expression.

        ///

        public virtual IItemList<T> FindAll(string sortExpression)

        {

            this.m_SortExpression = sortExpression;

            return StorageContext.Find<T>(initialiseObjectPath());

        }

 

        ///

        /// Finds all.

        ///

        /// The sort expression.

        /// The page number.

        /// Size of the page.

        /// The page count.

        ///

        public virtual IItemList<T> FindAll(string sortExpression, int pageNumber, int pageSize, out int pageCount)

        {

            //initialise the pagecount parameter

            pageCount = 0;

 

            //Set the pagecount parameter tot he actual value

            pageCount = (int)Math.Ceiling(Convert.ToDouble(getCount() / pageSize));

 

            //if we got a sort expression do initialize with it please

            if (!string.IsNullOrEmpty(sortExpression))

                m_SortExpression = sortExpression;

 

            //initialise the object pathe with the provide oPath parameter and initialise the order by

            ObjectPath path = initialiseObjectPath();

 

            //Tell Base4 which page to retrieve

            path.PageSize = pageSize;

            path.PageNumber = pageNumber;

 

            //Get the items

            return StorageContext.Find<T>(path);

        }

 

        //internal method that gives the rowcount of all items. 

        protected int getCount()

        {

            return StorageContext.FindAll<T>().Count;

        }

 

        protected ObjectPath initialiseObjectPath()

        {

            ObjectPath path = new ObjectPath();

            return initialiseObjectPath(path);

        }

 

        ///

        /// Initialises the object path.

        ///

        /// The path.

        ///

        protected ObjectPath initialiseObjectPath(ObjectPath path)

        {

            //Do we have a sort expression

            if (!string.IsNullOrEmpty(m_SortExpression) && m_SortExpression.Trim().Length > 0)

            {

                //Give me all the sort parameters

                string[] sortParams = m_SortExpression.Split(",".ToCharArray());

 

                //Now go work out their object path

                foreach (string s in sortParams)

                {

                    //Work out the direction

                    OrderByDirection direction = s.IndexOf("DESC") > -1 ? OrderByDirection.Descending : OrderByDirection.Ascending;

 

                    //Work out the column

                    string orderby = s.Substring(0, s.IndexOf("DESC") > -1 ? s.IndexOf("DESC") : s.Length);

 

                    path.AddOrderBy(orderby, direction);

                }

            }

 

            return path;

        }

 

        ///

        /// Gets the Item as an item through a specified Object path.

        ///

        /// The Object path.

        ///

        public virtual T GetOne(string oPath)

        {

            return StorageContext.FindOne<T>(new ObjectPath(oPath));

        }

 

        ///

        /// Finds the item by id and returns a list.

        ///

        /// The id.

        ///

        public virtual IItemList<T> FindById(Guid Id)

        {

            IItemList<T> itemList = StorageContext.Find<T>("Id='{0}'", Id.ToString());

            return itemList.Count > 0 ? itemList : new ItemList<T>() as IItemList<T>;

        }

 

        ///

        /// Gets the item by id as an item.

        ///

        /// The id.

        ///

        public virtual T GetById(Guid Id)

        {

            IItemList<T> itemList = FindById(Id);

            return itemList.Count > 0 ? itemList[0] : new T();

        }

 

        ///

        /// Inserts the specified item.

        ///

        /// The item.

        ///

        public virtual T Insert(T item)

        {

            ((IItem)item).Save();

 

            return item;

        }

 

        ///

        /// Updates the specified item.

        ///

        /// The item.

        ///

        public virtual T Update(T item)

        {

            ((IItem)item).Save();

 

            return item;

        }

 

        ///

        /// Deletes the specified item.

        ///

        /// The item.

        public virtual void Delete(T item)

        {

            ((IItem)item).Delete();

 

        }

    }

}

This is the concrete implementation:  


 

using Fogcreek.FogbugzEx;

 

namespace TimeSheets.Application.Dao

{

    public class TimesheetDao : Base.BaseDataObject<Timesheet>

    {

    }

}
