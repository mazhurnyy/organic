$(function () {
    let favorite_page = 1;

    $(document)
        .on("click", ".favorite-delete", function () {
            const id = $(this).data("id");

            $(".form-favorite_del [name=id]").val(id);
            modalOpen("favorite_del");
        })
        .on("click", ".favorite-add", function (e) {
            e.preventDefault();
            const submit = $(this);
            if (submit.hasClass("disabled")) return false;

            const id = $(this).attr("data-id");

            submitOff(submit);
            setTimeout(function () {
                axios
                    .post("/favorites/add", {
                        product_id: id,
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        submit.removeClass("favorite-add").addClass("added");
                    })
                    .catch(function (error) {
                        submit.removeClass("favorite-add").addClass("added");
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(submit);
                    })
                ;
            }, 700);
        })
        .on("submit", ".form-favorite_del", function (e) {
            e.preventDefault();
            const submit = $(".form-favorite_del [type=submit]");

            const id = parseInt($(".form-favorite_del [name=id]").val());

            submitOff(submit);
            setTimeout(function () {
                axios
                    .post("/favorites/delete", {
                        product_id: id,
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        modalClose();
                        $(".favorite-delete[data-id=" + id + "]").closest(".cell").remove();
                        if ($(".card-favorite .cell").length === 0 && $(".favorites-load").length === 0) {
                            $("#content-article").removeClass("d-none");
                            $(".card-favorite").remove();
                        }
                    })
                    .catch(function (error) {
                        modalClose();
                        $(".favorite-delete[data-id=" + id + "]").closest(".cell").remove();
                        if ($(".card-favorite .cell").length === 0 && $(".favorites-load").length === 0) {
                            $("#content-article").removeClass("d-none");
                            $(".card-favorite").remove();
                        }
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(submit);
                    })
                ;
            }, 700);
        })
        .on("click", ".favorites-load", function () {
            const load_btn = $(".favorites-load");

            submitOff(load_btn);
            setTimeout(function () {
                axios
                    .post("/favorites/more", {
                        page: favorite_page
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        // todo response...

                        response.forEach(function (obj) {
                            let card = load_btn.next().find(".cell").clone();

                            card.find(".photo").attr("href", obj.link);
                            card.find(".photo source").attr("data-srcset", obj.srcset_sm).attr("data-source", obj.srcset_md);
                            card.find(".photo img").attr("data-src", obj.src_sm).attr("data-source", obj.src_md)
                                .attr("alt", obj.text).attr("data-id", obj.id);
                            card.find(".text").text(obj.text).attr("title", obj.text).attr("href", obj.link);
                            card.find(".price").text(obj.price);
                            card.find(".btn").removeClass(obj.in_cart ? "basket-add" : "added").attr("data-id", obj.id);
                            card.find(".delete").attr("data-id", obj.id);

                            card.appendTo("#content-personal .grid");
                        });

                        favorite_page++;

                        if (+$(".grid.card-favorite .cell").length === +$(".grid.card-favorite").data("amount")) {
                            load_btn.remove();
                        }
                    })
                    .catch(function (error) {
                        const data = [
                            {
                                id: 100,
                                link: "./product.html",
                                src_sm: "./contents/product-0.png",
                                srcset_sm: "./contents/product-0.webp",
                                src_md: "./contents/product-0.png",
                                srcset_md: "./contents/product-0.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                price: "100",
                                in_cart: true,
                                is_new: true,
                                sale: 0
                            },
                            {
                                id: 101,
                                link: "./product.html",
                                src_sm: "./contents/product-1.png",
                                srcset_sm: "./contents/product-1.webp",
                                src_md: "./contents/product-1.png",
                                srcset_md: "./contents/product-1.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                price: "200",
                                in_cart: false,
                                is_new: true,
                                sale: 20
                            },
                            {
                                id: 102,
                                link: "./product.html",
                                src_sm: "./contents/product-2.png",
                                srcset_sm: "./contents/product-2.webp",
                                src_md: "./contents/product-2.png",
                                srcset_md: "./contents/product-2.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                price: "120",
                                in_cart: true,
                                is_new: false,
                                sale: 0
                            },
                            {
                                id: 103,
                                link: "./product.html",
                                src_sm: "./contents/product-3.png",
                                srcset_sm: "./contents/product-3.webp",
                                src_md: "./contents/product-3.png",
                                srcset_md: "./contents/product-3.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                price: "220",
                                in_cart: false,
                                is_new: false,
                                sale: 15
                            },
                        ];
                        data.forEach(function (obj) {
                            let card = load_btn.next().find(".cell").clone();

                            if (!obj.is_new) {
                                card.find(".new").remove();
                            }

                            if (parseInt(obj.sale) === 0) {
                                card.find(".sale").remove();
                            } else {
                                card.find(".sale").text("-" + obj.sale + "%");
                            }

                            card.find(".photo").attr("href", obj.link);
                            card.find(".photo source").attr("data-srcset", obj.srcset_sm).attr("data-source", obj.srcset_md);
                            card.find(".photo img").attr("data-src", obj.src_sm).attr("data-source", obj.src_md)
                                .attr("alt", obj.text).attr("data-id", obj.id);
                            card.find(".text").text(obj.text).attr("title", obj.text).attr("href", obj.link);
                            card.find(".price").text(obj.price);
                            card.find(".btn").removeClass(obj.in_cart ? "basket-add" : "added").attr("data-id", obj.id);
                            card.find(".delete").attr("data-id", obj.id);

                            card.appendTo("#content-personal .grid");
                        });
                        if (+$(".grid.card-favorite .cell").length === +$(".grid.card-favorite").data("amount")) {
                            load_btn.remove();
                        }
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(load_btn);
                    })
                ;
            }, 700);
        })
    ;
});

