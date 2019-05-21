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
        public static DropdownEntity[] GetDropdownLisDatat()
        {
            var details = new List<DropdownEntity>();
            try
            {
                List<JewelleryMasterEntity> objlst = new List<JewelleryMasterEntity>();
                objlst = new GenericDAO().GetActiveJewelleryList();
                foreach (JewelleryMasterEntity obj in objlst)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "JEWELLERY";
                    details.Add(objnew);
                }
                List<DesignMasterEntity> objlstdesign = new List<DesignMasterEntity>();
                objlstdesign = new GenericDAO().GetActiveDesignList();
                foreach (DesignMasterEntity obj in objlstdesign)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "DESIGN";
                    details.Add(objnew);
                }
                List<CollectionsMasterEntity> objlstcol = new List<CollectionsMasterEntity>();
                objlstcol = new GenericDAO().GetActiveCollectionsList();
                foreach (CollectionsMasterEntity obj in objlstcol)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "COLLECTON";
                    details.Add(objnew);
                }

                List<MaterialMasterEntity> objlstmat = new List<MaterialMasterEntity>();
                objlstmat = new GenericDAO().GetActiveMaterialList();
                foreach (MaterialMasterEntity obj in objlstmat)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "MATERIAL";
                    details.Add(objnew);
                }

                List<OccasionMasterEntity> objlstosscat = new List<OccasionMasterEntity>();
                objlstosscat = new GenericDAO().GetActiveOccasionList();
                foreach (OccasionMasterEntity obj in objlstosscat)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "OCCASION";
                    details.Add(objnew);
                }

                List<GramSlabMasterEntity> objlstgs = new List<GramSlabMasterEntity>();
                objlstgs = new GenericDAO().GetActiveGramSlabList();
                foreach (GramSlabMasterEntity obj in objlstgs)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "GRAMSLAB";
                    details.Add(objnew);
                }

                List<KaratMasterEntity> objlstkarat = new List<KaratMasterEntity>();
                objlstkarat = new GenericDAO().GetActiveKaratList();
                foreach (KaratMasterEntity obj in objlstkarat)
                {
                    DropdownEntity objnew = new DropdownEntity();
                    objnew.NAME = obj.NAME;
                    objnew.ID = obj.ID;
                    objnew.TYPE = "KARAT";
                    details.Add(objnew);
                }
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

    }
}