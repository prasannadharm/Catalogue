﻿$(document).ready(function () {
    getDetails();

});

$(function () {
    $.ajax({
        type: "POST",
        url: "RolesMaster.aspx/GetBaseMenuList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadMenuOptions
    });
});

function LoadMenuOptions(data) {
    var optionsTrn = [];
    var optionsRep = [];
    var optionsMst = [];
    var optionsTls = [];
    for (var i = 0; i < data.d.length; i++) {
        if (data.d[i].PARENT_MENU_NAME == 'Transaction') {
            optionsTrn.push('<option value="',
              data.d[i].MENU_ID, '">',
              data.d[i].MENU_NAME, '</option>');
        }
        else if (data.d[i].PARENT_MENU_NAME == 'Reports') {
            optionsRep.push('<option value="',
              data.d[i].MENU_ID, '">',
              data.d[i].MENU_NAME, '</option>');
        }
        else if (data.d[i].PARENT_MENU_NAME == 'Master') {
            optionsMst.push('<option value="',
              data.d[i].MENU_ID, '">',
              data.d[i].MENU_NAME, '</option>');
        }
        else if (data.d[i].PARENT_MENU_NAME == 'Tools') {
            optionsTls.push('<option value="',
              data.d[i].MENU_ID, '">',
              data.d[i].MENU_NAME, '</option>');
        }

    }
    $("#selTransaction").html(optionsTrn.join(''));
    $("#selReports").html(optionsRep.join(''));
    $("#selMaster").html(optionsMst.join(''));
    $("#selTools").html(optionsTls.join(''));
}

