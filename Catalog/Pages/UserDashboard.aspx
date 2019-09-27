<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/CatalogAdmin.Master" AutoEventWireup="true" CodeBehind="UserDashboard.aspx.cs" Inherits="Catalog.Pages.UserDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <table>
        <tr>
            <td>
                <table>
                    <thead>
                        <tr>
                            <th>Updates :
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transaction -> Stock Enrty Completed
                            </td>
                        </tr>
                        <tr>
                            <td>Transactions -> Outward Enrty Completed
                            </td>
                        </tr>
                        <tr>
                            <td>All Master forms completed  (Only barocode prinitng at catalog is pending)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table style="margin-top: 20px">
                    <thead>
                        <tr>
                            <th>Pending :
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transaction -> Inward Enrty Pending
                            </td>
                        </tr>
                        <tr>
                            <td>Only barocode prinitng at catalog is pending
                            </td>
                        </tr>
                        <tr>
                            <td>All Reports screen are pending
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
    <img style="align-content: center; height: 400px" />
</asp:Content>
