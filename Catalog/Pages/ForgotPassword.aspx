<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs" Inherits="Catalog.Pages.ForgotPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Forgot Password</title>

    <style>
        

        .form-signin {
            max-width: 420px;
            padding: 30px 38px;
            margin: 0 auto;
            margin-top: 40px;
            /*background-color: #eee;*/
            border: 3px dotted rgba(0,0,0,0.1);
        }

        .form-control {
            position: relative;
            font-size: 16px;
            height: auto;
            padding: 10px;
        }      
    </style>


    <link href="../css/bootstrap4.3.min.css" rel="stylesheet" />
    <link href="../css/forgotpassword.css" rel="stylesheet" />
    <script src="../scripts/jquery-3.0.0.min.js"></script>
    <script src="../scripts/bootstrap.4.3.1.min.js"></script>
</head>
<body>
    <div class="container">
    <form id="form1" runat="server" class="form-signin">
       
         
            <div class="row" >
                <div class="col-12">
                    <h2>Forgot Password</h2>
                </div>
                <div class="col-12">
                </div>
            </div>

            <div class="row" style="margin-bottom: 10px">
                <div class="col-12">
                    <label>Please enter Email address</label>
                    <input type="email" name="email" class="form-control"/>
                </div>
            </div>
            
            <div class="row" style="margin-bottom: 10px">
                <div class="col-12">                    
                    <button class="btn btn-primary" id="password_modal_save" style="width:100%">Retrive Password</button>                  
                </div>
            </div>
            <div class="row">
                <div class="col-12">                                        
                    <asp:HyperLink ID="linkCatalog" NavigateUrl="Home.aspx" CssClass="text-primary btn-link" runat="server">Return to Catalogue</asp:HyperLink>&nbsp&nbsp
                    <asp:HyperLink ID="linkLogin" NavigateUrl="ForgotPassword.aspx" CssClass="text-primary btn-link" runat="server" style="border-left: 2px solid blue;padding-left:10px">Return to Login Page</asp:HyperLink>                
                </div>
            </div>
        
   
    </form>
        </div>
</body>
</html>
