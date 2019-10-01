$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    subItemsList = [];
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $('#dtpDate').datepicker('setDate', today);   

    $.ajax({
        url: "UserDashboard.aspx/GetCurrentDate",
        data: '{}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {               
                $('#dtpDate').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', data.d[i].split('-')[2] + '-' + data.d[i].split('-')[1] + '-' + data.d[i].split('-')[0]);
            }
            getDashboardDetails();
        },
        error: function (response) {
            alert(response.responseText);
        },
        failure: function (response) {
            alert(response.responseText);
        }
    });

    $("#btnRefresh").click(function () {
        getDashboardDetails();
    })
})

function getDashboardDetails() {
    document.getElementById("loader").style.display = "block";
    getStockEntryDetails();    
}

function getStockEntryDetails()
{
    var obj = {};
    obj.DateFrom = $("#dtpDate").val();
    obj.DateTo = $("#dtpDate").val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserDashboard.aspx/GetSTKData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddivstockentry').remove();
            $('#maindivstockentry').append("<div class='table-responsive' id='griddivstockentry'></div>");
            $('#griddivstockentry').append("<table id='tablestockentry' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablestockentry').append("<thead><tr><th>StK No</th><th>Ledger</th><th></th></tr></thead><tbody></tbody>");
            $('#tablestockentry tbody').remove();
            $('#tablestockentry').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablestockentry').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].TRANS_NO + "</b></td><td style='color:blue'>" + data.d[i].LED_NAME + "</td>" +                    
                    "<td style='text-align:center'><img src='../images/static/print.png' alt='Print Record' class='printButtonSTK handcursor' data-id='" + data.d[i].ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tablestockentry').append("</tbody>");
            $('#tablestockentry').DataTable({
                "order": [[0, "desc"]]
            });
            getInwardEntryDetails();
        },
        error: function (request, status, error) {
            getInwardEntryDetails();
            alert(request.responseText);
            alert("Error while Showing update data");
        }
    });
}

function getInwardEntryDetails()
{
    var obj = {};
    obj.DateFrom = $("#dtpDate").val();
    obj.DateTo = $("#dtpDate").val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserDashboard.aspx/GetINData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddivinwardentry').remove();
            $('#maindivinwardentry').append("<div class='table-responsive' id='griddivinwardentry'></div>");
            $('#griddivinwardentry').append("<table id='tableinwardentry' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tableinwardentry').append("<thead><tr><th>In No</th><th>Ledger</th><th>Type</th><th></th></tr></thead><tbody></tbody>");
            $('#tableinwardentry tbody').remove();
            $('#tableinwardentry').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tableinwardentry').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].TRANS_NO + "</b></td><td style='color:blue'>" + data.d[i].LED_NAME + "</td>" + "<td>" + data.d[i].IN_TYPE_NAME + "</td>" +
                    "<td style='text-align:center'><img src='../images/static/print.png' alt='Print Record' class='printButtonIN handcursor' data-id='" + data.d[i].ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tableinwardentry').append("</tbody>");
            $('#tableinwardentry').DataTable({
                "order": [[0, "desc"]]
            });
            getOutwardEntryDetails();
        },
        error: function (request, status, error) {
            getOutwardEntryDetails();
            alert(request.responseText);
            alert("Error while Showing update data");
        }
    });
    
}

function getOutwardEntryDetails() {
    var obj = {};
    obj.DateFrom = $("#dtpDate").val();
    obj.DateTo = $("#dtpDate").val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserDashboard.aspx/GetOutData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddivoutwardentry').remove();
            $('#maindivoutwardentry').append("<div class='table-responsive' id='griddivoutwardentry'></div>");
            $('#griddivoutwardentry').append("<table id='tableoutwardentry' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tableoutwardentry').append("<thead><tr><th>Out No</th><th>Ledger</th><th>Type</th><th></th></tr></thead><tbody></tbody>");
            $('#tableoutwardentry tbody').remove();
            $('#tableoutwardentry').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tableoutwardentry').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].TRANS_NO + "</b></td><td style='color:blue'>" + data.d[i].LED_NAME + "</td><td>" + data.d[i].OUT_TYPE_NAME + "</td>" +
                    "<td style='text-align:center'><img src='../images/static/print.png' alt='Print Record' class='printButtonOT handcursor' data-id='" + data.d[i].ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tableoutwardentry').append("</tbody>");
            $('#tableoutwardentry').DataTable({
                "order": [[0, "desc"]]
            });
            getPendingOutwardEntryDetails();
        },
        error: function (request, status, error) {
            getPendingOutwardEntryDetails();
            alert(request.responseText);
            alert("Error while Showing update data");
        }
    });
    
}

