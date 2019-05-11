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
    public partial class CatalogueMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static CatalogMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<CatalogMasterEntity>();
            try
            {
                details = new CatalogMasterDAO().GetCatalogList();
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

        [WebMethod]
        public static CatalogMasterEntity[] EditData(int id)
        {
            var details = new List<CatalogMasterEntity>();
            try
            {
                details = new CatalogMasterDAO().EditCatalog(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(CatalogMasterEntity obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new CatalogMasterDAO().UpdateCatalog(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(CatalogMasterEntity obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new CatalogMasterDAO().InsertCatalog(obj));
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
                details.Add(new CatalogMasterDAO().DeleteCatalog(id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static CatalogImageEntity[] GetCatalogImagesData(long id) //Show the details of the data after insert in HTML Table
        {
            var details = new List<CatalogImageEntity>();
            try
            {
                details = new CatalogMasterDAO().GetCalatogImages(id);
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}