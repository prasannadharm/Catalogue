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
    public partial class LedgerTypeMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static LedgerTypeMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<LedgerTypeMasterEntity>();
            try
            {
                details = new LedgerTypeMasterDAO().GetLedgerTypeMasterList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static LedgerTypeMasterEntity[] EditData(int id)
        {
            var details = new List<LedgerTypeMasterEntity>();
            try
            {
                details = new LedgerTypeMasterDAO().EditLedgerType(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(LedgerTypeMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new LedgerTypeMasterDAO().UpdateLedgerType(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(LedgerTypeMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new LedgerTypeMasterDAO().InsertLedgerTypeMaster(obj));
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
                details.Add(new LedgerTypeMasterDAO().DeleteLedgerType(id));
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