﻿$(document).ready(function () {
    BuildBanner();
    
});

$(function () {
    $("#btnsearch").click(function () {
        document.location.href = '../Pages/Search.aspx?search=' + $.trim($("#txtsearch").val());
    });

    $('#txtsearch').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            document.location.href = '../Pages/Search.aspx?search=' + $.trim($("#txtsearch").val());
            return false;
        }
    });
});

function BuildBanner() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../pages/home.aspx/GetBannerData",
        data: {},
        dataType: "json",
        success: function (data) {
            var indiators = "<ul class='carousel-indicators'>";
            var details = "<div class='carousel-inner'>";
            var markers = "<a class='carousel-control-prev' href='#divbanner' data-slide='prev'><span class='carousel-control-prev-icon'></span></a>" +
                            "<a class='carousel-control-next' href='#divbanner' data-slide='next'><span class='carousel-control-next-icon'></span></a>";

            for (var i = 0; i < data.d.length; i++) {
                if (i == 0)
                    indiators = indiators + "<li data-target='#divbanner' data-slide-to=" + i + " class='active'></li>";
                else
                    indiators = indiators + "<li data-target='#divbanner' data-slide-to=" + i + "></li>";
                if (i == 0)
                    details = details + "<div class='carousel-item active'><img src='../images/upload/" + data.d[i].PHY_FILE_NAME + "' alt='" + data.d[i].HEADING + "' width='100%' height='100%'><div class='carousel-caption' style='color:" + data.d[i].FCOLOR + "'><h1>" + data.d[i].HEADING + "</h1><p>" + data.d[i].DESCRIPTION + "</p></div></div>";
                else
                    details = details + "<div class='carousel-item'><img src='../images/upload/" + data.d[i].PHY_FILE_NAME + "' alt='" + data.d[i].HEADING + "' width='100%' height='100%'><div class='carousel-caption' style='color:"+ data.d[i].FCOLOR +"' ><h1>" + data.d[i].HEADING + "</h1><p>" + data.d[i].DESCRIPTION + "</p></div></div>";
            }
            indiators = indiators + "</ul>";
            details = details + "</div>";
            $('#divbanner').append(indiators);
            $('#divbanner').append(details);
            $('#divbanner').append(markers);
            BuildTrendingItems();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            BuildTrendingItems();
        }        
    });
    
}


function BuildTrendingItems() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../pages/home.aspx/GetTrendingData",
        data: {},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {
                $('#divtrending').append("<div class='col-6 col-md-4 col-lg-3'><div class='card border-0 transform-on-hover'>" +
                "<a class='lightbox' href='../images/upload/" + data.d[i].PHY_FILE_NAME + "'><img src='../images/upload/" + data.d[i].PHY_FILE_NAME + "' alt='Card Image' class='card-img-top'>" +
                "<a><div class='card-body'><h6><a target='_blank' href='../Pages/CatalogDetails.aspx?id=" + data.d[i].ID + "'>" + data.d[i].HEADING + "</a></h6><p class='text-muted card-text'>" + data.d[i].DESCRIPTION + "</p></div></div></div> ");
            }
            baguetteBox.run('.cards-gallery', { animation: 'slideIn' });
            document.getElementById("loader").style.display = "none";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("loader").style.display = "none";
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
    
}
