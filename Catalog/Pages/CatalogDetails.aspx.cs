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
    public partial class CatalogDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["id"] != null)
            {                
                ((HiddenField)this.FindControl("hdnid")).Value = Request.QueryString["id"].ToString();
            }
            else
            {
                ((HiddenField)this.FindControl("hdnid")).Value = "0";
            }
        }

        [WebMethod]
        public static CatalogImageEntity[] GetImagesData(long id) //Show the details of the data after insert in HTML Table
        {
            var details = new List<CatalogImageEntity>();
            try
            {
                details = new CatalogDetailsDAO().GetCalatogImages(id);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static CatalogDetailsEntity[] GetContentData(long id) //Show the details of the data after insert in HTML Table
        {
            var details = new List<CatalogDetailsEntity>();
            try
            {
                details = new CatalogDetailsDAO().GetCalatogDetails(id);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}