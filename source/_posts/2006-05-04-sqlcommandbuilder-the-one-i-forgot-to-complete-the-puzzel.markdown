---
date: '2006-05-04 18:53:53'
layout: post
slug: sqlcommandbuilder-the-one-i-forgot-to-complete-the-puzzel
status: publish
title: SqlCommandBuilder .. The one I forgot to complete the puzzel
wordpress_id: '130'
categories:
- .NET 2.0
---

Basically:.NET 2.0 is too cool :))) 




After exploring the smo classes the last part of the afternoon was about creating migrating the data. I hadn't used the ado api fully but remembered something about the commandbuilder. My conclusion : Worth taking a look at.




I do realise that it isn't the worlds prettiest sql that gets generated but it gets the job done.  And in the case of my 125 tables that i need to migrate FAST it will save me about 1-2 weeks of writing import procedures etc. Generic datatable updates by writing one sql select command.







   18  public void ImportData(DataTable dt)




   19         {




   20             System.Text.StringBuilder sb = new StringBuilder();




   21             using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))




   22             {




   23                 SqlCommand cmd = new SqlCommand(string.Format("Select * from {0}", dt.TableName),conn);




   24                 SqlDataAdapter da = new SqlDataAdapter(cmd);




   25                 SqlCommandBuilder builder = new SqlCommandBuilder(da);




   26                 //da.UpdateBatchSize = 15;




   27                 da.Update(dt);




   28 




   29             }




   30         }
