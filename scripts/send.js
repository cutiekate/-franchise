$(document).ready(function () {
    $('#name-1').focus(function() {
        $('.msg-help-1').css('display', 'none');
        $('.name-span-1').css('display', 'inline');
    });
    $('#name-2').focus(function() {
        $('.msg-help-2').css('display', 'none');
        $('.name-span-2').css('display', 'inline');
    });
    $('#name-3').focus(function() {
        $('.msg-help-3').css('display', 'none');
        $('.name-span-3').css('display', 'inline');
    });
    $('#phone-1').on('click', function() {
        var countryData = iti.getSelectedCountryData().dialCode;
        $('#prefix-1').val(countryData);
        if($('#phone-1').val()==""){
            $(this).val("+"+countryData);
        }
        if($('#phone-1').val()==""){
            $(this).val("+");
        }
        $('.msg-help-1').css('display', 'none');
        $('.tel-span-1').css('display', 'inline');
    });
    $('#phone-2').on('click', function() {
        var countryData = iti2.getSelectedCountryData().dialCode;
        $('#prefix-2').val(countryData);
        if($('#phone-2').val()==""){
            $(this).val("+"+countryData);
        }
        if($('#phone-2').val()==""){
            $(this).val("+");
        }
        $('.msg-help-2').css('display', 'none');
        $('.tel-span-2').css('display', 'inline');
    });
    $('#phone-3').on('click', function() {
        var countryData = iti3.getSelectedCountryData().dialCode;
        $('#prefix-3').val(countryData);
        if($('#phone-3').val()==""){
            $(this).val("+"+countryData);
        }
        if($('#phone-3').val()==""){
            $(this).val("+");
        }
        $('.msg-help-3').css('display', 'none');
        $('.tel-span-3').css('display', 'inline');
    });
    $('#mail-1').focus(function() {
        $('.msg-help-1').css('display', 'none');
        $('.mail-span-1').css('display', 'inline');
    });
    $('#mail-2').focus(function() {
        $('.msg-help-2').css('display', 'none');
        $('.mail-span-2').css('display', 'inline');
    });
    $('#mail-3').focus(function() {
        $('.msg-help-3').css('display', 'none');
        $('.mail-span-3').css('display', 'inline');
    });
    $('#form-1').disableAutoFill();
    $('#form-2').disableAutoFill();
    $('#form-3').disableAutoFill();
    $.get("https://ipinfo.io?token=a1676089e9b822", function(response) {
        $('#country-1').val(response.country);
        $('#country-2').val(response.country);
        $('#country-3').val(response.country);
    }, "jsonp");

    var input = document.querySelector("#phone-1"),
        input2 = document.querySelector("#phone-2"),
        input3 = document.querySelector("#phone-3"),
        errorMsg = document.querySelector("#error-msg-1"),
        errorMsg2 = document.querySelector("#error-msg-2"),
        errorMsg3 = document.querySelector("#error-msg-3"),
        validMsg = document.querySelector("#valid-msg-1"),
        validMsg2 = document.querySelector("#valid-msg-2"),
        validMsg3 = document.querySelector("#valid-msg-3"),
        errorMap = ["Ошибка в номере", "Неправильный код страны", "Продолжайте ввод...", "Слишком много символов", "Продолжайте ввод..."],
        iti = window.intlTelInput(input, {
            initialCountry: "auto",
            defaultCountry: 'auto',
            nationalMode: false,
            geoIpLookup: function(success, failure) {
                $.get("https://ipinfo.io?token=a1676089e9b822", function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    success(countryCode);
                });
            },
            utilsScript: "../scripts/utils.js"
        }),
        iti2 = window.intlTelInput(input2, {
            initialCountry: "auto",
            defaultCountry: 'auto',
            nationalMode: false,
            geoIpLookup: function(success, failure) {
                $.get("https://ipinfo.io?token=a1676089e9b822", function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    success(countryCode);
                });
            },
            utilsScript: "../scripts/utils.js"
        }),
        iti3 = window.intlTelInput(input3, {
            initialCountry: "auto",
            defaultCountry: 'auto',
            nationalMode: false,
            geoIpLookup: function(success, failure) {
                $.get("https://ipinfo.io?token=a1676089e9b822", function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    success(countryCode);
                });
            },
            utilsScript: "../scripts/utils.js"
        }),
        btn = $('button.sub');

        var reset = function() {
            input.classList.remove("error");
            input2.classList.remove("error");
            input3.classList.remove("error");
            errorMsg.innerHTML = "";
            errorMsg.classList.add("hide");
            validMsg.classList.add("hide");
            errorMsg2.classList.add("hide");
            validMsg2.classList.add("hide");
            errorMsg3.classList.add("hide");
            validMsg3.classList.add("hide");
        };

    $('#phone-1').on('keyup',function () {
        $(this).max = 16;
        reset();
        if (input.value.trim()) {
            if (iti.isValidNumber()) {
                validMsg.classList.remove("hide");
            } else {
                var errorCode = iti.getValidationError();
                
                if(errorCode=='-99'){
                    errorMsg.innerHTML = errorMap[2];
                }else{
                    errorMsg.innerHTML = errorMap[errorCode];
                }
                errorMsg.classList.remove("hide");
            }
        }
    });
    $('#phone-2').on('keyup',function () {
        $(this).max = 16;
        reset();
        if (input2.value.trim()) {
            if (iti2.isValidNumber()) {
                validMsg2.classList.remove("hide");
            } else {
                var errorCode = iti2.getValidationError();
                
                if(errorCode=='-99'){
                    errorMsg2.innerHTML = errorMap[2];
                }else{
                    errorMsg2.innerHTML = errorMap[errorCode];
                }
                errorMsg2.classList.remove("hide");
            }
        }
    });
    $('#phone-3').on('keyup',function () {
        $(this).max = 16;
        reset();
        if (input3.value.trim()) {
            if (iti3.isValidNumber()) {
                validMsg3.classList.remove("hide");
            } else {
                var errorCode = iti3.getValidationError();
                
                if(errorCode=='-99'){
                    errorMsg3.innerHTML = errorMap[2];
                }else{
                    errorMsg3.innerHTML = errorMap[errorCode];
                }
                errorMsg3.classList.remove("hide");
            }
        }
    });
    function errores (id, name_error){
        btn.prop("disabled", true);
        btn.css('opacity', '0.8');
        setTimeout(function () {
            $('#form-'+id+' .msg').text(name_error);
            btn.prop("disabled", false);
            btn.css('opacity', '1');
            $('button.sub span').html('<img src="img/load.gif">');
        },1000);
        setTimeout(function () {
            $('button.sub span').html('Получить');
            $('#form-'+id+' .msg').text('');
        },2000);
    }

    function submitForm(id){
        $("#form-"+id).on('submit',function (e) {
            e.preventDefault();
            let input_name = $('#form-'+id+' #name-'+id).val(),
                input_mail = $('#form-'+id+' #mail-'+id).val(),
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if(input_name==''){
                errores(id,'Укажите Ваше имя!');
            }else if (iti.isValidNumber()==false&&iti2.isValidNumber()==false&&iti3.isValidNumber()==false) {
                errores(id,'Укажите номер в международном формате');
            }else if(input_mail==''||reg.test(input_mail) == false){
                errores(id, 'Укажите Ваш Email!');
            }else{
                document.cookie = "user_name="+$('#form-'+id+' #name-'+id).val();
                $(this).find('button').prop("disabled", true);
                $('button.sub span').html('<img src="img/load.gif">');
                btn.css('opacity', '0.8');
                setTimeout(function () {
                    btn.css('opacity', '1');
                    $.ajax({
                        type: "POST",
                        url: "send.php", 
                        data: {
                            first_name: $('#form-'+id+' #name-'+id).val(),
                            last_name: $('#form-'+id+' #last_name-'+id).val(),
                            email: $('#form-'+id+' #mail-'+id).val(),
                            phone: $('#form-'+id+' #phone-'+id).val(),
                            prefix: $('#form-'+id+' #prefix-'+id).val(),
                            country: $('#form-'+id+' #country-'+id).val(),
                            language: $('#form-'+id+' #lang-'+id).val(),
                            utm_source: $('#form-'+id+' #utm_source-'+id).val(),
                            utm_medium: $('#form-'+id+' #utm_medium-'+id).val(),
                            utm_campaign: $('#form-'+id+' #utm_campaign-'+id).val(),
                            utm_term: $('#form-'+id+' #utm_term-'+id).val(),
                            utm_content: $('#form-'+id+' #utm_content-'+id).val(),
                            comment: $('#form-'+id+' #description-'+id).val(),
                            ip: $('#form-'+id+' #ip-'+id).val(),
                        },
                        success: function() {
                            $('button.sub').html('Отправлено ✓');
                            window.location.href = 'success.php';
                        }
                    });
                },1000);
            }
        });
    }
    submitForm(1);
    submitForm(2);
    submitForm(3);
});