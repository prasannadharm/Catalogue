
$(document).ready(function () {
    getDetails();
});

function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "GeneralSettings.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {
                $('#txt_SKU').val(data.d[i].SKU);
                $('#txt_STK').val(data.d[i].STOCK_ENTRY);
                $('#txt_IN').val(data.d[i].INWARD);
                $('#txt_OUT').val(data.d[i].OUTWARD);
            }
        },
        error: function () {
            alert("Error while Showing update data");
        }
    });
}

$(function () {
    $("#btnUpdateSKU").click(function () {
        if ($("#txt_SKU").val() == null || $("#txt_SKU").val() == undefined || $("#txt_SKU").val() <=0 || $("#txt_SKU").val().trim() == "") {
            alert("Please enter SKU No.");
            $("#txt_SKU").focus();
            return false;
        }      
        UpdateNos('SKU', $("#txt_SKU").val());
    });

    $("#btnUpdateSTK").click(function () {
        if ($("#txt_STK").val() == null || $("#txt_STK").val() == undefined || $("#txt_STK").val() <= 0 || $("#txt_STK").val().trim() == "") {
            alert("Please enter Stock No.");
            $("#txt_STK").focus();
            return false;
        }
        UpdateNos('STK', $("#txt_STK").val());
    });

    $("#btnUpdateIN").click(function () {
        if ($("#txt_IN").val() == null || $("#txt_IN").val() == undefined || $("#txt_IN").val() <= 0 || $("#txt_IN").val().trim() == "") {
            alert("Please enter Inward No.");
            $("#txt_IN").focus();
            return false;
        }
        UpdateNos('IN', $("#txt_IN").val());
    });

    $("#btnUpdateOUT").click(function () {
        if ($("#txt_OUT").val() == null || $("#txt_OUT").val() == undefined || $("#txt_OUT").val() <= 0 || $("#txt_OUT").val().trim() == "") {
            alert("Please enter Outward No.");
            $("#txt_OUT").focus();
            return false;
        }
        UpdateNos('OUT', $("#txt_OUT").val());
    });

});


function UpdateNos(type, no)
{
    
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: "GeneralSettings.aspx/UpdateData",
        data: '{type: ' + JSON.stringify(type) + ', no:' + JSON.stringify(no) + '}',
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {
                if (data.d[i].RESULT === 1) {
                    alert(data.d[i].MSG);
                }
                else {
                    alert(data.d[i].MSG);                    
                    return false;
                }
            }
        },
        error: function (data) {
            alert("Error while Adding data of :" + obj.NAME);            
            return false;
        }
    });
}