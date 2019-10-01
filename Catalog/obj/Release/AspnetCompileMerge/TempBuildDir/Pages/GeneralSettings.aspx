<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="GeneralSettings.aspx.cs" Inherits="Catalog.Pages.GeneralSettings" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="../scripts/app/generalsettings.js"></script>
    <div class="col-lg-12">
        <div class="panel panel-default">
            <div class="row" style="margin-bottom: 20px">
                <div class="col-6">
                    <h2>Transaction Series Details</h2>
                </div>
                <div class="col-6">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-0  col-md-0 col-lg-3">
                </div>

                <div class="col-sm-12  col-md-12 col-lg-6">
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 35%">
                                <label class="control-label">SKU</label>
                            </td>
                            <td style="width: 45%">
                                <input type="number" id="txt_SKU" class="form-control" style="text-align:center;font-weight:700" />
                            </td>
                            <td style="width: 20%">
                                <button type="button" id="btnUpdateSKU" class="btn btn-primary" style="margin-left:10px">Update</button>
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
                            <td style="width: 35%">
                                <label class="control-label">Stock Entry No</label>
                            </td>
                            <td style="width: 45%">
                                <input type="number" id="txt_STK" class="form-control" style="text-align:center;font-weight:700" />
                            </td>
                            <td style="width: 20%">
                                <button type="button" id="btnUpdateSTK" class="btn btn-primary" style="margin-left:10px">Update</button>
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
                            <td style="width: 35%">
                                <label class="control-label">Inward Entry No</label>
                            </td>
                            <td style="width: 45%">
                                <input type="number" id="txt_IN" class="form-control" style="text-align:center;font-weight:700" />
                            </td>
                            <td style="width: 20%">
                                <button type="button" id="btnUpdateIN" class="btn btn-primary" style="margin-left:10px">Update</button>
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
                            <td style="width: 35%">
                                <label class="control-label">Outward Entry No</label>
                            </td>
                            <td style="width: 45%">
                                <input type="number" id="txt_OUT" class="form-control" style="text-align:center;font-weight:700" />
                            </td>
                            <td style="width: 20%">
                                <button type="button" id="btnUpdateOUT" class="btn btn-primary" style="margin-left:10px">Update</button>
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
</asp:Content>
