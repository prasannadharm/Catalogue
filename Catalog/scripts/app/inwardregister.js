$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $('#dtpFrom').datepicker('setDate', today);
    $('#dtpTo').datepicker('setDate', today);
    $('#txt_From_No').val(0);
    $('#txt_To_No').val(0);
    $('#ContentPlaceHolder1_txt_Ledname').focus();
    $('#dtpFrom').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#dtpTo').focus();
        }
    });

    $('#dtpTo').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#txt_From_No').focus();
        }
    });

    $('#txt_From_No').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#txt_To_No').focus();
        }
    });

    $('#txt_To_No').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#ContentPlaceHolder1_txt_Ledname').focus();
        }
    });

    $('#ContentPlaceHolder1_txt_Ledname').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#txt_SKU').focus();
        }
    });

    $('#txt_SKU').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#txt_Code').focus();
        }
    });

    $('#txt_Code').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#txt_TitleDesc').focus();
        }
    });

    $('#txt_TitleDesc').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            generatereport();
        }
    });

    $("#btnClearfilter").click(function () {
        clearfilter();
    });

    $("[id$=txt_Ledname]").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "InwardRegister.aspx/GetLedgersbyName",
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
            // $("[id$=LED_ID]").val(i.item.val);
        },
        minLength: 1
    });

    $.ajax({
        type: "POST",
        url: "InwardRegister.aspx/GetDropdownLisData",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCombos
    });

    $("#btnGenerate").click(function () {
        generatereport();
    });

    $.ajax({
        type: "POST",
        url: "InwardRegister.aspx/GetActiveInwardTypeList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadInwardTypeCombo
    });
})

function LoadInwardTypeCombo(data) {
    var options = [];
    options.push('<option value="',
          "0", '">',
          "--Nothing Selected--", '</option>');
    for (var i = 0; i < data.d.length; i++) {
        options.push('<option value="',
          data.d[i].ID, '">',
          data.d[i].NAME, '</option>');
    }
    $("#cmb_InwardType").html(options.join(''));
}

