$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var subject = $("input#subject").val();
            var from = $("input#from").val();
            var to = $("input#to").val();
            var phone = $("input#phone").val();
            var text = $("textarea#message").val();

            $.ajax({
                url: "https://formspree.io/you@email.com",
                type: "POST",
                data: {
                    _subject: subject,
                    to: to,
                    from: from,
                    text: text
                },
                beforeSend: function (request) {
                    request.setRequestHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Content-Type, x-requested-with");
                    request.setRequestHeader("Authorization", "Basic " + window.btoa('api:key-0b6d1e7915f49980434aa50e15b75e3b'));
                    request.setRequestHeader("Access-Control-Allow-Origin", "*");
                },
                crossDomain: true,
                cache: false,
                success: function () {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + ", it seems that my mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#subject').focus(function () {
    $('#success').html('');
});