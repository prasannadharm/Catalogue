<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="LedgerMaster.aspx.cs" Inherits="Catalog.Pages.LedgerMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../css/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <script src="../scripts/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.bootstrap4.min.js"></script>
    <script src="../scripts/app/ledgermaster.js"></script>
    <div class="col-lg-12">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-6">
                    <h2>Ledger Master</h2>
                </div>
                <div class="col-6">
                    <button type="button" id="btnAddNew" class="btn btn-success addNewButton" style="position: relative; float: right;">Add New</button>
                </div>
            </div>

            <!-- /.panel-heading -->
            <div class="panel-body" id="maindiv">
                <div class="table-responsive" id="griddiv">
                    <table id="tablemain" class="table table-striped table-bordered" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Alias Name</th>
                                <th>Type</th>
                                <th>Mobile</th>
                                <th>City</th>
                                <th>Active</th>
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
    </div>
    <!-- For Modal Popup  -->
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="PopupModal">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Edit Ledger Details</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="panel-body">
                        <div class="row">
                            <div class="form-group col-4">
                                <label>Name</label>
                                <input type="text" name="NAME" id="NAME1" class="form-control" placeholder="Please enter name" />
                            </div>
                            <div class="form-group col-4">
                                <label>Alias Name</label>
                                <input type="text" name="ALIAS_NAME" id="ALIAS_NAME1" class="form-control" placeholder="Please enter alias name" />
                            </div>
                            <div class="form-group col-4">
                                <label>Ledger Type</label>
                                <select name="LEDGER_TYPE" id="LEDGER_TYPE1" class="form-control" onchange="StateComboChange()">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-8">
                                <label>Address</label>
                                <input type="text" name="ADDRESS" id="ADDRESS1" class="form-control" placeholder="Please enter address" />
                            </div>
                            <div class="form-group col-4">
                                <label>Pin</label>
                                <input type="text" name="PIN_NO" id="PIN_NO1" class="form-control" placeholder="Please enter PIN" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-4">
                                <label>State</label>
                                <select name="STATE" id="STATE1" class="form-control" onchange="StateComboChange()">
                                    <option></option>
                                </select>
                            </div>

                            <div class="form-group col-4">
                                <label>City</label>
                                <select name="CITY" id="CITY1" class="form-control">
                                    <option></option>
                                </select>
                            </div>

                            <div class="form-group col-4">
                                <label>GSTIN</label>
                                <input type="text" name="GSTIN" id="GSTIN1" class="form-control" placeholder="Please enter GST No" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-4">
                                <label>Mobile</label>
                                <input type="text" name="MOBILE" id="MOBILE1" class="form-control" placeholder="Please enter Mobile No" />
                            </div>
                            <div class="form-group col-4">
                                <label>Telephone</label>
                                <input type="text" name="TELEPHONE" id="TELEPHONE1" class="form-control" placeholder="Please enter Telephone No" />
                            </div>
                            <div class="form-group col-4">
                                <label>E-Mail</label>
                                <input type="text" name="EMAIL" id="EMAIL1" class="form-control" placeholder="Please enter email address" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-4">
                                <label>Website</label>
                                <input type="text" name="WEB" id="WEB1" class="form-control" placeholder="Please enter Website address" />
                            </div>
                            <div class="form-group col-8">
                                <label>Remarks</label>
                                <input type="checkbox" name="ACTIVE_STATUS" id="ACTIVE_STATUS1" value="Active Status" style="margin-left:10px;margin-right:5px; vertical-align: middle;" />
                                <label>Active Status</label>
                                <input type="text" name="REMARKS" id="REMARKS1" class="form-control" placeholder="Please enter Remarks" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnSave" class="btn btn-primary">Save Data</button>
                    <button type="button" id="btnUpdate" class="btn btn-primary" edit-id="">Update Data</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- For Modal Popup  -->
</asp:Content>
