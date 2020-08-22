$(function () {
    let plus_minus_timout;

    $(document)
        .ready(function () {
            $(".position").each(function () {
                if (+$(this).find(".quantity-number").text() === 1) {
                    $(this).find(".quantity-minus").addClass("disabled");
                }
            });
        })
        .on("click", "#header-bag.basket-add", function (e) {
            e.preventDefault();
            modalOpen("basket_empty");
        })
        .on("click", ".buy.basket-add", function (e) {
            e.preventDefault();
            const submit = $(".buy.basket-add"), that = this;
            if (submit.hasClass("disabled")) return false;

            const
                id = $(this).attr("data-id"),
                quantity = $(this).attr("data-quantity"),
                img = $(".photo img[data-id=" + id + "]"),
                alt = img.attr("alt"),
                src = img.attr("data-source"),
                srcset = img.prev().attr("data-source")
            ;

            $(".modal-buy .photo img").attr("src", src).attr("alt", alt);
            $(".modal-buy .photo source").attr("srcset", srcset);

            submitOff(submit);
            setTimeout(function () {
                axios
                    .post("/cart/add", {
                        id: id,
                        quantity: quantity,
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        $(that).removeClass("basket-add").addClass("added");
                        $("#header-bag").removeClass("basket-add").addClass("added");
                        modalOpen("buy");
                    })
                    .catch(function (error) {
                        $(that).removeClass("basket-add").addClass("added");
                        $("#header-bag").removeClass("basket-add").addClass("added");
                        modalOpen("buy");
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(submit);
                    })
                ;
            }, 700);
        })
        .on("submit", ".form-one_click", function (e) {
            e.preventDefault();
            const submit = $(".form-one_click [type=submit]");

            const
                input = $(".form-one_click [type=tel]"),
                tel = input.val().replace(/[^\d]/g, '')
            ;

            if (tel.length === 12) {
                input.removeClass("error");
            } else {
                input.addClass("error");
            }

            if (tel.length === 12) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/cart/one_click", {
                            tel: tel,
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            $(".buy.added").removeClass("added").addClass("basket-add");
                            $("#header-bag").removeClass("added").addClass("basket-add");
                            $(".modal-buy_done .subtitle span").text(response);
                            modalOpen("buy_done");
                        })
                        .catch(function (error) {
                            $(".buy.added").removeClass("added").addClass("basket-add");
                            $("#header-bag").removeClass("added").addClass("basket-add");
                            $(".modal-buy_done .subtitle span").text("321");
                            modalOpen("buy_done");
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
        .on("click", ".position .quantity-plus:not(.disabled)", function () {
            changeQuantity(this, 1);
        })
        .on("click", ".position .quantity-minus:not(.disabled)", function () {
            changeQuantity(this, -1);
        })
        .on("click", ".position .delete:not(.disabled)", function () {
            deletePosition(this);
        })
        .on("input change focus paste", "#ordering-first_name", function () {
            $("[for=ordering-first_name]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-last_name", function () {
            $("[for=ordering-last_name]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-phone", function () {
            $("[for=ordering-phone]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-address", function () {
            $("[for=ordering-address]").attr("data-error", "");
        })
        .on("submit", ".ordering-form", function (e) {
            e.preventDefault();
            const submit = $(".ordering-form [type=submit]");

            const
                f_name_obj = $("#ordering-first_name"),
                f_name_label = $("[for=ordering-first_name]"),
                f_name = f_name_obj.val().trim(),
                l_name_obj = $("#ordering-last_name"),
                l_name_label = $("[for=ordering-last_name]"),
                l_name = l_name_obj.val().trim(),
                tel_obj = $("#ordering-phone"),
                tel_label = $("[for=ordering-phone]"),
                tel = tel_obj.val().replace(/[^\d]/g, ''),
                address_obj = $("#ordering-address"),
                address_label = $("[for=ordering-address]"),
                address = address_obj.val().trim()
            ;

            if (f_name.length >= 2) {
                f_name_obj.removeClass("error");
                f_name_label.attr("data-error", "");
            } else {
                f_name_obj.addClass("error");
                f_name_label.attr("data-error", f_name_label.data("txt"));
            }

            if (l_name.length >= 2) {
                l_name_obj.removeClass("error");
                l_name_label.attr("data-error", "");
            } else {
                l_name_obj.addClass("error");
                l_name_label.attr("data-error", l_name_label.data("txt"));
            }

            if (tel.length === 12) {
                tel_obj.removeClass("error");
                tel_label.attr("data-error", "");
            } else {
                tel_obj.addClass("error");
                tel_label.attr("data-error", tel_label.data("txt"));
            }

            if (address.length >= 6) {
                address_obj.removeClass("error");
                address_label.attr("data-error", "");
            } else {
                address_obj.addClass("error");
                address_label.attr("data-error", address_label.data("txt"));
            }

            if (f_name.length >= 2 && l_name.length >= 2 && tel.length === 12 && address.length >= 6) {
                submitOff(submit);

                setTimeout(function () {

                    // todo AXIOS
                    console.log("ordering-form submit: f name: " + f_name);
                    console.log("ordering-form submit: l name: " + l_name);
                    console.log("ordering-form submit: tel: " + tel);
                    console.log("ordering-form submit: address: " + address);

                    // Успех
                    let response = 321;
                    cleanBasket();

                    $("#header-bag").removeClass("added").addClass("basket-add");
                    $(".modal-buy_done .subtitle span").text(response);
                    modalOpen("buy_done");

                    // При неудаче без ответа
                    // modalOpen("error");

                    // В любом случае снимаем блокировку
                    submitOn(submit);

                }, 700);
            }
        })
    ;

    function changeQuantity(that, step) {
        let position_obj = $(that).closest(".position"),
            position = position_obj.data("id"),
            number_obj = position_obj.find(".quantity-number"),
            number_old = parseInt(number_obj.text()),
            number_new = number_old + step
        ;

        if (number_new > 0) {
            number_obj.text(number_new);
        } else {
            return false;
        }

        if (number_new > 1) {
            position_obj.find(".quantity-minus").removeClass("disabled");
        } else {
            position_obj.find(".quantity-minus").addClass("disabled");
        }

        //

        submitOff(position_obj.find(".sum"));
        position_obj.find(".delete").addClass("disabled");
        blockOtherPositions(position);

        clearTimeout(plus_minus_timout);
        plus_minus_timout = setTimeout(function () {
            $(".position[data-id=" + position + "]").find(".quantity-btn").addClass("disabled");
            setTimeout(function () {

                // todo AXIOS
                // обновление позиции
                console.log("position: id: " + position);
                console.log("position: quantity: " + number_new);

                // успех
                const response = {  // Заглушка
                    price: 100,
                    sum: 100 * number_new,
                    total: 100 * number_new + 1000
                };
                position_obj.find(".price span").text(response.price);
                position_obj.find(".sum span").text(response.sum);
                $(".summary-total span").text(response.total);

                // При неудаче
                // modalOpen("error");

                // В любом случае снимаем блокировку
                submitOn(position_obj.find(".sum"));
                unBlockPositions();

            }, 700);
        }, 2000);
    }

    function deletePosition(that) {
        const position_obj = $(that).closest(".position"),
            position = position_obj.data("id")
        ;

        submitOff($(that));
        $(".position[data-id=" + position + "]").find(".quantity-btn").addClass("disabled");
        blockOtherPositions(position);

        setTimeout(function () {

            // todo AXIOS
            // удаление позиции
            console.log("position: id: " + position);

            // успех
            position_obj.remove();

            // При неудаче
            // submitOn($(that));
            // modalOpen("error");

            // В любом случае снимаем блокировку
            unBlockPositions();

        }, 700);
    }

    function blockOtherPositions(position) {
        const other_positions = $(".position:not([data-id=" + position + "])");

        other_positions.find(".quantity-btn").addClass("disabled");
        other_positions.find(".delete").addClass("disabled");

        submitOff($(".summary-total"));
    }

    function unBlockPositions() {
        const positions = $(".position");

        if (positions.length > 0) {

            positions.each(function () {
                $(this).find(".delete").removeClass("disabled");
                $(this).find(".quantity-plus").removeClass("disabled");

                if (+$(this).find(".quantity-number").text() === 1) {
                    $(this).find(".quantity-minus").addClass("disabled");
                } else {
                    $(this).find(".quantity-minus").removeClass("disabled");
                }
            });

            submitOn($(".summary-total"));
        } else {
            cleanBasket();
        }
    }

    function cleanBasket() {
        $("#content-article").removeClass("d-none");
        $("#content-ordering").remove();
        $("#content-basket").remove();
    }
});
