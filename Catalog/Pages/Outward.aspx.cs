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
    public partial class Outward : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        [WebMethod]
        public static OutwardEntryEntity[] GetData(OutwardEntryDateFilterEntity obj)
        {
            var details = new List<OutwardEntryEntity>();
            try
            {
                details = new OutwardEntryDAO().GetOutwardEntryList(obj);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static string[] GetLedgersbyName(string str)
        {
            List<string> ledgers = new List<string>();
            try
            {
                ledgers = new GenericDAO().GetLedgersListbyName(str);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return ledgers.ToArray();
        }


        [WebMethod]
        public static string[] GetLatestTrasnsactionNumber()
        {
            List<string> lstvalues = new List<string>();
            try
            {
                lstvalues = new GenericDAO().GetLatestTrasnsactionNumber("OUTWARD");
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return lstvalues.ToArray();
        }


        [WebMethod]
        public static SearchCatalogByTextEntity[] SearchCatalogbyText(SearchCatalogByConditionEntity obj)
        {
            List<SearchCatalogByTextEntity> details = new List<SearchCatalogByTextEntity>();
            try
            {
                details = new GenericDAO().SearchCatalogbyText(obj);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static string[] VerifyLedgerbyName(string str)
        {
            List<string> ledgers = new List<string>();
            try
            {
                ledgers = new GenericDAO().GetLedgerbyName(str);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return ledgers.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(OutwardEntryInsertParam1 obj1, OutwardEntryInsertParam2[] obj2)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new OutwardEntryDAO().InsertOutwardEntry(obj1, obj2, Convert.ToInt64(HttpContext.Current.Session["USER_ID"])));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] DeleteData(long id)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new OutwardEntryDAO().DeleteOutwardEntry(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] VoidData(long id)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new OutwardEntryDAO().VoidOutwardEntry(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static OutwardEntryEditParam[] EditData(Int64 id)
        {
            var details = new List<OutwardEntryEditParam>();
            try
            {
                details = new OutwardEntryDAO().EditOutwardEnrty(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static Int64[] CheckVoidOutwardEnrty(Int64 id)
        {
            List<Int64> lstvalues = new List<Int64>();
            try
            {
                lstvalues = new OutwardEntryDAO().CheckVoidOutwardEnrty(id);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return lstvalues.ToArray();
        }
        
        [WebMethod]
        public static DbStatusEntity[] UpdatetData(OutwardEntryInsertParam1 obj1, OutwardEntryInsertParam2[] obj2, Int64 id)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new OutwardEntryDAO().UpdateOutwardEntry(obj1, obj2, Convert.ToInt64(HttpContext.Current.Session["USER_ID"]), id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static OutwardTypeMasterEntity[] GetActiveOutwardTypeList() 
        {
            var details = new List<OutwardTypeMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveOutwardTypeList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
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