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
    public partial class UserDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        [WebMethod]
        public static string[] GetCurrentDate()
        {
            List<string> lstvalues = new List<string>();
            try
            {
                lstvalues = new GenericDAO().GetCurrentDate();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return lstvalues.ToArray();
        }

        [WebMethod]
        public static StockEntryEntity[] GetSTKData(StockEntryDateFilterEntity obj)
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
        public static InwardEntryEntity[] GetINData(InwardEntryDateFilterEntity obj)
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
        public static OutwardEntryEntity[] GetOutData(OutwardEntryDateFilterEntity obj)
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
        public static OutwardRegisterResultEntity[] GetPendingOutwardRegisterData(OutwardRegisterParamEntity obj)
        {
            List<OutwardRegisterResultEntity> details = new List<OutwardRegisterResultEntity>();
            try
            {
                details = new OutwardEntryDAO().GetOutwardRegister(obj);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static StockEntryEditParam[] EditDataSTK(Int64 id)
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
        public static InwardEntryEditParam[] EditDataIN(Int64 id)
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
        public static OutwardEntryEditParam[] EditDataOUT(Int64 id)
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

    }
}
