﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="Inward.aspx.cs" Inherits="Catalog.Pages.Inward" %>

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
    <script src="../scripts/app/inwardentry.js"></script>
    <div id="loader"></div>
    <div class="col-lg-12" id="mainlistingdiv">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-3">
                    <h2>Inward Entry</h2>
                </div>
                <div class="col-9">
                    <label class="control-label" style="display: inline">Date From </label>
                    <input class="form-control datepicker" id="dtpFrom" name="date" placeholder="DD-MM-YYYY" type="text" style="width: 140px; display: inline; text-align: center" />
                    <label class="control-label" style="display: inline">To</label>
                    <input class="form-control datepicker" id="dtpTo" name="date" placeholder="DD-MM-YYYY" type="text" style="width: 140px; display: inline; margin-right: 15px; text-align: center" />
                    <button type="button" id="btnSearch" class="btn btn-success" style="display: inline; margin-right: 10px; margin-top: -5px">Search</button>
                    <button type="button" id="btnAddNew" class="btn btn-success addNewButton" style="position: relative; float: right;">Add New</button>
                </div>
            </div>
        </div>

        <!-- /.panel-heading -->
        <div class="panel-body" id="maindiv">
            <div class="table-responsive" id="griddiv">
                <table id="tablemain" class="table table-striped table-bordered" style="width: 100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>Ledger Name</th>
                            <th>Type</th>
                            <th>Void</th>
                            <th>Created By</th>
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
                    <h2 style='color: blue'>Inward Entry -> Add Inward Entry</h2>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-6 col-lg-3">
                    <label>Inward Entry No</label>
                    <input type="number" id="TRANS_NO" class="form-control" disabled="disabled" style="text-align: center; background-color: white" />
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label>Inward Entry Date</label>
                    <input class="form-control datepicker" id="TRANS_DATE" name="date" placeholder="DD-MM-YYYY" type="text" style="text-align: center;" />
                </div>
                <div class="form-group col-md-12 col-lg-3">
                    <label>Ref. No.</label>
                    <input type="text" id="REF_NO" class="form-control" placeholder="Please enter Ref. No." />
                </div>
                <div class="form-group col-md-12 col-lg-3">
                    <label>Inward Type</label>
                    <select id="INWARD_TYPE" class="form-control">
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-12 col-lg-6">
                    <label>Ledger Name</label>
                    <asp:TextBox ID="LED_NAME" class="form-control" runat="server" placeholder="Please enter Ledger name" />
                    <asp:HiddenField ID="LED_ID" runat="server" />
                </div>

                <div class="form-group col-md-12 col-lg-6">
                    <label>Remarks</label>
                    <input type="text" id="REMARKS" class="form-control" placeholder="Please enter Ledger name" />
                </div>

                <div class="form-group col-md-12 col-lg-6">
                    <h3 style='color: orange; display: inline'>Add Jewellery Items</h3>
                </div>

                <div class="form-group col-md-12 col-lg-6">
                    <button type="button" id="btnFetch" class="btn btn-primary" style="display: inline">Fetch Pending Outward Entries</button>
                </div>
            </div>           

            <div class="table-responsive" id="gridsubdiv">
                <table id="tablesub" class="table table-striped table-bordered" style="width: 100%">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Qty</th>
                            <th>P Qty</th>
                            <th>Remarks</th>
                            <th>Delete</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div class="row" id="divimgpreview" style="display: none;">
                <div class="form-group col-12">
                    <button type="button" id="btnCloseImgPreview" class="btn btn-danger btn-sm">Close Preview</button>
                </div>
                <div class="form-group col-12">
                    <img id="imgpreviewsub" src="../images/static/preview.png" style="height: 300px; width: 300px" />
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <button type="button" id="btnSave" class="btn btn-primary" style="margin-right: 15px">Save Data</button>
                    <button type="button" id="btnUpdate" class="btn btn-primary" edit-id="" style="margin-right: 15px">Update Data</button>
                    <button type="button" id="btnCancel" class="btn btn-danger cancelButton" style="margin-right: 15px">Cancel</button>
                </div>
            </div>

        </div>
    </div>


    <!-- For Modal Popup Screen Item Selection via Search -->
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="PopupModalItemSearch">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header mhs">
                    <h4>Search results for</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="panel-body">
                        <div class="table-responsive" id="griditemsearchdiv">
                            <table id="tableitemsearch" class="table table-striped table-bordered" style="width: 100%">
                                <thead>
                                    <tr>                                        
                                        <th>Outward No</th>
                                        <th>Outward Date</th>
                                        <th>SKU</th>
                                        <th>Code</th>
                                        <th>Title</th>
                                        <th>Pending Qty</th>                                        
                                        <th>Select</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row" id="divISimgpreview" style="display: none;">
                    <div class="form-group col-12">
                        <button type="button" id="btnISCloseImgPreview" class="btn btn-danger btn-sm" style="margin-left: 15px">Close Preview</button>
                    </div>
                    <div class="form-group col-12">
                        <img id="imgISpreviewsub" src="../images/static/preview.png" style="height: 300px; width: 300px; margin-left: 15px" />
                    </div>
                </div>
                <div class="modal-footer">
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
                            <label id="lblstkNoPRN"></label>
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
                            <label id="lblstkDatePRN"></label>
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
                            <label id="lblrefnoPRN"></label>
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
                            <label id="lblledNamePRN"></label>
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
                            <label id="lblintypePRN"></label>
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
                            <label id="lblRemarksPRN"></label>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="form-group col-12">
                    <h3 style='color: brown'>Jewellery Items</h3>
                </div>
            </div>

            <div class="table-responsive" id="gridsubdivprn">
                <style>
                    table#tableprint {
                        border-collapse: collapse;
                    }

                    th#tableprint, td#tableprint {
                        border: 1px solid black;
                    }
                </style>
                <table id="tablesubprn" class="table table-striped table-bordered" style="width: 100%;border-collapse: collapse">
                    <thead>
                        <tr>
                            <th style="border: 1px solid black;">SKU</th>
                            <th style="border: 1px solid black;">Code</th>
                            <th style="border: 1px solid black;">Title</th>
                            <th style="border: 1px solid black;">Qty</th>
                            <th style="border: 1px solid black;">Out No</th>
                            <th style="border: 1px solid black;">Remarks</th>                            
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- For Print Popup  -->
</asp:Content>
