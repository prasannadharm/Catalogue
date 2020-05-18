var Datalodaing = 0;
var Currentdate;
$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $('#DATE_YM').datepicker('setDate', today);
    //getDetails();
    $("#masterdiv").removeClass("container");

    $.ajax({
        url: "CatalogMaster.aspx/GetLatestTrasnsactionNumber",
        data: '{}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            for (var i = 0; i < data.d.length; i++) {
                Currentdate = data.d[i].split('-')[3] + '-' + data.d[i].split('-')[2] + '-' + data.d[i].split('-')[1];
                $('#DATE_YM1').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', Currentdate);
            }           
        },
        error: function (response) {
            alert(response.responseText);
        },
        failure: function (response) {
            alert(response.responseText);
        }
    });
});

$(function () {
    $.ajax({
        type: "POST",
        url: "CatalogMaster.aspx/GetDropdownLisData",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCombos
    });

    $("#btnSearch").click(function () {
        getDetails();
    });

    $("#btnClearfilter").click(function () {
        clearfilter();
    });

    $('#txtSku').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            getDetails();
        }
    });

    $('#txtCode').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            getDetails();
        }
    });

    $('#txtSearch').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            getDetails();
        }
    });

    $("[id$=LED_NAME1]").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "CatalogMaster.aspx/GetLedgersbyName",
                data: "{ 'str': '" + request.term + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $("[id$=LED_ID]").val(i.item.val);
        },
        minLength: 1
    });
});

function LoadCombos(data) {
    document.getElementById("loader").style.display = "block";
    var optionsJewel = [];
    var optionsDesign = [];
    var optionsCollection = [];
    var optionsMaterial = [];
    var optionsOccasion = [];
    var optionsGramSlab = [];
    var optionsKarat = [];
    var options = [];

    options.push('<option value="',
          '0', '">',
          '--SELECT--', '</option>');

    for (var i = 0; i < data.d.length; i++) {
        if (data.d[i].TYPE == 'JEWELLERY') {
            optionsJewel.push('<option value="',
            data.d[i].ID, '">',
            data.d[i].NAME, '</option>');
        }
        else if (data.d[i].TYPE == 'DESIGN') {
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
    
    $("#JEWELLERY_NAME1").html($.merge($.merge([], options), optionsJewel).join(''));

    $("#cmbDesign").html(optionsDesign.join(''));
    $("#cmbDesign").addClass("selectpicker");
    $("#cmbDesign").addClass("form-control");

    $("#DESIGN_NAME1").html($.merge($.merge([], options), optionsDesign).join(''));

    $("#cmbCollection").html(optionsCollection.join(''));
    $("#cmbCollection").addClass("selectpicker");
    $("#cmbCollection").addClass("form-control");

    $("#COLLECTIONS_NAME1").html($.merge($.merge([], options), optionsCollection).join(''));

    $("#cmbMaterial").html(optionsMaterial.join(''));
    $("#cmbMaterial").addClass("selectpicker");
    $("#cmbMaterial").addClass("form-control");

    $("#MATERIAL_NAME1").html($.merge($.merge([], options), optionsMaterial).join(''));

    $("#cmbOccasion").html(optionsOccasion.join(''));
    $("#cmbOccasion").addClass("selectpicker");
    $("#cmbOccasion").addClass("form-control");

    $("#OCCASION_NAME1").html($.merge($.merge([], options), optionsOccasion).join(''));

    $("#CmbGramSlab").html(optionsGramSlab.join(''));
    $("#CmbGramSlab").addClass("selectpicker");
    $("#CmbGramSlab").addClass("form-control");

    $("#GRAMSLAB_NAME1").html($.merge($.merge([], options), optionsGramSlab).join(''));

    $("#cmbKarat").html(optionsKarat.join(''));
    $("#cmbKarat").addClass("selectpicker");
    $("#cmbKarat").addClass("form-control");

    $("#KARAT_NAME1").html($.merge($.merge([], options), optionsKarat).join(''));

    $('.selectpicker').selectpicker('');
    getDetails();
}

function clearfilter() {
    $('#democollapseBtn').collapse('hide');

    $("#txtSearch").val('');
    $("#txtSku").val('');
    $("#txtCode").val('');
    $("#cmbJewellery").val('default').selectpicker("refresh");
    $("#cmbDesign").val('default').selectpicker("refresh");
    $("#cmbCollection").val('default').selectpicker("refresh");
    $("#cmbMaterial").val('default').selectpicker("refresh");
    $("#cmbOccasion").val('default').selectpicker("refresh");
    $("#CmbGramSlab").val('default').selectpicker("refresh");
    $("#cmbKarat").val('default').selectpicker("refresh");
    getDetails();
}

function getDetails() {
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

    obj.CNT = $("#cmbRows").val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CatalogMaster.aspx/GetData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            $('#griddiv').remove();
            $('#maindiv').append("<div class='table-responsive' id='griddiv'></div>");
            $('#griddiv').append("<table id='tablemain' class='table table-striped table-bordered' style='width: 100%'></table>");
            $('#tablemain').append("<thead><tr><th>SKU</th><th>Code</th><th>Description</th><th>Stock</th><th>Jewellery</th><th>Design</th><th>Collection</th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody></tbody>");
            $('#tablemain tbody').remove();
            $('#tablemain').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tablemain').append(
                    "<tr><td style='text-align:center;color:brown'><b>" + data.d[i].SKU + "</b></td><td>" + data.d[i].CODE + "</td><td style='color:blue'>" + data.d[i].TITLE + "</td><td style='text-align:center;color:red'><b>" + data.d[i].STK_QTY + "</b></td><td>" + data.d[i].JEWELLERY_NAME + "</td><td>" + data.d[i].DESIGN_NAME +
                    "</td><td>" + data.d[i].COLLECTIONS_NAME + "</td>" + "<td style='text-align:center;'>" + "<img src='../images/static/edit.png' alt='Edit Record' class='editButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnEdit' value='Edit' style='margin-right:5px'/>" + "</td>" +
                    "<td style='text-align:center;'><img src='../images/static/delete.png' alt='Delete Record' class='deleteButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnDelete' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td style='text-align:center;'>" + "<img src='../images/static/upload.png' alt='Upload Image' class='uploadButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnUpload' value='Upload' style='margin-right:5px;margin-left:5px'/>" + "</td>" +
                    "<td style='text-align:center;'>" + "<img src='../images/static/report.png' alt='Item Ledger Report' class='reportButton handcursor' data-id='" + data.d[i].ID + "' name='submitButton' id='btnReport' value='Report' style='margin-right:5px;margin-left:5px'/>" + "</td>" +
                    "<td style='text-align:center;'><img src='../images/static/barcode.png' alt='Print Barcode' class='barcodeButton handcursor' data-id='" + data.d[i].ID + "' id='btnBarcode' value='Barcode' style='margin-right:5px;margin-left:5px'/> </td></tr>");
            }
            $('#tablemain').append("</tbody>");
            $('#tablemain').DataTable({
                "order": [[0, "desc"]]
            });
            //data-toggle='modal' data-target='#PopupModal'
            document.getElementById("loader").style.display = "none";
        },
        error: function () {
            alert("Error while Showing update data");
            document.getElementById("loader").style.display = "none";
        }
        //
    });
    
}