function getPendingOutwardEntryDetails() {

    var obj = {};
    obj.FROMDATE = '01-01-1900';
    obj.TODATE = '01-01-3000';
    obj.FROMNO = 0;
    obj.TONO = 0;
    obj.LEDNAME = '';
    obj.JEWELLERYIDS = '';
    obj.DESIGNIDS = '';
    obj.COLLECTIONSIDS = '';
    obj.MATERIALIDS = '';
    obj.OCCASIONIDS = '';
    obj.GRAMSLABIDS = '';
    obj.KARATIDS = '';
    obj.OUT_TYPE_ID = 0;
    obj.SHOW_PENDING_ONLY = true;
    obj.SKU = '';
    obj.CODE = '';
    obj.DESC = '';
    
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserDashboard.aspx/GetPendingOutwardRegisterData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddivpendingentry').remove();
            $('#maindivpendingentry').append("<div class='table-responsive' id='griddivpendingentry'></div>");
            $('#griddivpendingentry').append("<table id='tablependingentry' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablependingentry').append("<thead><tr><th>Out No</th><th>Ledger</th><th>Jewellery</th><th>Qty</th><th></th></tr></thead><tbody></tbody>");
            $('#tablependingentry tbody').remove();
            $('#tablependingentry').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablependingentry').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].TRANS_NO + "</b></td><td style='color:blue'>" + data.d[i].LED_NAME + "</td>" + "<td style='color:brown'>" + data.d[i].CATALOG_TITLE + "</td>" + "<td style='text-align:center;color:red'><b>" + data.d[i].BAL_QTY + "</b></td>"+
                    "<td style='text-align:center'><img src='../images/static/print.png' alt='Print Record' class='printButtonPendOT handcursor' data-id='" + data.d[i].TRANS_MAIN_ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tablependingentry').append("</tbody>");
            $('#tablependingentry').DataTable({
                "order": [[0, "asc"]]
            });
            document.getElementById("loader").style.display = "none";
        },
        error: function (request, status, error) {
            alert(request.responseText);
            alert("Error while Showing update data");
            document.getElementById("loader").style.display = "none";
        }
    });    
}


