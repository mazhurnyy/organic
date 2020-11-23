$(function () {
    let delivery_timout,
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
            if ($("#services-delivery").length > 0) {
                initSelectCity();
                initSelectNumber();
            }
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

            let ukrposhta_flag = false,
                delivery_flag = false
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

            if (delivery_alias !== null && delivery_city_id !== null && delivery_number !== null) {
                delivery_flag = true;
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

            if (ukrposhta_address.length >= 6) {
                ukrposhta_address_obj.removeClass("error");
                ukrposhta_address_label.attr("data-error", "");
            } else {
                ukrposhta_address_obj.addClass("error");
                ukrposhta_address_label.attr("data-error", ukrposhta_address_label.data("txt"));
            }

            if (ukrposhta_index.length === 5 && ukrposhta_locality.length > 0 && ukrposhta_address.length >= 6) {
                ukrposhta_flag = true;
            }

            if (
                f_name.length >= 2 && l_name.length >= 2 && tel.length === 12 && payment_id !== null &&
                (ukrposhta_flag || delivery_flag)
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
                            cleanOrdering();
                            $("#header-bag").removeClass("added").addClass("basket-add").attr("data-quantity", "0");
                            $(".modal-buy_done .subtitle span").text(response.data);
                            modalOpen("buy_done");
                        })
                        .catch(function (error) {
                            cleanOrdering();
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
        .on("input paste", delivery_city_input, function () {
            const search = $(this).val().trim();

            clearTimeout(delivery_timout);
            delivery_timout = setTimeout(function () {
                if (search.length >= 2 && search.slice(0, 2) !== delivery_city_symbols) {
                    delivery_city_search = search;
                    delivery_city_symbols = search.slice(0, 2);

                    updateSelectCity();
                    updateSelectNumber();
                }
            }, 1500);
        })
        .on("input paste", "#ordering-ukrposhta-index", function () {
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
                        locality_obj.text(response.data.city);
                    })
                    .catch(function (error) {
                        locality_obj.text("Харьков, Московский район");
                        return;

                        locality_obj.text("");

                        if (typeof error.response.data.errors !== "undefined") {
                            index_obj.addClass("error");
                            $("[for=ordering-ukrposhta-index]").attr("data-error", locality_obj.data("txt"));
                        } else {
                            modalOpen("error");
                        }
                    })
                ;
            }, 1500);
        })
    ;

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

    function cleanOrdering() {
        $("#content-article").removeClass("d-none");
        $("#content-ordering").remove();
    }
});