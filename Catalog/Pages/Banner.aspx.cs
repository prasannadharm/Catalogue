using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Catalog.Models;
using Catalog.DAO;

namespace Catalog.Pages
{
    public partial class Banner : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static JewelleryMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<JewelleryMasterEntity>();
            try
            {
                details = new JewelleryMasterDAO().GetJewelleryList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static JewelleryMasterEntity[] EditData(int id)
        {
            var details = new List<JewelleryMasterEntity>();
            try
            {
                details = new JewelleryMasterDAO().EditJewellery(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(JewelleryMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new JewelleryMasterDAO().UpdateJewellery(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(JewelleryMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new JewelleryMasterDAO().InsertJewellery(obj));
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
                details.Add(new JewelleryMasterDAO().DeleteJewellery(id));
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