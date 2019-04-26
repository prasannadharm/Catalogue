using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Catalog.Models;
using Catalog.DAO;
using System.Web.Security;

namespace Catalog.Pages
{
    public partial class UserLogin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                Session.Abandon();
                Session.Clear();
                Session.RemoveAll();
                FormsAuthentication.SignOut();
                Session["MENU"] = null;
                Session["USER_ID"] = null;
                Session["USER_DETAILS"] = null;
            }
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            LoginEntity objlogin = new LoginEntity();
            objlogin.EMAIL = txtEmail.Text;
            objlogin.USER_PASSWORD = txtPassword.Text;
            objlogin = new LoginDAO().CheckLogin(objlogin);
            if (objlogin.RESULT == 1)
            {
                lblMessage.Text = objlogin.MESSAGE;
                Session["USER_ID"] = objlogin.USER_ID;
                Session["USER_DETAILS"] = objlogin;
                Response.Redirect("../Pages/UserDashboard.aspx");
            }
            else
            {
                Session["USER_ID"] = null;
                Session["USER_DETAILS"] = null;
                lblMessage.Text = objlogin.MESSAGE;
                txtPassword.Focus();
            }
        }
    }
}