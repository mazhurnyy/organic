$(function () {
    let slide_index = 0;

    $(window)
        .bind("resize", function () {
            spoilerInit();
        })
    ;
    $(document)
        .ready(function () {
            spoilerInit();

            if (!document.querySelector(".product-slider")) return true;

            const slides = $(".product-slider .slide").length / 2;

            $(".product-slider")
                .slick({
                    dots: false,
                    speed: 300,
                    slidesToShow: slides > 4 ? 4 : slides - 1,
                    slidesToScroll: 1
                })
                .on("afterChange", function (e, slick, index) {
                    slide_index = index;
                    $(".product-slider .slide[data-idx=" + index + "]").click();
                })
            ;

            $(".product-slider .slide[data-idx=0]").click();
        })
        .on("click", ".product-slider .slide", function () {
            const
                webp = $(this).find("source").data("source"),
                jpeg = $(this).find("img").data("source"),
                left = $(".left > .photo"),
                right = $(".right > .photo")
            ;

            if (slide_index !== $(this).data("idx")) {
                slide_index = $(this).data("idx");
                $(".product-slider").slick("slickGoTo", slide_index);
            }

            left.attr("data-idx", slide_index);
            left.find("source").attr("srcset", webp);
            left.find("img").attr("src", jpeg);
            right.attr("data-idx", slide_index);
            right.find("source").attr("srcset", webp);
            right.find("img").attr("src", jpeg);

            $(".product-slider .slide").removeClass("active");
            $(".product-slider .slide[data-idx=" + slide_index + "]").addClass("active");
        })
        .on("click", ".top .photo-open", function () {
            const wrapper = $("#wrapper");
            if (wrapper.outerWidth() < 768 || wrapper.outerHeight() < 560 || mobile) return false;

            modalOpen("picture");

            const modal_slider_obj = $(".modal-slider");
            if (!modal_slider_obj) return true;

            if (!modal_slider_obj.hasClass("slick-initialized")) {
                modal_slider_obj.slick({
                    dots: true,
                    arrows: true,
                    speed: 300
                });
            }

            modal_slider_obj
                .slick("slickGoTo", slide_index)
                .on("afterChange", function (e, slick, index) {
                    slide_index = index;
                    $(".product-slider").slick("slickGoTo", slide_index);
                })
            ;
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
            $(".buttons.card.basket-add .buy").attr("data-quantity", number_new);
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
