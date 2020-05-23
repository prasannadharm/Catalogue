<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="Stock.aspx.cs" Inherits="Catalog.Pages.Stock" %>

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
    <script src="../scripts/app/stockentry.js?v=1"></script>
    <div id="loader"></div>
    <div class="col-lg-12" id="mainlistingdiv">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-3">
                    <h2>Stock Entry</h2>
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
                            <th>Stock No</th>
                            <th>Date</th>
                            <th>Ledger Name</th>                            
                            <th>Void</th>
                            <th>Created By</th>
                            <th>Modified By</th>
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
                    <h2 style='color: blue'>Stock Entry -> Add Stock Entry</h2>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-12 col-lg-6">
                    <label>Ledger Name</label>
                    <asp:TextBox ID="LED_NAME" class="form-control" runat="server" placeholder="Please enter Ledger name" />
                    <asp:HiddenField ID="LED_ID" runat="server" />
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label>Stock Entry No</label>
                    <input type="number" id="TRANS_NO" class="form-control" disabled="disabled" style="text-align: center; background-color: white" />
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label>Stock Entry Date</label>
                    <input class="form-control datepicker" id="TRANS_DATE" name="date" placeholder="DD-MM-YYYY" type="text" style="text-align: center;" />
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-12 col-lg-9">
                    <label>Remarks</label>
                    <input type="text" id="REMARKS" class="form-control" placeholder="Please enter Ledger name" />
                </div>
                <div class="form-group col-md-12 col-lg-3">
                    <label>Ref. No.</label>
                    <input type="text" id="REF_NO" class="form-control" placeholder="Please enter Ref. No." />
                </div>
            </div>

            <div class="row">
                <div class="form-group col-12">
                    <h3 style='color: orange'>Add Jewellery Items</h3>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-12 col-lg-3">
                    <label>Search By</label>
                    <select name="cmbSeacrhField" id="cmbSeacrhField" class="form-control">
                        <option value="SKU">SKU</option>
                        <option value="Code">Code</option>
                        <option value="Title">Title</option>
                    </select>
                </div>
                <div class="form-group col-md-12 col-lg-3">
                    <label>Condition</label>
                    <select name="cmbSeacrhCondition" id="cmbSeacrhCondition" class="form-control">
                        <option value="Equals">Equals</option>
                        <option value="Contains">Contains</option>
                    </select>
                </div>
                <div class="form-group col-md-9 col-lg-3">
                    <label>Search Text</label>
                    <input type="text" id="txtSearchItem" class="form-control" placeholder="Enter search keyword..." />
                </div>
                <div class="form-group col-md-3 col-lg-3">
                    <button type="button" id="btnSearchItem" class="btn btn-primary" style="margin-top: 32px">Search</button>
                </div>
            </div>

            <div class="table-responsive" id="gridsubdiv">
                <table id="tablesub" class="table table-striped table-bordered" style="width: 100%">
                    <thead>
                        <tr>
                            <th>SKU</th>                            
                            <th>Title</th>
                            <th>Pcs</th>
                            <th>Gr Wt</th>
                            <th>Qty</th>
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
                                        <th>SKU</th>                                        
                                        <th>Title</th>
                                        <th>Jewellery</th>
                                        <th>Collection</th>                                        
                                        <th>Pcs</th>
                                        <th>Weight</th>
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
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblstkNoPRN"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Stock Entry Date</label>
                        </td>
                        <td>
                            <label> : </label>
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
                            <label> : </label>
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
                            <label> : </label>
                        </td>
                        <td>
                            <label id="lblledNamePRN"></label>
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
                <table id="tablesubprn" style="width: 100%;border-collapse: collapse;">
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
    <!-- For Print Popup  -->

</asp:Content>
