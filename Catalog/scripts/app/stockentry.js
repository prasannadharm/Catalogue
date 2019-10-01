var subItemsList = [];
var tempsubItemsList = [];
$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    subItemsList = [];
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $('#dtpFrom').datepicker('setDate', today);
    $('#dtpTo').datepicker('setDate', today);

    $.ajax({
        url: "Stock.aspx/GetLatestTrasnsactionNumber",
        data: '{}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {
                $('#dtpFrom').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', data.d[i].split('-')[3] + '-' + data.d[i].split('-')[2] + '-' + data.d[i].split('-')[1]);
                $('#dtpTo').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', data.d[i].split('-')[3] + '-' + data.d[i].split('-')[2] + '-' + data.d[i].split('-')[1]);
            }
            getMainGridDetails();
        },
        error: function (response) {
            alert(response.responseText);
        },
        failure: function (response) {
            alert(response.responseText);
        }
    });


    $('#dtpFrom').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#dtpTo').focus();
        }
    });

    $('#dtpTo').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            getMainGridDetails();
        }
    });

    $("#btnSearch").click(function () {
        getMainGridDetails();
    })   

    $('#ContentPlaceHolder1_LED_NAME').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#REMARKS').focus();
        }
    });

    $('#REMARKS').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#REF_NO').focus();
        }
    });

    $('#REF_NO').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#txtSearchItem').focus();
        }
    });

    $('#txtSearchItem').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            searchItem();
        }
    });

    $("#btnSearchItem").click(function () {
        searchItem();
    });

    $("#btnCloseImgPreview").click(function () {
        $('#divimgpreview').hide();
    });

    $("#btnISCloseImgPreview").click(function () {
        $('#divISimgpreview').hide();
    });

})

