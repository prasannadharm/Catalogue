<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Search.aspx.cs" Inherits="Catalog.Pages.Search" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Search Catalog</title>
    <link rel="shortcut icon" href="../images/static/favicon.ico" type="image/x-icon" />
    <link href="../css/bootstrap4.3.min.css" rel="stylesheet" />
    <link href="../css/baguetteBox.min.css" rel="stylesheet" />
    <link href="../css/bootstrap-select.css" rel="stylesheet" />
    <link href="../css/cards-gallery.css" rel="stylesheet" />
    <link href="../css/ajaxloader.css" rel="stylesheet" />
    <script src="../scripts/jquery-3.0.0.min.js"></script>
    <script src="../scripts/popper.min.js"></script>
    <script src="../scripts/bootstrap4.1.1.bundle.min.js"></script>
    <script src="../scripts/bootstrap-select.min.js"></script>
    <script src="../scripts/baguetteBox.min.js"></script>
    <script src="../scripts/app/search.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="loader"></div>
        <div class="container">
            <asp:HiddenField ID="hdnsearch" runat="server" Value="" />
            <div class="align-items-center my-3 rounded shadow-sm">
                <nav class="navbar navbar-expand-lg navbar-light my-3 rounded shadow-sm" style="background-color: #232f3e;">
                    <a class="navbar-brand mb-0 h1" href="Home.aspx" style="color: #ffd500;">Search Jewellery Catalog</a>
                </nav>
            </div>

            <div id="searchdiv" class="align-items-center p-3 my-3 rounded shadow-sm">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-12">
                        <input type="text" name="SEARCH" id="txtSearch" class="form-control" placeholder="Search.." style="width: 50%; display: inline; margin-right: 10px;" />
                        <button type="button" id="btnSearch" class="btn btn-success" style="display: inline; margin-right: 10px; margin-top: -5px">Search</button>
                        <button type="button" id="btnAdvanced" class="btn btn-primary" style="display: inline; margin-top: -5px" data-toggle="collapse" data-target="#democollapseBtn" aria-expanded="false" aria-controls="democollapseBtn">Advanced</button>
                    </div>
                </div>

                <div class="collapse" id="democollapseBtn" style="margin-top: 10px">
                    <div class="card card-body">
                        <div class="row">

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>SKU</label>
                                <input type="text" id="txtSku" class="form-control" placeholder="Search by SKU" />
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Code</label>
                                <input type="text" id="txtCode" class="form-control" placeholder="Search by Code" />
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Jewellery</label>
                                <select id="cmbJewellery" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Design</label>
                                <select id="cmbDesign" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Collection</label>
                                <select id="cmbCollection" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Material</label>
                                <select id="cmbMaterial" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Occasion</label>
                                <select id="cmbOccasion" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Gram Slab</label>
                                <select id="CmbGramSlab" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>Karat</label>
                                <select id="cmbKarat" multiple data-live-search="true">
                                </select>
                            </div>

                            <div class="col-6 col-md-4 col-lg-3">
                                <label>In Stock</label>
                                <select id="CmbStock" class="selectpicker form-control" multiple data-live-search="true">
                                    <option value="1">Show All</option>
                                    <option value="0">Exclude Out of Stock</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="maindiv" class="align-items-center p-3 my-3 rounded shadow-sm">
                <section class="gallery-block cards-gallery">
                    <div class="row" id="divsearch">
                    </div>
                </section>
            </div>



            <div class="align-items-center p-3 my-3 rounded shadow-sm" style="background-color: #232f3e; color: #ffd500; text-align: center; align-content: center">
                © Copyright 2019 Jewellery Catalog. All Rights Reserved.        
            </div>

        </div>

    </form>
</body>
</html>
