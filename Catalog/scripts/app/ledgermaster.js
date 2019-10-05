var City = "";
$(document).ready(function () {
    getDetails();
});

$(function () {
    $.ajax({
        type: "POST",
        url: "LedgerMaster.aspx/GetStates",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadStateCombo
    });
});

function LoadStateCombo(data) {
    var options = [];
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].NAME, '">',
          data.d[i].NAME, '</option>');
    }
    $("#STATE1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "LedgerMaster.aspx/GetLedgerType",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadLedgerTypeCombo
    });
});

function LoadLedgerTypeCombo(data) {
    var options = [];
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#LEDGER_TYPE1").html(options.join(''));
}

//Loading City Combo on State Combo Change
function StateComboChange() {
    if ($('#STATE1').val() != '') {
        $("#CITY1").html();
        $.ajax({
            type: "POST",
            url: "LedgerMaster.aspx/GetCityByState",
            data: "{str: '" + $('#STATE1').val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: LoadCityCombo
        });
    }
    else {
        $('#CITY1')
        .find('option')
        .remove()
        .end()
        .append('<option value="whatever">text</option>')
        .val('whatever');
    }
}

function LoadCityCombo(data) {
    var options = [];
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].CITY, '">',
          data.d[i].CITY, '</option>');
    }
    $("#CITY1").html(options.join(''));
    if (City.trim() != '') {
        $("#CITY1").val(City).change();
        City = '';
    }
}

function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LedgerMaster.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>Name</th><th>Alias Name</th><th>Type</th><th>Mobile</th><th>City</th><th>Active</th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].NAME + "</td><td>" + data.d[i].ALIAS_NAME + "</td><td>" + data.d[i].LEDGER_TYPE + "</td><td>" + data.d[i].MOBILE + "</td><td>" + data.d[i].CITY + "</td><td>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].ACTIVE_STATUS == true ? "checked='checked'" : "") + "/></td>" +
                    "<td>" + "<img src='../images/static/edit.png' alt='Edit Record' class='editButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' style='margin-right:5px'/>" + "</td>" +
                    "<td><img src='../images/static/delete.png' alt='Delete Record' class='deleteButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tablemain').append("</tbody>");
            $('#tablemain').DataTable();
            //data-toggle='modal' data-target='#PopupModal'
        },
        error: function () {
            alert("Error while Showing update data");
        }

        //
    });
}