$(function () {
    $(document).on("click", ".addNewButton", function () {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#btnSave').show();
        $('#btnUpdate').hide();
        $('#mainlistingdiv').hide();
        $('#mainldetaildiv').show();
        $('#TRANS_NO').val('0');
        $('#TRANS_DATE').datepicker('setDate', today);
        $("#ContentPlaceHolder1_LED_NAME").val('');
        $("#ContentPlaceHolder1_LED_ID").val('');
        $('#REMARKS').val('');
        $('#REF_NO').val('');
        subItemsList = [];
        rebuildSubTableGrid()
        $('#tablesub tbody').remove();
        $('#tablesub').append("<tbody>");
        $('#tablesub').append("</tbody>");

        $("#subheaderdiv").html("<h2 style='color:blue'>Stock Entry -> Add Stock Entry</h2>");

        $.ajax({
            url: "Stock.aspx/GetLatestTrasnsactionNumber",
            data: '{}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    $('#TRANS_NO').val(data.d[i].split('-')[0]);
                    $('#TRANS_DATE').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', data.d[i].split('-')[3] + '-' + data.d[i].split('-')[2] + '-' + data.d[i].split('-')[1]);
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });

        $("#ContentPlaceHolder1_LED_NAME").focus();

    });

    $(document).on("click", ".editButton", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnUpdate").attr("edit-id", id);
        var checkid = 0;
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Stock.aspx/CheckVoidStockEnrty",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    checkid = data.d[0];
                }

                if (checkid != null && checkid != undefined && checkid > 0) {
                    alert('Cannot Edit Voided/Cancelled entry.');
                    return false;
                }

                var date = new Date();
                var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                $('#btnSave').hide();
                $('#btnUpdate').show();
                $('#mainlistingdiv').hide();
                $('#mainldetaildiv').show();
                $("#subheaderdiv").html("<h2 style='color:blue'>Stock Entry -> Edit Stock Entry</h2>");
                subItemsList = [];
                rebuildSubTableGrid();
                $('#tablesub tbody').remove();
                $('#tablesub').append("<tbody>");
                $('#tablesub').append("</tbody>");
                $('#TRANS_NO').val('0');
                $('#TRANS_DATE').datepicker('setDate', today);
                $("#ContentPlaceHolder1_LED_NAME").val('');
                $("#ContentPlaceHolder1_LED_ID").val('');
                $('#REMARKS').val('');
                $('#REF_NO').val('');

                //$("#btnUpdate").attr("edit-id", id);
                //alert(id);  //getting the row id 
                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "Stock.aspx/EditData",
                    data: '{id: ' + id + '}',
                    dataType: "json",
                    success: function (data) {
                        if (data.d.length > 0) {
                            $("#ContentPlaceHolder1_LED_NAME").val(data.d[0].LED_NAME);
                            $("#ContentPlaceHolder1_LED_ID").val(data.d[0].LED_ID);
                            $("#TRANS_NO").val(data.d[0].TRANS_NO);
                            $('#TRANS_DATE').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                            $("#REMARKS").val(data.d[0].REMARKS_MAIN);
                            $("#REF_NO").val(data.d[0].REF_NO);

                            $("#subheaderdiv").html("<h2 style='color:blue'>Stock Entry -> Edit Stock Entry No: " + data.d[0].TRANS_NO + "</h2>");
                        }
                        for (var i = 0; i < data.d.length; i++) {
                            var objdetail = {};
                            objdetail.ID = data.d[i].CATALOG_ID;
                            objdetail.SKU = data.d[i].SKU;
                            objdetail.CODE = data.d[i].CODE;
                            objdetail.TITLE = data.d[i].CATALOG_TITLE;
                            objdetail.PHY_FILE_NAME = data.d[i].PHY_FILE_NAME;
                            objdetail.ORG_FILE_NAME = data.d[i].ORG_FILE_NAME;
                            objdetail.GENID = data.d[i].GENID;
                            objdetail.QTY = data.d[i].QTY;
                            objdetail.REMARKS = data.d[i].REMARKS;
                            subItemsList.push(objdetail);
                        }
                        rebuildSubTableGrid();
                        $("#txtSearchItem").val('');
                        $('#ContentPlaceHolder1_LED_NAME').focus();
                    },
                    error: function () {
                        alert("Error while retrieving data of :" + id);
                    }
                });

            },
            error: function () {
                alert("Error while checking is void data of :" + id);
            }
        });

    });

    $(document).on("click", ".cancelButton", function () {
        $('#mainlistingdiv').show();
        $('#mainldetaildiv').hide();
    });

    $("[id$=LED_NAME]").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "Stock.aspx/GetLedgersbyName",
                data: "{ 'str': '" + request.term + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $("[id$=LED_ID]").val(i.item.val);
        },
        minLength: 1
    });

    $("#btnSave").click(function () {

        if ($("#ContentPlaceHolder1_LED_NAME").val().trim() == "") {
            alert("Please enter Ledger name.");
            $("#ContentPlaceHolder1_LED_NAME").focus();
            return false;
        }

        if ($("#TRANS_NO").val().trim() == "") {
            alert("Please enter Stock entry No.");
            $("#TRANS_NO").focus();
            return false;
        }

        if (isDate($("#TRANS_DATE").val()) == false) {
            alert('Please enter valid Stock entry date');
            $("#TRANS_DATE").focus();
            return false;
        }

        if (subItemsList == null || subItemsList == undefined || subItemsList.length <= 0) {
            alert("Please add Jewellery Items.");
            $("#txtSearchItem").focus();
            return false;
        }

        var ledname = '';
        var ledid = '0';
        document.getElementById("loader").style.display = "block";
        $.ajax({
            url: "Stock.aspx/VerifyLedgerbyName",
            data: "{ 'str': '" + $("#ContentPlaceHolder1_LED_NAME").val().trim() + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    ledname = data.d[i].split('-')[0];
                    ledid = data.d[i].split('-')[1];
                }

                if ($.trim(ledname) == "") {
                    alert('Please select valid Ledger from the list');
                    document.getElementById("loader").style.display = "none";
                    $("#ContentPlaceHolder1_LED_NAME").focus();
                    return false;
                }

                var obj1 = {};

                obj1.LED_NAME = ledname;
                obj1.LED_ID = ledid;
                obj1.TRANS_DATE = $("#TRANS_DATE").val();
                obj1.REF_NO = $("#REF_NO").val();
                obj1.REMARKS = $("#REMARKS").val();

                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "Stock.aspx/InsertData",
                    data: '{obj1: ' + JSON.stringify(obj1) + ', obj2: ' + JSON.stringify(subItemsList) + '}',
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.d.length; i++) {
                            if (data.d[i].RESULT === 1) {
                                getMainGridDetails();
                                alert(data.d[i].MSG);
                                $('#mainlistingdiv').show();
                                $('#mainldetaildiv').hide();
                            }
                            else {
                                alert(data.d[i].MSG);
                                $("#TITLE1").focus();
                                return false;
                            }
                        }
                    },
                    error: function (data) {
                        alert("Error while Adding data of :" + obj.NAME);
                        $("#TITLE1").focus();
                        return false;
                    }
                });
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
        document.getElementById("loader").style.display = "none";
    });

    $(document).on("click", ".deleteButton", function () {
        if (confirm("Are you sure you want to delete the entry!") == true) {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "Stock.aspx/DeleteData",
                data: '{id: ' + id + '}',
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.d.length; i++) {
                        if (data.d[i].RESULT === 1) {
                            getMainGridDetails();
                            alert(data.d[i].MSG);
                        }
                        else {
                            alert(data.d[i].MSG);
                            return false;
                        }
                    }
                },
                error: function (data) {
                    alert("Error while Deleting data of :" + id);
                }
            });
        }
    });

    $(document).on("click", ".voidButton", function () {
        if (confirm("Are you sure you want to Void/Cancel the entry!") == true) {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "Stock.aspx/VoidData",
                data: '{id: ' + id + '}',
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.d.length; i++) {
                        if (data.d[i].RESULT === 1) {
                            getMainGridDetails();
                            alert(data.d[i].MSG);
                        }
                        else {
                            alert(data.d[i].MSG);
                            return false;
                        }
                    }
                },
                error: function (data) {
                    alert("Error while Deleting data of :" + id);
                }
            });
        }
    });

    $(document).on("click", ".printButton", function () {

        var id = $(this).attr("data-id");
        console.log(id);

        $('#tablesubprn tbody').remove();
        $('#tablesubprn').append("<tbody>");
        $('#tablesubprn').append("</tbody>");
        $('#lblstkNoPRN').val('');
        $('#lblstkDatePRN').val('');
        $('#lblrefnoPRN').val('');
        $('#lblledNamePRN').val('');
        $('#lblRemarksPRN').val('');

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Stock.aspx/EditData",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    $("#lblledNamePRN").text(data.d[0].LED_NAME);
                    $("#lblstkNoPRN").text(data.d[0].TRANS_NO);
                    $('#lblstkDatePRN').text(data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                    $("#lblRemarksPRN").text(data.d[0].REMARKS_MAIN);
                    $("#lblrefnoPRN").text(data.d[0].REF_NO);
                }

                $('#tablesubprn tbody').remove();
                $('#tablesubprn').append("<tbody>");
                for (var i = 0; i < data.d.length; i++) {
                    $('#tablesubprn').append(
                        "<tr><td style='border: 1px solid black;text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td style='border: 1px solid black;'>" + data.d[i].CODE + "</td><td style='border: 1px solid black;color:blue'>" + data.d[i].CATALOG_TITLE + "</td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].QTY + "</b></td><td style='border: 1px solid black;'>" + data.d[i].REMARKS + "</td></tr>");
                }
                $('#tablesubprn').append("</tbody>");
                $('#printdiv').show();
                var divToPrint = document.getElementById("printdiv");
                newWin = window.open("");
                newWin.document.write(printdiv.outerHTML);
                $('#printdiv').hide();
                newWin.print();
                //newWin.close();
                
            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });

       
    });

    $("#btnUpdate").click(function () {
        var id = $(this).attr("edit-id");

        if ($("#ContentPlaceHolder1_LED_NAME").val().trim() == "") {
            alert("Please enter Ledger name.");
            $("#ContentPlaceHolder1_LED_NAME").focus();
            return false;
        }

        if ($("#TRANS_NO").val().trim() == "") {
            alert("Please enter Stock entry No.");
            $("#TRANS_NO").focus();
            return false;
        }

        if (isDate($("#TRANS_DATE").val()) == false) {
            alert('Please enter valid Stock entry date');
            $("#TRANS_DATE").focus();
            return false;
        }

        if (subItemsList == null || subItemsList == undefined || subItemsList.length <= 0) {
            alert("Please add Jewellery Items.");
            $("#txtSearchItem").focus();
            return false;
        }

        var ledname = '';
        var ledid = '0';
        document.getElementById("loader").style.display = "block";
        $.ajax({
            url: "Stock.aspx/VerifyLedgerbyName",
            data: "{ 'str': '" + $("#ContentPlaceHolder1_LED_NAME").val().trim() + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    ledname = data.d[i].split('-')[0];
                    ledid = data.d[i].split('-')[1];
                }

                if ($.trim(ledname) == "") {
                    alert('Please select valid Ledger from the list');
                    document.getElementById("loader").style.display = "none";
                    $("#ContentPlaceHolder1_LED_NAME").focus();
                    return false;
                }

                var obj1 = {};

                obj1.LED_NAME = ledname;
                obj1.LED_ID = ledid;
                obj1.TRANS_DATE = $("#TRANS_DATE").val();
                obj1.REF_NO = $("#REF_NO").val();
                obj1.REMARKS = $("#REMARKS").val();

                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "Stock.aspx/UpdatetData",
                    data: '{obj1: ' + JSON.stringify(obj1) + ', obj2: ' + JSON.stringify(subItemsList) + ', id: ' + id + '}',
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.d.length; i++) {
                            if (data.d[i].RESULT === 1) {
                                getMainGridDetails();
                                alert(data.d[i].MSG);
                                $('#mainlistingdiv').show();
                                $('#mainldetaildiv').hide();
                            }
                            else {
                                alert(data.d[i].MSG);
                                $("#TITLE1").focus();
                                return false;
                            }
                        }
                    },
                    error: function (data) {
                        alert("Error while Adding data of :" + obj.NAME);
                        $("#TITLE1").focus();
                        return false;
                    }
                });
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
        document.getElementById("loader").style.display = "none";

    });
});

