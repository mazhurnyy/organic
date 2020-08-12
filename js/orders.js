$(function () {
    $(document)
        .on("click", ".orders-load", function () {
            // todo SHOW MORE
            const
                data = [
                    {
                        number: "Заказ №100",
                        link: "./order.html?id=100",
                        date: "01.01.2020",
                        status: "Выполнен",
                        total: "100 грн"
                    },
                    {
                        number: "Заказ №101",
                        link: "./order.html?id=101",
                        date: "11.08.2020",
                        status: "Ожидается оплата",
                        total: "100 грн"
                    }
                ]
            ;

            setTimeout(function () {
                const load_btn = $(".orders-load");

                data.forEach(function (obj) {
                    let card = load_btn.next().find(".cell").clone();

                    card.find(".number").text(obj.number).attr("href", obj.link);
                    card.find(".date").text(obj.date);
                    card.find(".status").text(obj.status);
                    card.find(".total").text(obj.total);

                    card.appendTo("#content-personal .grid");
                });

                // если догрузили уже всё
                load_btn.remove();
            }, 700);
        })
    ;
});