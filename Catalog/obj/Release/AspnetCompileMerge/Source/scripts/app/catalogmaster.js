var Datalodaing = 0;
$(document).ready(function () {
    getDetails();
});

function getDetails() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CatalogMaster.aspx/GetData",
        data: {},
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>SKU</th><th>Code</th><th>Description</th><th>Stock</th><th>Jelwellery</th><th>Design</th><th>Collection</th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td>" + data.d[i].SKU + "</td><td>" + data.d[i].CODE + "</td><td>" + data.d[i].TITLE + "</td><td>" + data.d[i].STK_QTY + "</td><td>" + data.d[i].JEWELLERY_NAME + "</td><td>" + data.d[i].DESIGN_NAME +
                    "</td><td>" + data.d[i].COLLECTIONS_NAME + "</td>" + "<td>" + "<input type='button' class='btn btn-warning btn-sm editButton' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' style='margin-right:5px'/>" + "" +
                    "" + "<input type='button' class='btn btn-primary btn-sm uploadButton' data-id='" + data.d[i].ID + "' name='submitButton' id='btnUpload' value='Upload' style='margin-right:5px;margin-left:5px'/>" + "" +
                    "<input type='button' class='btn btn-danger btn-sm deleteButton' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete' style='margin-right:5px;margin-left:5px'/> </td></tr>");
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

//Combos Loading Code - Start

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveJewelleryList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadJewelleryCombo
    });
});

function LoadJewelleryCombo(data) {
    var options = [];
    options.push('<option value="',
          '0', '">',
          '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#JEWELLERY_NAME1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveDesignList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDesignCombo
    });
});

function LoadDesignCombo(data) {
    var options = [];
    options.push('<option value="',
         '0', '">',
         '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#DESIGN_NAME1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveCollectionsList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCollectionsCombo
    });
});

function LoadCollectionsCombo(data) {
    var options = [];
    options.push('<option value="',
        '0', '">',
        '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#COLLECTIONS_NAME1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveMaterialList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadMaterialCombo
    });
});

function LoadMaterialCombo(data) {
    var options = [];
    options.push('<option value="',
         '0', '">',
         '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#MATERIAL_NAME1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveOccasionList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadOccasionCombo
    });
});

function LoadOccasionCombo(data) {
    var options = [];
    options.push('<option value="',
        '0', '">',
        '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#OCCASION_NAME1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveGramSlabList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadGramSlabCombo
    });
});

function LoadGramSlabCombo(data) {
    var options = [];
    options.push('<option value="',
        '0', '">',
        '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#GRAMSLAB_NAME1").html(options.join(''));
}

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetActiveKaratList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadKaratCombo
    });
});

