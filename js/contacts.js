$(function () {
    $(document)
        .on("input change focus paste", "#feedback-message", function () {
            $("[for=feedback-message]").attr("data-error", "");
        })
        .on("submit", ".feedback-form", function (e) {
            e.preventDefault();
            const submit = $(".feedback-form [type=submit]");

            const
                name_obj = $("#feedback-name"),
                name = name_obj.val().trim(),
                tel_obj = $("#feedback-phone"),
                tel = tel_obj.val().replace(/[^\d]/g, ''),
                msg_obj = $("#feedback-message"),
                msg = msg_obj.val().trim(),
                msg_label = $("[for=feedback-message]")
            ;

            if (tel.length === 12 || tel.length === 0) {
                tel_obj.removeClass("error");
            } else {
                tel_obj.addClass("error");
            }

            if (msg.length >= 6) {
                msg_obj.removeClass("error");
                msg_label.attr("data-error", "");
            } else {
                msg_obj.addClass("error");
                msg_label.attr("data-error", msg_label.data("txt"));
            }

            if (msg.length >= 6 && (tel.length === 12 || tel.length === 0)) {
                submitOff(submit);
                setTimeout(function () {

                    // todo AXIOS
                    console.log("feedback-form submit: name: " + name);
                    console.log("feedback-form submit: tel: " + tel);
                    console.log("feedback-form submit: msg: " + msg);

                    // Успех
                    modalOpen("feedback_done");

                    // При неудаче без ответа
                    // modalOpen("error");

                    // В любом случае снимаем блокировку
                    submitOn(submit);

                }, 700);
            }
        })
    ;
});