$(function () {
    $("#btnUploadImage").click(function () {

        if ($('#fileToUpload').val() == null || $('#fileToUpload').val() == "") {
            alert('Please Select an Image file upload');
            $('#fileToUpload').focus();
            return;
        }

        var id = $(this).attr("edit-id");

        var fileToUpload = getNameFromPath($('#fileToUpload').val());
        var orgfilename = fileToUpload;
        var phyfilename = String(id) + '_' + String(getFormattedTimeStamp()) + '.' + orgfilename.substr((orgfilename.lastIndexOf('.') + 1));

        if (checkFileExtension(fileToUpload)) {
            if (orgfilename != "" && orgfilename != null) {
                //$("#loading").ajaxStart(function () {
                //    $(this).show();
                //}).ajaxComplete(function () {
                //    $(this).hide();
                //    return false;
                //});

                $("#loading").show();
                $.ajaxFileUpload({
                    url: 'CatalogImageUpload.ashx?action=UPLOAD&catalogid=' + id + '&phy_file_name=' + phyfilename + '&org_file_name=' + orgfilename,
                    secureuri: false,
                    fileElementId: 'fileToUpload',
                    dataType: 'json',
                    success: function (data, status) {
                        if (typeof (data.error) != 'undefined') {
                            if (data.error != '') {
                                alert(data.error);
                            } else {
                                ShowUploadedFiles();
                                $('#fileToUpload').val("");
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

        if ($.isNumeric($("#GR_WT1").val()) == false) {
            alert("Please enter valid Gross Wt.");
            $("#GR_WT1").focus();
            return false;
        }

        if ($.isNumeric($("#ST_WT1").val()) == false) {
            alert("Please enter valid Stone Wt.");
            $("#ST_WT1").focus();
            return false;
        }

        if ($.isNumeric($("#S_PER1").val()) == false) {
            alert("Please enter valid S Percentage.");
            $("#S_PER1").focus();
            return false;
        }

        if ($.isNumeric($("#DIA_CARAT1").val()) == false) {
            alert("Please enter valid Carat.");
            $("#DIA_CARAT1").focus();
            return false;
        }

        if ($.isNumeric($("#ST_AMT1").val()) == false) {
            alert("Please enter valid Stone Amount.");
            $("#ST_AMT1").focus();
            return false;
        }

        if (isDate($("#DATE_YM1").val()) == false) {
            alert('Please enter valid date');
            $("#DATE_YM1").focus();
            return false;
        }

        CalcAmt();

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
        obj.RATE = 0;
        obj.GR_WT = $("#GR_WT1").val();
        obj.ST_WT = $("#ST_WT1").val();
        obj.NET_WT = $("#NET_WT1").val();
        obj.VA_PER = 0;
        obj.VA_AMT = 0;
        obj.ST_AMT = $("#ST_AMT1").val();
        obj.TAXABLE_AMT = 0;
        obj.TAX_PER = 0;
        obj.TAX_AMT = 0;
        obj.NET_AMT = 0;

        obj.DATE_YM = $("#DATE_YM1").val();
        obj.S_PER = $("#S_PER1").val();
        obj.DIA_CARAT = $("#DIA_CARAT1").val();
        obj.LED_NAME = $("#ContentPlaceHolder1_LED_NAME1").val().trim();

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
                        $("#masterdiv").removeClass("container");
                        $('#mainlistingdiv').show();
                        $('#mainldetaildiv').hide();
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
        var id = $(this).attr("data-id");
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/GetUserRights",
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
                        url: "CatalogMaster.aspx/DeleteData",
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
        $('#mainlistingdiv').hide();
        $('#mainldetaildiv').show();
        $("#masterdiv").addClass("container");
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
        $("#GR_WT1").val(0);
        $("#ST_WT1").val(0);
        $("#NET_WT1").val(0);
        $("#ST_AMT1").val(0);        
        $('#DATE_YM1').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', Currentdate);
        $("#S_PER1").val(0);
        $("#DIA_CARAT1").val(0);
        $("#ContentPlaceHolder1_LED_NAME1").val('');
        $("#ContentPlaceHolder1_LED_ID").val(0);
        Datalodaing = 0;        
        $("#subheaderdiv").html("<h2 style='color:blue'>Add Catalog Details</h2>");
        $('#TITLE1').focus();
    });

    $(document).on("click", ".uploadButton", function () {
        $('#PopupModalUpload').modal('show');
        $('#PopupModalUpload').focus();
        $("div.modal-header h2").html("Catalog Images Upload Area");
        var id = $(this).attr("data-id");
        console.log(id);
        $('#fileToUpload').val("");
        $("#btnUploadImage").attr("edit-id", id);
        ShowUploadedFiles();
        $('#divimgpreview').hide();
        $('#fileToUpload').focus();
    });

    $(document).on("click", ".editButton", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_EDIT == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }

                $('#btnSave').hide();
                $('#btnUpdate').show();
                $('#mainlistingdiv').hide();
                $('#mainldetaildiv').show();
                $("#masterdiv").addClass("container");
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

                $("#GR_WT1").val(0);
                $("#ST_WT1").val(0);
                $("#NET_WT1").val(0);
                $("#ST_AMT1").val(0);
                
                $('#DATE_YM1').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', Currentdate);
                $("#S_PER1").val(0);
                $("#DIA_CARAT1").val(0);
                $("#ContentPlaceHolder1_LED_NAME1").val('');
                $("#ContentPlaceHolder1_LED_ID").val(0);

                Datalodaing = 1;                
                $("#subheaderdiv").html("<h2 style='color:blue'>Edit Catalog Details</h2>");

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

                            $('#DATE_YM1').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate', data.d[i].DATE_YM.split('-')[2] + '-' + data.d[i].DATE_YM.split('-')[1] + '-' + data.d[i].DATE_YM.split('-')[0]);
                            $("#S_PER1").val(data.d[i].S_PER);
                            $("#DIA_CARAT1").val(data.d[i].DIA_CARAT);
                            $("#ContentPlaceHolder1_LED_NAME1").val(data.d[i].LED_NAME);


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
                        Datalodaing = 0;
                        CalcAmt();
                        $('#TITLE1').focus();
                    },
                    error: function () {
                        alert("Error while retrieving data of :" + id);
                        Datalodaing = 0;
                    }
                });

            },
            error: function (data) {
                alert("Error while Deleting data of :" + id);
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

        if ($.isNumeric($("#GR_WT1").val()) == false) {
            alert("Please enter valid Gross Wt.");
            $("#GR_WT1").focus();
            return false;
        }

        if ($.isNumeric($("#ST_WT1").val()) == false) {
            alert("Please enter valid Stone Wt.");
            $("#ST_WT1").focus();
            return false;
        }

        if ($.isNumeric($("#S_PER1").val()) == false) {
            alert("Please enter valid S Percentage.");
            $("#S_PER1").focus();
            return false;
        }

        if ($.isNumeric($("#DIA_CARAT1").val()) == false) {
            alert("Please enter valid Carat.");
            $("#DIA_CARAT1").focus();
            return false;
        }

        if ($.isNumeric($("#ST_AMT1").val()) == false) {
            alert("Please enter valid Stone Amount.");
            $("#ST_AMT1").focus();
            return false;
        }        

        if (isDate($("#DATE_YM1").val()) == false) {
            alert('Please enter valid date');
            $("#DATE_YM1").focus();
            return false;
        }

        CalcAmt();

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
        obj.RATE = 0;
        obj.GR_WT = $("#GR_WT1").val();
        obj.ST_WT = $("#ST_WT1").val();
        obj.NET_WT = $("#NET_WT1").val();
        obj.VA_PER = 0;
        obj.VA_AMT = 0;
        obj.ST_AMT = $("#ST_AMT1").val();
        obj.TAXABLE_AMT = 0;
        obj.TAX_PER = 0;
        obj.TAX_AMT = 0;
        obj.NET_AMT = 0;

        obj.DATE_YM = $("#DATE_YM1").val();
        obj.S_PER = $("#S_PER1").val();
        obj.DIA_CARAT = $("#DIA_CARAT1").val();
        obj.LED_NAME = $("#ContentPlaceHolder1_LED_NAME1").val().trim();

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
                        $("#masterdiv").removeClass("container");
                        $('#mainlistingdiv').show();
                        $('#mainldetaildiv').hide();
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

    $(document).on("click", ".deleteButtonImage", function () {
        var phyimage = $(this).attr("data-id");
        var catalogid = $("#btnUploadImage").attr("edit-id");
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/GetUserRights",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0 && data.d[0].ALLOW_DELETE == false) {
                    alert('You are not Authorised to perform this Operation.');
                    return false;
                }

                if (confirm("Are you sure you want to delete the Image!") == true) {                   
                    var orgfilename = '';
                    $.ajax({
                        url: 'CatalogImageUpload.ashx?action=DELETE&catalogid=' + catalogid + '&phy_file_name=' + phyimage + '&org_file_name=' + orgfilename,
                        type: "GET",
                        cache: false,
                        async: true,
                        success: function (html) {
                            ShowUploadedFiles();
                            alert('File Deleted successfully.')
                        }
                    });
                }
            },
            error: function (data) {
                alert("Error while Deleting data of :" + id);
            }
        });

    });

    $(document).on("click", ".chkkstatus", function () {
        var phyimage = $(this).attr("data-id");
        var catalogid = $("#btnUploadImage").attr("edit-id");
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/UpdateCatalogImageStatus",
            data: "{id: " + catalogid + ", str: '" + phyimage + "'}",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].RESULT === 1) {
                        ShowUploadedFiles();
                        //alert(data.d[i].MSG);
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

    });

    $("#btnCloseImgPreview").click(function () {
        $('#divimgpreview').hide();
    });

    $(document).on("click", ".previewButtonImage", function () {
        var phyimage = $(this).attr("data-id");
        $('#imgpreview').attr("src", "../images/upload/" + phyimage);
        $('#divimgpreview').show();
    });

    $(document).on("click", ".reportButton", function () {
        var id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/GetItemLedgerData",
            data: '{id: ' + id + '}',
            dataType: "json",
            success: function (data) {
                var shtml = '';
                $('#tableprint thead').remove();
                $('#tableprint tbody').remove();
                shtml = shtml + "<thead>";
                shtml = shtml + "<tr><th style='border: 1px solid black;'>Sl No</th><th style='border: 1px solid black;'>Trans No</th><th style='border: 1px solid black;'>Trans Date</th><th style='border: 1px solid black;'>Trans Type</th><th style='border: 1px solid black;'>In Qty</th><th style='border: 1px solid black;'>Out Qty</th><th style='border: 1px solid black;'>Bal Qty</th></tr>";
                shtml = shtml + "</thead>";
                shtml = shtml + "<tbody>";
                for (var i = 0; i < data.d.length; i++) {
                    $('#lblfilter').text("Item Ledger Details : " + data.d[i].TITLE);
                    shtml = shtml + "<tr><td style='text-align:center;border: 1px solid black;'>" + data.d[i].ID + "</td>";
                    shtml = shtml + "<td style='text-align:center;border: 1px solid black;'>" + data.d[i].TRANS_NO + "</td>";
                    shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].TRANS_DATE + "</td>";
                    shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].TRANS_TYPE + "</td>";
                    if (data.d[i].IN_QTY > 0)
                        shtml = shtml + "<td style='text-align:center;color:blue;border: 1px solid black;'><b>" + data.d[i].IN_QTY + "</b></td>";
                    else
                        shtml = shtml + "<td style='text-align:center;color:blue;border: 1px solid black;'><b></b></td>";
                    if (data.d[i].OUT_QTY > 0)
                        shtml = shtml + "<td style='text-align:center;color:red;border: 1px solid black;'><b>" + data.d[i].OUT_QTY + "</b></td>";
                    else
                        shtml = shtml + "<td style='text-align:center;color:red;border: 1px solid black;'><b></b></td>";
                    shtml = shtml + "<td style='text-align:center;color:brown;border: 1px solid black;'><b>" + data.d[i].BAL_QTY + "</b></td><tr>";

                }
                shtml = shtml + "</tbody>";
                $('#tableprint').append(shtml);
                $('#printdiv').show();
                var divToPrint = document.getElementById("printdiv");
                newWin = window.open("");
                newWin.document.write(divToPrint.outerHTML);
                $('#printdiv').hide();
                newWin.print();


                document.getElementById("loader").style.display = "none";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("loader").style.display = "none";
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });

    $(document).on("click", ".barcodeButton", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "CatalogMaster.aspx/InsertBarcode",
            data: '{id : ' + id + '}',
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].RESULT === 1) {
                        alert(data.d[i].MSG);
                    }
                    else {
                        alert(data.d[i].MSG);
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Updating data of :" + id);
                return false;
            }
        });

    });

    $(document).on("click", ".cancelButton", function () {
        $('#mainlistingdiv').show();
        $('#mainldetaildiv').hide();
        $("#masterdiv").removeClass("container");
    });

});