function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RolesMaster.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>Role Name</th><th>Active</th><th>Allow Edit</th><th>Allow Delete</th><th></th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].ROLE_NAME + "</td><td style='text-align:center'>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].ACTIVE_STATUS == true ? "checked='checked'" : "") + "/></td>" +
                    "</td><td style='text-align:center'>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].ALLOW_EDIT == true ? "checked='checked'" : "") + "/></td>" +
                    "</td><td style='text-align:center'>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].ALLOW_DELETE == true ? "checked='checked'" : "") + "/></td>" +
                    "<td>" + "<input type='button' class='btn btn-warning btn-sm editButton' data-id='" + data.d[i].ROLE_ID + "' name='submitButton' id='btnEdit' value='Edit' />" + "</td>" +
                    "<td>" + "<input type='button' class='btn btn-secondary btn-sm editAuthorityButton' data-id='" + data.d[i].ROLE_ID + "' name='submitButton' id='btnEditAuthority' value='Edit Authority' />" + "</td>" +
                    "<td><input type='button' class='btn btn-danger btn-sm deleteButton' data-id='" + data.d[i].ROLE_ID + "' name='submitButton' id='btnDelete' value='Delete'/> </td></tr>");
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

    $("#btnSaveAuth").click(function () {

        var id = $(this).attr("edit-id");
        var arrobj = [];


        $('#selTransaction > option:selected').each(function () {
            var obj1 = {};
            obj1.ROLE_ID = id;
            obj1.MENU_ID = $(this).val();
            obj1.MENU_NAME = $(this).text();
            arrobj.push(obj1);
        });

        $('#selReports > option:selected').each(function () {
            var obj2 = {};
            obj2.ROLE_ID = id;
            obj2.MENU_ID = $(this).val();
            obj2.MENU_NAME = $(this).text();
            arrobj.push(obj2);
        });

        $('#selMaster > option:selected').each(function () {
            var obj3 = {};
            obj3.ROLE_ID = id;
            obj3.MENU_ID = $(this).val();
            obj3.MENU_NAME = $(this).text();
            arrobj.push(obj3);
        });

        $('#selTools > option:selected').each(function () {
            var obj4 = {};
            obj4.ROLE_ID = id;
            obj4.MENU_ID = $(this).val();
            obj4.MENU_NAME = $(this).text();
            arrobj.push(obj4);
        });

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "RolesMaster.aspx/UpdateAuthData",
            data: '{obj: ' + JSON.stringify(arrobj) + ', id : ' + id + '}',
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].RESULT === 1) {
                        alert(data.d[i].MSG);
                        $('#PopupModalAuth').modal('hide');
                    }
                    else {
                        alert(data.d[i].MSG);
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Saving Authorization data.");
                return false;
            }
        });

    });

    $("#btnSave").click(function () {
        if ($("#NAME1").val().trim() == "") {
            alert("Please enter Role Name.");
            $("#NAME1").focus();
            return false;
        }
        var obj = {};
        obj.ROLE_NAME = $("#NAME1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        if ($('#ALLOW_EDIT1').is(":checked")) {
            obj.ALLOW_EDIT = true;
        }
        else {
            obj.ALLOW_EDIT = false;
        }

        if ($('#ALLOW_DELETE1').is(":checked")) {
            obj.ALLOW_DELETE = true;
        }
        else {
            obj.ALLOW_DELETE = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "RolesMaster.aspx/InsertData",
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
            url: "RolesMaster.aspx/GetUserRights",
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
                        url: "RolesMaster.aspx/DeleteData",
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
        $("#ALLOW_DELETE1").prop('checked', true);
        $("#ALLOW_EDIT1").prop('checked', true);
        $("div.modal-header h2").html("Add Roles Details");
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
            url: "RolesMaster.aspx/GetUserRights",
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
                $("div.modal-header h2").html("Edit Roles Details");

                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "RolesMaster.aspx/EditData",
                    data: '{id: ' + id + '}',
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.d.length; i++) {
                            $("#NAME1").val(data.d[i].ROLE_NAME);
                            if (data.d[i].ACTIVE_STATUS == true)
                                $("#ACTIVE_STATUS1").prop('checked', true);
                            else
                                $("#ACTIVE_STATUS1").prop('checked', false);
                            if (data.d[i].ALLOW_EDIT == true)
                                $("#ALLOW_EDIT1").prop('checked', true);
                            else
                                $("#ALLOW_EDIT1").prop('checked', false);
                            if (data.d[i].ALLOW_DELETE == true)
                                $("#ALLOW_DELETE1").prop('checked', true);
                            else
                                $("#ALLOW_DELETE1").prop('checked', false);
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

    $(document).on("click", ".editAuthorityButton", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnSaveAuth").attr("edit-id", id);

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "RolesMaster.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_EDIT == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }

                $('#PopupModalAuth').modal('show');
                $('#PopupModalAuth').focus();
                $("#selTransaction").attr("size", $("#selMaster option").length);
                $("#selReports").attr("size", $("#selMaster option").length);
                $("#selMaster").attr("size", $("#selMaster option").length);
                $("#selTools").attr("size", $("#selMaster option").length);

                $('#selTransaction > option').each(function () {
                    $(this).prop('selected', false);
                });

                $('#selReports > option').each(function () {
                    $(this).prop('selected', false);
                });

                $('#selMaster > option').each(function () {
                    $(this).prop('selected', false);
                });

                $('#selTools > option').each(function () {
                    $(this).prop('selected', false);
                });

                //alert(id);  //getting the row id 
                $.ajax({
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    url: "RolesMaster.aspx/EditAuthData",
                    data: '{id: ' + id + '}',
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.d.length; i++) {
                            $('#selTransaction > option').each(function () {
                                if (data.d[i].MENU_ID == $(this).val())
                                    $(this).prop('selected', true);
                            });

                            $('#selReports > option').each(function () {
                                if (data.d[i].MENU_ID == $(this).val())
                                    $(this).prop('selected', true);
                            });

                            $('#selMaster > option').each(function () {
                                if (data.d[i].MENU_ID == $(this).val())
                                    $(this).prop('selected', true);
                            });

                            $('#selTools > option').each(function () {
                                if (data.d[i].MENU_ID == $(this).val())
                                    $(this).prop('selected', true);
                            });
                        }

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
            alert("Please enter Role Name.");
            $("#NAME1").focus();
            return false;
        }
        var id = $(this).attr("edit-id");
        var obj = {};
        obj.ROLE_ID = id;
        obj.ROLE_NAME = $("#NAME1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        if ($('#ALLOW_EDIT1').is(":checked")) {
            obj.ALLOW_EDIT = true;
        }
        else {
            obj.ALLOW_EDIT = false;
        }

        if ($('#ALLOW_DELETE1').is(":checked")) {
            obj.ALLOW_DELETE = true;
        }
        else {
            obj.ALLOW_DELETE = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "RolesMaster.aspx/UpdateData",
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