function searchItem() {
    if ($.trim($("#cmbSeacrhField").val()) == '') {
        alert('Please select search field.');
        $("#cmbSeacrhField").focus();
        return false;
    }

    if ($.trim($("#cmbSeacrhCondition").val()) == '') {
        alert('Please select search condition.');
        $("#cmbSeacrhCondition").focus();
        return false;
    }

    if ($.trim($("#txtSearchItem").val()) == '') {
        alert('Please enter search text.');
        $("#txtSearchItem").focus();
        return false;
    }

    document.getElementById("loader").style.display = "block";

    var obj = {};
    obj.SEARCHBY = $("#cmbSeacrhField").val();
    obj.CONDITION = $("#cmbSeacrhCondition").val();
    obj.SEARCHITEM = $.trim($("#txtSearchItem").val());

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Stock.aspx/SearchCatalogbyText",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            if (data.d.length <= 0) {
                alert('No records found.');
                $("#txtSearchItem").focus();
                return false;
            }
            else if (data.d.length == 1) {
                var objdetail = {};
                objdetail.ID = data.d[0].ID;
                objdetail.SKU = data.d[0].SKU;
                objdetail.CODE = data.d[0].CODE;
                objdetail.TITLE = data.d[0].TITLE;
                objdetail.PHY_FILE_NAME = data.d[0].PHY_FILE_NAME;
                objdetail.ORG_FILE_NAME = data.d[0].ORG_FILE_NAME;
                objdetail.GENID = Math.floor((Math.random() * 1000000) + 1);
                objdetail.QTY = 1;
                objdetail.REMARKS = '';
                subItemsList.push(objdetail);
                rebuildSubTableGrid();
                $("#txtSearchItem").val('');
                $("#txtSearchItem").focus();
                return false;
            }
            else {
                tempsubItemsList = [];
                for (var i = 0; i < data.d.length; i++) {
                    var objdetail = {};
                    objdetail.ID = data.d[i].ID;
                    objdetail.SKU = data.d[i].SKU;
                    objdetail.CODE = data.d[i].CODE;
                    objdetail.TITLE = data.d[i].TITLE;
                    objdetail.PHY_FILE_NAME = data.d[i].PHY_FILE_NAME;
                    objdetail.ORG_FILE_NAME = data.d[i].ORG_FILE_NAME;
                    objdetail.GENID = Math.floor((Math.random() * 1000000) + 1);
                    objdetail.QTY = 1;
                    objdetail.REMARKS = '';
                    objdetail.JEWELLERY_NAME = data.d[i].JEWELLERY_NAME;
                    objdetail.COLLECTIONS_NAME = data.d[i].COLLECTIONS_NAME;
                    objdetail.DESIGN_NAME = data.d[i].DESIGN_NAME;
                    tempsubItemsList.push(objdetail);
                }
                rebuildItemSearchTableGrid();
                return false;
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
            alert("Error while Showing update data");
        }
    });

    document.getElementById("loader").style.display = "none";

}

