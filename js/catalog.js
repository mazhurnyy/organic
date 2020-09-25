$(function () {
    let favorite_page = 1;

    $(document)
        .ready(function () {
            if ($("#wrapper").outerWidth() < 768) {
                $(".details-filter").removeAttr("open");
            } else {
                $(".details-filter").attr("open", "open");
            }
        })
        .on("change", ".filter-form [type=checkbox]", function () {
            const link = $(this).data("link");
            window.location.assign(link);
        })
        .on("click", "#wrapper", function (e) {
            if (e.target.closest(".details-sort") === null) {
                $(".details-sort").removeAttr("open");
            }
        })
        .on("click", ".products-load", function () {
            const
                load_btn = $(".products-load"),
                filter = $(".grid.card-product").data("filter")
            ;
            submitOff(load_btn);
            setTimeout(function () {
                axios
                    .post("/catalog", {
                        page: favorite_page,
                        filter: filter
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        response.data.forEach(function (obj) {
                            let card = $(".products-load").next().find(".cell").clone();

                            if (!obj.is_new) {
                                card.find(".new").remove();
                            }

                            if (parseInt(obj.sale) === 0) {
                                card.find(".sale").remove();
                                card.find(".old-price").remove();
                            } else {
                                card.find(".sale").text("-" + obj.sale + "%");
                                card.find(".old-price").text(obj.old_price);
                                card.find(".new").remove();
                            }

                            card.find(".card").removeClass(obj.in_basket ? "basket-add" : "added");
                            card.find(".like").removeClass(obj.in_favorites ? "favorite-add" : "added").attr("data-id", obj.id);
                            card.find(".photo").attr("href", obj.link);
                            card.find(".photo source").attr("data-srcset", obj.srcset_sm).attr("data-source", obj.srcset_md);
                            card.find(".photo img").attr("data-src", obj.src_sm).attr("data-source", obj.src_md)
                                .attr("alt", obj.text).attr("data-id", obj.id);
                            card.find(".text").text(obj.text).attr("title", obj.text).attr("href", obj.link);
                            card.find(".buy").attr("data-id", obj.id);
                            card.find(".price").text(obj.price);

                            card.appendTo("#content-catalog .grid");
                        });

                        favorite_page++;

                        if (+$(".grid.card-product .cell").length === +$(".grid.card-product").data("amount")) {
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
                                old_price: "100",
                                price: "100",
                                in_basket: true,
                                in_favorites: false,
                                is_new: false,
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
                                old_price: "250",
                                price: "200",
                                in_basket: false,
                                in_favorites: true,
                                is_new: false,
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
                                old_price: "120",
                                price: "120",
                                in_basket: true,
                                in_favorites: false,
                                is_new: true,
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
                                old_price: "280",
                                price: "220",
                                in_basket: false,
                                in_favorites: true,
                                is_new: false,
                                sale: 20
                            },
                            {
                                id: 104,
                                link: "./product.html",
                                src_sm: "./contents/product-4.png",
                                srcset_sm: "./contents/product-4.webp",
                                src_md: "./contents/product-4.png",
                                srcset_md: "./contents/product-4.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "270",
                                price: "270",
                                in_basket: true,
                                in_favorites: false,
                                is_new: true,
                                sale: 0
                            },
                            {
                                id: 105,
                                link: "./product.html",
                                src_sm: "./contents/product-5.png",
                                srcset_sm: "./contents/product-5.webp",
                                src_md: "./contents/product-5.png",
                                srcset_md: "./contents/product-5.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "330",
                                price: "300",
                                in_basket: false,
                                in_favorites: true,
                                is_new: false,
                                sale: 20
                            },
                            {
                                id: 106,
                                link: "./product.html",
                                src_sm: "./contents/product-0.png",
                                srcset_sm: "./contents/product-0.webp",
                                src_md: "./contents/product-0.png",
                                srcset_md: "./contents/product-0.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "100",
                                price: "100",
                                in_basket: true,
                                in_favorites: false,
                                is_new: true,
                                sale: 0
                            },
                            {
                                id: 107,
                                link: "./product.html",
                                src_sm: "./contents/product-1.png",
                                srcset_sm: "./contents/product-1.webp",
                                src_md: "./contents/product-1.png",
                                srcset_md: "./contents/product-1.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "250",
                                price: "200",
                                in_basket: false,
                                in_favorites: true,
                                is_new: false,
                                sale: 20
                            },
                            {
                                id: 108,
                                link: "./product.html",
                                src_sm: "./contents/product-2.png",
                                srcset_sm: "./contents/product-2.webp",
                                src_md: "./contents/product-2.png",
                                srcset_md: "./contents/product-2.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "120",
                                price: "120",
                                in_basket: true,
                                in_favorites: false,
                                is_new: true,
                                sale: 0
                            },
                            {
                                id: 109,
                                link: "./product.html",
                                src_sm: "./contents/product-3.png",
                                srcset_sm: "./contents/product-3.webp",
                                src_md: "./contents/product-3.png",
                                srcset_md: "./contents/product-3.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "270",
                                price: "220",
                                in_basket: false,
                                in_favorites: true,
                                is_new: false,
                                sale: 20
                            },
                            {
                                id: 110,
                                link: "./product.html",
                                src_sm: "./contents/product-4.png",
                                srcset_sm: "./contents/product-4.webp",
                                src_md: "./contents/product-4.png",
                                srcset_md: "./contents/product-4.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "270",
                                price: "270",
                                in_basket: true,
                                in_favorites: false,
                                is_new: true,
                                sale: 0
                            },
                            {
                                id: 111,
                                link: "./product.html",
                                src_sm: "./contents/product-5.png",
                                srcset_sm: "./contents/product-5.webp",
                                src_md: "./contents/product-5.png",
                                srcset_md: "./contents/product-5.webp",
                                text: "Сыворотка для шеи, декольте и бьюста",
                                old_price: "360",
                                price: "300",
                                in_basket: false,
                                in_favorites: true,
                                is_new: false,
                                sale: 20
                            },
                        ];
                        data.forEach(function (obj) {
                            let card = $(".products-load").next().find(".cell").clone();

                            if (!obj.is_new) {
                                card.find(".new").remove();
                            }

                            if (parseInt(obj.sale) === 0) {
                                card.find(".sale").remove();
                                card.find(".old-price").remove();
                            } else {
                                card.find(".sale").text("-" + obj.sale + "%");
                                card.find(".old-price").text(obj.old_price);
                                card.find(".new").remove();
                            }

                            card.find(".card").removeClass(obj.in_basket ? "basket-add" : "added");
                            card.find(".like").removeClass(obj.in_favorites ? "favorite-add" : "added").attr("data-id", obj.id);
                            card.find(".photo").attr("href", obj.link);
                            card.find(".photo source").attr("data-srcset", obj.srcset_sm).attr("data-source", obj.srcset_md);
                            card.find(".photo img").attr("data-src", obj.src_sm).attr("data-source", obj.src_md)
                                .attr("alt", obj.text).attr("data-id", obj.id);
                            card.find(".text").text(obj.text).attr("title", obj.text).attr("href", obj.link);
                            card.find(".buy").attr("data-id", obj.id);
                            card.find(".price").text(obj.price);

                            card.appendTo("#content-catalog .grid");
                        });
                        if (+$(".grid.card-product .cell").length === +$(".grid.card-product").data("amount")) {
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