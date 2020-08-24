$(function () {
    let plus_minus_timout,
        delivery_timout,
        index_timeout,
        delivery_city_symbols = '',
        delivery_city_search = '',
        delivery_city_input = '[aria-controls=select2-ordering-delivery-city-results]',
        delivery_alias_obj = $("#ordering-delivery"),
        delivery_city_obj = $("#ordering-delivery-city"),
        delivery_number_obj = $("#ordering-delivery-number")
    ;

    $(document)
        .ready(function () {
            $(".position").each(function () {
                if (+$(this).find(".quantity-number").text() === 1) {
                    $(this).find(".quantity-minus").addClass("disabled");
                }
            });

            if ($("#services-delivery").length > 0) {
                initSelectCity();
                initSelectNumber();
            }
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
                            $(".modal-buy_done .subtitle span").text(response.data);
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
        .on("input change focus paste", "#ordering-payment", function () {
            $("[for=ordering-payment]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-delivery", function () {
            $("[for=ordering-delivery]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-delivery-city", function () {
            $("[for=ordering-delivery-city]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-delivery-number", function () {
            $("[for=ordering-delivery-number]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-ukrposhta-index", function () {
            $("[for=ordering-ukrposhta-index]").attr("data-error", "");
        })
        .on("input change focus paste", "#ordering-ukrposhta-address", function () {
            $("[for=ordering-ukrposhta-address]").attr("data-error", "");
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
                payment_obj = $("#ordering-payment"),
                payment_id = payment_obj.val(),
                delivery_obj = $("#ordering-delivery"),
                delivery_alias = delivery_obj.val(),
                delivery_city_obj = $("#ordering-delivery-city"),
                delivery_city_label = $("[for=ordering-delivery-city]"),
                delivery_city_id = delivery_city_obj.val(),
                delivery_number_obj = $("#ordering-delivery-number"),
                delivery_number_label = $("[for=ordering-delivery-number]"),
                delivery_number = delivery_number_obj.val(),
                ukrposhta_index_obj = $("#ordering-ukrposhta-index"),
                ukrposhta_index_label = $("[for=ordering-ukrposhta-index]"),
                ukrposhta_index = ukrposhta_index_obj.val(),
                ukrposhta_locality_obj = $("#ordering-ukrposhta-locality"),
                ukrposhta_locality = ukrposhta_locality_obj.text(),
                ukrposhta_address_obj = $("#ordering-ukrposhta-address"),
                ukrposhta_address_label = $("[for=ordering-ukrposhta-address]"),
                ukrposhta_address = ukrposhta_address_obj.val(),
                note_obj = $("#ordering-note"),
                note = note_obj.val().trim()
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

            if (payment_id !== null) {
                payment_obj.removeClass("error");
            } else {
                payment_obj.addClass("error");
            }

            if (delivery_alias !== null) {
                delivery_obj.removeClass("error");
            } else {
                delivery_obj.addClass("error");
            }

            if (delivery_city_id !== null) {
                delivery_city_obj.removeClass("error");
                delivery_city_label.attr("data-error", "");
            } else {
                delivery_city_obj.addClass("error");
                delivery_city_label.attr("data-error", delivery_city_label.data("txt"));
            }

            if (delivery_number !== null) {
                delivery_number_obj.removeClass("error");
                delivery_number_label.attr("data-error", "");
            } else {
                delivery_number_obj.addClass("error");
                delivery_number_label.attr("data-error", delivery_number_label.data("txt"));
            }

            if (ukrposhta_index.length === 5) {
                ukrposhta_index_obj.removeClass("error");
                ukrposhta_index_label.attr("data-error", "");
            } else {
                ukrposhta_index_obj.addClass("error");
                ukrposhta_index_label.attr("data-error", ukrposhta_index_label.data("txt"));
            }

            if (ukrposhta_locality.length === 0 && !ukrposhta_index_obj.hasClass("error")) {
                ukrposhta_index_obj.addClass("error");
                ukrposhta_index_label.attr("data-error", ukrposhta_locality_obj.data("txt"));
            }

            if (ukrposhta_address >= 6) {
                ukrposhta_address_obj.removeClass("error");
                ukrposhta_address_label.attr("data-error", "");
            } else {
                ukrposhta_address_obj.addClass("error");
                ukrposhta_address_label.attr("data-error", ukrposhta_address_label.data("txt"));
            }

// todo

            if (
                f_name.length >= 2 && l_name.length >= 2 && tel.length === 12 && payment_id !== null &&
                (
                    delivery_alias !== null && delivery_city_id !== null && delivery_number !== null
                )
            ) {
                submitOff(submit);

                setTimeout(function () {
                    axios
                        .post("/ordering", {
                            last_name: l_name,
                            first_name: f_name,
                            phone: tel,
                            payment_id: payment_id,
                            delivery: delivery_alias,
                            delivery_city_id: delivery_city_id,
                            delivery_number: delivery_number,
                            delivery_index: ukrposhta_index,
                            delivery_address: ukrposhta_address,
                            additionally: note
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            cleanBasket();
                            $("#header-bag").removeClass("added").addClass("basket-add");
                            $(".modal-buy_done .subtitle span").text(response.data);
                            modalOpen("buy_done");
                        })
                        .catch(function (error) {
                            cleanBasket();
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
        .on("change", "#ordering-delivery", function () {
            const
                delivery_alias = delivery_alias_obj.val(),
                delivery_obj = $("#services-delivery"),
                ukrposhta_obj = $("#services-ukrposhta")
            ;

            if (delivery_alias === "novaposhta" || delivery_alias === "justin") {
                ukrposhta_obj.addClass("d-none");
                delivery_obj.removeClass("d-none");
                updateSelectCity();
            } else {
                delivery_obj.addClass("d-none");
                ukrposhta_obj.removeClass("d-none");
            }
        })
        .on("change", "#ordering-delivery-city", function () {
            updateSelectNumber();
        })
        .on("input change paste", delivery_city_input, function () {
            const search = $(this).val().trim();

            clearTimeout(delivery_timout);
            delivery_timout = setTimeout(function () {
                if (search.length >= 2 && search.slice(0, 2) !== delivery_city_symbols) {
                    delivery_city_search = search;
                    delivery_city_symbols = search.slice(0, 2);

                    updateSelectCity();
                    updateSelectNumber();
                }
            }, 1000);
        })
        .on("input change paste", "#ordering-ukrposhta-index", function () {
            const
                index_obj = $(this),
                index = index_obj.val(),
                locality_obj = $("#ordering-ukrposhta-locality")
            ;

            if (index.length !== 5) return false;

            clearTimeout(index_timeout);
            index_timeout = setTimeout(function () {
                axios
                    .post("/ordering/delivery/index", {
                        index: index,
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        locality_obj.text(response.data.city).removeClass("error");
                    })
                    .catch(function (error) {
                        // todo
                        // если нет ответа - модаль
                        locality_obj.text(error.response.data.errors.index).addClass("error");
                    })
                ;
            }, 1000);

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
                axios
                    .post("/cart/quantity", {
                        id: position,
                        quantity: number_new,
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        // position_obj.find(".price span").text(response.price);
                        position_obj.find(".sum span").text(response.data.sum);
                        $(".summary-total span").text(response.data.total);
                    })
                    .catch(function (error) {
                        const response = {
                            price: 100,
                            sum: 100 * number_new,
                            total: 100 * number_new + 1000
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
            axios
                .post("/cart/delete", {
                    id: position,
                }, {
                    timeout: axiosTimeOut
                })
                .then(function (response) {
                    position_obj.remove();
                })
                .catch(function (error) {
                    position_obj.remove();
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
        $("#content-ordering").remove();
        $("#content-basket").remove();
    }

    function initSelectCity() {
        const obj = delivery_city_obj;

        obj.select2({
            data: [],
            placeholder: obj.data("placeholder"),
            width: "100%",
            language: $("html").attr("lang"),
            minimumInputLength: 2
        });
    }

    function initSelectNumber() {
        const obj = delivery_number_obj;

        obj.select2({
            data: [],
            placeholder: obj.data("placeholder"),
            width: "100%",
            language: $("html").attr("lang"),
            disabled: true
        });
    }

    function updateSelectCity() {
        const
            obj = delivery_city_obj,
            alias = delivery_alias_obj.val()
        ;

        obj.html("").select2();
        if (delivery_city_symbols.length !== 2) return false;

        axios
            .post("/ordering/delivery/city", {
                delivery: alias,
                search: delivery_city_symbols
            }, {
                timeout: axiosTimeOut
            })
            .then(function (response) {
                obj.select2({data: response.data}).trigger("change");
                obj.select2("open");
                $(delivery_city_input).val(delivery_city_search).trigger("input");
            })
            .catch(function (error) {
                const data1 = [
                    {
                        id: 2020,
                        text: 'Харьков 1'
                    },
                    {
                        id: 2021,
                        text: 'Харьков 2'
                    },
                    {
                        id: 2022,
                        text: 'Харьков 3'
                    },
                    {
                        id: 2023,
                        text: 'Хар-ьков 4'
                    },
                    {
                        id: 2024,
                        text: 'Хар-ьков 5'
                    }
                ];
                const data2 = [
                    {
                        id: 3020,
                        text: 'Херсон 1'
                    },
                    {
                        id: 3021,
                        text: 'Херсон 2'
                    },
                    {
                        id: 3022,
                        text: 'Хер-сон 3'
                    },
                    {
                        id: 3023,
                        text: 'Хер-сон 4'
                    },
                    {
                        id: 3024,
                        text: 'Хер-сон 5'
                    }
                ];
                if (delivery_city_symbols.toLowerCase() === 'ха') {
                    obj.select2({data: data1}).trigger("change");
                } else if (delivery_city_symbols.toLowerCase() === 'хе') {
                    obj.select2({data: data2}).trigger("change");
                }
                obj.select2("open");
                $(delivery_city_input).val(delivery_city_search).trigger("input");
                return;

                console.log(error);
            })
        ;
    }

    function updateSelectNumber() {
        const
            obj = delivery_number_obj,
            alias = delivery_alias_obj.val(),
            id = delivery_city_obj.val()
        ;

        obj.html("").select2().prop("disabled", id === null);
        if (id === null) return false;

        axios
            .post("/ordering/delivery/number", {
                delivery: alias,
                delivery_city_id: id,
            }, {
                timeout: axiosTimeOut
            })
            .then(function (response) {
                obj.select2({data: response.data});
            })
            .catch(function (error) {
                const data = [
                    {
                        id: 2020,
                        text: 'Отделение 1'
                    },
                    {
                        id: 2021,
                        text: 'Отделение 2'
                    },
                    {
                        id: 2022,
                        text: 'Отделение 3'
                    },
                    {
                        id: 2023,
                        text: 'Отд-еление 4'
                    },
                    {
                        id: 2024,
                        text: 'Отд-еление 5'
                    }
                ];
                obj.select2({data: data});
                return;

                console.log(error);
            })
        ;
    }
});