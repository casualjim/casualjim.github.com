---
date: '2006-10-31 06:27:46'
layout: post
slug: castle-and-workflow-foundation
status: publish
title: Castle and workflow foundation
wordpress_id: '61'
categories:
- .NET 3.0
- Castle
---

Yesterday I had to implement workflow in an application.  I had never used it before, and kind of feared that it was going to take me a couple of days to get the hang of it.

Well 2 hours later I had my test workflow going so it isn't hard at all. If I can do it in that amount of time I'm sure many of you can beat me.

Now I wanted to host the workflow runtime in my container and this is how I went about it:

I made 2 wrapper properties in a settings class :

 

 public static class SeshatAppSettings

    {

        public static WorkflowRuntime WorkflowRuntime

        {

            get

            {

                return HttpContext.Current.Application["WorkflowRuntime"] as WorkflowRuntime;

            }

            set

            {

                HttpContext.Current.Application["WorkflowRuntime"] = value;

            }

        }

 

        public static ManualWorkflowSchedulerService WorkflowScheduler

        {

            get

            {

                return WorkflowRuntime.GetService(typeof(ManualWorkflowSchedulerService)) as ManualWorkflowSchedulerService;

            }

        }

 

 

    }

The next thing that comes to mind is, hey I need to start this when my application starts (start, app starts == IStartable). Because the workflow is hosted in asp.net we need a persistence medium. I chose to stay with the standard workflow foundation sql persistence service. And that implementation goes a bit like this :  
  


public class WorkflowHost : IStartable

    {

 

        #region IStartable Members

 

        ///

        /// Starts this instance.

        ///

        public void Start()

        {

            // Create an instance of the workflowRuntime

            WorkflowRuntime workflowRuntime = new WorkflowRuntime();

 

            // Add a manual scheduling service

            ManualWorkflowSchedulerService manualService = new ManualWorkflowSchedulerService();

            workflowRuntime.AddService(manualService);

 

            // Add our persistence

            AddPersistenceService(workflowRuntime);

 

            // Start the workflow runtime

            workflowRuntime.StartRuntime();

 

            // Store it in a place so that the whole application can get to it.

            SeshatAppSettings.WorkflowRuntime = workflowRuntime;  

        }

 

        ///

        /// Stops this instance.

        ///

        public void Stop()

        {

            WorkflowRuntime workflowRuntime = SeshatAppSettings.WorkflowRuntime;

            workflowRuntime.StopRuntime();

 

        }

 

        #endregion

 

 

        private void AddPersistenceService(WorkflowRuntime runtime)

        {

            // Create the SqlWorkflowPersistenceService.

            string connectionString = "Initial Catalog=WorkflowPersistenceStore;Data Source=localhost;Integrated Security=SSPI;";

            bool unloadOnIdle = true;

            TimeSpan instanceOwnershipDuration = TimeSpan.MaxValue;

            TimeSpan loadingInterval = new TimeSpan(0, 2, 0);

            SqlWorkflowPersistenceService persistService = new SqlWorkflowPersistenceService(connectionString, unloadOnIdle, instanceOwnershipDuration, loadingInterval);

 

            // Add the SqlWorkflowPersistenceService to the runtime engine.

            runtime.AddService( persistService );

 

        }

    }

The last bit we need to take care of is adding our startable component to the container which is pretty easy to do.

 

public class WorkflowFacility : AbstractFacility

    {

        protected override void Init()

        {

            Kernel.AddComponent("workflow.defaultHost", typeof(IStartable), typeof(WorkflowHost));

        }

    }

And the final piece is the configuration from the component

 

    

    <facility

          id="workflow.facility"

          type="Seshat.Common.WorkflowFacility, Seshat.Common"

    />

That's it :)
