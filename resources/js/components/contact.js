$( "#alert" ).hide();
$("#contactForm").on("submit", function (e) {
    $("#alert").hide();
    $("#alert p").text("");

    e.preventDefault();
    e.stopPropagation();

    let name = $("input[type=text]").val();
    let email = $("input[type=email]").val();
    let text = $("textarea").val();
    let checkbox = $("input[type=checkbox]").is(":checked");
    let policy = false;
    let recaptcha = $("#recaptcha").val();

    if (checkbox) {
        policy = true;
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    let ajax = $.ajax(
        {
            type: 'POST',
            url: "/contactForm",
            data:
                {
                    name: name,
                    email: email,
                    text: text,
                    policy: policy,
                    recaptcha: recaptcha,
                },
            dataType: 'json',
            success: function (data) {
                $("#alert p").text(data.result);
                $("#contactForm")[0].reset();
                $("#alert").fadeIn(400).delay(10000).fadeOut(400);
            },
            error: function (data) {
                $("#alert p").text(data.error);
                $("#alert").fadeIn(400).delay(10000).fadeOut(400);
            }
        });
});
