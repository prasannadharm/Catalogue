$(function () {
    $("#btngetdetails").click(function () {
        if ($("#email1").val().trim() == "") {
            alert("Please enter email address.");
            $("#email1").focus();
            return false;
        }      

        
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: "ForgotPassword.aspx/ForgotPasword",
            data: "{email: '" + JSON.stringify($("#email1").val().trim()) + "'}",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].RESULT === 1) {
                        alert(data.d[i].MSG);
                        window.location = window.location.host;
                    }
                    else {
                        alert(data.d[i].MSG);
                        $("#email1").focus();
                        return false;
                    }
                }
            },
            error: function (data) {
                alert("Error while Adding data of :" + obj.NAME);
                $("#email1").focus();
                return false;
            }
        });

    });

});