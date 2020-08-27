const
    axiosTimeOut = 15000,
    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
;
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token !== null) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

$(function () {
    $(document)
        //--------------------------------------------------------------------------------------------------------------
        // Ready
        .ready(function () {
            // Phone
            $("[type=tel]").inputmask("+380 (99) 999 99 99");

            // Checkbox-agree
            $(".checkbox-agree input").each(function () {
                checkBoxAgree(this);
            });

            // Slider
            $(".slider").slick({
                dots: true,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 3600
            });
        })
        //--------------------------------------------------------------------------------------------------------------
        // Misc
        .on("click", "a[href='#']", function (e) {
            e.preventDefault();
        })
        .on("click", ".cookie-close", function () {
            $("#cookie").remove();
        })
        //--------------------------------------------------------------------------------------------------------------
        // Input
        .on("input change focus paste", "input", function () {
            $(this).removeClass("error").removeClass("success").parent().attr("data-error", "");
        })
        .on("input change focus paste", "textarea", function () {
            $(this).removeClass("error").removeClass("success").parent().attr("data-error", "");
        })
        // Checkbox-agree
        .on("change", ".checkbox-agree input", function () {
            checkBoxAgree(this);
        })
    //--------------------------------------------------------------------------------------------------------------
    ;

    function checkBoxAgree(that) {
        const
            checkbox = $(that),
            btn = checkbox.closest("form").find("[type=submit]")
        ;

        if (checkbox.is(':checked')) {
            btn.removeAttr("disabled");
        } else {
            btn.attr("disabled", "disabled");
        }
    }
});

function submitOn(submit) {
    if (typeof submit.attr("type") === "undefined") {
        submit.removeClass("disabled");
    } else {
        submit.removeAttr("disabled");
    }

    submit.find(".spinner").remove();
    submit.find("span").removeClass("hidden");
}

function submitOff(submit) {
    if (typeof submit.attr("type") === "undefined") {
        submit.addClass("disabled");
    } else {
        submit.attr("disabled", "disabled");
    }

    if (submit.find(".spinner").length === 0) {
        submit.append($("#spinner .spinner").clone());
        submit.find("span").addClass("hidden");
    }
}