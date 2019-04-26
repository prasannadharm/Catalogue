$(document).ready(function () {    
    getDetails();
});


function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "JewelleryMaster.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].NAME + "</td><td>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].ACTIVE_STATUS == true ? "checked='checked'" : "") + "/></td>" +
                    "<td>" + "<input type='button' class='btn btn-warning btn-sm editButton' data-id='" + data.d[i].ID + "' data-toggle='modal' data-target='#myModal' name='submitButton' id='btnEdit' value='Edit' />" + "</td>" +
                    "<td><input type='button' class='btn btn-danger btn-sm deleteButton' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete'/> </td></tr>");
            }
            $('#tablemain').append("</tbody>");
            $('#tablemain').DataTable();
            },
        error: function () {
            alert("Error while Showing update data");
        }
    });
}


$(function () {
    $("#btnSave").click(function () {
        var obj = {};
        obj.NAME = $("#NAME1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }

        if (confirm("Are you sure you Add the details!") == true) {
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "JewelleryMaster.aspx/InsertData",
                data: '{obj: ' + JSON.stringify(obj) + '}',
                dataType: "json",
                success: function (data) {
                    alert("Data added successfully");
                    getDetails();
                },
                error: function (data) {
                    alert("Error while Adding data of :" + obj.NAME);
                }
            });
        }
        else {
            alert("You have canceled the changes");
        }
    });     

    $(document).on("click", ".deleteButton", function () {
        if (confirm("Are you sure you want to delete !") == true) {

            var id = $(this).attr("data-id");
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "JewelleryMaster.aspx/DeleteData",
                data: '{id: ' + id + '}',
                dataType: "json",
                success: function () {
                    alert("Data Deleted successfully");
                    getDetails();
                },
                error: function (data) {
                    alert("Error while Deleting data of :" + id);
                }
            });
        }        

    });

    $(document).on("click", ".addNewButton", function () {
        $('#btnSave').show();
        $('#btnUpdate').hide();
        $('#myModal').focus();
        $("#NAME1").val('');
        $("#ACTIVE_STATUS1").prop('checked', true);
        $('#NAME1').focus();
        $('myModalLabel').val('Add Jewellery Details');
    });
    
    $(document).on("click", ".editButton", function () {
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#myModal').focus();
        $('myModalLabel').val('Edit Jewellery Details');
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnUpdate").attr("edit-id", id);
        //alert(id);  //getting the row id 
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "JewelleryMaster.aspx/EditData",
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
            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });
    });

    $("#btnUpdate").click(function () {
        var id = $(this).attr("edit-id");
        var obj = {};
        obj.ID = id;
        obj.NAME = $("#NAME1").val();
        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else
        {
            obj.ACTIVE_STATUS = false;
        }

        if (confirm("Are you sure you want to change !") == true) {
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "JewelleryMaster.aspx/UpdateData",
                data: '{obj: ' + JSON.stringify(obj) + ', id : ' + id + '}',
                dataType: "json",
                success: function (data) {
                    alert("Data Updated successfully");
                    getDetails();
                },
                error: function (data) {
                    alert("Error while Updating data of :" + id);
                }
            });
        }
        else
        {
            alert("You have canceled the changes");
        }
    });
    
});