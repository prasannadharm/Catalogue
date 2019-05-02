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
        public static RoleMasterEntity[] GetData() //Show the details of the data after insert in HTML Table
        {
            var details = new List<RoleMasterEntity>();
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
        public static RoleMasterEntity[] EditData(int id)
        {
            var details = new List<RoleMasterEntity>();
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
        public static DbStatusEntity[] UpdateData(RoleMasterEntity obj, int id) //Update data in database  
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
        public static DbStatusEntity[] InsertData(RoleMasterEntity obj)
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


        [WebMethod]
        public static RoleBaseMenuEntity[] GetBaseMenuList() //Show the details of the data after insert in HTML Table
        {
            var details = new List<RoleBaseMenuEntity>();
            try
            {
                details = new RolesMasterDAO().GetBaseMenuList();
            }
            catch (Exception ex)
            {
                // details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static RoleSelectedMenuEntity[] EditAuthData(int id)
        {
            var details = new List<RoleSelectedMenuEntity>();
            try
            {
                details = new RolesMasterDAO().EditRolesAuthority(id);
            }
            catch (Exception ex)
            {
                //details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }

        [WebMethod]
        public static DbStatusEntity[] UpdateAuthData(RoleSelectedMenuEntity[] obj, int id) //Update data in database  
        {
            var details = new List<DbStatusEntity>();
            try
            {
                details.Add(new RolesMasterDAO().UpdateRolesMenu(obj.ToList(), id));
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