function LoadKaratCombo(data) {
    var options = [];
    options.push('<option value="',
        '0', '">',
        '--SELECT--', '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#KARAT_NAME1").html(options.join(''));
}

//Combos Loading Code - End

$(function () {
    $("#btnSave").click(function () {
        if ($("#TITLE1").val().trim() == "") {
            alert("Please enter Description.");
            $("#TITLE1").focus();
            return false;
        }

        if ($("#JEWELLERY_NAME1").val() == null) {
            alert("Please Select Jewellery.");
            $("#JEWELLERY_NAME1").focus();
            return false;
        }

        if ($("#DESIGN_NAME1").val() == null) {
            alert("Please Select Design.");
            $("#DESIGN_NAME1").focus();
            return false;
        }

        if ($("#COLLECTIONS_NAME1").val() == null) {
            alert("Please Select Collection.");
            $("#COLLECTIONS_NAME1").focus();
            return false;
        }

        if ($("#MATERIAL_NAME1").val() == null) {
            alert("Please Select Material.");
            $("#MATERIAL_NAME1").focus();
            return false;
        }

        if ($("#OCCASION_NAME1").val() == null) {
            alert("Please Select Occasion.");
            $("#OCCASION_NAME1").focus();
            return false;
        }

        if ($("#GRAMSLAB_NAME1").val() == null) {
            alert("Please Select Gramslab.");
            $("#GRAMSLAB_NAME1").focus();
            return false;
        }

        if ($("#KARAT_NAME1").val() == null) {
            alert("Please Select Karat.");
            $("#KARAT_NAME1").focus();
            return false;
        }

        if ($.isNumeric($("#RATE1").val()) == false) {
            alert("Please enter valid Rate.");
            $("#RATE1").focus();
            return false;
        }

        if ($.isNumeric($("#GR_WT1").val()) == false) {
            alert("Please enter valid Gross Wt.");
            $("#GR_WT").focus();
            return false;
        }

        if ($.isNumeric($("#ST_WT1").val()) == false) {
            alert("Please enter valid Stone Wt.");
            $("#ST_WT").focus();
            return false;
        }

        if ($.isNumeric($("#VA_PER1").val()) == false) {
            alert("Please enter valid VA Percentage.");
            $("#VA_PER").focus();
            return false;
        }

        if ($.isNumeric($("#VA_AMT1").val()) == false) {
            alert("Please enter valid VA Amount.");
            $("#VA_AMT").focus();
            return false;
        }

        if ($.isNumeric($("#ST_AMT1").val()) == false) {
            alert("Please enter valid Stone Amount.");
            $("#ST_AMT").focus();
            return false;
        }

        if ($.isNumeric($("#TAX_PER1").val()) == false) {
            alert("Please enter valid Tax %");
            $("#TAX_PER").focus();
            return false;
        }

        if ($.isNumeric($("#TAX_AMT1").val()) == false) {
            alert("Please enter valid Tax Amount");
            $("#TAX_AMT").focus();
            return false;
        }

        if ($.isNumeric($("#NET_AMT1").val()) == false) {
            alert("Please enter valid Net Amount");
            $("#NET_AMT").focus();
            return false;
        }

        var obj = {};
        obj.CODE = $("#CODE1").val().trim();
        obj.TITLE = $("#TITLE1").val().trim();
        obj.JEWELLERY_ID = $("#JEWELLERY_NAME1").val();
        obj.DESIGN_ID = $("#DESIGN_NAME1").val();
        obj.COLLECTIONS_ID = $("#COLLECTIONS_NAME1").val();
        obj.MATERIAL_ID = $("#MATERIAL_NAME1").val();
        obj.OCCASION_ID = $("#OCCASION_NAME1").val();
        obj.GRAMSLAB_ID = $("#GRAMSLAB_NAME1").val();
        obj.KARAT_ID = $("#KARAT_NAME1").val();
        obj.REMARKS = $("#REMARKS1").val().trim();
        
        obj.PURITY = $("#PURITY1").val();
        obj.RATE = $("#RATE1").val();
        obj.GR_WT = $("#GR_WT1").val();
        obj.ST_WT = $("#ST_WT1").val();
        obj.NET_WT = $("#NET_WT1").val();
        obj.VA_PER = $("#VA_PER1").val();
        obj.VA_AMT = $("#VA_AMT1").val();
        obj.ST_AMT = $("#ST_AMT1").val();
        obj.TAXABLE_AMT = $("#TAXABLE_AMT1").val();
        obj.TAX_PER = $("#TAX_PER1").val();
        obj.TAX_AMT = $("#TAX_AMT1").val();
        obj.NET_AMT = $("#NET_AMT1").val();

        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }
        if ($('#SHOW_CATALOG1').is(":checked")) {
            obj.SHOW_CATALOG = true;
        }
        else {
            obj.SHOW_CATALOG = false;
        }
        if ($('#SHOW_TRENDING1').is(":checked")) {
            obj.SHOW_TRENDING = true;
        }
        else {
            obj.SHOW_TRENDING = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/InsertData",
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
                        $("#TITLE1").focus();
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Adding data of :" + obj.NAME);
                $("#TITLE1").focus();
                return false;
            }
        });

    });

    $(document).on("click", ".deleteButton", function () {
        if (confirm("Are you sure you want to delete !") == true) {
            var id = $(this).attr("data-id");
            $.ajax({
                type: "Post",
                contentType: "application/json; charset=utf-8",
                url: "CatalogMaster.aspx/DeleteData",
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

    });

    $(document).on("click", ".addNewButton", function () {
        $('#btnSave').show();
        $('#btnUpdate').hide();
        $('#PopupModal').modal('show');
        $('#PopupModal').focus();
        $("#TITLE1").val('');
        $("#ACTIVE_STATUS1").prop('checked', true);
        $("#SHOW_CATALOG1").prop('checked', true);
        $("#SHOW_TRENDING1").prop('checked', true);
        $("#SKU1").text('-');
        $("#STK_QTY1").text('0');
        $("#CODE1").val('');
        $("#PURITY1").val('');
        $("#REMARKS1").val('');
        $("#JEWELLERY_NAME1").val('0');
        $("#DESIGN_NAME1").val('0');
        $("#COLLECTIONS_NAME1").val('0');
        $("#MATERIAL_NAME1").val('0');
        $("#OCCASION_NAME1").val('0');
        $("#GRAMSLAB_NAME1").val('0');
        $("#KARAT_NAME1").val('0');
        $("#PURITY1").val('0');

        $("#RATE1").val(0);
        $("#GR_WT1").val(0);
        $("#ST_WT1").val(0);
        $("#NET_WT1").val(0);
        $("#VA_PER1").val(0);
        $("#VA_AMT1").val(0);
        $("#ST_AMT1").val(0);
        $("#TAXABLE_AMT1").val(0);
        $("#TAX_PER1").val(3);
        $("#TAX_AMT1").val(0);
        $("#NET_AMT1").val(0);
        Datalodaing = 0;
        $("div.modal-header h2").html("Add Catalog Details");
        $('#TITLE1').focus();
    });

    $(document).on("click", ".editButton", function () {
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#PopupModal').modal('show');
        $('#PopupModal').focus();
        $("#TITLE1").val('');
        $("#ACTIVE_STATUS1").prop('checked', true);
        $("#SHOW_CATALOG1").prop('checked', true);
        $("#SHOW_TRENDING1").prop('checked', true);
        $("#SKU1").text('-');
        $("#STK_QTY1").text('0');
        $("#CODE1").val('');
        $("#PURITY1").val('');
        $("#REMARKS1").val('');
        $("#JEWELLERY_NAME1").val('0');
        $("#DESIGN_NAME1").val('0');
        $("#COLLECTIONS_NAME1").val('0');
        $("#MATERIAL_NAME1").val('0');
        $("#OCCASION_NAME1").val('0');
        $("#GRAMSLAB_NAME1").val('0');
        $("#KARAT_NAME1").val('0');
        $("#PURITY1").val('0');

        $("#RATE1").val(0);
        $("#GR_WT1").val(0);
        $("#ST_WT1").val(0);
        $("#NET_WT1").val(0);
        $("#VA_PER1").val(0);
        $("#VA_AMT1").val(0);
        $("#ST_AMT1").val(0);
        $("#TAXABLE_AMT1").val(0);
        $("#TAX_PER1").val(3);
        $("#TAX_AMT1").val(0);
        $("#NET_AMT1").val(0);
        Datalodaing = 1;
        $("div.modal-header h2").html("Edit Catalog Details");
        var id = $(this).attr("data-id");
        console.log(id);
        $("#btnUpdate").attr("edit-id", id);
        //alert(id);  //getting the row id 
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/EditData",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {

                    $("#SKU1").text(data.d[i].SKU);
                    $("#STK_QTY1").text(data.d[i].STK_QTY);

                    $("#CODE1").val(data.d[i].CODE);
                    $("#TITLE1").val(data.d[i].TITLE);
                    $("#JEWELLERY_NAME1").val(data.d[i].JEWELLERY_ID);
                    $("#DESIGN_NAME1").val(data.d[i].DESIGN_ID);
                    $("#COLLECTIONS_NAME1").val(data.d[i].COLLECTIONS_ID);
                    $("#MATERIAL_NAME1").val(data.d[i].MATERIAL_ID);
                    $("#OCCASION_NAME1").val(data.d[i].OCCASION_ID);
                    $("#GRAMSLAB_NAME1").val(data.d[i].GRAMSLAB_ID);
                    $("#KARAT_NAME1").val(data.d[i].KARAT_ID);
                    $("#REMARKS1").val(data.d[i].REMARKS);
                    $("#PURITY1").val(data.d[i].PURITY);                    
                    $("#RATE1").val(data.d[i].RATE);
                    $("#GR_WT1").val(data.d[i].GR_WT);
                    $("#ST_WT1").val(data.d[i].ST_WT);
                    $("#NET_WT1").val(data.d[i].NET_WT);
                    $("#VA_PER1").val(data.d[i].VA_PER);
                    $("#VA_AMT1").val(data.d[i].VA_AMT);
                    $("#ST_AMT1").val(data.d[i].ST_AMT);
                    $("#TAXABLE_AMT1").val(data.d[i].TAXABLE_AMT);
                    $("#TAX_PER1").val(data.d[i].TAX_PER);
                    $("#TAX_AMT1").val(data.d[i].TAX_AMT);
                    $("#NET_AMT1").val(data.d[i].NET_AMT);                  
                   
                    if (data.d[i].ACTIVE_STATUS == true)
                        $("#ACTIVE_STATUS1").prop('checked', true);
                    else
                        $("#ACTIVE_STATUS1").prop('checked', false);

                    if (data.d[i].SHOW_CATALOG == true)
                        $("#SHOW_CATALOG1").prop('checked', true);
                    else
                        $("#SHOW_CATALOG1").prop('checked', false);

                    if (data.d[i].SHOW_TRENDING == true)
                        $("#SHOW_TRENDING1").prop('checked', true);
                    else
                        $("#SHOW_TRENDING1").prop('checked', false);
                }
                $('#TITLE1').focus();
                Datalodaing = 0;
            },
            error: function () {
                alert("Error while retrieving data of :" + id);
                Datalodaing = 0;
            }
        });
    });

    $("#btnUpdate").click(function () {
        if ($("#TITLE1").val().trim() == "") {
            alert("Please enter Description.");
            $("#TITLE1").focus();
            return false;
        }

        if ($("#JEWELLERY_NAME1").val() == null) {
            alert("Please Select Jewellery.");
            $("#JEWELLERY_NAME1").focus();
            return false;
        }

        if ($("#DESIGN_NAME1").val() == null) {
            alert("Please Select Design.");
            $("#DESIGN_NAME1").focus();
            return false;
        }

        if ($("#COLLECTIONS_NAME1").val() == null) {
            alert("Please Select Collection.");
            $("#COLLECTIONS_NAME1").focus();
            return false;
        }

        if ($("#MATERIAL_NAME1").val() == null) {
            alert("Please Select Material.");
            $("#MATERIAL_NAME1").focus();
            return false;
        }

        if ($("#OCCASION_NAME1").val() == null) {
            alert("Please Select Occasion.");
            $("#OCCASION_NAME1").focus();
            return false;
        }

        if ($("#GRAMSLAB_NAME1").val() == null) {
            alert("Please Select Gramslab.");
            $("#GRAMSLAB_NAME1").focus();
            return false;
        }

        if ($("#KARAT_NAME1").val() == null) {
            alert("Please Select Karat.");
            $("#KARAT_NAME1").focus();
            return false;
        }

        if ($.isNumeric($("#RATE1").val()) == false) {
            alert("Please enter valid Rate.");
            $("#RATE1").focus();
            return false;
        }

        if ($.isNumeric($("#GR_WT1").val()) == false) {
            alert("Please enter valid Gross Wt.");
            $("#GR_WT").focus();
            return false;
        }

        if ($.isNumeric($("#ST_WT1").val()) == false) {
            alert("Please enter valid Stone Wt.");
            $("#ST_WT").focus();
            return false;
        }

        if ($.isNumeric($("#VA_PER1").val()) == false) {
            alert("Please enter valid VA Percentage.");
            $("#VA_PER").focus();
            return false;
        }

        if ($.isNumeric($("#VA_AMT1").val()) == false) {
            alert("Please enter valid VA Amount.");
            $("#VA_AMT").focus();
            return false;
        }

        if ($.isNumeric($("#ST_AMT1").val()) == false) {
            alert("Please enter valid Stone Amount.");
            $("#ST_AMT").focus();
            return false;
        }

        if ($.isNumeric($("#TAX_PER1").val()) == false) {
            alert("Please enter valid Tax %");
            $("#TAX_PER").focus();
            return false;
        }

        if ($.isNumeric($("#TAX_AMT1").val()) == false) {
            alert("Please enter valid Tax Amount");
            $("#TAX_AMT").focus();
            return false;
        }

        if ($.isNumeric($("#NET_AMT1").val()) == false) {
            alert("Please enter valid Net Amount");
            $("#NET_AMT").focus();
            return false;
        }

        var id = $(this).attr("edit-id");
        var obj = {};
        obj.ID = id;
        obj.CODE = $("#CODE1").val().trim();
        obj.TITLE = $("#TITLE1").val().trim();
        obj.JEWELLERY_ID = $("#JEWELLERY_NAME1").val();
        obj.DESIGN_ID = $("#DESIGN_NAME1").val();
        obj.COLLECTIONS_ID = $("#COLLECTIONS_NAME1").val();
        obj.MATERIAL_ID = $("#MATERIAL_NAME1").val();
        obj.OCCASION_ID = $("#OCCASION_NAME1").val();
        obj.GRAMSLAB_ID = $("#GRAMSLAB_NAME1").val();
        obj.KARAT_ID = $("#KARAT_NAME1").val();
        obj.REMARKS = $("#REMARKS1").val().trim();

        obj.PURITY = $("#PURITY1").val();
        obj.RATE = $("#RATE1").val();
        obj.GR_WT = $("#GR_WT1").val();
        obj.ST_WT = $("#ST_WT1").val();
        obj.NET_WT = $("#NET_WT1").val();
        obj.VA_PER = $("#VA_PER1").val();
        obj.VA_AMT = $("#VA_AMT1").val();
        obj.ST_AMT = $("#ST_AMT1").val();
        obj.TAXABLE_AMT = $("#TAXABLE_AMT1").val();
        obj.TAX_PER = $("#TAX_PER1").val();
        obj.TAX_AMT = $("#TAX_AMT1").val();
        obj.NET_AMT = $("#NET_AMT1").val();

        if ($('#ACTIVE_STATUS1').is(":checked")) {
            obj.ACTIVE_STATUS = true;
        }
        else {
            obj.ACTIVE_STATUS = false;
        }
        if ($('#SHOW_CATALOG1').is(":checked")) {
            obj.SHOW_CATALOG = true;
        }
        else {
            obj.SHOW_CATALOG = false;
        }
        if ($('#SHOW_TRENDING1').is(":checked")) {
            obj.SHOW_TRENDING = true;
        }
        else {
            obj.SHOW_TRENDING = false;
        }

        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/UpdateData",
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


function CalcAmt()
{
    if (Datalodaing != 0)
        return;
    else if ($.isNumeric($("#RATE1").val()) == false)
        return;
    else if ($.isNumeric($("#GR_WT1").val()) == false)
        return;
    else if ($.isNumeric($("#ST_WT1").val()) == false)
        return;
    else if ($.isNumeric($("#VA_PER1").val()) == false)
        return;
    else if ($.isNumeric($("#ST_AMT1").val()) == false)
        return;
    else if ($.isNumeric($("#TAX_PER1").val()) == false)
        return;    
    else if (Datalodaing == 0)
    {
        $("#NET_WT1").val(parseFloat($("#GR_WT1").val() - $("#ST_WT1").val()).toFixed(3));
        if ($("#RATE1").val() <= 0) {           
            $("#VA_AMT1").val(0);
            $("#TAXABLE_AMT1").val(0);
            $("#TAX_AMT1").val(0);
            $("#NET_AMT1").val(0);
        }
        else
        {
            $("#VA_AMT1").val(parseFloat(parseFloat($("#NET_WT1").val() * ($("#VA_PER1").val() / 100.0)) * parseFloat($("#RATE1").val())).toFixed(2));
            $("#TAXABLE_AMT1").val(parseFloat(parseFloat($("#RATE1").val()) * parseFloat(($("#NET_WT1").val())) + parseFloat($("#VA_AMT1").val()) + parseFloat(($("#ST_AMT1").val()))).toFixed(2));
            $("#TAX_AMT1").val(parseFloat(parseFloat($("#TAXABLE_AMT1").val()) * parseFloat($("#TAX_PER1").val() / 100.0)).toFixed(2));
            $("#NET_AMT1").val(parseFloat(parseFloat($("#TAXABLE_AMT1").val()) + parseFloat($("#TAX_AMT1").val())).toFixed(2));
        }
    }
}