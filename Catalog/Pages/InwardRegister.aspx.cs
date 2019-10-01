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
    public partial class InwardRegister : System.Web.UI.Page
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
        public static string[] GetLedgersbyName(string str)
        {
            List<string> ledgers = new List<string>();
            try
            {
                ledgers = new GenericDAO().GetLedgersListbyName(str);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return ledgers.ToArray();
        }

        [WebMethod]
        public static InwardRegisterResultEntity[] GetInwardRegisterData(InwardRegisterParamEntity obj)
        {
            List<InwardRegisterResultEntity> details = new List<InwardRegisterResultEntity>();
            try
            {
                details = new InwardEntryDAO().GetInwardRegister(obj);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DropdownEntity[] GetDropdownLisData()
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

        [WebMethod]
        public static InwardTypeMasterEntity[] GetActiveInwardTypeList()
        {
            var details = new List<InwardTypeMasterEntity>();
            try
            {
                details = new GenericDAO().GetActiveInwardTypeList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}