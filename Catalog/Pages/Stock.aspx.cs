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
    public partial class Stock : System.Web.UI.Page
    {
        static Int64 userid = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            userid = Convert.ToInt64(Session["USER_ID"]);
        }

        [WebMethod]
        public static StockEntryEntity[] GetData(DateFilterEntity obj)
        {
            var details = new List<StockEntryEntity>();
            try
            {
                details = new StockEntryDAO().GetStockEntryList(obj);
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
                lstvalues = new StockEntryDAO().GetLatestTrasnsactionNumber("STOCK");
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
        public static DbStatusEntity[] InsertData(StockEntryInsertParam1 obj1, StockEntryInsertParam2[] obj2)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new StockEntryDAO().InsertStockEntry(obj1, obj2, userid));
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
                details.Add(new StockEntryDAO().DeleteStockEntry(id));
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
                details.Add(new StockEntryDAO().VoidStockEntry(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static StockEntryEditParam[] EditData(Int64 id)
        {
            var details = new List<StockEntryEditParam>();
            try
            {
                details = new StockEntryDAO().EditStockEnrty(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static Int64[] CheckVoidStockEnrty(Int64 id)
        {
            List<Int64> lstvalues = new List<Int64>();
            try
            {
                lstvalues = new StockEntryDAO().CheckVoidStockEnrty(id);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return lstvalues.ToArray();
        }


        [WebMethod]
        public static DbStatusEntity[] UpdatetData(StockEntryInsertParam1 obj1, StockEntryInsertParam2[] obj2, Int64 id)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new StockEntryDAO().UpdateStockEntry(obj1, obj2, userid, id));
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