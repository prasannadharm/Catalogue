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
    public partial class LedgerMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static LedgerMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<LedgerMasterEntity>();
            try
            {
                details = new LedgerMasterDAO().GetLedgerMasterList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static StateMasterEntity[] GetStates() //Show the details of the data after insert in HTML Table
        {
            var details = new List<StateMasterEntity>();
            try
            {
                details = new GenericDAO().GetStateList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static CityStateMasterEntity[] GetCityByState(string str) //Show the details of the data after insert in HTML Table
        {
            var details = new List<CityStateMasterEntity>();
            try
            {
                details = new GenericDAO().GetCityByState(str);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static LedgerTypeMasterEntity[] GetLedgerType() //Show the details of the data after insert in HTML Table
        {
            var details = new List<LedgerTypeMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveLedgerTypeList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static LedgerMasterEntity[] EditData(int id)
        {
            var details = new List<LedgerMasterEntity>();
            try
            {
                details = new LedgerMasterDAO().EditLedgerMaster(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(LedgerMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new LedgerMasterDAO().UpdateLedgerMaster(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(LedgerMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new LedgerMasterDAO().InsertLedgerMaster(obj));
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
                details.Add(new LedgerMasterDAO().DeleteLedgerMaster(id));
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