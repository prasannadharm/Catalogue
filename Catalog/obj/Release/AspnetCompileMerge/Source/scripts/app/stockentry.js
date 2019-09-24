var subItemsList = [];
var tempsubItemsList = [];
$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    subItemsList = [];
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $('#dtpFrom').datepicker('setDate', today);
    $('#dtpTo').datepicker('setDate', today);

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
    getMainGridDetails();

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
        $('#TRASN_DATE').datepicker('setDate', today);
        $("#ContentPlaceHolder1_LED_NAME").val('');
        $("#ContentPlaceHolder1_LED_ID").val('');
        $('#REMARKS').val('');
        $('#REF_NO').val('');
        subItemsList = [];
        $('#tablesub tbody').remove();
        $('#tablesub').append("<tbody>");
        $('#tablesub').append("</tbody>");

        $("#subheaderdiv").html("<h2>Stock Entry -> Add Stock Entry</h2>");

        $.ajax({
            url: "Stock.aspx/GetLatestTrasnsactionNumber",
            data: '{}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    $('#TRANS_NO').val(data.d[i].split('-')[0]);
                    $('#TRASN_DATE').datepicker('setDate', Date.parse(data.d[i].split('-')[1]));
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
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#mainlistingdiv').hide();
        $('#mainldetaildiv').show();
        $("#subheaderdiv").html("<h2>Stock Entry -> Edit Stock Entry</h2>");
        subItemsList = [];
        $('#tablesub tbody').remove();
        $('#tablesub').append("<tbody>");
        $('#tablesub').append("</tbody>");

        $("#ContentPlaceHolder1_LED_NAME").focus();
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

});


function searchItem() {
    if ($.trim($("#cmbSeacrhField").val()) == '') {
        alert('Please select search field.');
        $("#cmbSeacrhField").focus();
        return;
    }

    if ($.trim($("#cmbSeacrhCondition").val()) == '') {
        alert('Please select search condition.');
        $("#cmbSeacrhCondition").focus();
        return;
    }

    if ($.trim($("#txtSearchItem").val()) == '') {
        alert('Please enter search text.');
        $("#txtSearchItem").focus();
        return;
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
                return;
            }
            else if (data.d.length == 1) {
                var objdetail = {};
                objdetail.ID = data.d[0].ID;
                objdetail.SKU = data.d[0].SKU;
                objdetail.CODE = data.d[0].CODE;
                objdetail.TITLE = data.d[0].TITLE;
                objdetail.PHY_FILE_NAME = data.d[0].PHY_FILE_NAME;
                objdetail.ORG_FILE_NAME = data.d[0].ORG_FILE_NAME;
                objdetail.GENID = Math.floor((Math.random() * 10000) + 1);
                objdetail.QTY = 1;
                objdetail.REMARKS = '';
                subItemsList.push(objdetail);
                rebuildSubTableGrid();
                $("#txtSearchItem").val('');
                $("#txtSearchItem").focus();
                return;
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
                    objdetail.GENID = Math.floor((Math.random() * 10000) + 1);
                    objdetail.QTY = 1;
                    objdetail.REMARKS = '';
                    objdetail.JEWELLERY_NAME = data.d[i].JEWELLERY_NAME;
                    objdetail.COLLECTIONS_NAME = data.d[i].COLLECTIONS_NAME;
                    objdetail.DESIGN_NAME = data.d[i].DESIGN_NAME;
                    tempsubItemsList.push(objdetail);
                }
                rebuildItemSearchTableGrid();
                return;
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
            "<tr><td style='text-align:center'>" + tempsubItemsList[i].SKU + "</td><td>" + tempsubItemsList[i].CODE + "</td><td>" + tempsubItemsList[i].TITLE + "</td>" +
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
                objdetail.GENID = Math.floor((Math.random() * 10000) + 1);
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
    $('#tablesub tbody').remove();
    $('#tablesub').append("<tbody>");
    for (var i = 0; i < subItemsList.length; i++) {
        $('#tablesub').append(
            "<tr><td style='text-align:center'>" + subItemsList[i].SKU + "</td><td>" + subItemsList[i].CODE + "</td><td>" + subItemsList[i].TITLE + "</td>" +
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
                return;
            }
        }
    });

    $('.subremarks').on('input', function () {
        var id = this.id.split("_");
        for (var i = 0; i < subItemsList.length; i++) {
            if (subItemsList[i].GENID == id[1]) {
                subItemsList[i].REMARKS = $(this).val();
                return;
            }
        }
    });

    $(".deleteButtonSub").click(function () {
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
        return;
    }

    if (isDate($("#dtpTo").val()) == false) {
        alert('Please enter valid date');
        $("#dtpTo").focus();
        return;
    }

    var fit_start_time = $("#dtpFrom").val(); //2013-09-5
    fit_start_time = fit_start_time.substring(6, 10) + '-' + fit_start_time.substring(3, 5) + '-' + fit_start_time.substring(0, 2);
    var fit_end_time = $("#dtpTo").val(); //2013-09-10
    fit_end_time = fit_end_time.substring(6, 10) + '-' + fit_end_time.substring(3, 5) + '-' + fit_end_time.substring(0, 2);

    if (Date.parse(fit_start_time) > Date.parse(fit_end_time)) {
        alert("Date from must be lesser than Date to.");
        $("#dtpFrom").focus();
        return;
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
            $('#tablemain').append("<thead><tr><th>Stock No</th><th>Date</th><th>Ledger Name</th><th>Remarks</th><th>Void</th><th>Created By</th><th>Modified By</th><th></th><th></th><th></th>   </tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].TRANS_NO + "</td><td>" + data.d[i].TRASN_DATE + "</td><td>" + data.d[i].LED_NAME + "</td><td>" + data.d[i].REMARKS + "</td><td>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].VOID_STATUS == true ? "checked='checked'" : "") + "/></td><td>" + data.d[i].CREATEDBY + "</td><td>" + data.d[i].MODIFIEDBY +
                    "</td>" + "<td>" + "<img src='../images/static/edit.png' alt='Edit Record' class='editButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' style='margin-right:5px'/>" + "</td>" +
                    "<td><img src='../images/static/delete.png' alt='Delete Record' class='deleteButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
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
