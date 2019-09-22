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
        protected void Page_Load(object sender, EventArgs e)
        {

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
                ledgers = new StockEntryDAO().GetLedgersbyName(str);
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
    }
}