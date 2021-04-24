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

        // Phone
        const phones = document.querySelectorAll("[type=tel]");

        for (let selector of phones) {
            let im = new Inputmask("+380 (99) 999 99 99");
            im.mask(selector);
        }

        // Checkbox-agree
        const check_boxes_agree = document.querySelectorAll(".checkbox-agree input");

        for (let check of check_boxes_agree) {
            checkBoxAgree(check);
        }
    });

    // Checkbox-agree
    document.addEventListener("change", function (e) {
        if (!e.target.closest(".checkbox-agree")) return true;

        checkBoxAgree(e.target);
    });

    function checkBoxAgree(elem) {
        const btn = elem.closest("form").querySelector("[type=submit]");

        if (elem.checked) {
            btn.removeAttribute("disabled");
        } else {
            btn.setAttribute("disabled", "disabled");
        }
    }

    // Misc
    document.addEventListener("click", function (e) {
        if (e.target.closest(`[href="#"]`)) e.preventDefault();
    });

    document.querySelector('#wrapper').focus();

    // Cookie
    document.addEventListener("click", function (e) {
        if (!e.target.classList.contains("cookie-close") && !e.target.closest(".cookie-close")) return true;

        document.querySelector("#cookie").remove();
    });

    // Input, Textarea
    document.addEventListener("input", formListener);

    document.addEventListener("change", formListener);

    document.addEventListener("focusin", formListener);

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
}

function submitOn(submit) {
    if (submit.length > 0) {
        submit = submit[0];
    }

    if (submit.hasAttribute("type")) {
        submit.removeAttribute("disabled");
    } else {
        submit.classList.remove("disabled");
    }

    const spinner = submit.querySelector(".spinner");
    if (spinner) {
        spinner.remove();
    }

    submit.querySelector("span").classList.remove("hidden");
}

function submitOff(submit) {
    if (submit.length > 0) {
        submit = submit[0];
    }

    if (submit.hasAttribute("type")) {
        submit.setAttribute("disabled", "disabled");
    } else {
        submit.classList.add("disabled");
    }

    const spinner = document.querySelector("#spinner .spinner");
    submit.append(spinner.cloneNode(true));

    submit.querySelector("span").classList.add("hidden");
}