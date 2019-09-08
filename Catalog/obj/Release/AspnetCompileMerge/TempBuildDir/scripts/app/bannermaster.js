$(document).ready(function () {
    getDetails();  
});

function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Banner.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>Heading</th><th></th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].HEADING + "</td>" +
                    "<td><span style='float:left; margin-left:10px; width:40px;' ><a class='btn btn-success btn-sm downloadButton' href='BannerImageUpload.ashx?action=DOWNLOAD&id=" + data.d[i].ID + "'>Download</a></span></td>"  +
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

        if ($("#HEADING1").val().trim() == "") {
            alert("Please enter Heading.");
            $("#HEADING1").focus();
            return false;
        }

        if ($("#DESCRIPTION1").val().trim() == "") {
            alert("Please enter Description.");
            $("#DESCRIPTION1").focus();
            return false;
        }

        if ($('#fileToUpload').val() == null || $('#fileToUpload').val() == "") {
            alert('Please Select an Image file upload');
            $('#fileToUpload').focus();
            return;
        }

        var heading = $("#HEADING1").val().trim();
        var desc = $("#DESCRIPTION1").val().trim();
        var fcolor = $("#FCOLOR1").val().trim();
        var fileToUpload = getNameFromPath($('#fileToUpload').val());
        var orgfilename = fileToUpload;
        var phyfilename = 'BannerImage_' + String(getFormattedTimeStamp()) + '.' + orgfilename.substr((orgfilename.lastIndexOf('.') + 1));

        if (checkFileExtension(fileToUpload)) {
            if (orgfilename != "" && orgfilename != null) {                

                $("#loading").show();
                $.ajaxFileUpload({
                    url: 'BannerImageUpload.ashx?action=UPLOAD&phy_file_name=' + phyfilename + '&org_file_name=' + orgfilename + '&heading=' + heading + '&desc=' + desc + '&fcolor=' + fcolor,
                    secureuri: false,
                    fileElementId: 'fileToUpload',
                    dataType: 'json',
                    success: function (data, status) {
                        if (typeof (data.error) != 'undefined') {
                            if (data.error != '') {
                                alert(data.error);
                            } else {
                                $('#fileToUpload').val("");
                                $('#PopupModal').modal('hide');
                                alert('File Uploaded Successfully.')
                                getDetails();
                                
                            }
                        }
                        $("#loading").hide();
                    },
                    error: function (data, status, e) {
                        alert(e);
                        $("#loading").hide();
                    }
                });

            }
        }
        else {
            alert('You can upload only jpg,jpeg,png extension Image files.');
        }

    });

    $(document).on("click", ".deleteButton", function () {
        if (confirm("Are you sure you want to delete !") == true) {
            var id = $(this).attr("data-id");
            $.ajax({
                url: 'BannerImageUpload.ashx?action=DELETE&id=' + id,
                type: "GET",
                cache: false,
                async: true,
                success: function (html) {
                    getDetails();
                    alert('File Deleted successfully.')
                }
            });
        }

    });

    $(document).on("click", ".addNewButton", function () {
        $('#btnSave').show();
        $('#btnUpdate').hide();
        $('#PopupModal').modal('show');
        $('#PopupModal').focus();
        $("#HEADING1").val('');
        $("#DESCRIPTION1").val('');
        $("#fileToUpload").val('');
        $("#fileToUpload").show();

        $("#FCOLOR1").val('#ffffff');
        $('#FCOLOR1').css('background-color', '#ffffff');      

        $("div.modal-header h2").html("Add Banner Details");
        $('#HEADING1').focus();
    });

    $(document).on("click", ".editButton", function () {
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#PopupModal').modal('show');
        $('#PopupModal').focus();
        $("#HEADING1").val('');
        $("#DESCRIPTION1").val('');
        $("#fileToUpload").val('');
        $("#fileToUpload").hide();
        $("div.modal-header h2").html("Edit Banner Details");
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnUpdate").attr("edit-id", id);
        //alert(id);  //getting the row id 
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Banner.aspx/EditData",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    $("#HEADING1").val(data.d[i].HEADING);
                    $("#DESCRIPTION1").val(data.d[i].DESCRIPTION);
                    $("#FCOLOR1").val(data.d[i].FCOLOR);
                    $('#FCOLOR1').css('background-color', data.d[i].FCOLOR);                   
                }
                $('#HEADING1').focus();
            },
            error: function () {
                alert("Error while retrieving data of :" + id);
            }
        });
    });

    $("#btnUpdate").click(function () {
        if ($("#HEADING1").val().trim() == "") {
            alert("Please enter Heading.");
            $("#HEADING1").focus();
            return false;
        }

        if ($("#DESCRIPTION1").val().trim() == "") {
            alert("Please enter Description.");
            $("#DESCRIPTION1").focus();
            return false;
        }
        var id = $(this).attr("edit-id");
        var obj = {};
        obj.ID = id;
        obj.HEADING = $("#HEADING1").val();
        obj.DESCRIPTION = $("#DESCRIPTION1").val();
        obj.FCOLOR = $("#FCOLOR1").val();
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "Banner.aspx/UpdateData",
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
                        $("#HEADING1").focus();
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Updating data of :" + id);
                $("#HEADING1").focus();
                return false;
            }
        });
    });

});

function getFormattedTimeStamp() {
    var today = new Date();
    var y = today.getFullYear();
    // JavaScript months are 0-based.
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    var ms = today.getMilliseconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s + "-" + ms;
}

function checkFileExtension(file) {
    var flag = true;
    var extension = file.substr((file.lastIndexOf('.') + 1));

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'JPG':
        case 'JPEG':
        case 'PNG':
            flag = true;
            break;
        default:
            flag = false;
    }

    return flag;
}

//get file path from client system
function getNameFromPath(strFilepath) {

    var objRE = new RegExp(/([^\/\\]+)$/);
    var strName = objRE.exec(strFilepath);

    if (strName == null) {
        return null;
    }
    else {
        return strName[0];
    }
}