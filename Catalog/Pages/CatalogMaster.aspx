<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="CatalogMaster.aspx.cs" Inherits="Catalog.Pages.CatalogueMaster" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../css/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <script src="../scripts/jquery.dataTables.min.js"></script>
    <script src="../scripts/dataTables.bootstrap4.min.js"></script>
    <script src="../scripts/app/catalogmaster.js"></script>
    <div class="col-lg-12">
        <div class="panel panel-default">
            <div class="row">
                <div class="col-6">
                    <h2>Catalog</h2>
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
                                <th>SKU</th>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Jelwellery</th>
                                <th>Design</th>
                                <th>Collection</th>
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
                            <div class="form-group col-6">
                                <label>Description</label>
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
                                <input type="text" name="PURITY" id="PURITY1" class="form-control" placeholder="Purity %" style="text-align:right" />
                            </div>
                            <div class="form-group col-3">
                                <label>Rate (Rs)</label>
                                <input type="number" name="RATE" id="RATE1" class="form-control" onchange="CalcAmt()" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>Gross WT (Gm)</label>
                                <input type="number" name="GR_WT" id="GR_WT1" class="form-control" onchange="CalcAmt()" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>Stone WT (Gm)</label>
                                <input type="number" name="ST_WT" id="ST_WT1" class="form-control" onchange="CalcAmt()" style="text-align:right"/>
                            </div>
                        </div>


                        <div class="row">
                            <div class="form-group col-3">
                                <label>Net WT (Gm)</label>
                                <input type="number" name="NET_WT" id="NET_WT1" class="form-control" readonly="true" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>VA (%)</label>
                                <input type="number" name="VA_PER" id="VA_PER1" class="form-control" onchange="CalcAmt()" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>VA Amt (Rs)</label>
                                <input type="number" name="VA_AMT" id="VA_AMT1" readonly="true" class="form-control" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>Stone Amt (Rs)</label>
                                <input type="number" name="ST_AMT" id="ST_AMT1" class="form-control" onchange="CalcAmt()" style="text-align:right"/>
                            </div>                            
                        </div>

                        <div class="row">
                            <div class="form-group col-3">
                                <label>Taxable Amt (Rs)</label>
                                <input type="number" name="TAXABLE_AMT" id="TAXABLE_AMT1" readonly="true" class="form-control" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>Tax (%)</label>
                                <input type="number" name="TAX_PER" id="TAX_PER1" class="form-control" onchange="CalcAmt()" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>Tax Amt (Rs)</label>
                                <input type="number" name="TAX_AMT" id="TAX_AMT1" readonly="true" class="form-control" style="text-align:right"/>
                            </div>
                            <div class="form-group col-3">
                                <label>Net Amt (Rs)</label>
                                <input type="number" name="NET_AMT" id="NET_AMT1" readonly="true" class="form-control" style="text-align:right"/>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <label style="margin-left: 10px">SKU</label>
                    <label id="SKU1" style="color: brown; margin-left: 5px; margin-right: 20px; font-weight: 500">SKU</label>
                    <label>Stock</label>
                    <label id="STK_QTY1" style="color: red; margin-left: 5px; margin-right: 20px; font-weight: 500">0</label>
                    <button type="button" id="btnSave" class="btn btn-primary">Save Data</button>
                    <button type="button" id="btnUpdate" class="btn btn-primary" edit-id="">Update Data</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- For Modal Popup  -->
</asp:Content>
