$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });  
    $('#dtpFrom').datepicker('setDate', today);
    $('#dtpTo').datepicker('setDate', today);
    $("#btnSearch").click(function () {
        getStockEntryDetails();
    })
    getStockEntryDetails();
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

    });

    $(document).on("click", ".editButton", function () {
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#mainlistingdiv').hide();
        $('#mainldetaildiv').show();
        $("#subheaderdiv").html("<h2>Stock Entry -> Edit Stock Entry</h2>");
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


function getStockEntryDetails() {

    if (isDate($("#dtpFrom").val()) == false)
    {
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
                    "<td><img src='../images/static/print.png' alt='Print Recodr' class='printButton handcursor' data-id='" + data.d[i].ID + "' id='btnPrint' value='Print' style='margin-right:5px;margin-left:5px'/> </td></tr>");
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
