$(function () {
    $(document)
        .on("input change focus paste", ".subscribe-form [name=email]", function () {
            $(this).parent().attr("data-error", "");
        })
        .on("submit", ".subscribe-form", function (e) {
            e.preventDefault();
            const submit = $(".subscribe-form [type=submit]");

            const
                input = $(".subscribe-form [name=email]"),
                row = input.parent(),
                email = input.val().trim(),
                btn_s = $(".subscribe-form .btn-subscribe"),
                btn_u = $(".subscribe-form .btn-unsubscribe"),
                type = $(".subscribe-form .btn:not(.d-none)").hasClass("btn-subscribe") ? "subscribe" : "unsubscribe"
            ;

            if (type === "subscribe") {
                if (email.length >= 5 && email.indexOf("@") > 0) {
                    input.removeClass("error");
                } else {
                    input.addClass("error");
                    row.attr("data-error", row.data("txt"));
                }

                if (email.length >= 5 && email.indexOf("@") > 0) {
                    submitOff(submit);
                    setTimeout(function () {
                        axios
                            .post("subscribe", {
                                email: email,
                            }, {
                                timeout: axiosTimeOut
                            })
                            .then(function (response) {
                                btn_s.addClass("d-none");
                                btn_u.removeClass("d-none");
                                modalOpen("subscribe_done");
                            })
                            .catch(function (error) {
                                btn_s.addClass("d-none");
                                btn_u.removeClass("d-none");
                                modalOpen("subscribe_done");
                                return;

                                modalOpen("error");
                            })
                            .then(function () {
                                submitOn(submit);
                            })
                        ;
                    }, 700);
                }
            } else {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("subscribe/unsubscribe", {}, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            btn_u.addClass("d-none");
                            btn_s.removeClass("d-none");
                            input.attr("value", "").val("");
                            modalOpen("unsubscribe_done");
                        })
                        .catch(function (error) {
                            btn_u.addClass("d-none");
                            btn_s.removeClass("d-none");
                            input.attr("value", "").val("");
                            modalOpen("unsubscribe_done");
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
    ;
});