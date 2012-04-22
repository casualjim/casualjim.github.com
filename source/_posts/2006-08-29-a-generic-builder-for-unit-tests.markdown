---
date: '2006-08-29 11:45:06'
layout: post
slug: a-generic-builder-for-unit-tests
status: publish
title: A generic builder for unit tests
wordpress_id: '95'
categories:
- .NET 2.0
- Base4
- C#
---


		


				

I've been using [base4](http://www.base4.net/) quite a lot lately 
:). And obviously I like it. But anyway for unit testing i found myself writing 
virtually the same builder class over and over again.



				

And since it is just test data that needs to be removed later it is always 
very similar. I started thinking about my problem and came to the conclusion 
that I could easily enough build a generic class that iterates over the object 
and takes all the properties that belong to that type and not to any of the 
parent types and fill them with valid data for their returntype.



				

I got to work and not so long after that I came up with the following class: 



				


						using System;


				


						using System.Collections.Generic;


				


						using System.Text;


				


						using Base4.Storage;


				

 


				


						namespace NBlogr.NUnitTests.HelperClasses


				

{


				

    publicclassBuilder where T : class,IItem,new()


				

    {


				

        privateList items;


				

 


				

        publicList Items


				

        {


				

            get


				

            {


				

                if (items == null) items = newList();


				

                return items;


				

            }


				

            set { items = value; }


				

        }


				

 


				

        publicvirtual T Add()


				

        {


				

            return Add(null);


				

        }


				

 


				

        public T Add(int? index)


				

        {


				

            T t = new T();


				

            return Add(t, index, true);


				

        }


				

 


				

        publicvirtual T Add(T t, int? index, bool generateValues)


				

        {


				

            IItem item = t;


				

            if (generateValues)


				

            {


				

                foreach (PropertyImpl p in item.TypeDefinition.Properties)


				

                {


				

                    switch (p.ReturnTypeName)


				

                    {


				

                        case"bool":


				

                        case"Boolean":


				

                        case"System.Boolean":


				

                            item[p.Name] = index.HasValue;


				

                            break;


				

                        case"string":


				

                        case"String":


				

                        case"System.String":


				

                            if (index.HasValue)


				

                                item[p.Name] = string.Format("Unittest {0} {1}", item.TypeDefinition.Name, index);


				

                            else


				

                                item[p.Name] = string.Format("Unittest {0}", item.TypeDefinition.Name);


				

                            break;


				

                        case"uint":


				

                        case"short":


				

                        case"int":


				

                        case"long":


				

                        case"Int16":


				

                        case"Int32":


				

                        case"Int64":


				

                        case"System.Int16":


				

                        case"System.Int32":


				

                        case"System.Int64":


				

                            item[p.Name] = index.HasValue ? index.Value : newRandom().Next();


				

                            break;


				

                        case"byte":


				

                        case"Byte":


				

                        case"System.Byte":


				

                            item[p.Name] = index.HasValue ? Convert.ToByte(index.Value) : newbyte();


				

                            break;


				

 


				

                        case"double":


				

                        case"Double":


				

                        case"System.Double":


				

                            item[p.Name] = index.HasValue ? Convert.ToDouble(index.Value) : newRandom().NextDouble();


				

                            break;


				

 


				

                        case"byte[]":


				

                        case"Byte[]":


				

                        case"System.Byte[]":


				

                            Byte[] bytes = newbyte[128];


				

                            Random rnd = newRandom();


				

                            rnd.NextBytes(bytes);


				

                            item[p.Name] = bytes;


				

                            break;


				

 


				

                        case"Guid":


				

                        case"System.Guid":


				

                            item[p.Name] = Guid.NewGuid();


				

                            break;


				

                    }


				

                }


				

            }


				

            item.Save();


				

 


				

            items.Add((T)item);


				

 


				

            return item as T;


				

        }


				

 


				

        publicvoid BuildList()


				

        {


				

            BuildList(5);


				

        }


				

 


				

        publicvoid BuildList(int length)


				

        {


				

            if (items == null) items = newList();


				

 


				

            for (int i = 0; i < length; i++)


				

            {


				

                int index = i + 1;


				

 


				

                Add(index);


				

            }


				

 


				

        }


				

 


				

        publicvoid CleanUp()


				

        {


				

            if (items != null && items.Count> 0)


				

            {


				

                foreach (IItem item in items)


				

                {


				

                    item.Delete();


				

 


				

                }


				

            }


				

        }


				

    }


				

}


		


		


		



