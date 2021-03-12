const
    axiosTimeOut = 15000,
    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
;
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token !== null) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

{
    // Ready
    document.addEventListener("DOMContentLoaded", function () {
        // Checkbox-agree
        const check_boxes_agree = document.querySelectorAll(".checkbox-agree input");

        for (let check of check_boxes_agree) {
            checkBoxAgree(check);
        }

        // Phone
        for (let selector of document.querySelectorAll("[type=tel]")) {
            let im = new Inputmask("+380 (99) 999 99 99");
            im.mask(selector);
        }

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

    // Checkbox-agree
    document.addEventListener("change", function (e) {
        const check = e.target;

        if (check.closest(".checkbox-agree")) {
            checkBoxAgree(check);
        }
    });

    // Misc
    document.addEventListener("click", function (e) {
        if (e.target.href === "#" || e.target.closest(`[href="#"]`)) e.preventDefault();
    });

    // Cookie
    document.querySelector(".cookie-close").addEventListener("click", function () {
        document.querySelector("#cookie").remove();
    });

    // Input
    document.addEventListener("input", formListener);

    document.addEventListener("change", formListener);

    document.addEventListener("focus", formListener); // todo, phone

    document.addEventListener("paste", formListener);

    function formListener(e) {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") return true;

        const elem = e.target;

        elem.classList.remove("error");
        elem.classList.remove("success");

        const parent = elem.closest("[data-error]");
        if (parent) {
            parent.setAttribute("data-error", "");
        }
    }

    function checkBoxAgree(elem) {
        const btn = elem.closest("form").querySelector("[type=submit]");

        if (elem.checked) {
            btn.removeAttribute("disabled");
        } else {
            btn.setAttribute("disabled", "disabled");
        }
    }
}

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