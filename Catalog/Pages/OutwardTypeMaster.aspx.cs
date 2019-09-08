using Catalog.DAO;
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
    public partial class OutwardTypeMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static OutwardTypeMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<OutwardTypeMasterEntity>();
            try
            {
                details = new OutwardTypeMasterDAO().GetOutwardTypeMasterList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static OutwardTypeMasterEntity[] EditData(int id)
        {
            var details = new List<OutwardTypeMasterEntity>();
            try
            {
                details = new OutwardTypeMasterDAO().EditOutwardType(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(OutwardTypeMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new OutwardTypeMasterDAO().UpdateOutwardType(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(OutwardTypeMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new OutwardTypeMasterDAO().InsertOutwardTypeMaster(obj));
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
                details.Add(new OutwardTypeMasterDAO().DeleteOutwardType(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}