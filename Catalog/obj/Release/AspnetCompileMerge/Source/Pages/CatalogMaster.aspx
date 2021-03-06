﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="CatalogMaster.aspx.cs" Inherits="Catalog.Pages.CatalogueMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .filters .dropdown-menu > li > a {
            display: block;
            padding: 2px 15px;
            clear: both;
            font-weight: 400;
            line-height: 1.5;
            color: #000000;
            white-space: nowrap;
        }

        .handcursor {
            cursor: pointer;
            cursor: hand;
        }
    </style>
    <link href="../css/bootstrap-datepicker3.css" rel="stylesheet" />
    <link href="../css/jquery-ui.min.css" rel="stylesheet" />
    <link href="../css/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <link href="../css/ajaxloader.css" rel="stylesheet" />
    <link href="../css/bootstrap-select.css" rel="stylesheet" />
    <script src="../scripts/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.bootstrap4.min.js"></script>
    <script src="../scripts/AjaxFileupload.js"></script>
    <script src="../scripts/popper.min.js"></script>
    <script src="../scripts/bootstrap-select.min.js"></script>
    <script src="../scripts/bootstrap-datepicker.min.js"></script>
    <script src="../scripts/jquery-ui.min.js"></script>
    <script src="../scripts/app/catalogmaster.js?v=2"></script>
    <div id="loader"></div>
    <div class="col-lg-12" id="mainlistingdiv">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-2">
                    <h2>Catalog</h2>
                </div>
                <div class="col-10">
                    <input type="text" name="SEARCH" id="txtSearch" class="form-control" placeholder="Search by Description.." style="width: 35%; display: inline; margin-right: 10px;" />
                    <select name="cmbRows" id="cmbRows" class="form-control" style="width: 110px; display: inline; margin-right: 10px;">
                        <option value="20">Last 20</option>
                        <option value="50">Last 50</option>
                        <option value="100">Last 100</option>
                        <option value="0">All Items</option>
                    </select>
                    <button type="button" id="btnSearch" class="btn btn-success" style="display: inline; margin-right: 10px; margin-top: -5px">Search</button>
                    <button type="button" id="btnAdvanced" class="btn btn-primary" style="display: inline; margin-top: -5px; margin-right: 10px" data-toggle="collapse" data-target="#democollapseBtn" aria-expanded="false" aria-controls="democollapseBtn">More Filters</button>
                    <button type="button" id="btnClearfilter" class="btn btn-danger" style="display: inline; margin-top: -5px; margin-right: 10px">Reset Filters</button>
                    <button type="button" id="btnAddNew" class="btn btn-success addNewButton" style="position: relative; float: right;">Add New</button>
                </div>
            </div>

            <div class="collapse" id="democollapseBtn" style="margin-top: 10px; margin-bottom: 10px">
                <div class="card card-body">
                    <div class="row">

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>SKU</label>
                            <input type="text" id="txtSku" class="form-control" placeholder="Search by SKU" />
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Code</label>
                            <input type="text" id="txtCode" class="form-control" placeholder="Search by Code" />
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Jewellery</label>
                            <select id="cmbJewellery" multiple data-live-search="true" class="filters">
                            </select>
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Design</label>
                            <select id="cmbDesign" multiple data-live-search="true" class="filters">
                            </select>
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Collection</label>
                            <select id="cmbCollection" multiple data-live-search="true" class="filters">
                            </select>
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Material</label>
                            <select id="cmbMaterial" multiple data-live-search="true" class="filters">
                            </select>
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Occasion</label>
                            <select id="cmbOccasion" multiple data-live-search="true" class="filters">
                            </select>
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Gram Slab</label>
                            <select id="CmbGramSlab" multiple data-live-search="true" class="filters">
                            </select>
                        </div>

                        <div class="col-6 col-md-4 col-lg-4">
                            <label>Karat</label>
                            <select id="cmbKarat" multiple data-live-search="true" class="filters">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!-- /.panel-heading -->
        <div class="panel-body" id="maindiv">
            <div class="table-responsive" id="griddiv">
                <table id="tablemain" class="table table-striped table-bordered" style="width: 100%">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Jewellery</th>
                            <th>Design</th>
                            <th>Collection</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- For Detailed View Popup  -->
    <div class="col-lg-12" id="mainldetaildiv" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12" id="subheaderdiv">
                    <h2 style='color: blue'>Edit Ledger Details</h2>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-6">
                    <label>Title / Description</label>
                    <input type="text" name="TITLE" id="TITLE1" class="form-control" placeholder="Please enter Description" />
                </div>
                <div class="form-group col-3">
                    <label>Code</label>
                    <input type="text" name="CODE" id="CODE1" class="form-control" placeholder="Please enter Code" />
                </div>
                <div class="form-group col-3">
                    <label>Jewellery</label>
                    <select name="JEWELLERY_NAME" id="JEWELLERY_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-3">
                    <label>Design</label>
                    <select name="DESIGN_NAME" id="DESIGN_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
                <div class="form-group col-3">
                    <label>Collection</label>
                    <select name="COLLECTIONS_NAME" id="COLLECTIONS_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
                <div class="form-group col-3">
                    <label>Material</label>
                    <select name="MATERIAL_NAME" id="MATERIAL_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
                <div class="form-group col-3">
                    <label>Occasion</label>
                    <select name="OCCASION_NAME" id="OCCASION_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-3">
                    <label>Gram</label>
                    <select name="GRAMSLAB_NAME" id="GRAMSLAB_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
                <div class="form-group col-3">
                    <label>Karat</label>
                    <select name="KARAT_NAME" id="KARAT_NAME1" class="form-control">
                        <option></option>
                    </select>
                </div>
                <div class="form-group col-6">
                    <label>Remarks</label>
                    <input type="checkbox" name="ACTIVE_STATUS" id="ACTIVE_STATUS1" value="Active Status" style="margin-left: 10px; margin-right: 5px; vertical-align: middle;" />
                    <label>Active</label>
                    <input type="checkbox" name="SHOW_CATALOG" id="SHOW_CATALOG1" value="Show in Catalog" style="margin-left: 10px; margin-right: 5px; vertical-align: middle;" />
                    <label>Catalog</label>
                    <input type="checkbox" name="SHOW_TRENDING" id="SHOW_TRENDING1" value="Show in Trending" style="margin-left: 10px; margin-right: 5px; vertical-align: middle;" />
                    <label>Trending</label>
                    <input type="text" name="REMARKS" id="REMARKS1" class="form-control" placeholder="Please enter Reamrks" />
                </div>
            </div>

            <div class="row">
                <div class="form-group col-3">
                    <label>Purity</label>
                    <input type="text" name="PURITY" id="PURITY1" class="form-control" placeholder="Purity %" style="text-align: right" />
                </div>
                <div class="form-group col-3">
                    <label>Gross WT (Gm)</label>
                    <input type="number" name="GR_WT" id="GR_WT1" class="form-control" onchange="CalcAmt()" style="text-align: right" />
                </div>
                <div class="form-group col-3">
                    <label>Stone WT (Gm)</label>
                    <input type="number" name="ST_WT" id="ST_WT1" class="form-control" onchange="CalcAmt()" style="text-align: right" />
                </div>
                <div class="form-group col-3">
                    <label>Net WT (Gm)</label>
                    <input type="number" name="NET_WT" id="NET_WT1" class="form-control" readonly="true" style="text-align: right" />
                </div>
            </div>

            <div class="row">
                <div class="form-group col-3">
                    <label>Stone Amt (Rs)</label>
                    <input type="number" name="ST_AMT" id="ST_AMT1" class="form-control" style="text-align: right" />
                </div>
                <div class="form-group col-3">
                    <label>Diamond Carat</label>
                    <input type="number" name="DIA_CARAT" id="DIA_CARAT1" class="form-control" style="text-align: right" />
                </div>
                <div class="form-group col-3">
                    <label>S(%)</label>
                    <input type="number" name="S_PER" id="S_PER1" class="form-control" style="text-align: right" />
                </div>
                <div class="form-group col-3">
                    <label>YM</label>
                    <input class="form-control datepicker" id="DATE_YM1" name="date" placeholder="DD-MM-YYYY" type="text" style="text-align: center" />
                </div>
            </div>

            <div class="row">
                <div class="form-group col-6">
                    <label>Vendor</label>
                    <asp:TextBox ID="LED_NAME1" class="form-control" runat="server" placeholder="Please enter Vendor name" />
                    <asp:HiddenField ID="LED_ID" runat="server" />
                </div>                
            </div>

            <div class="row">                
                <div class="col-12" style="text-align: right">
                     <label style="margin-left: 10px">SKU</label>
                    <label id="SKU1" style="color: brown; margin-left: 5px; margin-right: 20px; font-weight: 500">SKU</label>
                    <label>Stock</label>
                    <label id="STK_QTY1" style="color: red; margin-left: 5px; margin-right: 20px; font-weight: 500">0</label>
                    <button type="button" id="btnSave" class="btn btn-primary" style="margin-right: 15px">Save Data</button>
                    <button type="button" id="btnUpdate" class="btn btn-primary" edit-id="" style="margin-right: 15px">Update Data</button>
                    <button type="button" class="btn btn-danger cancelButton">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- For Modal Popup  -->


    <!-- For Modal Popup Screen Authorizations Details -->
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="PopupModalUpload">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Catalog Images Upload Area</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="panel-body">
                        <div class="table-responsive" id="griddivupload">
                            <table id="tableupload" class="table table-striped table-bordered" style="width: 100%">
                                <thead>
                                    <tr>
                                        <th>Image File</th>
                                        <th>Thumbnail</th>
                                        <th>Delete</th>
                                        <th>View</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row" id="divimgpreview" style="display: none;">
                    <div class="form-group col-12">
                        <button type="button" id="btnCloseImgPreview" class="btn btn-danger btn-sm" style="margin-left: 15px">Close Preview</button>
                    </div>
                    <div class="form-group col-12">
                        <img id="imgpreview" src="../images/static/preview.png" style="height: 300px; width: 300px; margin-left: 15px" />
                    </div>
                </div>
                <div style="float: left; padding-left: 10px">
                    <span style="padding-left: 10px">
                        <%--Progress bar--%>
                        <img id="loading" src="../images/static/loading.gif" style="display: none;"></span>
                </div>
                <div class="modal-footer">
                    <asp:FileUpload ID="fileToUpload" runat="server" ClientIDMode="Static" />
                    <button type="button" id="btnUploadImage" class="btn btn-primary" edit-id="">Upload Image</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- For Modal Popup  -->


    <!-- For Print Popup  -->
    <div class="col-lg-12" id="printdiv" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style='color: blue; display: inline'>Item Ledger Statement</h2>
                </div>
            </div>
            <div style="height: 15px">
            </div>
            <div class="row">
                <div class="col-12">
                    <label style="display: inline; margin-right: 5px">Filter : </label>
                    <label id="lblfilter" style="display: inline; margin-right: 5px; color: brown"></label>
                </div>
            </div>
            <div style="height: 15px">
            </div>
            <div id="divgridprint">
                <table id="tableprint" style="width: 100%; border-collapse: collapse;">
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup  -->

</asp:Content>
