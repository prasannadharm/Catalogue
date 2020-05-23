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
        url: "Inward.aspx/GetLatestTrasnsactionNumber",
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
            searchpendingItem();
        }
    });

    $('#REF_NO').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#INWARD_TYPE').focus();
        }
    });

    $("#btnFetch").click(function () {
        searchpendingItem();
    });

    $("#btnCloseImgPreview").click(function () {
        $('#divimgpreview').hide();
    });

    $("#btnISCloseImgPreview").click(function () {
        $('#divISimgpreview').hide();
    });

})

$(function () {
    $.ajax({
        type: "POST",
        url: "Inward.aspx/GetActiveInwardTypeList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadInwardTypeCombo
    });
});

function LoadInwardTypeCombo(data) {
    var options = [];
    options.push('<option value="',
          "0", '">',
          '--Select--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#INWARD_TYPE").html(options.join(''));
}

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
        $('#INWARD_TYPE').val(0);
        $("#ContentPlaceHolder1_LED_NAME").prop("disabled", false);

        subItemsList = [];
        rebuildSubTableGrid()
        $('#tablesub tbody').remove();
        $('#tablesub').append("<tbody>");
        $('#tablesub').append("</tbody>");

        $("#subheaderdiv").html("<h2 style='color:blue'>Inward Entry -> Add Inward Entry</h2>");

        $.ajax({
            url: "Inward.aspx/GetLatestTrasnsactionNumber",
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

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Inward.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_EDIT == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }

                var checkid = 0;
                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "Inward.aspx/CheckVoidInwardEnrty",
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
                        $("#subheaderdiv").html("<h2 style='color:blue'>Inward Entry -> Edit Inward Entry</h2>");
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
                        $('#INWARD_TYPE').val(0);
                        $("#ContentPlaceHolder1_LED_NAME").prop("disabled", true);

                        //$("#btnUpdate").attr("edit-id", id);
                        //alert(id);  //getting the row id 
                        $.ajax({
                            type: "Post",
                            contentType: "application/json; charset=utf-8",
                            url: "Inward.aspx/EditData",
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
                                    $('#INWARD_TYPE').val(data.d[0].IN_TYPE_ID);
                                    $("#subheaderdiv").html("<h2 style='color:blue'>Inward Entry -> Edit Inward Entry No: " + data.d[0].TRANS_NO + "</h2>");
                                }
                                for (var i = 0; i < data.d.length; i++) {
                                    var objdetail = {};
                                    objdetail.CATALOG_ID = data.d[i].CATALOG_ID;
                                    objdetail.SKU = data.d[i].SKU;
                                    objdetail.CODE = data.d[i].CODE;
                                    objdetail.CATALOG_TITLE = data.d[i].CATALOG_TITLE;
                                    objdetail.PHY_FILE_NAME = data.d[i].PHY_FILE_NAME;
                                    objdetail.ORG_FILE_NAME = data.d[i].ORG_FILE_NAME;
                                    objdetail.GENID = data.d[i].GENID;
                                    objdetail.QTY = data.d[i].QTY;
                                    objdetail.REMARKS = data.d[i].REMARKS;
                                    objdetail.OUT_TRANS_MAIN_ID = data.d[i].OUT_TRANS_MAIN_ID;
                                    objdetail.OUT_TRANS_NO = data.d[i].OUT_TRANS_NO;
                                    objdetail.OUT_GENID = data.d[i].OUT_GENID;
                                    objdetail.OUT_QTY = data.d[i].OUT_QTY;
                                    objdetail.OUT_BAL_QTY = data.d[i].OUT_BAL_QTY;
                                    objdetail.OUT_TRANS_DATE = data.d[i].OUT_TRANS_DATE;
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


            },
            error: function (data) {
                alert("Error while Deleting data of :" + id);
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
                url: "Inward.aspx/GetLedgersbyName",
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

        if ($("#TRANS_NO").val().trim() == "") {
            alert("Please enter Inward entry No.");
            $("#TRANS_NO").focus();
            return false;
        }

        if (isDate($("#TRANS_DATE").val()) == false) {
            alert('Please enter valid Inward entry date');
            $("#TRANS_DATE").focus();
            return false;
        }

        if ($("#INWARD_TYPE").val() == null || $("#INWARD_TYPE").val() == undefined || $("#INWARD_TYPE").val() <= 0 || $("#INWARD_TYPE").val().trim() == '') {
            alert("Please Select Inward Type.");
            $("#INWARD_TYPE").focus();
            return false;
        }

        if ($("#ContentPlaceHolder1_LED_NAME").val().trim() == "") {
            alert("Please enter Ledger name.");
            $("#ContentPlaceHolder1_LED_NAME").focus();
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
            url: "Inward.aspx/VerifyLedgerbyName",
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
                obj1.IN_TYPE_NAME = $('#INWARD_TYPE :selected').text();
                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "Inward.aspx/InsertData",
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
        var id = $(this).attr("data-id");
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_DELETE == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }

                if (confirm("Are you sure you want to delete the entry!") == true) {

                    $.ajax({
                        type: "Post",
                        contentType: "application/json; charset=utf-8",
                        url: "Inward.aspx/DeleteData",
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

            },
            error: function (data) {
                alert("Error while Deleting data of :" + id);
            }
        });


    });

    $(document).on("click", ".voidButton", function () {
        if (confirm("Are you sure you want to Void/Cancel the entry!") == true) {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "Inward.aspx/VoidData",
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
        $('#lblintypePRN').val('');
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Inward.aspx/EditData",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    $("#lblledNamePRN").text(data.d[0].LED_NAME);
                    $("#lblstkNoPRN").text(data.d[0].TRANS_NO);
                    $('#lblstkDatePRN').text(data.d[0].TRANS_DATE.split('-')[2] + '-' + data.d[0].TRANS_DATE.split('-')[1] + '-' + data.d[0].TRANS_DATE.split('-')[0]);
                    $("#lblRemarksPRN").text(data.d[0].REMARKS_MAIN);
                    $("#lblrefnoPRN").text(data.d[0].REF_NO);
                    $('#lblintypePRN').text(data.d[0].IN_TYPE_NAME);
                }

                $('#tablesubprn tbody').remove();
                $('#tablesubprn').append("<tbody>");
                for (var i = 0; i < data.d.length; i++) {
                    $('#tablesubprn').append(
                        "<tr><td style='border: 1px solid black;text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td style='border: 1px solid black;'>" + data.d[i].CODE + "</td><td style='border: 1px solid black;color:blue'>" + data.d[i].CATALOG_TITLE + "</td><td style='border: 1px solid black;text-align:center;color:red'><b>" + data.d[i].QTY + "</b></td><td style='border: 1px solid black;text-align:center;color:blue'>" + data.d[i].OUT_TRANS_NO + "</td><td style='border: 1px solid black;text-align:center;color:blue'><b>" + data.d[i].PCS + "</b></td><td style='border: 1px solid black;text-align:center'>" + data.d[i].WT + "</td></tr>");
                }
                $('#tablesubprn').append("</tbody>");
                $('#printdiv').show();
                var divToPrint = document.getElementById("printdiv");
                newWin = window.open("");
                newWin.document.write(divToPrint.outerHTML);
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

        if ($("#TRANS_NO").val().trim() == "") {
            alert("Please enter Inward entry No.");
            $("#TRANS_NO").focus();
            return false;
        }

        if (isDate($("#TRANS_DATE").val()) == false) {
            alert('Please enter valid Inward entry date');
            $("#TRANS_DATE").focus();
            return false;
        }

        if ($("#INWARD_TYPE").val() == null || $("#INWARD_TYPE").val() == undefined || $("#INWARD_TYPE").val() <= 0 || $("#INWARD_TYPE").val().trim() == '') {
            alert("Please Select Inward Type.");
            $("#INWARD_TYPE").focus();
            return false;
        }

        if ($("#ContentPlaceHolder1_LED_NAME").val().trim() == "") {
            alert("Please enter Ledger name.");
            $("#ContentPlaceHolder1_LED_NAME").focus();
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
            url: "Inward.aspx/VerifyLedgerbyName",
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
                obj1.IN_TYPE_NAME = $('#INWARD_TYPE :selected').text();

                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "Inward.aspx/UpdatetData",
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

function searchpendingItem() {

    if ($.trim($("#ContentPlaceHolder1_LED_NAME").val()) == '') {
        alert('Please select Ledger.');
        $("#ContentPlaceHolder1_LED_NAME").focus();
        return false;
    }

    document.getElementById("loader").style.display = "block";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Inward.aspx/GetPendingOutwardEntries",
        data: "{ 'str': '" + $.trim($("#ContentPlaceHolder1_LED_NAME").val()) + "'}",
        dataType: "json",
        success: function (data) {
            if (data.d.length <= 0) {
                alert('No records found.');
                $("#ContentPlaceHolder1_LED_NAME").focus();
                return false;
            }
            else {
                tempsubItemsList = [];
                for (var i = 0; i < data.d.length; i++) {
                    var fnd = 0
                    for (var j = 0; j < subItemsList.length; j++) {
                        if (subItemsList[j].OUT_TRANS_MAIN_ID == data.d[i].OUT_TRANS_MAIN_ID && subItemsList[j].OUT_GENID == data.d[i].OUT_GENID) {
                            fnd = 1
                            break;
                        }
                    }
                    if (fnd == 0) {
                        var objdetail = {};
                        objdetail.CATALOG_ID = data.d[i].CATALOG_ID;
                        objdetail.SKU = data.d[i].SKU;
                        objdetail.CODE = data.d[i].CODE;
                        objdetail.CATALOG_TITLE = data.d[i].CATALOG_TITLE;
                        objdetail.PHY_FILE_NAME = data.d[i].PHY_FILE_NAME;
                        objdetail.ORG_FILE_NAME = data.d[i].ORG_FILE_NAME;
                        objdetail.GENID = Math.floor((Math.random() * 1000000) + 1);
                        objdetail.QTY = 1;
                        objdetail.REMARKS = '';
                        objdetail.OUT_TRANS_MAIN_ID = data.d[i].OUT_TRANS_MAIN_ID;
                        objdetail.OUT_TRANS_NO = data.d[i].OUT_TRANS_NO;
                        objdetail.OUT_GENID = data.d[i].OUT_GENID;
                        objdetail.OUT_QTY = data.d[i].OUT_QTY;
                        objdetail.OUT_BAL_QTY = data.d[i].OUT_BAL_QTY;
                        objdetail.OUT_TRANS_DATE = data.d[i].OUT_TRANS_DATE;
                        tempsubItemsList.push(objdetail);
                    }
                }
                if (tempsubItemsList.length <= 0) {
                    alert('No more pending records found.');
                    $("#ContentPlaceHolder1_LED_NAME").focus();
                    return false;
                }
                rebuildItemSearchTableGrid();
                $("#ContentPlaceHolder1_LED_NAME").prop("disabled", true);
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
            "<tr><td style='text-align:center;color:red'><b>" + tempsubItemsList[i].OUT_TRANS_NO + "</b></td><td>" + tempsubItemsList[i].OUT_TRANS_DATE + "</td>" +
            "<td style='text-align:center;color:brown'><b>" + tempsubItemsList[i].SKU + "</b></td><td>" + tempsubItemsList[i].CODE + "</td><td style='color:blue'>" + tempsubItemsList[i].CATALOG_TITLE + "</td><td style='text-align:center;color:red'><b>" + tempsubItemsList[i].OUT_BAL_QTY + "</b></td>" +            
            "<td style='text-align: center'><img src='../images/static/select.png' title='Select Record' class='selectButtonSubis handcursor' data-id='" + tempsubItemsList[i].CATALOG_ID + '_' + tempsubItemsList[i].GENID + "' id='btnselectSubIS_" + tempsubItemsList[i].GENID + "' value='Select' style='margin-right:5px;margin-left:5px'/> </td>" +
            "<td style='text-align: center'><img src='../images/static/imageview.png' title='Show Preview' class='previewButtonSubIS handcursor' data-id='" + tempsubItemsList[i].PHY_FILE_NAME + "' id='btnPreviewSubis' value='Preview' style='margin-right:5px;margin-left:5px'/> </td></tr>");
    }
    $('#tableitemsearch').append("</tbody>");

    $("div.mhs h4").html("Pending Outward Entries : " + $('#ContentPlaceHolder1_LED_NAME').val());
    $('#divISimgpreview').hide();
    $('#PopupModalItemSearch').modal('show');
    $('#PopupModalItemSearch').focus();

    $(".selectButtonSubis").click(function () {
        var id = this.id.split("_");
        for (var i = 0; i < tempsubItemsList.length; i++) {
            if (tempsubItemsList[i].GENID == id[1]) {
                var objdetail = {};
                objdetail.CATALOG_ID = tempsubItemsList[i].CATALOG_ID;
                objdetail.SKU = tempsubItemsList[i].SKU;
                objdetail.CODE = tempsubItemsList[i].CODE;
                objdetail.CATALOG_TITLE = tempsubItemsList[i].CATALOG_TITLE;
                objdetail.PHY_FILE_NAME = tempsubItemsList[i].PHY_FILE_NAME;
                objdetail.ORG_FILE_NAME = tempsubItemsList[i].ORG_FILE_NAME;
                objdetail.GENID = tempsubItemsList[i].GENID;
                objdetail.QTY = tempsubItemsList[i].OUT_BAL_QTY;
                objdetail.REMARKS = '';
                objdetail.OUT_TRANS_MAIN_ID = tempsubItemsList[i].OUT_TRANS_MAIN_ID;
                objdetail.OUT_TRANS_NO = tempsubItemsList[i].OUT_TRANS_NO;
                objdetail.OUT_GENID = tempsubItemsList[i].OUT_GENID;
                objdetail.OUT_QTY = tempsubItemsList[i].OUT_QTY;
                objdetail.OUT_BAL_QTY = tempsubItemsList[i].OUT_BAL_QTY;
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
            "<tr><td style='text-align:center;color:brown'><b>" + subItemsList[i].SKU + "</b></td><td>" + subItemsList[i].CODE + "</td><td style='color:blue'>" + subItemsList[i].CATALOG_TITLE + "</td>" +
            "<td><input type='number' id='txtqty_" + subItemsList[i].GENID + "' class='form-control subqty' value=" + subItemsList[i].QTY + " style='width:80px;text-align:center' /></td>" +
            "<td style='text-align:center;color:red;padding-top: 15px;'><b>" + subItemsList[i].OUT_BAL_QTY + "</b></td>" +
            "<td><input type='text' id='txtsubremarks_" + subItemsList[i].GENID + "' class='form-control subremarks' value='" + subItemsList[i].REMARKS + "' /></td>" +
            "<td style='text-align: center'><img src='../images/static/delete.png' title='Delete Record' class='deleteButtonSub handcursor' data-id='" + subItemsList[i].CATALOG_ID + '_' + subItemsList[i].GENID + "' id='btnDeleteSub_" + subItemsList[i].GENID + "' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
            "<td style='text-align: center'><img src='../images/static/imageview.png' title='Show Preview' class='previewButtonSub handcursor' data-id='" + subItemsList[i].PHY_FILE_NAME + "' id='btnPreviewSub' value='Preview' style='margin-right:5px;margin-left:5px'/> </td></tr>");
    }
    $('#tablesub').append("</tbody>");

    $('.subqty').on('input', function () {
        var id = this.id.split("_");
        for (var i = 0; i < subItemsList.length; i++) {
            if (subItemsList[i].GENID == id[1]) {
                if ($(this).val() <= subItemsList[i].OUT_BAL_QTY) {
                    subItemsList[i].QTY = $(this).val();
                }
                else {
                    alert('Qty cannot be greater than Pending Qty.');
                    $(this).val(subItemsList[i].OUT_BAL_QTY);
                    subItemsList[i].QTY = subItemsList[i].OUT_BAL_QTY;
                }
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
        url: "Inward.aspx/GetData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>No</th><th>Date</th><th>Ledger Name</th><th>Type</th><th>Void</th><th>Created By</th><th></th><th></th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].TRANS_NO + "</b></td><td>" + data.d[i].TRANS_DATE + "</td><td style='center;color:blue'>" + data.d[i].LED_NAME + "</td><td>" +
                    data.d[i].IN_TYPE_NAME + "</td><td style='text-align:center;'>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].VOID_STATUS == true ? "checked='checked'" : "") + "/></td><td>" + data.d[i].CREATEDBY +
                    "</td>" + "<td>" + "<img src='../images/static/edit.png' title='Edit Record' class='editButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' style='margin-right:5px'/>" + "</td>" +
                    "<td><img src='../images/static/delete.png' title='Delete Record' class='deleteButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td><img src='../images/static/void.png' title='Void / Cancel Record' class='voidButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnVoid' value='Void' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td><img src='../images/static/print.png' title='Print Record' class='printButton handcursor' data-id='" + data.d[i].ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
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