function rebuildItemSearchTableGrid() {
    $('#tableitemsearch tbody').remove();
    $('#tableitemsearch').append("<tbody>");
    for (var i = 0; i < tempsubItemsList.length; i++) {
        $('#tableitemsearch').append(
            "<tr><td style='text-align:center;color:brown'><b>" + tempsubItemsList[i].SKU + "</b></td><td>" + tempsubItemsList[i].CODE + "</td><td style='color:blue'>" + tempsubItemsList[i].TITLE + "</td>" +
            "<td>" + tempsubItemsList[i].JEWELLERY_NAME + "</td><td>" + tempsubItemsList[i].COLLECTIONS_NAME + "</td><td>" + tempsubItemsList[i].DESIGN_NAME + "</td>" +
            "<td style='text-align: center'><img src='../images/static/select.png' alt='Select Record' class='selectButtonSubis handcursor' data-id='" + tempsubItemsList[i].ID + '_' + tempsubItemsList[i].GENID + "' id='btnselectSubIS_" + tempsubItemsList[i].GENID + "' value='Select' style='margin-right:5px;margin-left:5px'/> </td>" +
            "<td style='text-align: center'><img src='../images/static/imageview.png' alt='Preview' class='previewButtonSubIS handcursor' data-id='" + tempsubItemsList[i].PHY_FILE_NAME + "' id='btnPreviewSubis' value='Preview' style='margin-right:5px;margin-left:5px'/> </td></tr>");
    }
    $('#tableitemsearch').append("</tbody>");

    $("div.mhs h4").html("Search results for " + $('#cmbSeacrhField').val() + " : " + $('#txtSearchItem').val());
    $("#txtSearchItem").val('');
    $('#divISimgpreview').hide();
    $('#PopupModalItemSearch').modal('show');
    $('#PopupModalItemSearch').focus();

    $(".selectButtonSubis").click(function () {
        var id = this.id.split("_");
        var newsubItemsList = [];
        for (var i = 0; i < tempsubItemsList.length; i++) {
            if (tempsubItemsList[i].GENID == id[1]) {
                var objdetail = {};
                objdetail.ID = tempsubItemsList[i].ID;
                objdetail.SKU = tempsubItemsList[i].SKU;
                objdetail.CODE = tempsubItemsList[i].CODE;
                objdetail.TITLE = tempsubItemsList[i].TITLE;
                objdetail.PHY_FILE_NAME = tempsubItemsList[i].PHY_FILE_NAME;
                objdetail.ORG_FILE_NAME = tempsubItemsList[i].ORG_FILE_NAME;
                objdetail.GENID = tempsubItemsList[i].GENID;
                objdetail.QTY = 1;
                objdetail.REMARKS = '';
                subItemsList.push(objdetail);
                break;
            }
        }
        rebuildSubTableGrid();
        $('#PopupModalItemSearch').modal('hide');
        $("#txtSearchItem").focus();
    });

    $(".previewButtonSubIS").click(function () {
        var file = $(this).attr("data-id");
        $('#imgISpreviewsub').attr("src", "../images/upload/" + file);
        $('#divISimgpreview').show();
    });
}

