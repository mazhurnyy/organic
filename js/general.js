const
    axiosTimeOut = 15000,
    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
;
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token !== null) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

{
    //--------------------------------------------------------------------------------------------------------------
    // Ready
    document.addEventListener("DOMContentLoaded", function () {
        // Checkbox-agree
        const check_boxes_agree = document.querySelectorAll(".checkbox-agree input");

        for (let check of check_boxes_agree) {
            checkBoxAgree(check);
        }

        // Phone
        $("[type=tel]").inputmask("+380 (99) 999 99 99");

        // Slider
        $(".slider").slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3600
        });
        $(".slider-bottom").slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3600,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1112,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 536,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });

    function checkBoxAgree(elem) {
        const btn = elem.closest("form").find("[type=submit]");

        if (elem.checked) {
            btn.removeAttribute("disabled");
        } else {
            btn.setAttribute("disabled", "disabled");
        }
    }
}

$(function () {
    $(document)
        // Checkbox-agree
        .on("change", ".checkbox-agree input", function () {
            checkBoxAgree(this);
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