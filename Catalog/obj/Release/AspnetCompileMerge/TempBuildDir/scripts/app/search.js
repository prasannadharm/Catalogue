$(document).ready(function () {
    $('#txtSearch').val($('#hdnsearch').val());   
});

$(function () {
    $("#btnSearch").click(function () {        
        searchdata();
    });
});

function searchdata()
{
    document.getElementById("loader").style.display = "block";
    //$('#cmbJewellery > option:selected').each(function () {
    //    alert($(this).text());
    //    alert($(this).val());
    //});

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../pages/Search.aspx/GetSearchData",
        data: {},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {
                $('#divsearch').append("<div class='col-6 col-md-4 col-lg-3'><div class='card border-0 transform-on-hover'>" +
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


$(function () {
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveJewelleryList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadJewelleryCombo
    });
});

function LoadJewelleryCombo(data) {
    var options = [];    
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmbJewellery").html(options.join(''));
    $("#cmbJewellery").addClass("selectpicker");
    $("#cmbJewellery").addClass("form-control");
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveDesignList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDesignCombo
    });
}


function LoadDesignCombo(data) {
    var options = [];
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmbDesign").html(options.join(''));
    $("#cmbDesign").addClass("selectpicker");
    $("#cmbDesign").addClass("form-control");
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveCollectionsList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCollectionsCombo
    });
}

function LoadCollectionsCombo(data) {
    var options = [];   
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmbCollection").html(options.join(''));
    $("#cmbCollection").addClass("selectpicker");
    $("#cmbCollection").addClass("form-control");
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveMaterialList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadMaterialCombo
    });
}

function LoadMaterialCombo(data) {
    var options = [];  
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmbMaterial").html(options.join(''));
    $("#cmbMaterial").addClass("selectpicker");
    $("#cmbMaterial").addClass("form-control");
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveOccasionList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadOccasionCombo
    });
}


function LoadOccasionCombo(data) {
    var options = []; 
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmbOccasion").html(options.join(''));
    $("#cmbOccasion").addClass("selectpicker");
    $("#cmbOccasion").addClass("form-control");
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveGramSlabList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadGramSlabCombo
    });
}


function LoadGramSlabCombo(data) {
    var options = [];    
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#CmbGramSlab").html(options.join(''));
    $("#CmbGramSlab").addClass("selectpicker");
    $("#CmbGramSlab").addClass("form-control");
    $.ajax({
        type: "POST",
        url: "Search.aspx/GetActiveKaratList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadKaratCombo
    });
}

function LoadKaratCombo(data) {
    var options = [];   
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmbKarat").html(options.join(''));
    $("#cmbKarat").addClass("selectpicker");
    $("#cmbKarat").addClass("form-control");
    $('.selectpicker').selectpicker('');
    document.getElementById("loader").style.display = "none";
    searchdata();
}

//Combos Loading Code - End

