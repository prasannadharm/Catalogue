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
    public partial class Inward : System.Web.UI.Page
    {
        static Int64 userid = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            userid = Convert.ToInt64(Session["USER_ID"]);
        }

        [WebMethod]
        public static InwardEntryEntity[] GetData(InwardEntryDateFilterEntity obj)
        {
            var details = new List<InwardEntryEntity>();
            try
            {
                details = new InwardEntryDAO().GetInwardEntryList(obj);
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
                lstvalues = new GenericDAO().GetLatestTrasnsactionNumber("INWARD");
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
        public static DbStatusEntity[] InsertData(InwardEntryInsertParam1 obj1, InwardEntryInsertParam2[] obj2)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new InwardEntryDAO().InsertInwardEntry(obj1, obj2, userid));
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
                details.Add(new InwardEntryDAO().DeleteInwardEntry(id));
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
                details.Add(new InwardEntryDAO().VoidInwardEntry(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static InwardEntryEditParam[] EditData(Int64 id)
        {
            var details = new List<InwardEntryEditParam>();
            try
            {
                details = new InwardEntryDAO().EditInwardEnrty(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static Int64[] CheckVoidInwardEnrty(Int64 id)
        {
            List<Int64> lstvalues = new List<Int64>();
            try
            {
                lstvalues = new InwardEntryDAO().CheckVoidInwardEnrty(id);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return lstvalues.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdatetData(InwardEntryInsertParam1 obj1, InwardEntryInsertParam2[] obj2, Int64 id)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new InwardEntryDAO().UpdateInwardEntry(obj1, obj2, userid, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static InwardTypeMasterEntity[] GetActiveInwardTypeList()
        {
            var details = new List<InwardTypeMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveInwardTypeList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}