function rebuildSubTableGrid() {
    $('#divimgpreview').hide();
    $('#tablesub tbody').remove();
    $('#tablesub').append("<tbody>");
    for (var i = 0; i < subItemsList.length; i++) {
        $('#tablesub').append(
            "<tr><td style='text-align:center;color:brown'><b>" + subItemsList[i].SKU + "</b></td><td>" + subItemsList[i].CODE + "</td><td style='color:blue'>" + subItemsList[i].TITLE + "</td>" +
            "<td><input type='number' id='txtqty_" + subItemsList[i].GENID + "' class='form-control subqty' value=" + subItemsList[i].QTY + " style='width:80px;text-align:center' /></td>" +
            "<td><input type='text' id='txtsubremarks_" + subItemsList[i].GENID + "' class='form-control subremarks' value='" + subItemsList[i].REMARKS + "' /></td>" +
            "<td style='text-align: center'><img src='../images/static/delete.png' alt='Delete Record' class='deleteButtonSub handcursor' data-id='" + subItemsList[i].ID + '_' + subItemsList[i].GENID + "' id='btnDeleteSub_" + subItemsList[i].GENID + "' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
            "<td style='text-align: center'><img src='../images/static/imageview.png' alt='Preview' class='previewButtonSub handcursor' data-id='" + subItemsList[i].PHY_FILE_NAME + "' id='btnPreviewSub' value='Preview' style='margin-right:5px;margin-left:5px'/> </td></tr>");
    }
    $('#tablesub').append("</tbody>");

    $('.subqty').on('input', function () {
        var id = this.id.split("_");
        for (var i = 0; i < subItemsList.length; i++) {
            if (subItemsList[i].GENID == id[1]) {
                subItemsList[i].QTY = $(this).val();
                return false;
            }
        }
    });

    $('.subremarks').on('input', function () {
        var id = this.id.split("_");
        for (var i = 0; i < subItemsList.length; i++) {
            if (subItemsList[i].GENID == id[1]) {
                subItemsList[i].REMARKS = $(this).val();
                return false;
            }
        }
    });

    $(".deleteButtonSub").click(function () {
        if (confirm("Are you sure you want to delete !") == true) {
            var id = this.id.split("_");
            var newsubItemsList = [];
            for (var i = 0; i < subItemsList.length; i++) {
                if (subItemsList[i].GENID != id[1]) {
                    newsubItemsList.push(subItemsList[i])
                }
            }
            subItemsList = [];
            subItemsList = newsubItemsList;
            rebuildSubTableGrid();
        }
    });

    $(".previewButtonSub").click(function () {
        var file = $(this).attr("data-id");
        $('#imgpreviewsub').attr("src", "../images/upload/" + file);
        $('#divimgpreview').show();
    });
}