$(function () {
    $("#btnSave").click(function () {
        if ($("#NAME1").val().trim() == "") {
            alert("Please enter Name.");
            $("#NAME1").focus();
            return false;
        }

        if ($("#LEDGER_TYPE1").val() == null) {
            alert("Please select Ledger Type.");
            $("#LEDGER_TYPE1").focus();
            return false;
        }

        if ($("#STATE1").val() == null) {
            alert("Please select State.");
            $("#STATE1").focus();
            return false;
        }

        if ($("#CITY1").val() == null) {
            alert("Please select City.");
            $("#CITY1").focus();
            return false;
        }

        var obj = {};
        //obj.ID = $("#ID").val();
        obj.NAME = $("#NAME1").val();
        obj.ALIAS_NAME = $("#ALIAS_NAME1").val();
        obj.ADDRESS = $("#ADDRESS1").val();
        obj.STATE = $("#STATE1").val();
        obj.CITY = $("#CITY1").val();
        obj.PIN_NO = $("#PIN_NO1").val();
        obj.LEDGER_TYPE_ID = $("#LEDGER_TYPE1").val();
        obj.MOBILE = $("#MOBILE1").val();
        obj.TELEPHONE = $("#TELEPHONE1").val();
        obj.EMAIL = $("#EMAIL1").val();
        obj.WEB = $("#WEB1").val();
        obj.GSTIN = $("#GSTIN1").val();
        obj.REMARKS = $("#REMARKS1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "LedgerMaster.aspx/InsertData",
            data: '{obj: ' + JSON.stringify(obj) + '}',
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].RESULT === 1) {
                        getDetails();
                        alert(data.d[i].MSG);
                        $('#PopupModal').modal('hide');
                    }
                    else {
                        alert(data.d[i].MSG);
                        $("#NAME1").focus();
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Adding data of :" + obj.NAME);
                $("#NAME1").focus();
                return false;
            }
        });

    });

    $(document).on("click", ".deleteButton", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "LedgerMaster.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_DELETE == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }

                if (confirm("Are you sure you want to delete !") == true) {

                    $.ajax({
                        type: "Post",
                        contentType: "application/json; charset=utf-8",
                        url: "LedgerMaster.aspx/DeleteData",
                        data: '{id: ' + id + '}',
                        dataType: "json",
                        success: function (data) {
                            for (var i = 0; i < data.d.length; i++) {
                                if (data.d[i].RESULT === 1) {
                                    getDetails();
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

    $(document).on("click", ".addNewButton", function () {
        $('#btnSave').show();
        $('#btnUpdate').hide();
        $('#PopupModal').modal('show');
        $('#PopupModal').focus();


        $("#NAME1").val('');
        $("#ALIAS_NAME1").val('');
        $("#ADDRESS1").val('');
        $("#PIN_NO1").val('');
        $("#LEDGER_TYPE1").val('');
        $("#MOBILE1").val('');
        $("#TELEPHONE1").val('');
        $("#EMAIL1").val('');
        $("#WEB1").val('');
        $("#GSTIN1").val('');
        $("#REMARKS1").val('');
        $("#CITY1").val('');
        $("#STATE1").val('');
        $("#ACTIVE_STATUS1").prop('checked', true);
        $("div.modal-header h2").html("Add Ledger Details");
        $('#NAME1').focus();
    });

    $(document).on("click", ".editButton", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnUpdate").attr("edit-id", id);

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "LedgerMaster.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_EDIT == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }


                $('#btnSave').hide();
                $('#btnUpdate').show();
                $('#PopupModal').modal('show');
                $('#PopupModal').focus();
                $("#NAME1").val('');
                $("#ALIAS_NAME1").val('');
                $("#ADDRESS1").val('');
                $("#PIN_NO1").val('');
                $("#LEDGER_TYPE1").val('');
                $("#MOBILE1").val('');
                $("#TELEPHONE1").val('');
                $("#EMAIL1").val('');
                $("#WEB1").val('');
                $("#GSTIN1").val('');
                $("#REMARKS1").val('');
                $("#CITY1").val('');
                $("#STATE1").val('');
                $("#ACTIVE_STATUS1").prop('checked', true);
                $("div.modal-header h2").html("Edit Ledger Details");

                //alert(id);  //getting the row id 
                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "LedgerMaster.aspx/EditData",
                    data: '{id: ' + id + '}',
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.d.length; i++) {
                            $("#NAME1").val(data.d[i].NAME);
                            $("#ALIAS_NAME1").val(data.d[i].ALIAS_NAME);
                            $("#ADDRESS1").val(data.d[i].ADDRESS);
                            $("#PIN_NO1").val(data.d[i].PIN_NO);
                            $("#LEDGER_TYPE1").val(data.d[i].LEDGER_TYPE_ID);
                            $("#MOBILE1").val(data.d[i].MOBILE);
                            $("#TELEPHONE1").val(data.d[i].TELEPHONE);
                            $("#EMAIL1").val(data.d[i].EMAIL);
                            $("#WEB1").val(data.d[i].WEB);
                            $("#GSTIN1").val(data.d[i].GSTIN);
                            $("#REMARKS1").val(data.d[i].REMARKS);
                            City = data.d[i].CITY;
                            $("#STATE1").val(data.d[i].STATE).change();
                            if (data.d[i].ACTIVE_STATUS == true)
                                $("#ACTIVE_STATUS1").prop('checked', true);
                            else
                                $("#ACTIVE_STATUS1").prop('checked', false);
                        }
                        $('#NAME1').focus();
                    },
                    error: function () {
                        alert("Error while retrieving data of :" + id);
                    }
                });

            },
            error: function (data) {
                alert("Error while Deleting data of :" + id);
            }
        });

    });

    $("#btnUpdate").click(function () {
        if ($("#NAME1").val().trim() == "") {
            alert("Please enter Name.");
            $("#NAME1").focus();
            return false;
        }

        if ($("#LEDGER_TYPE1").val() == null) {
            alert("Please select Ledger Type.");
            $("#LEDGER_TYPE1").focus();
            return false;
        }

        if ($("#STATE1").val() == null) {
            alert("Please select State.");
            $("#STATE1").focus();
            return false;
        }

        if ($("#CITY1").val() == null) {
            alert("Please select City.");
            $("#CITY1").focus();
            return false;
        }

        var id = $(this).attr("edit-id");
        var obj = {};
        obj.ID = id;
        obj.NAME = $("#NAME1").val();
        obj.ALIAS_NAME = $("#ALIAS_NAME1").val();
        obj.ADDRESS = $("#ADDRESS1").val();
        obj.STATE = $("#STATE1").val();
        obj.CITY = $("#CITY1").val();
        obj.PIN_NO = $("#PIN_NO1").val();
        obj.LEDGER_TYPE_ID = $("#LEDGER_TYPE1").val();
        obj.MOBILE = $("#MOBILE1").val();
        obj.TELEPHONE = $("#TELEPHONE1").val();
        obj.EMAIL = $("#EMAIL1").val();
        obj.WEB = $("#WEB1").val();
        obj.GSTIN = $("#GSTIN1").val();
        obj.REMARKS = $("#REMARKS1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "LedgerMaster.aspx/UpdateData",
            data: '{obj: ' + JSON.stringify(obj) + ', id : ' + id + '}',
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].RESULT === 1) {
                        getDetails();
                        alert(data.d[i].MSG);
                        $('#PopupModal').modal('hide');
                    }
                    else {
                        alert(data.d[i].MSG);
                        $("#NAME1").focus();
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Updating data of :" + id);
                $("#NAME1").focus();
                return false;
            }
        });
    });

});