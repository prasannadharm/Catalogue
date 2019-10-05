﻿using Catalog.DAO;
using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Catalog.Pages
{
    public partial class InwardTypeMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static InwardTypeMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<InwardTypeMasterEntity>();
            try
            {
                details = new InwardTypeMasterDAO().GetInwardTypeMasterList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static InwardTypeMasterEntity[] EditData(int id)
        {
            var details = new List<InwardTypeMasterEntity>();
            try
            {
                details = new InwardTypeMasterDAO().EditInwardType(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(InwardTypeMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new InwardTypeMasterDAO().UpdateInwardType(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(InwardTypeMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new InwardTypeMasterDAO().InsertInwardTypeMaster(obj));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] DeleteData(int id)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new InwardTypeMasterDAO().DeleteInwardType(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static UserRightsEntity[] GetUserRights(Int64 id)
        {
            var details = new List<UserRightsEntity>();
            try
            {
                details = new GenericDAO().GetUserRights(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}