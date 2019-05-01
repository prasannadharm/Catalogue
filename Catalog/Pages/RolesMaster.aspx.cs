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
    public partial class RolesMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static RoleMasterEntitycs[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<RoleMasterEntitycs>();
            try
            {
                details = new RolesMasterDAO().GetRolesList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }


        [WebMethod]
        public static RoleMasterEntitycs[] EditData(int id)
        {
            var details = new List<RoleMasterEntitycs>();
            try
            {
                details = new RolesMasterDAO().EditRoles(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateData(RoleMasterEntitycs obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new RolesMasterDAO().UpdateRoles(obj, id));
            }
            catch (Exception ex)
            {
                details.Clear();
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();

        }

        [WebMethod]
        public static DbStatusEntity[] InsertData(RoleMasterEntitycs obj)
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new RolesMasterDAO().InsertRoles(obj));
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
                details.Add(new RolesMasterDAO().DeleteRoles(id));
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