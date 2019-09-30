<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="StockEntryRegister.aspx.cs" Inherits="Catalog.Pages.StockEntryRegister" %>

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
    <link href="../css/bootstrap-select.css" rel="stylesheet" />
    <link href="../css/bootstrap-datepicker3.css" rel="stylesheet" />
    <link href="../css/jquery-ui.min.css" rel="stylesheet" />
    <link href="../css/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <link href="../css/ajaxloader.css" rel="stylesheet" />
    <script src="../scripts/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.bootstrap4.min.js"></script>
    <script src="../scripts/AjaxFileupload.js"></script>
    <script src="../scripts/popper.min.js"></script>
    <script src="../scripts/bootstrap-datepicker.min.js"></script>
    <script src="../scripts/jquery-ui.min.js"></script>
    <script src="../scripts/bootstrap-select.min.js"></script>

    <script src="../scripts/app/stockentryregister.js"></script>
    <div id="loader"></div>
    <div class="col-lg-12" id="mainlistingdiv">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2>Stock Entry Register</h2>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Date From</label>
                            </td>
                            <td style="width: 75%">
                                <input class="form-control datepicker" id="dtpFrom" name="date" placeholder="DD-MM-YYYY" type="text" style="width: 140px; display: inline; text-align: center" />
                                <label class="control-label" style="display: inline">To</label>
                                <input class="form-control datepicker" id="dtpTo" name="date" placeholder="DD-MM-YYYY" type="text" style="width: 140px; display: inline; text-align: center" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 10px">
            </div>

            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Entry No</label>
                            </td>
                            <td style="width: 75%">
                                <input type="number" id="txt_From_No" class="form-control" style="text-align: center; width: 140px; display: inline;" />
                                <label class="control-label" style="display: inline">To</label>
                                <input type="number" id="txt_To_No" class="form-control" style="text-align: center; width: 140px; display: inline;" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>
            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Ledger Name</label>
                            </td>
                            <td style="width: 75%">
                                <asp:TextBox ID="txt_Ledname" class="form-control" runat="server" placeholder="Please enter Ledger name" Style="width: 100%" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Jewellery</label>
                            </td>
                            <td style="width: 75%">
                                <select id="cmbJewellery" multiple data-live-search="true" class="filters" style="width: 100%">
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>


            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Design</label>
                            </td>
                            <td style="width: 75%">
                                <select id="cmbDesign" multiple data-live-search="true" class="filters" style="width: 100%">
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>


            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Collection</label>
                            </td>
                            <td style="width: 75%">
                                <select id="cmbCollection" multiple data-live-search="true" class="filters" style="width: 100%"></select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>


            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Material</label>
                            </td>
                            <td style="width: 75%">
                                <select id="cmbMaterial" multiple data-live-search="true" class="filters" style="width: 100%"></select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 10px">
            </div>

            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Occasion</label>
                            </td>
                            <td style="width: 75%">
                                <select id="cmbOccasion" multiple data-live-search="true" class="filters" style="width: 100%"></select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 10px">
            </div>

            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Gram Slab</label>
                            </td>
                            <td style="width: 75%">
                                <select id="CmbGramSlab" multiple data-live-search="true" class="filters" style="width: 100%"></select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 10px">
            </div>

            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Karat</label>
                            </td>
                            <td style="width: 75%">
                                <select id="cmbKarat" multiple data-live-search="true" class="filters" style="width: 100%"></select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>


            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">SKU</label>
                            </td>
                            <td style="width: 75%">
                                <input type="text" id="txt_SKU" class="form-control" placeholder="Please enter SKU." style="width: 100%" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>


            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Code</label>
                            </td>
                            <td style="width: 75%">
                                <input type="text" id="txt_Code" class="form-control" placeholder="Please enter Code" style="width: 100%" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>


            <div style="height: 10px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 25%">
                                <label class="control-label" style="display: inline">Title / Desc.</label>
                            </td>
                            <td style="width: 75%">
                                <input type="text" id="txt_TitleDesc" class="form-control" placeholder="Please enter Title / Description" style="width: 100%" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 20px">
            </div>


            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 50%; text-align: center">
                                <button type="button" id="btnGenerate" class="btn btn-success">Generate Report</button>
                            </td>
                            <td style="width: 50%; text-align: center">
                                <button type="button" id="btnClearfilter" class="btn btn-danger">Reset Filters</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>
            </div>

            <div style="height: 10px">
            </div>

        </div>
    </div>
    <br />
    <div class="col-lg-12" id="printdiv" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style='color: blue; display: inline'>Stock Entry Register</h2>
                    <label style="display: inline; margin-left: 50px; margin-right: 5px">From</label>
                    <label id="lbldatefrom" style="display: inline; margin-right: 5px">01-10-2019</label>
                    <label style="display: inline; margin-right: 5px">To</label>
                    <label id="lbldateto" style="display: inline; margin-right: 5px">30-10-2019</label>
                </div>
            </div>
            <div style="height: 15px">
            </div>
            <div class="row">
                <div class="col-12">
                    <label style="display: inline; margin-right: 5px">Filter : </label>
                    <label id="lblfilter" style="display: inline; margin-right: 5px;color:brown"></label>
                </div>
            </div>
            <div style="height: 15px">
            </div>
            <div id="divgridprint">
                <table id="tableprint" style="width: 100%" border="1">
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup  -->
</asp:Content>