$(function () {

    $(document).on("click", ".printButtonSTK", function () {

        var id = $(this).attr("data-id");
        console.log(id);

        $('#tablesubprnSTK tbody').remove();
        $('#tablesubprnSTK').append("<tbody>");
        $('#tablesubprnSTK').append("</tbody>");
        $('#lblstkNoPRNSTK').val('');
        $('#lblstkDatePRNSTK').val('');
        $('#lblrefnoPRNSTK').val('');
        $('#lblledNamePRNSTK').val('');
        $('#lblRemarksPRNSTK').val('');

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "UserDashboard.aspx/EditDataSTK",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    $("#lblledNamePRNSTK").text(data.d[0].LED_NAME);
                    $("#lblstkNoPRNSTK").text(data.d[0].TRANS_NO);
                    $('#lblstkDatePRNSTK').text(data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                    $("#lblRemarksPRNSTK").text(data.d[0].REMARKS_MAIN);
                    $("#lblrefnoPRNSTK").text(data.d[0].REF_NO);
                }

                $('#tablesubprnSTK tbody').remove();
                $('#tablesubprnSTK').append("<tbody>");
                for (var i = 0; i < data.d.length; i++) {
                    $('#tablesubprnSTK').append(
                        "<tr><td style='border: 1px solid black;text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td style='border: 1px solid black;'>" + data.d[i].CODE + "</td><td style='border: 1px solid black;color:blue'>" + data.d[i].CATALOG_TITLE + "</td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].QTY + "</b></td><td style='border: 1px solid black;'>" + data.d[i].REMARKS + "</td></tr>");
                }
                $('#tablesubprnSTK').append("</tbody>");
                $('#printdivSTK').show();
                var divToPrint = document.getElementById("printdivSTK");
                newWin = window.open("");
                newWin.document.write(divToPrint.outerHTML);
                $('#printdivSTK').hide();
                newWin.print();
                //newWin.close();

            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });


    });

    $(document).on("click", ".printButtonIN", function () {

        var id = $(this).attr("data-id");
        console.log(id);

        $('#tablesubprnIN tbody').remove();
        $('#tablesubprnIN').append("<tbody>");
        $('#tablesubprnIN').append("</tbody>");
        $('#lblstkNoPRNIN').val('');
        $('#lblstkDatePRNIN').val('');
        $('#lblrefnoPRNIN').val('');
        $('#lblledNamePRNIN').val('');
        $('#lblRemarksPRNIN').val('');
        $('#lblintypePRNIN').val('');
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "UserDashboard.aspx/EditDataIN",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    $("#lblledNamePRNIN").text(data.d[0].LED_NAME);
                    $("#lblstkNoPRNIN").text(data.d[0].TRANS_NO);
                    $('#lblstkDatePRNIN').text(data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                    $("#lblRemarksPRNIN").text(data.d[0].REMARKS_MAIN);
                    $("#lblrefnoPRNIN").text(data.d[0].REF_NO);
                    $('#lblintypePRNIN').text(data.d[0].IN_TYPE_NAME);
                }

                $('#tablesubprnIN tbody').remove();
                $('#tablesubprnIN').append("<tbody>");
                for (var i = 0; i < data.d.length; i++) {
                    $('#tablesubprnIN').append(
                        "<tr><td style='border: 1px solid black;text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td style='border: 1px solid black;'>" + data.d[i].CODE + "</td><td style='border: 1px solid black;color:blue'>" + data.d[i].CATALOG_TITLE + "</td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].QTY + "</b></td><td style='border: 1px solid black;text-align:center;color:blue'>" + data.d[i].OUT_TRANS_NO + "</td><td style='border: 1px solid black;'>" + data.d[i].REMARKS + "</td></tr>");
                }
                $('#tablesubprnIN').append("</tbody>");
                $('#printdivIN').show();
                var divToPrint = document.getElementById("printdivIN");
                newWin = window.open("");
                newWin.document.write(divToPrint.outerHTML);
                $('#printdivIN').hide();
                newWin.print();
                //newWin.close();

            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });


    });

    $(document).on("click", ".printButtonOT", function () {

        var id = $(this).attr("data-id");
        console.log(id);

        $('#tablesubprnOT tbody').remove();
        $('#tablesubprnOT').append("<tbody>");
        $('#tablesubprnOT').append("</tbody>");
        $('#lblstkNoPRNOT').val('');
        $('#lblstkDatePRNOT').val('');
        $('#lblrefnoPRNOT').val('');
        $('#lblledNamePRNOT').val('');
        $('#lblRemarksPRNOT').val('');
        $('#lblouttypePRNOT').val('');
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "UserDashboard.aspx/EditDataOUT",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    $("#lblledNamePRNOT").text(data.d[0].LED_NAME);
                    $("#lblstkNoPRNOT").text(data.d[0].TRANS_NO);
                    $('#lblstkDatePRNOT').text(data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                    $("#lblRemarksPRNOT").text(data.d[0].REMARKS_MAIN);
                    $("#lblrefnoPRNOT").text(data.d[0].REF_NO);
                    $('#lblouttypePRNOT').text(data.d[0].OUT_TYPE_NAME);
                }

                $('#tablesubprnOT tbody').remove();
                $('#tablesubprnOT').append("<tbody>");
                for (var i = 0; i < data.d.length; i++) {
                    $('#tablesubprnOT').append(
                        "<tr><td style='border: 1px solid black;text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td style='border: 1px solid black;'>" + data.d[i].CODE + "</td><td style='border: 1px solid black;color:blue'>" + data.d[i].CATALOG_TITLE + "</td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].QTY + "</b></td><td style='border: 1px solid black;'>" + data.d[i].REMARKS + "</td></tr>");
                }
                $('#tablesubprnOT').append("</tbody>");
                $('#printdivOT').show();
                var divToPrint = document.getElementById("printdivOT");
                newWin = window.open("");
                newWin.document.write(divToPrint.outerHTML);
                $('#printdivOT').hide();
                newWin.print();
                //newWin.close();

            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });
    });


    $(document).on("click", ".printButtonPendOT", function () {

        var id = $(this).attr("data-id");
        console.log(id);

        $('#tablesubprnPendOT tbody').remove();
        $('#tablesubprnPendOT').append("<tbody>");
        $('#tablesubprnPendOT').append("</tbody>");
        $('#lblstkNoPRNPendOT').val('');
        $('#lblstkDatePRNPendOT').val('');
        $('#lblrefnoPRNPendOT').val('');
        $('#lblledNamePRNPendOT').val('');
        $('#lblRemarksPRNPendOT').val('');
        $('#lblouttypePRNPendOT').val('');
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "UserDashboard.aspx/EditDataOUT",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    $("#lblledNamePRNPendOT").text(data.d[0].LED_NAME);
                    $("#lblstkNoPRNPendOT").text(data.d[0].TRANS_NO);
                    $('#lblstkDatePRNPendOT').text(data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                    $("#lblRemarksPRNPendOT").text(data.d[0].REMARKS_MAIN);
                    $("#lblrefnoPRNPendOT").text(data.d[0].REF_NO);
                    $('#lblouttypePRNPendOT').text(data.d[0].OUT_TYPE_NAME);
                }

                $('#tablesubprnPendOT tbody').remove();
                $('#tablesubprnPendOT').append("<tbody>");
                for (var i = 0; i < data.d.length; i++) {
                    $('#tablesubprnPendOT').append(
                        "<tr><td style='border: 1px solid black;text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td style='border: 1px solid black;'>" + data.d[i].CODE + "</td><td style='border: 1px solid black;color:blue'>" + data.d[i].CATALOG_TITLE + "</td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].QTY + "</b></td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].BAL_QTY + "</b></td><td style='border: 1px solid black;'>" + data.d[i].REMARKS + "</td></tr>");
                }
                $('#tablesubprnPendOT').append("</tbody>");
                $('#printdivPendOT').show();
                var divToPrint = document.getElementById("printdivPendOT");
                newWin = window.open("");
                newWin.document.write(divToPrint.outerHTML);
                $('#printdivPendOT').hide();
                newWin.print();
                //newWin.close();

            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });
    });



});