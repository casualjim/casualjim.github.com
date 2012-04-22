---
date: '2006-09-27 13:17:19'
layout: post
slug: custom-health-monitoring-for-aspnet-using-base4
status: publish
title: Custom Health monitoring for Asp.NET using Base4
wordpress_id: '77'
---

It's been pretty quiet on my blog the last couple of days. But I had something cooking :)

I think logging is a pretty important part of an application. I like to know what's going on when for errors etc.

Asp.NET has a health monitoring service that does just that. With a couple of lines in the web.config you're good to go. 

I use [base4](http://www.base4.net/) for my dataaccess and i want do do all my data access through base4. From the asp.net services I use Membership, roleManager, profiles and health monitoring.

This week I ported healthmonitoring, membership and rolemanager to Base4. I'll post the health monitoring provider and when I have also completed the profile provider I'll post a dll that contains all the providers and the Base4 schema's if somebody is interested.

 

using System;

using System.Collections.Generic;

using System.Text;

using System.Collections.Specialized;

using Flanders.Library.Provider;

using System.Web.Management;

using System.Globalization;

using Seshat.Data;

using System.Collections;

using System.Threading;

using System.Configuration;

 

namespace Flanders.Library.Base4Integration

{

    public class Base4WebEventProvider : BufferedWebEventProvider

    {

        const int SQL_MAX_NTEXT_SIZE = 1073741823;

        const int NO_LIMIT = -1;

 

        int _maxEventDetailsLength = NO_LIMIT;

 

        DateTime _retryDate = DateTime.MinValue; // Won't try sending unless DateTime.UtcNow is > _retryDate

 

        public Base4WebEventProvider() { }

 

        public override void Initialize(string name, NameValueCollection config)

        {

 

            string temp = null;

 

            SecUtility.GetAndRemoveStringAttribute(config, "connectionStringName", name, ref temp);

 

 

            SecUtility.GetAndRemovePositiveOrInfiniteAttribute(config, "maxEventDetailsLength", name, ref _maxEventDetailsLength);

            if (_maxEventDetailsLength == SecUtility.Infinite)

            {

                _maxEventDetailsLength = NO_LIMIT;

            }

            else if (_maxEventDetailsLength > SQL_MAX_NTEXT_SIZE)

            {

                throw new ConfigurationErrorsException(SR.GetString(SR.Invalid_max_event_details_length, name, _maxEventDetailsLength.ToString(CultureInfo.CurrentCulture)));

            }

 

            //SecUtility.GetAndRemovePositiveAttribute(config, "commandTimeout", name, ref _commandTimeout);

 

            base.Initialize(name, config);

        }

 

        void FillParams(ApplicationEvent appEvent, WebBaseEvent eventRaised)

        {

            Exception exception = null;

            WebRequestInformation reqInfo = null;

            string details = null;

            WebApplicationInformation appInfo = WebBaseEvent.ApplicationInformation;

 

            appEvent.Id = eventRaised.EventID;

            appEvent.EventId = eventRaised.EventID.ToString("N", CultureInfo.InstalledUICulture) ;

            appEvent.EventTimeUtc = eventRaised.EventTimeUtc;

            appEvent.EventTime = eventRaised.EventTime;

            appEvent.EventType = eventRaised.GetType().ToString();

            appEvent.EventSequence = eventRaised.EventSequence;

            appEvent.EventOccurence = eventRaised.EventOccurrence;

            appEvent.EventCode = eventRaised.EventCode;

            appEvent.EventDetailCode = eventRaised.EventDetailCode;

            appEvent.Message = eventRaised.Message;

            appEvent.ApplicationPath = appInfo.ApplicationPath;

            appEvent.ApplicationVirtualPath = appInfo.ApplicationVirtualPath;

            appEvent.MachineName = appInfo.MachineName;

 

            // @RequestUrl

            if (eventRaised is WebRequestEvent)

            {

                reqInfo = ((WebRequestEvent)eventRaised).RequestInformation;

            }

            else if (eventRaised is WebRequestErrorEvent)

            {

                reqInfo = ((WebRequestErrorEvent)eventRaised).RequestInformation;

            }

            else if (eventRaised is WebErrorEvent)

            {

                reqInfo = ((WebErrorEvent)eventRaised).RequestInformation;

            }

            else if (eventRaised is WebAuditEvent)

            {

                reqInfo = ((WebAuditEvent)eventRaised).RequestInformation;

            }

            appEvent.RequestUrl = Convert.ToString((reqInfo != null) ? reqInfo.RequestUrl : Convert.DBNull);

 

            // @ExceptionType

            if (eventRaised is WebBaseErrorEvent)

            {

                exception = ((WebBaseErrorEvent)eventRaised).ErrorException;

            }

            appEvent.ExceptionType = Convert.ToString((exception != null) ? exception.GetType().ToString() : Convert.DBNull);

 

            // @Details

            details = eventRaised.ToString();

            if (_maxEventDetailsLength != NO_LIMIT &&

                details.Length > _maxEventDetailsLength)

            {

                details = details.Substring(0, _maxEventDetailsLength);

            }

            appEvent.Details= details;

        }

 

        void WriteToBase4(ICollection events, int eventsDiscardedByBuffer, DateTime lastNotificationUtc)

        {

            // We don't want to send any more events until we've waited until the _retryDate (which defaults to minValue)

            if (_retryDate > DateTime.UtcNow)

            {

                return;

            }

 

            try

            {

                ApplicationEvent appEvent = new ApplicationEvent();

 

                try

                {

 

                    if (eventsDiscardedByBuffer != 0)

                    {

                        WebBaseEvent infoEvent = new Base4BaseEvent(

                            SR.GetString(SR.Sql_webevent_provider_events_dropped,

                                eventsDiscardedByBuffer.ToString(CultureInfo.InstalledUICulture),

                                lastNotificationUtc.ToString("r", CultureInfo.InstalledUICulture)),

                                null,

                                WebEventCodes.WebEventProviderInformation,

                                WebEventCodes.SqlProviderEventsDropped);

 

                        FillParams(appEvent, infoEvent);

                        appEvent.Save();

                    }

 

                    foreach (WebBaseEvent eventRaised in events)

                    {

                        FillParams(appEvent, eventRaised);

                        appEvent.Save();

                    }

                    EventProcessingComplete(events);

                }

                catch

                {

                    // Ignore all errors.

                }

            }

            catch

            {

                // For any failure, we will wait at least 30 seconds or _commandTimeout before trying again

                double timeout = 30;

                _retryDate = DateTime.UtcNow.AddSeconds(timeout);

                throw;

            }

        }

 

        public override void ProcessEventFlush(WebEventBufferFlushInfo flushInfo)

        {

            // Remove Debug.Trace from sample Debug.Trace("SqlWebEventProvider", "EventBufferFlush called: " +

            WriteToBase4(flushInfo.Events, flushInfo.EventsDiscardedSinceLastNotification,

                flushInfo.LastNotificationUtc);

        }

        public override void ProcessEvent(WebBaseEvent eventRaised)

        {

            if (UseBuffering)

            {

                base.ProcessEvent(eventRaised);

            }

            else

            {

                 WriteToBase4(new Base4BaseEventCollection(eventRaised), 0, new DateTime(0));

            }

        }

 

        protected virtual void EventProcessingComplete(ICollection raisedEvents)

        {

        }

 

        public override void Shutdown()

        {

            try

            {

                Flush();

            }

            finally

            {

                base.Shutdown();

            }

        }

    }

    public class Base4BaseEvent : WebBaseEvent

    {

 

        public Base4BaseEvent(string message, object eventSource, int eventCode) : base(message, eventSource, eventCode) { }

        public Base4BaseEvent(string message, Object eventSource, int eventCode, int eventDetailCode)

            : base(message, eventSource, eventCode, eventDetailCode)

        { }

    }

    public sealed class Base4BaseEventCollection : ReadOnlyCollectionBase

    {

        public Base4BaseEventCollection(ICollection events)

        {

            if (events == null)

            {

                throw new ArgumentNullException("events");

            }

 

            foreach (WebBaseEvent eventRaised in events)

            {

                InnerList.Add(eventRaised);

            }

        }

 

        internal Base4BaseEventCollection(WebBaseEvent eventRaised)

        {

            if (eventRaised == null)

            {

                throw new ArgumentNullException("eventRaised");

            }

 

            InnerList.Add(eventRaised);

        }

 

        // overloaded collection access methods 

        public WebBaseEvent this[int index]

        {

            get

            {

                return (WebBaseEvent)InnerList[index];

            }

        }

 

        public int IndexOf(WebBaseEvent value)

        {

            return InnerList.IndexOf(value);

        }

 

        public bool Contains(WebBaseEvent value)

        {

            return InnerList.Contains(value);

        }

    }

}
