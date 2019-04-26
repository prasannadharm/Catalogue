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
    //$("#btnSave").click(function () {
    //    var user = {};
    //    user.Name = $("#FirstName").val();
    //    user.Id = $("#Surname").val();
    //    user.Nationality = $("#Nationality").val();
    //    user.Doj = $("#Doj").val();
    //    $.ajax({
    //        type: "POST",
    //        url: "Default.aspx/SaveUser",
    //        data: '{objEmployee: ' + JSON.stringify(user) + '}',
    //        dataType: "json",
    //        contentType: "application/json; charset=utf-8",
    //        success: function () {
    //            alert("User has been added successfully.");
    //            getDetails();
    //        },
    //        error: function () {
    //            alert("Error while inserting data");
    //        }
    //    });
    //    return false;
    //});     

    //$(document).on("click", ".deleteButton", function () {
    //    var id = $(this).attr("data-id");
    //    $.ajax({
    //        type: "Post",
    //        contentType: "application/json; charset=utf-8",
    //        url: "Default.aspx/Remove",
    //        data: '{eid: ' + id + '}',
    //        dataType: "json",
    //        success: function () {
    //            if (confirm("Are you sure you want to delete !") == true) {
    //                alert("Data Deleted successfully");
    //            } else {
    //                alert("You have canceled the changes");
    //            }
    //            //alert("Data Updated successfully");
    //            getDetails();
    //        },
    //        error: function (data) {
    //            alert("Error while Updating data of :" + id);
    //        }
    //    });


    //});

    $(document).on("click", ".editButton", function () {
        $('#myModal').focus();
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