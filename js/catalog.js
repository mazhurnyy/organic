$(function () {
    $(document)
        .ready(function() {
            if ($("#wrapper").outerWidth() < 768) {
                $(".details-filter").removeAttr("open");
            } else {
                $(".details-filter").attr("open", "open");
            }
        })
        .on("change", ".filter-form [type=checkbox]", function () {

            // todo Фильтры
            // Если фильтр применён, то галочка стоит, а в атрибуте data-link ссылка минус текущий фильтр
            // Если фильтр не применён, то галочка не стоит, а в атрибуте data-link ссылка плюс текущий фильтр
            const link = $(this).data("link");

            console.log(link);
            //window.location.assign(link);
        })
        .on("click", "#wrapper", function (e) {
            if (e.target.closest(".details-sort") === null) {
                $(".details-sort").removeAttr("open");
            }
        })
        .on("click", ".products-load", function () {
            // todo SHOW MORE
            const
                data = [
                    {
                        id: 100,
                        link: "./product.html",
                        src_sm: "./contents/product-0.png",
                        srcset_sm: "./contents/product-0.webp",
                        src_md: "./contents/product-0.png",
                        srcset_md: "./contents/product-0.webp",
                        text: "Сыворотка для шеи, декольте и бьюста",
                        price: "100 грн",
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
                        price: "200 грн",
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
                        price: "120 грн",
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
                        price: "220 грн",
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
                        price: "270 грн",
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
                        price: "300 грн",
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
                        price: "100 грн",
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
                        price: "200 грн",
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
                        price: "120 грн",
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
                        price: "220 грн",
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
                        price: "270 грн",
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
                        price: "300 грн",
                        in_basket: false,
                        in_favorites: true,
                        is_new: false,
                        sale: 20
                    },
                ]
            ;

            setTimeout(function () {
                data.forEach(function (obj) {
                    let card = $(".products-load").next().find(".cell").clone();

                    if (!obj.is_new) {
                        card.find(".new").remove();
                    }

                    if (parseInt(obj.sale) === 0) {
                        card.find(".sale").remove();
                    } else {
                        card.find(".sale").text("-" + obj.sale + "%");
                        card.find(".new").remove();
                    }

                    card.find(".like").removeClass(obj.in_favorites ? "favorite-add" : "added").attr("data-id", obj.id);
                    card.find(".photo").attr("href", obj.link);
                    card.find(".photo source").attr("data-srcset", obj.srcset_sm).attr("data-source", obj.srcset_md);
                    card.find(".photo img").attr("data-src", obj.src_sm).attr("data-source", obj.src_md)
                        .attr("alt", obj.text).attr("data-id", obj.id);
                    card.find(".text").text(obj.text).attr("title", obj.text).attr("href", obj.link);
                    card.find(".buy").removeClass(obj.in_basket ? "basket-add" : "added").attr("data-id", obj.id);
                    card.find(".price").text(obj.price);

                    card.appendTo("#content-catalog .grid");
                });
            }, 700);
        })
    ;
});
