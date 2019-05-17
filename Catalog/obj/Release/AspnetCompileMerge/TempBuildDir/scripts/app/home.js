$(document).ready(function () {
    BuildBanner();
    BuildTrendingItems();
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
                if (i==0)
                    details = details + "<div class='carousel-item active'><img src='../images/upload/" + data.d[i].PHY_FILE_NAME + "' alt='" + data.d[i].HEADING + "' width='100%' height='500'><div class='carousel-caption captionfont'><h1>" + data.d[i].HEADING + "</h1><p>" + data.d[i].DESCRIPTION + "</p></div></div>";
                else
                    details = details + "<div class='carousel-item'><img src='../images/upload/" + data.d[i].PHY_FILE_NAME + "' alt='" + data.d[i].HEADING + "' width='100%' height='500'><div class='carousel-caption captionfont'><h1>" + data.d[i].HEADING + "</h1><p>" + data.d[i].DESCRIPTION + "</p></div></div>";
            }
            indiators = indiators + "</ul>";
            details = details + "</div>";
            $('#divbanner').append(indiators);
            $('#divbanner').append(details);
            $('#divbanner').append(markers);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
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
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