function getMainGridDetails() {

    if (isDate($("#dtpFrom").val()) == false) {
        alert('Please enter valid date');
        $("#dtpFrom").focus();
        return false;
    }

    if (isDate($("#dtpTo").val()) == false) {
        alert('Please enter valid date');
        $("#dtpTo").focus();
        return false;
    }

    var fit_start_time = $("#dtpFrom").val(); //2013-09-5
    fit_start_time = fit_start_time.substring(6, 10) + '-' + fit_start_time.substring(3, 5) + '-' + fit_start_time.substring(0, 2);
    var fit_end_time = $("#dtpTo").val(); //2013-09-10
    fit_end_time = fit_end_time.substring(6, 10) + '-' + fit_end_time.substring(3, 5) + '-' + fit_end_time.substring(0, 2);

    if (Date.parse(fit_start_time) > Date.parse(fit_end_time)) {
        alert("Date from must be lesser than Date to.");
        $("#dtpFrom").focus();
        return false;
    }

    document.getElementById("loader").style.display = "block";

    var obj = {};
    obj.DateFrom = $("#dtpFrom").val();
    obj.DateTo = $("#dtpTo").val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Stock.aspx/GetData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>No</th><th>Date</th><th>Ledger Name</th><th>Void</th><th>Created By</th><th>Modified By</th><th></th><th></th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].TRANS_NO + "</b></td><td>" + data.d[i].TRANS_DATE + "</td><td style='color:blue'>" + data.d[i].LED_NAME + "</td><td style='text-align:center;'>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].VOID_STATUS == true ? "checked='checked'" : "") + "/></td><td>" + data.d[i].CREATEDBY + "</td><td>" + data.d[i].MODIFIEDBY +
                    "</td>" + "<td>" + "<img src='../images/static/edit.png' alt='Edit Record' class='editButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' style='margin-right:5px'/>" + "</td>" +
                    "<td><img src='../images/static/delete.png' alt='Delete Record' class='deleteButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td><img src='../images/static/void.png' alt='Void / Cancel Record' class='voidButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnVoid' value='Void' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td><img src='../images/static/print.png' alt='Print Record' class='printButton handcursor' data-id='" + data.d[i].ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tablemain').append("</tbody>");
            $('#tablemain').DataTable({
                "order": [[0, "desc"]]
            });
        },
        error: function (request, status, error) {
            alert(request.responseText);
            alert("Error while Showing update data");
        }
    });
    document.getElementById("loader").style.display = "none";
}

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex 
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[3];
    dtDay = dtArray[1];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}