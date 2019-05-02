using Catalog.DAO;
using Catalog.Generic;
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
    public partial class ForgotPassword : System.Web.UI.Page
    {        
        protected void Page_Load(object sender, EventArgs e)
        {           
            if (!this.IsPostBack)
            {
                
            }
        }

        [WebMethod]
        public static DbStatusEntity[] ForgotPasword(ForgotPasswordEntity email)
        {
            var details = new List<DbStatusEntity>();
            SendEmail objsendemail = new SendEmail();
            try
            {
                DbStatusEntity objret = new ForgotPasswordDAO().GetFogotPassword(email.EMAIL);
                if (objret.RESULT == 1)
                {
                    string password = CryptographyHelper.Instance.Decrypt(objret.MSG);
                    string strsubject = "Password retrival from Jewellery Catalog website.";
                    string strbody = "Hi,<br><br>Your Email : <b>" + email.EMAIL + "</b><br>Your passowrd : <b>" + password + "</b><br><br>Team Jewellery Catalog";
                    if (objsendemail.SendMail(email.EMAIL, strsubject, strbody) == false)
                    {
                        objret.RESULT = 0;
                        objret.MSG = "Mail sending failue";
                    }
                    else
                    {
                        objret.MSG = "Login details email sent to " + email.EMAIL;
                    }
                }
                details.Add(objret);
            }
            catch (Exception ex)
            {
                details.Add(new DbStatusEntity(ex.Message));
            }
            return details.ToArray();
        }
    }
}