function CalcAmt() {
    if (Datalodaing != 0)
        return;
    else if ($.isNumeric($("#GR_WT1").val()) == false)
        return;
    else if ($.isNumeric($("#ST_WT1").val()) == false)
        return;
    else if (Datalodaing == 0) {
        $("#NET_WT1").val(parseFloat($("#GR_WT1").val() - $("#ST_WT1").val()).toFixed(3));        
    }
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

function ShowUploadedFiles() {
    var catalogid = $("#btnUploadImage").attr("edit-id");

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CatalogMaster.aspx/GetCatalogImagesData",
        data: '{id: ' + catalogid + '}',
        dataType: "json",
        success: function (data) {
            $('#tableupload tbody').remove();
            $('#tableupload').append("<tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $('#tableupload').append(
                    "<tr><td>" + data.d[i].ORG_FILE_NAME + "</td><td><input type='checkbox'  class='chkkstatus' data-id=" + data.d[i].PHY_FILE_NAME + " " + (data.d[i].IS_THUMBNAIL == true ? "checked='checked'" : "") + "/></td>" +
                    "<td style='text-align:center'><img src='../images/static/delete.png' alt='Delete Record' class='deleteButtonImage handcursor' data-id='" + data.d[i].PHY_FILE_NAME + "' name='submitButton' id='btnDeleteImage' value='Delete' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td style='text-align:center'><img src='../images/static/imageview.png' alt='Delete Record' class='previewButtonImage handcursor' data-id='" + data.d[i].PHY_FILE_NAME + "' name='submitButton' id='btnPreviewImage' value='Preview' style='margin-right:5px;margin-left:5px'/> </td>" +
                    "<td style='text-align:center'><a class='downloadButton' href='CatalogImageUpload.ashx?action=DOWNLOAD&catalogid=" + catalogid + "&phy_file_name=" + data.d[i].PHY_FILE_NAME + "&org_file_name=" + data.d[i].ORG_FILE_NAME + "'><img src='../images/static/download.png' alt='Download Record' class='downloadButton handcursor' id='btnDeleteImage' style='margin-right:5px;margin-left:5px'/> </td></a></tr>");

            }
            $('#tableupload').append("</tbody>");

        },
        error: function () {
            alert("Error while Showing update data");
        }

        //
    });

}

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

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex 
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[3];
    dtDay = dtArray[1];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}