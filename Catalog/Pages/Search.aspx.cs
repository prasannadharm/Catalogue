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
    public partial class Search : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["search"] != null)
            {
                ((HiddenField)this.FindControl("hdnsearch")).Value = Request.QueryString["search"].ToString();
            }
            else
            {
                ((HiddenField)this.FindControl("hdnsearch")).Value = "";
            }
        }

        [WebMethod]
        public static SearchIetmEntity[] GetSearchData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<SearchIetmEntity>();
            try
            {
                details = new SearchItemDAO().GetSearchData();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static JewelleryMasterEntity[] GetActiveJewelleryList()
        {
            var details = new List<JewelleryMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveJewelleryList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DesignMasterEntity[] GetActiveDesignList()
        {
            var details = new List<DesignMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveDesignList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static CollectionsMasterEntity[] GetActiveCollectionsList()
        {
            var details = new List<CollectionsMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveCollectionsList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static MaterialMasterEntity[] GetActiveMaterialList()
        {
            var details = new List<MaterialMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveMaterialList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static OccasionMasterEntity[] GetActiveOccasionList()
        {
            var details = new List<OccasionMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveOccasionList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static GramSlabMasterEntity[] GetActiveGramSlabList()
        {
            var details = new List<GramSlabMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveGramSlabList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static KaratMasterEntity[] GetActiveKaratList()
        {
            var details = new List<KaratMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveKaratList();
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}