$(function () {
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

                // todo AXIOS
                console.log("favorite-add: id: " + id);

                // Успех
                submit.removeClass("favorite-add").addClass("added");

                // При неудаче без ответа
                // modalOpen("error");

                // В любом случае снимаем блокировку
                submitOn(submit);

            }, 700);
        })
        .on("submit", ".form-favorite_del", function (e) {
            e.preventDefault();
            const submit = $(".form-favorite_del [type=submit]");

            const id = parseInt($(".form-favorite_del [name=id]").val());

            submitOff(submit);
            setTimeout(function () {

                // todo AXIOS
                console.log("form-favorite_del submit: id: " + id);

                // Успех
                modalClose();
                $(".favorite-delete[data-id=" + id + "]").closest(".cell").remove();
                if ($(".card-favorite .cell").length === 0 && $(".favorites-load").length === 0) {
                    $("#content-article").removeClass("d-none");
                    $(".card-favorite").remove();
                }

                // При неудаче без ответа
                // modalOpen("error");

                // В любом случае снимаем блокировку
                submitOn(submit);

            }, 700);
        })
        .on("click", ".favorites-load", function () {
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
                        in_basket: true
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
                        in_basket: false
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
                        in_basket: true
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
                        in_basket: false
                    },
                ]
            ;

            setTimeout(function () {
                const load_btn = $(".favorites-load");

                data.forEach(function (obj) {
                    let card = load_btn.next().find(".cell").clone();

                    card.find(".photo").attr("href", obj.link);
                    card.find(".photo source").attr("data-srcset", obj.srcset_sm).attr("data-source", obj.srcset_md);
                    card.find(".photo img").attr("data-src", obj.src_sm).attr("data-source", obj.src_md)
                        .attr("alt", obj.text).attr("data-id", obj.id);
                    card.find(".text").text(obj.text).attr("title", obj.text).attr("href", obj.link);
                    card.find(".price").text(obj.price);
                    card.find(".btn").removeClass(obj.in_basket ? "basket-add" : "added").attr("data-id", obj.id);
                    card.find(".delete").attr("data-id", obj.id);

                    card.appendTo("#content-personal .grid");
                });

                // если догрузили уже всё
                load_btn.remove();
            }, 700);
        })
    ;
});

