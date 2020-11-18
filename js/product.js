$(function () {
    $(window)
        .bind("resize", function () {
            spoilerInit();
        })
    ;
    $(document)
        .ready(function () {
            spoilerInit();

            const
                obj = $(".top .photo-open"),
                alt = obj.find("img").attr("alt"),
                src = obj.find("img").data("source"),
                srcset = obj.find("source").data("source")
            ;

            $(".modal-picture picture img").attr("src", src).attr("alt", alt);
            $(".modal-picture picture source").attr("srcset", srcset);
        })
        .on("click", ".top .photo-open", function () {
            const wrapper = $("#wrapper");
            if (wrapper.outerWidth() < 768 || wrapper.outerHeight() < 560 || mobile) return false;

            modalOpen("picture");
        })
        .on("click", ".show_description", function (e) {
            e.preventDefault();

            $(".description-outer").css("-webkit-line-clamp", "unset");
            $(this).addClass("d-none");
        })
        .on("click", "#content-product .quantity-plus:not(.disabled)", function () {
            changeQuantity(this, 1);
        })
        .on("click", "#content-product .quantity-minus:not(.disabled)", function () {
            changeQuantity(this, -1);
        })
        .on("click", ".tabs .tabs-header:not(.active)", function (e) {
            e.preventDefault();

            const wrap = $(this).closest(".tabs");

            wrap.find(".tabs-header.active").removeClass("active");
            wrap.find(".tabs-content.active").removeClass("active");

            $(this).addClass("active");
            $($(this).attr("href")).addClass("active");
        })
        .on("submit", ".form-review_product", function (e) {
            e.preventDefault();
            const submit = $(".form-review_product [type=submit]");

            const
                msg_obj = $("#review_product-message"),
                msg = msg_obj.val().trim(),
                parent = msg_obj.parent()
            ;

            if (msg.length >= 6) {
                msg_obj.removeClass("error");
                parent.attr("data-error", "");
            } else {
                msg_obj.addClass("error");
                parent.attr("data-error", parent.data("txt"));
            }

            if (msg.length >= 6) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/product/reviews", {
                            message: msg,
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            modalOpen("review_done");
                        })
                        .catch(function (error) {
                            modalOpen("review_done");
                            return;

                            modalOpen("error");
                        })
                        .then(function () {
                            submitOn(submit);
                        })
                    ;
                }, 700);
            }
        })
    ;

    function changeQuantity(that, step) {
        let number_obj = $(that).closest(".quantity").find(".quantity-number"),
            number_old = parseInt(number_obj.text()),
            number_new = number_old + step
        ;

        if (number_new > 0) {
            number_obj.text(number_new);
            $("#content-product .basket-add").attr("data-quantity", number_new);
        }

        if (number_new > 1) {
            $(that).parent().find(".quantity-minus").removeClass("disabled");
        } else {
            $(that).parent().find(".quantity-minus").addClass("disabled");
        }
    }

    function spoilerInit() {
        const btn = $(".show_description");
        if (btn.length > 0) {
            const
                texts = $(".description-inner").children(),
                height1 = parseInt($(".description-outer").outerHeight())
            ;
            let height2 = 0;

            texts.each(function () {
                if (height2 > height1) return false;
                height2 += parseInt($(this).outerHeight(true));
            });

            if (height2 > height1) {
                btn.removeClass("d-none");
            } else {
                btn.addClass("d-none");
            }
        }
    }
});
