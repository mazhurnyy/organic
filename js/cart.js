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
        .on("click", ".card.basket-add .buy", function (e) {
            e.preventDefault();
            const submit = $(".card.basket-add .buy");
            if (submit.hasClass("disabled")) return false;

            const
                card = $(this).closest(".card"),
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
                        card.removeClass("basket-add").addClass("added");
                        const bag = $("#header-bag");
                        bag.attr("data-quantity", +bag.attr("data-quantity") + 1);
                        bag.removeClass("basket-add").addClass("added");
                        modalOpen("buy");
                    })
                    .catch(function (error) {
                        card.removeClass("basket-add").addClass("added");
                        const bag = $("#header-bag");
                        bag.attr("data-quantity", +bag.attr("data-quantity") + 1);
                        bag.removeClass("basket-add").addClass("added");
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
                            $(".card.added").removeClass("added").addClass("basket-add");
                            $("#header-bag").removeClass("added").addClass("basket-add").attr("data-quantity", "0");
                            $(".modal-buy_done .subtitle span").text(response.data);
                            modalOpen("buy_done");
                        })
                        .catch(function (error) {
                            $(".card.added").removeClass("added").addClass("basket-add");
                            $("#header-bag").removeClass("added").addClass("basket-add").attr("data-quantity", "0");
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


        submitOff(position_obj.find(".sum"));
        position_obj.find(".delete").addClass("disabled");
        blockOtherPositions(position);

        clearTimeout(plus_minus_timout);
        plus_minus_timout = setTimeout(function () {
            $(".position[data-id=" + position + "]").find(".quantity-btn").addClass("disabled");
            setTimeout(function () {
                axios
                    .post("/cart/quantity", {
                        id: position,
                        quantity: number_new,
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        position_obj.find(".price span").text(response.price);
                        position_obj.find(".sum span").text(response.data.sum);
                        $(".summary-total span").text(response.data.total);
                    })
                    .catch(function (error) {
                        const response = {
                            price: 100,
                            sum: 100 * number_new,
                            total: 100 * number_new + 1500
                        };
                        position_obj.find(".price span").text(response.price);
                        position_obj.find(".sum span").text(response.sum);
                        $(".summary-total span").text(response.total);
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(position_obj.find(".sum"));
                        unBlockPositions();
                    })
                ;
            }, 700);
        }, 1500);
    }

    function deletePosition(that) {
        const position_obj = $(that).closest(".position"),
            position = position_obj.data("id")
        ;

        submitOff($(that));
        $(".position[data-id=" + position + "]").find(".quantity-btn").addClass("disabled");
        blockOtherPositions(position);

        setTimeout(function () {
            axios
                .post("/cart/delete", {
                    id: position,
                }, {
                    timeout: axiosTimeOut
                })
                .then(function (response) {
                    position_obj.remove();
                    $(".summary-total span").text(response.data.total);

                    const bag = $("#header-bag");
                    bag.attr("data-quantity", +bag.attr("data-quantity") - 1);
                })
                .catch(function (error) {
                    position_obj.remove();
                    $(".summary-total span").text(500);
                    const bag = $("#header-bag");
                    bag.attr("data-quantity", +bag.attr("data-quantity") - 1);
                    return;

                    submitOn($(that));
                    modalOpen("error");
                })
                .then(function () {
                    unBlockPositions();
                })
            ;
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
        $("#content-basket").remove();
    }
});