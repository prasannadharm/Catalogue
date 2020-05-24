<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="UserDashboard.aspx.cs" Inherits="Catalog.Pages.UserDashboard" %>

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
    <script src="../scripts/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.bootstrap4.min.js"></script>
    <script src="../scripts/AjaxFileupload.js"></script>
    <script src="../scripts/popper.min.js"></script>
    <script src="../scripts/bootstrap-datepicker.min.js"></script>
    <script src="../scripts/jquery-ui.min.js"></script>
    <script src="../scripts/app/userdashboard.js?v=1"></script>
    <div id="loader"></div>

    <div class="col-lg-12" id="mainlistingdiv">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style="color: cornflowerblue; display: inline; margin-right: 20px;">Dashboard</h2>
                    <label class="control-label" style="display: inline">Date </label>
                    <input class="form-control datepicker" id="dtpDate" name="date" placeholder="DD-MM-YYYY" type="text" style="margin-left: 5px; width: 140px; display: inline; text-align: center" />
                    <button type="button" id="btnRefresh" class="btn btn-success" style="display: inline; margin-left: 10px; margin-top: -5px">Refresh</button>
                </div>
            </div>
        </div>

        <div style="height: 30px">
        </div>
        <div class="row">
            <div class="col-sm-12  col-md-12 col-lg-6">
                <!-- /.Stock Entry-heading -->
                <div class="panel-body" id="maindivstockentry">
                    <h4 style="color: darkcyan">Stock Enrty</h4>
                    <div class="table-responsive" id="griddivstockentry">
                        <table id="tablestockentry" class="table table-striped table-bordered" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>StK No</th>
                                    <th>Ledger</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-sm-12  col-md-12 col-lg-6">
                <!-- /.Inward Entry Entry-heading -->
                <div class="panel-body" id="maindivinwardentry">
                    <h4 style="color: blueviolet">Inward Entries</h4>
                    <div class="table-responsive" id="griddivinwardentry">
                        <table id="tableinwardentry" class="table table-striped table-bordered" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>In No</th>
                                    <th>Ledger</th>
                                    <th>Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div style="height: 30px">
        </div>

        <div class="row">
            <div class="col-sm-12  col-md-12 col-lg-6">
                <!-- /.Outward Entry-heading -->
                <div class="panel-body" id="maindivoutwardentry">
                    <h4 style="color: brown">Outward Entries</h4>
                    <div class="table-responsive" id="griddivoutwardentry">
                        <table id="tableoutwardentry" class="table table-striped table-bordered" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Out No</th>
                                    <th>Ledger</th>
                                    <th>Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-sm-12  col-md-12 col-lg-6">
                <!-- /.Inward Entry Entry-heading -->
                <div class="panel-body" id="maindivpendingentry">
                    <h4 style="color: red">Pending Outward Entries</h4>
                    <div class="table-responsive" id="griddivpendingentry">
                        <table id="tablependingentry" class="table table-striped table-bordered" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Out No</th>
                                    <th>Ledger</th>
                                    <th>Jewellery</th>
                                    <th>Qty</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- For Print Popup Stock Entry  -->
    <div class="col-lg-12" id="printdivSTK" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style='color: blue'>Stock Entry Details</h2>
                </div>
            </div>

            <div class="row">
                <table>
                    <tr>
                        <td>
                            <label>Stock Entry No</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblstkNoPRNSTK"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Stock Entry Date</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblstkDatePRNSTK"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ref. No.</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblrefnoPRNSTK"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ledger Name</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblledNamePRNSTK"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Remarks</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblRemarksPRNSTK"></label>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="form-group col-12">
                    <h3 style='color: brown'>Jewellery Items</h3>
                </div>
            </div>

            <div class="table-responsive" id="gridsubdivprnSTK">
                <table id="tablesubprnSTK" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black;">SKU</th>
                            <th style="border: 1px solid black;">Code</th>
                            <th style="border: 1px solid black;">Title</th>
                            <th style="border: 1px solid black;">Qty</th>
                            <th style="border: 1px solid black;">Pcs</th>
                            <th style="border: 1px solid black;">Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup Stock Entry -->

    <!-- For Print Popup Inward Entry  -->
    <div class="col-lg-12" id="printdivIN" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style='color: blue'>Inward Entry Details</h2>
                </div>
            </div>

            <div class="row">
                <table>
                    <tr>
                        <td>
                            <label>Inward Entry No</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblstkNoPRNIN"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Inward Entry Date</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblstkDatePRNIN"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ref. No.</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblrefnoPRNIN"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ledger Name</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblledNamePRNIN"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Inward Type</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblintypePRNIN"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Remarks</label>
                        </td>
                        <td>
                            <label>: </label>
                        </td>
                        <td>
                            <label id="lblRemarksPRNIN"></label>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="form-group col-12">
                    <h3 style='color: brown'>Jewellery Items</h3>
                </div>
            </div>

            <div class="table-responsive" id="gridsubdivprnIN">
                <style>
                    table#tableprint {
                        border-collapse: collapse;
                    }

                    th#tableprint, td#tableprint {
                        border: 1px solid black;
                    }
                </style>
                <table id="tablesubprnIN" class="table table-striped table-bordered" style="width: 100%; border-collapse: collapse">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black;">SKU</th>
                            <th style="border: 1px solid black;">Code</th>
                            <th style="border: 1px solid black;">Title</th>
                            <th style="border: 1px solid black;">Qty</th>
                            <th style="border: 1px solid black;">Out No</th>
                            <th style="border: 1px solid black;">Pcs</th>
                            <th style="border: 1px solid black;">Weight</th>  
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup Inward Entry  -->

     <!-- For Print Popup Outward Entry -->
    <div class="col-lg-12" id="printdivOT" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style='color: blue'>Outward Entry Details</h2>
                </div>
            </div>

            <div class="row">
                <table>
                    <tr>
                        <td>
                            <label>Outward Entry No</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblstkNoPRNOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Outward Entry Date</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblstkDatePRNOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ref. No.</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblrefnoPRNOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ledger Name</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblledNamePRNOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Outward Type</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblouttypePRNOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Remarks</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblRemarksPRNOT"></label>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="form-group col-12">
                    <h3 style='color: brown'>Jewellery Items</h3>
                </div>
            </div>

            <div class="table-responsive" id="gridsubdivprnOT">
                <table id="tablesubprnOT" style="width: 100%;border-collapse: collapse">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black;">SKU</th>
                            <th style="border: 1px solid black;">Code</th>
                            <th style="border: 1px solid black;">Title</th>
                            <th style="border: 1px solid black;">Qty</th>                            
                            <th style="border: 1px solid black;">Pcs</th>              
                            <th style="border: 1px solid black;">Weight</th>              
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup Outward -->


    <!-- For Print Popup Outward Pending -->
    <div class="col-lg-12" id="printdivPendOT" style="display: none">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-12">
                    <h2 style='color: blue'>Outward Entry Details</h2>
                </div>
            </div>

            <div class="row">
                <table>
                    <tr>
                        <td>
                            <label>Outward Entry No</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblstkNoPRNPendOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Outward Entry Date</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblstkDatePRNPendOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ref. No.</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblrefnoPRNPendOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Ledger Name</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblledNamePRNPendOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Outward Type</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblouttypePRNPendOT"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Remarks</label>
                        </td>
                        <td>
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblRemarksPRNPendOT"></label>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="form-group col-12">
                    <h3 style='color: brown'>Jewellery Items</h3>
                </div>
            </div>

            <div class="table-responsive" id="gridsubdivprnPendOT">
                <table id="tablesubprnPendOT" style="width: 100%;border-collapse: collapse">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black;">SKU</th>
                            <th style="border: 1px solid black;">Code</th>
                            <th style="border: 1px solid black;">Title</th>
                            <th style="border: 1px solid black;">Qty</th>                            
                            <th style="border: 1px solid black;">Bal Qty</th>                            
                            <th style="border: 1px solid black;">Pcs</th>              
                            <th style="border: 1px solid black;">Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup Outward Pending -->

</asp:Content>
