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
        public static BannerImageEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<BannerImageEntity>();
            try
            {
                details = new BannerMasterDAO().GetBannerList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static BannerImageEntity[] EditData(int id)
        {
            var details = new List<BannerImageEntity>();
            try
            {
                details = new BannerMasterDAO().EditBanner(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(BannerImageEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new BannerMasterDAO().UpdateBanner(obj, id));
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