function generatereport() {

    if (isDate($("#dtpFrom").val()) == false) {
        alert('Please enter valid date');
        $("#dtpFrom").focus();
        return false;
    }

    if (isDate($("#dtpTo").val()) == false) {
        alert('Please enter valid date');
        $("#dtpTo").focus();
        return false;
    }

    var fit_start_time = $("#dtpFrom").val(); //2013-09-5
    fit_start_time = fit_start_time.substring(6, 10) + '-' + fit_start_time.substring(3, 5) + '-' + fit_start_time.substring(0, 2);
    var fit_end_time = $("#dtpTo").val(); //2013-09-10
    fit_end_time = fit_end_time.substring(6, 10) + '-' + fit_end_time.substring(3, 5) + '-' + fit_end_time.substring(0, 2);

    if (Date.parse(fit_start_time) > Date.parse(fit_end_time)) {
        alert("Date from must be lesser than Date to.");
        $("#dtpFrom").focus();
        return false;
    }

    if ($("#txt_From_No").val() == null || $("#txt_From_No").val() == undefined) {
        alert("Please enter From No.");
        $("#txt_From_No").focus();
        return false;
    }

    if ($("#txt_To_No").val() == null || $("#txt_To_No").val() == undefined) {
        alert("Please enter To No.");
        $("#txt_To_No").focus();
        return false;
    }

    if ($("#txt_From_No").val() > $("#txt_To_No").val()) {
        alert("Please enter From No. cannot be greaterthan To No.");
        $("#txt_To_No").focus();
        return false;
    }

    $('#lbldatefrom').text($("#dtpFrom").val());
    $('#lbldateto').text($("#dtpTo").val());

    var obj = {};
    obj.FROMDATE = $("#dtpFrom").val();
    obj.TODATE = $("#dtpTo").val();
    obj.FROMNO = $("#txt_From_No").val();
    obj.TONO = $("#txt_To_No").val();
    obj.LEDNAME = $("#ContentPlaceHolder1_txt_Ledname").val();
    obj.SKU = $("#txt_SKU").val();
    obj.CODE = $("#txt_Code").val();
    obj.DESC = $("#txt_TitleDesc").val();
    obj.IN_TYPE_ID = $("#cmb_InwardType").val();

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

    var filtertext = '';
    filtertext = "Date From : " + $("#dtpFrom").val();
    filtertext = filtertext + " To " + $("#dtpTo").val();

    if ($("#txt_From_No").val() > 0 || $("#txt_To_No").val() > 0) {
        filtertext = filtertext + "; No From :" + $("#txt_From_No").val() + " To " + $("#txt_To_No").val();
    }

    if ($.trim($("#ContentPlaceHolder1_txt_Ledname").val()) != '') {
        filtertext = filtertext + "; Ledger :" + $("#ContentPlaceHolder1_txt_Ledname").val();
    }

    if ($.trim($("#cmb_InwardType").val()) > 0) {
        filtertext = filtertext + "; Inward Type :" + $("#cmb_InwardType option:selected").text();
    }

    if ($.trim($("#txt_SKU").val()) != '') {
        filtertext = filtertext + "; SKU :" + $("#txt_SKU").val();
    }

    if ($.trim($("#txt_Code").val()) != '') {
        filtertext = filtertext + "; Code : " + $("#txt_Code").val();
    }

    if ($.trim($("#txt_TitleDesc").val()) != '') {
        filtertext = filtertext + "; Title Desc. : " + $("#txt_TitleDesc").val();
    }

    if (strjewel.length > 0) {
        filtertext = filtertext + "; Jewellery : ";
        $('#cmbJewellery > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    if (strjdesign.length > 0) {
        filtertext = filtertext + "; Design : ";
        $('#cmbDesign > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    if (strcoll.length > 0) {
        filtertext = filtertext + "; Collection : ";
        $('#cmbCollection > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    if (strmat.length > 0) {
        filtertext = filtertext + "; Material : ";
        $('#cmbMaterial > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    if (strocc.length > 0) {
        filtertext = filtertext + "; Occasion : ";
        $('#cmbOccasion > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    if (strocc.length > 0) {
        filtertext = filtertext + "; Gram Slab : ";
        $('#CmbGramSlab > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    if (strkarat.length > 0) {
        filtertext = filtertext + "; Karat : ";
        $('#cmbKarat > option:selected').each(function () {
            filtertext = filtertext + $(this).text() + ',';
        });
        filtertext = filtertext.substring(0, filtertext.length - 1);
    }

    $('#lblfilter').text(filtertext);


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InwardRegister.aspx/GetInwardRegisterData",
        data: '{obj: ' + JSON.stringify(obj) + '}',
        dataType: "json",
        success: function (data) {
            var mainid = 0;
            var shtml = '';
            //No, Date, Ref NO, Ledger, Remarks, Void, Creadted by Modified
            //SKU,Code,Title,QTY,Remarks  
            $('#tableprint thead').remove();
            $('#tableprint tbody').remove();
            shtml = shtml + "<thead>";
            shtml = shtml + "<tr><th style='border: 1px solid black;'>Trans No</th><th style='border: 1px solid black;'>Trans Date</th><th style='border: 1px solid black;'>Ref No</th><th style='border: 1px solid black;'>Ledger</th><th style='border: 1px solid black;'>Inward Type</th><th style='border: 1px solid black;'>Remarks</th><th style='border: 1px solid black;'>Void</th><th style='border: 1px solid black;'>Created By</th><th style='border: 1px solid black;'>Modified By</th></tr>";
            shtml = shtml + "</thead>";
            shtml = shtml + "<tbody>";
            for (var i = 0; i < data.d.length; i++) {
                if (mainid != data.d[i].TRANS_MAIN_ID) {
                    mainid = data.d[i].TRANS_MAIN_ID;
                    if (i != 0) {
                        shtml = shtml + "</tboby></table></td></tr>"; //For Sub Table
                    }
                    shtml = shtml + "<tr><td style='text-align:center;color:blue;border: 1px solid black;'><b>" + data.d[i].TRANS_NO + "</b></td>";
                    shtml = shtml + "<td style='text-align:center;border: 1px solid black;'>" + data.d[i].TRANS_DATE + "</td>";
                    shtml = shtml + "<td style='text-align:center;border: 1px solid black;'>" + data.d[i].REF_NO + "</td>";
                    shtml = shtml + "<td style='color:blue;border: 1px solid black;'><b>" + data.d[i].LED_NAME + "</b></td>";
                    shtml = shtml + "<td style='text-align:center;border: 1px solid black;'>" + data.d[i].IN_TYPE_NAME + "</td>";
                    shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].REMARKS_M + "</td>";
                    shtml = shtml + "<td style='text-align:center;border: 1px solid black;'>" + "<input type='checkbox' onclick='return false;' " + (data.d[i].VOID_STATUS == true ? "checked='checked'" : "") + "/></td>";
                    shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].CREATEDBY + "</td>";
                    shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].MODIFIEDBY + "</td></tr>";
                    shtml = shtml + "<tr><td colspan='3'>";
                    shtml = shtml + "<table class='table table-striped table-bordered' style='width: 100%;border-collapse: collapse;'>";
                    shtml = shtml + "<thead>";
                    shtml = shtml + "<tr><th style='border: 1px solid black;'>SKU</th><th style='border: 1px solid black;'>Code</th><th style='border: 1px solid black;'>Title Desc.</th><th style='border: 1px solid black;'>Qty</th><th style='border: 1px solid black;'>Out No</th><th style='border: 1px solid black;'>Remarks</th></tr>";
                    shtml = shtml + "</thead>";
                    shtml = shtml + "<tbody>";
                }
                shtml = shtml + "<tr><td style='text-align:center;color:brown;border: 1px solid black;'><b>" + data.d[i].SKU + "<b></td>";
                shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].CODE + "</td>";
                shtml = shtml + "<td style='border: 1px solid black;'><b>" + data.d[i].CATALOG_TITLE + "</b></td>";
                shtml = shtml + "<td style='text-align:center;color:blue;border: 1px solid black;'><b>" + data.d[i].QTY + "</b></td>";
                shtml = shtml + "<td style='text-align:center;color:red;border: 1px solid black;'><b>" + data.d[i].OUT_TRANS_NO + "</b></td>";
                shtml = shtml + "<td style='border: 1px solid black;'>" + data.d[i].REMARKS + "</td></tr>";
            }
            shtml = shtml + "</tboby></table></td></tr>"; //For Sub Table
            shtml = shtml + "</tbody>";
            $('#tableprint').append(shtml);
            $('#printdiv').show();
            var divToPrint = document.getElementById("printdiv");
            newWin = window.open("");
            newWin.document.write(printdiv.outerHTML);
            $('#printdiv').hide();
            newWin.print();


            document.getElementById("loader").style.display = "none";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("loader").style.display = "none";
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });

}

function clearfilter() {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $('#dtpFrom').datepicker('setDate', today);
    $('#dtpTo').datepicker('setDate', today);
    $('#txt_From_No').val(0);
    $('#txt_To_No').val(0);
    $("#ContentPlaceHolder1_txt_Ledname").val('');
    $("#txt_SKU").val('');
    $("#txt_Code").val('');
    $("#txt_TitleDesc").val('');
    $("#cmb_InwardType").val('0');

    $("#cmbJewellery").val('default').selectpicker("refresh");
    $("#cmbDesign").val('default').selectpicker("refresh");
    $("#cmbCollection").val('default').selectpicker("refresh");
    $("#cmbMaterial").val('default').selectpicker("refresh");
    $("#cmbOccasion").val('default').selectpicker("refresh");
    $("#CmbGramSlab").val('default').selectpicker("refresh");
    $("#cmbKarat").val('default').selectpicker("refresh");
    $('#ContentPlaceHolder1_txt_Ledname').focus();
}

function LoadCombos(data) {

    var optionsJewel = [];
    var optionsDesign = [];
    var optionsCollection = [];
    var optionsMaterial = [];
    var optionsOccasion = [];
    var optionsGramSlab = [];
    var optionsKarat = [];

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