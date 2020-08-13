$(function () {
    $(document)
        .on("change", ".form-review_company .star", function () {
            const rating = $(this).val();

            $(".form-review_company .star").each(function () {
                if ($(this).val() > rating) {
                    $(this).parent().removeClass("mark");
                } else {
                    $(this).parent().addClass("mark");
                }
            });
        })
        .on("submit", ".form-review_company", function (e) {
            e.preventDefault();
            const submit = $(".form-review_company [type=submit]");

            const
                msg_obj = $("#review_company-message"),
                msg = msg_obj.val().trim(),
                msg_parent = msg_obj.parent(),
                rating = $(".form-review_company [name=rating]:checked").val(),
                rating_parent = $(".form-review_company .rating").closest(".row")
            ;

            if (msg.length >= 6) {
                msg_obj.removeClass("error");
                msg_parent.attr("data-error", "");
            } else {
                msg_obj.addClass("error");
                msg_parent.attr("data-error", msg_parent.data("txt"));
            }

            if (rating !== undefined) {
                rating_parent.attr("data-error", "");
            } else {
                rating_parent.attr("data-error", rating_parent.data("txt"));
            }

            if (msg.length >= 6 && rating !== undefined) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/reviews/company", {
                            message: msg,
                            rating: rating
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            modalOpen("review_done");
                        })
                        .catch(function (error) {
                            modalOpen("review_done");
                            return;

                            if (error.response) {
                                const txt = error.response.status === 419 ? msg_parent.data("txt") : error.response.status;
                                msg_obj.addClass("error");
                                msg_parent.attr("data-error", txt);
                            } else {
                                modalOpen("error");
                            }
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
