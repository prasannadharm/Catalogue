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
    public partial class GeneralSettings : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static TransSeriesEntity [] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<TransSeriesEntity>();
            try
            {
                details = new GenericDAO().GetSeriesNoList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
        
        [WebMethod]
        public static DbStatusEntity[] UpdateData(string type, Int64 no) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new GenericDAO().UpdateSeriesNo(type, no));
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