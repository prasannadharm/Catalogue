$(document).ready(function () {
    $('#txtSearch').val($('#hdnsearch').val());   
});

$(function () {
    $("#btnSearch").click(function () {        
        searchdata();
    });

    $('#txtSku').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            searchdata();
        }
    });

    $('#txtCode').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            searchdata();
        }
    });

    $('#txtSearch').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            searchdata();
        }
    });
});

function searchdata()
{
    $('#democollapseBtn').collapse('hide');
    document.getElementById("loader").style.display = "block";

    var obj = {};
    obj.SEARCHTEXT = $("#txtSearch").val();
    obj.SKU = $("#txtSku").val();
    obj.CODE = $("#txtCode").val();


    var strjewel = [];
    $('#cmbJewellery > option:selected').each(function () {
        strjewel.push($(this).val());
    });
    obj.JEWELLERYIDS = strjewel.join(',');


    var strjdesign = [];
    $('#cmbDesign > option:selected').each(function () {
        strjdesign.push($(this).val());
    });
    obj.DESIGNIDS = strjdesign.join(',');

    var strcoll = [];
    $('#cmbCollection > option:selected').each(function () {
        strcoll.push($(this).val());
    });
    obj.COLLECTIONSIDS = strcoll.join(',');

    var strmat = [];
    $('#cmbMaterial > option:selected').each(function () {
        strmat.push($(this).val());
    });
    obj.MATERIALIDS = strmat.join(',');

    var strocc = [];
    $('#cmbOccasion > option:selected').each(function () {
        strocc.push($(this).val());
    });
    obj.OCCASIONIDS = strocc.join(',');

    var strgramslab = [];
    $('#CmbGramSlab > option:selected').each(function () {
        strgramslab.push($(this).val());
    });
    obj.GRAMSLABIDS = strgramslab.join(',');

    var strkarat = [];
    $('#cmbKarat > option:selected').each(function () {
        strkarat.push($(this).val());
    });
    obj.KARATIDS = strkarat.join(',');

    if ($('#chk_Showall').is(":checked")) {
        obj.SHOWINSTOCK = false;
    }
    else {
        obj.SHOWINSTOCK = true;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../pages/Search.aspx/GetSearchData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#divsearch').remove();
            $('#secsearch').append("<div class='row' id='divsearch'></div>");
            if (data.d.length <= 0)
            {
                if ($.trim(obj.SEARCHTEXT) == '')
                    $('#divsearch').append("<label style='margin-left:15px'>No results found.</label>");
                else
                    $('#divsearch').append("<label style='margin-left:15px'>No results for " + obj.SEARCHTEXT + "</label>");
            }
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
        url: "Search.aspx/GetDropdownLisData",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCombos
    });
});

function LoadCombos(data)
{
    var optionsJewel = [];
    var optionsDesign = [];
    var optionsCollection = [];
    var optionsMaterial = [];
    var optionsOccasion = [];
    var optionsGramSlab = [];
    var optionsKarat = [];
    for (var i = 0; i < data.d.length; i++) {
        if (data.d[i].TYPE == 'JEWELLERY')
        {
              optionsJewel.push('<option value="',
              data.d[i].ID, '">',
              data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'DESIGN')
        {
              optionsDesign.push('<option value="',
              data.d[i].ID, '">',
              data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'COLLECTON') {
            optionsCollection.push('<option value="',
            data.d[i].ID, '">',
            data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'MATERIAL') {
            optionsMaterial.push('<option value="',
            data.d[i].ID, '">',
            data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'OCCASION') {
            optionsOccasion.push('<option value="',
            data.d[i].ID, '">',
            data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'GRAMSLAB') {
            optionsGramSlab.push('<option value="',
            data.d[i].ID, '">',
            data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'KARAT') {
            optionsKarat.push('<option value="',
            data.d[i].ID, '">',
            data.d[i].NAME, '</option>');
        }
    }

    $("#cmbJewellery").html(optionsJewel.join(''));
    $("#cmbJewellery").addClass("selectpicker");
    $("#cmbJewellery").addClass("form-control");

    $("#cmbDesign").html(optionsDesign.join(''));
    $("#cmbDesign").addClass("selectpicker");
    $("#cmbDesign").addClass("form-control");

    $("#cmbCollection").html(optionsCollection.join(''));
    $("#cmbCollection").addClass("selectpicker");
    $("#cmbCollection").addClass("form-control");

    $("#cmbMaterial").html(optionsMaterial.join(''));
    $("#cmbMaterial").addClass("selectpicker");
    $("#cmbMaterial").addClass("form-control");

    $("#cmbOccasion").html(optionsOccasion.join(''));
    $("#cmbOccasion").addClass("selectpicker");
    $("#cmbOccasion").addClass("form-control");

    $("#CmbGramSlab").html(optionsGramSlab.join(''));
    $("#CmbGramSlab").addClass("selectpicker");
    $("#CmbGramSlab").addClass("form-control");

    $("#cmbKarat").html(optionsKarat.join(''));
    $("#cmbKarat").addClass("selectpicker");
    $("#cmbKarat").addClass("form-control");
    $('.selectpicker').selectpicker('');
    document.getElementById("loader").style.display = "none";
    searchdata();
}



