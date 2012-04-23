---
date: '2007-04-11 21:56:36'
layout: post
slug: humanizing-timespans-in-net
status: publish
title: Humanizing timespans in .NET
wordpress_id: '27'
---

After a couple of months getting into ruby on rails I got back to .NET development, as well as back to NBlogr and back to blogging.

Now for replies I saw on some blogs the format < replied **1 month, 5 days, 2 hours and 13 minutes ago.**  I wanted to find out how they did that and my first reaction was.. yay easy hello timespan.

Turns out that timespan only goes up to days, no months or anything.  A bit deeper hidden for a c# programmer there is the function datediff in vb.net  But that function doesn't handle years properly for example the difference between today 01/01/2007 15:15 and 31/12/2007 18:00 gives a difference of 1 year instead of 1 day. So I decided to write my own class for it, turns out that the solution is quite simple.

To use the class below one would do :  
_NBlogr.Common.TimeSpan ts = new NBlogr.Common.TimeSpan(someStartDate, someEndDate);  
string humantime = ts.ToString() + " ago";_

 The class :

/*

 * Created by: Ivan Porto Carrero

 * Created: Thursday, 12 April 2007

 */

 

using System;

using System.IO;

using System.Text;

 

namespace NBlogr.Common

{

    public class TimeSpan

    {

        private DateTime startDate;

        private DateTime endDate;

        private int startDay;

        private int endDay;

        private int startMonth;

        private int endMonth;

        private int startYear;

        private int endYear;

        private int startHour;

        private int endHour;

        private int startMinute;

        private int endMinute;

        private int startSecond;

        private int endSecond;

        private int diffMonth;

        private int diffDays;

        private int diffHours;

        private int diffMinutes;

        private int diffYear;

        private int diffSeconds;

        private bool hasCalculated;

 

        public TimeSpan()

        {

            hasCalculated = false;

        }

 

        public TimeSpan(DateTime startDate, DateTime endDate)

        {

            StartDate = startDate;

            EndDate = endDate;

        }

 

        private void initialize()

        {

            startDay = StartDate.Day;

            endDay = EndDate.Day;

            startMonth = StartDate.Month;

            endMonth = EndDate.Month;

            startYear = StartDate.Year;

            endYear = EndDate.Year;

            startHour = StartDate.Hour;

            endHour = EndDate.Hour;

            startMinute = StartDate.Minute;

            endMinute = EndDate.Minute;

            startSecond = StartDate.Second;

            endSecond = EndDate.Second;

        }

 

        public override string ToString()

        {

            StringBuilder sb = new StringBuilder();

 

            if (Years > 0)

                sb.Append(pluralise("year", Years));

            if (Months > 0 && Years > 0)

                sb.Append(", ");

            if (Months > 0)

                sb.Append(pluralise("month", Months));

            if ((Months > 0 || Years > 0) && Days > 0)

                sb.Append(", ");

            if (Days > 0)

                sb.Append(pluralise("day", Days));

            if ((Months > 0 || Years > 0 || Days > 0) && Hours > 0)

                sb.Append(", ");

            if (Hours > 0)

                sb.Append(pluralise("hour", Hours));

            if ((Months > 0 || Years > 0 || Days > 0 || Hours > 0) && Minutes > 0)

                sb.Append(", ");

            if (Minutes > 0)

                sb.Append(pluralise("minute", Minutes));

            if ((Months > 0 || Years > 0 || Days > 0 || Hours > 0 || Minutes > 0) && Seconds > 0)

                sb.Append(", ");

            if (Seconds > 0)

                sb.Append(pluralise("second", Seconds));

 

            return sb.ToString();

        }

 

        private void calculate()

        {

            initialize();

 

            diffYear = endYear - startYear;

            calculateMonths();

            calculateDays();

            calculateHours();

            calculateMinutes();

            calculateSeconds();

 

            hasCalculated = true;

        }

 

        private static string pluralise(string singular, int quantity)

        {

 

            return quantity != 1 ? string.Format("{0} {1}", quantity, singular + "s") : string.Format("{0} {1}", quantity, singular);

        }

 

        private void calculateMonths()

        {

            if (endMonth >= startMonth)

                diffMonth = endMonth - startMonth;

            else

            {

                diffYear--;

                diffMonth = (12 - startMonth) + endMonth;

            }

        }

 

        private void calculateDays()

        {

            if (endDay >= startDay)

                diffDays = endDay - startDay;

            else

            {

                diffMonth--;

                diffDays = (DateTime.DaysInMonth(startYear, startMonth) - startDay) + endDay;

            }

        }

 

        private void calculateHours()

        {

            if (endHour >= startHour)

                diffHours = endHour - startHour;

            else

            {

                diffDays--;

                diffHours = (24 - startHour) + endHour;

            }

        }

 

        private void calculateMinutes()

        {

            if (endMinute >= startMinute)

                diffMinutes = endMinute - startMinute;

            else

            {

                diffHours--;

                diffMinutes = 60 - startMinute + endMinute;

            }

        }

 

        private void calculateSeconds()

        {

            if (endSecond >= startSecond)

                diffSeconds = endSecond - startSecond;

            else

            {

                diffMinutes--;

                diffSeconds = 60 - startSecond + endSecond;

            } 

        }

 

        public int Months

        {

            get

            {

                if (!hasCalculated)

                    calculate();

                return diffMonth;

            }

            set { diffMonth = value; }

        }

 

        public int Days

        {

            get

            {

                if (!hasCalculated)

                    calculate(); 

                return diffDays;

            }

            set { diffDays = value; }

        }

 

        public int Hours

        {

            get

            {

                if (!hasCalculated)

                    calculate();

                return diffHours;

            }

            set { diffHours = value; }

        }

 

        public int Minutes

        {

            get

            {

                if (!hasCalculated)

                    calculate();

                return diffMinutes;

            }

            set { diffMinutes = value; }

        }

 

        public int Years

        {

            get

            {

                if(!hasCalculated)

                    calculate();

                return diffYear;

            }

            set { diffYear = value; }

        }

 

        public DateTime StartDate

        {

            get

            {

                if (startDate == null)

                    throw new InvalidDataException("You need to specify a start date");

                return startDate;

            }

            set

            {

                hasCalculated = false;

                startDate = value;

            }

        }

 

        public DateTime EndDate

        {

            get

            {

                if (endDate == null)

                    throw new InvalidDataException("You need to specify a end date");

                return endDate;

            }

            set

            {

                hasCalculated = false;

                endDate = value;

            }

        }

 

        public int Seconds

        {

            get { return diffSeconds; }

            set { diffSeconds = value; }

        }

    }

}
