<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CatalogDetails.aspx.cs" Inherits="Catalog.Pages.CatalogDetails" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Catalog Detail</title>
    <link rel="shortcut icon" href="../images/static/favicon.ico" type="image/x-icon"/>
    <link href="../css/catalogdetail.css" rel="stylesheet" />
    <link href="../css/bootstrap.min.css" rel="stylesheet" />

    <script src="../scripts/bootstrap.4.3.1.min.js"></script>
    <script src="../scripts/jquery-3.0.0.min.js"></script>
    <script src="../scripts/app/catalogdetail.js"></script>
    <link href="../css/ajaxloader.css" rel="stylesheet" />

    <link href="../css/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <script src="../scripts/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.bootstrap4.min.js"></script>

    <script src="../scripts/app/catalogdetialdata.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="loader"></div>
        <div class="container">
            <asp:HiddenField ID="hdnid" runat="server" value="-1"/>
            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    <nav class="navbar navbar-expand-lg navbar-light my-3 rounded shadow-sm" style="background-color: #232f3e;">
                        <a class="navbar-brand mb-0 h1" href="#" style="color: #ffd500;">Jewellery Details</a>
                    </nav>
                </div>
            </div>

            <div id="maindiv">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-12">
                        <div id="headerdiv" style="margin-bottom: 20px">
                            
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6 col-lg-6" style="margin-bottom: 20px">
                        <ul id="glasscase" class="gc-start">
                            <%--<li>
                                <img src="../images/static/image1.jpg" alt="Text" data-gc-caption="Your caption text" /></li>
                            <li>
                                <img src="../images/static/image2.jpg" alt="Text" /></li>      --%>                     
                        </ul>
                    </div>

                    <div class="col-12 col-md-6 col-lg-6">
                        <div class="table-responsive" id="griddiv">
                            <table id="tabledetails" class="table table-striped table-bordered" style="width: 100%">                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    <div class="align-items-center p-3 my-3 rounded shadow-sm" style="background-color: #232f3e; color: #ffd500; text-align: center; align-content: center">
                        © Copyright 2019 Jewellery Catalog. All Rights Reserved.        
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            $(document).ready(function () {
                //If your <ul> has the id "glasscase"
                //$('#glasscase').glassCase({ 'thumbsPosition': 'bottom', 'widthDisplay': 560 });
            });
    </script>
    </form>
</body>
</html>
