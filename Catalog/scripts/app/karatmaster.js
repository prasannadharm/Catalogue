﻿$(document).ready(function () {
    getDetails();

});

function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "KaratMaster.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>Name</th><th>Active</th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].NAME + "</td><td>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].ACTIVE_STATUS == true ? "checked='checked'" : "") + "/></td>" +
                    "<td>" + "<input type='button' class='btn btn-warning btn-sm editButton' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' />" + "</td>" +
                    "<td><input type='button' class='btn btn-danger btn-sm deleteButton' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete'/> </td></tr>");
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
        var obj = {};
        obj.NAME = $("#NAME1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "KaratMaster.aspx/InsertData",
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
            url: "KaratMaster.aspx/GetUserRights",
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
                        url: "KaratMaster.aspx/DeleteData",
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
        $("#ACTIVE_STATUS1").prop('checked', true);
        $("div.modal-header h2").html("Add Karat Details");
        $('#NAME1').focus();
    });

    $(document).on("click", ".editButton", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnUpdate").attr("edit-id", id);
        //alert(id);  //getting the row id 

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "KaratMaster.aspx/GetUserRights",
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
                $("#NAME1").val("");
                $("div.modal-header h2").html("Edit Karat Details");

                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "KaratMaster.aspx/EditData",
                    data: '{id: ' + id + '}',
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.d.length; i++) {
                            $("#NAME1").val(data.d[i].NAME);
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
        var id = $(this).attr("edit-id");
        var obj = {};
        obj.ID = id;
        obj.NAME = $("#NAME1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "KaratMaster.aspx/UpdateData",
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