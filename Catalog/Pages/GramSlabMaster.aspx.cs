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
    public partial class GramSlabMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static GramSlabMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<GramSlabMasterEntity>();
            try
            {
                details = new GramSlabMasterDAO().GetGramSlabList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static GramSlabMasterEntity[] EditData(int id)
        {
            var details = new List<GramSlabMasterEntity>();
            try
            {
                details = new GramSlabMasterDAO().EditGramSlab(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(GramSlabMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new GramSlabMasterDAO().UpdateGramSlab(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(GramSlabMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new GramSlabMasterDAO().InsertGramSlab(obj));
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
                details.Add(new GramSlabMasterDAO().DeleteGramSlab(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static UserRightsEntity[] GetUserRights()
        {
            var details = new List<UserRightsEntity>();
            try
            {
                details = new GenericDAO().GetUserRights(Convert.ToInt64(HttpContext.Current.Session["USER_ID"]));
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}