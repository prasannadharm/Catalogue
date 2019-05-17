$(document).ready(function () {
    getImageDetails();
    getContentDetails();    
});


function getContentDetails() {
    var id = $('#hdnid').val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CatalogDetails.aspx/GetContentData",
        data: '{id: ' + id + '}',
        dataType: "json",
        success: function (data) {            
            $('#tabledetails').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tabledetails').append(
                    "<tr><td><b>" + data.d[i].NAME + "</b></td>" +
                    "<td>" + data.d[i].VALUE + "</td></tr>");
            }
            if (data.d.length > 0)
            {
                $('#headerdiv').html("<h4>" + data.d[0].VALUE + "</h4>");
            }
            $('#tabledetails').append("</tbody>");                        
        },
        error: function () {
            alert("Error while Showing update data");
        }

        //
    });
}

function getImageDetails() {
    var id = $('#hdnid').val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CatalogDetails.aspx/GetImagesData",
        data: '{id: ' + id + '}',
        dataType: "json",
        success: function (data) {            
            for (var i = 0; i < data.d.length; i++) {
                $('#glasscase').append("<li><img src='../images/upload/" + data.d[i].PHY_FILE_NAME + "' alt='Text' /></li>");
            }
            $('#glasscase').glassCase({ 'thumbsPosition': 'bottom', 'widthDisplay': 560 });
        },
        error: function () {
            alert("Error while Showing update data");
        }

        //
    });
}
