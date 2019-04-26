using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using Catalog.Models;
using Catalog.DAO;
using System.Web.Script.Services;

namespace Catalog.Pages
{
    public partial class JewelleryMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

            }
        }

        [WebMethod]
        public static JewelleryEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<JewelleryEntity>();
            details = new JewelleryDAO().GetJewelleyList();
            return details.ToArray();
        }


        [WebMethod]
        public static JewelleryEntity[] EditData(int id)
        {
            var details = new List<JewelleryEntity>();
            details = new JewelleryDAO().EditJewelley(id);
            return details.ToArray();
        }

        [WebMethod]
        public static void UpdateData(JewelleryEntity obj, int id) //Update data in database  
        {
            new JewelleryDAO().UpdateJewelley(obj, id);
        }

        [WebMethod]
        public static void InsertData(JewelleryEntity obj)
        {
            new JewelleryDAO().InsertJewelley(obj);
        }

        [WebMethod]
        public static void DeleteData(int id)
        {
            new JewelleryDAO().DeleteJewelley(id);
        }
    }
}