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
    public partial class home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static BannerImageEntity[] GetBannerData() //Show the details of the data after insert in HTML Table
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
        public static TrendingEntity[] GetTrendingData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<TrendingEntity>();
            try
            {
                details = new HomeDAO().GetTrendingList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}