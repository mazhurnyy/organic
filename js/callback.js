$(function () {
    $(document)
        .ready(function () {
            let decrease, increase;

            const hours = parseInt($(".form-callback .hours .input").val());
            switch (hours) {
                case 9:
                    decrease = 20;
                    increase = hours + 1;
                    break;
                case 20:
                    decrease = hours - 1;
                    increase = 9;
                    break;
                default:
                    decrease = hours - 1;
                    increase = hours + 1;
                    break;
            }
            $(".form-callback .timer.hours .change.decrease").text(String(decrease).padStart(2, "0"));
            $(".form-callback .timer.hours .change.increase").text(String(increase).padStart(2, "0"));

            const minutes = parseInt($(".form-callback .minutes .input").val());
            switch (minutes) {
                case 0:
                    decrease = 50;
                    increase = minutes + 10;
                    break;
                case 50:
                    decrease = minutes - 10;
                    increase = 0;
                    break;
                default:
                    decrease = minutes - 10;
                    increase = minutes + 10;
                    break;
            }
            $(".form-callback .timer.minutes .change.decrease").text(String(decrease).padStart(2, "0"));
            $(".form-callback .timer.minutes .change.increase").text(String(increase).padStart(2, "0"));
        })
        .on("click", ".timer.hours .change", function () {
            const val = parseInt($(this).text());
            let decrease, increase;

            switch (val) {
                case 9:
                    decrease = 20;
                    increase = val + 1;
                    break;
                case 20:
                    decrease = val - 1;
                    increase = 9;
                    break;
                default:
                    decrease = val - 1;
                    increase = val + 1;
                    break;
            }
            $(".timer.hours .input").val(String(val).padStart(2, "0"));
            $(".timer.hours .change.decrease").text(String(decrease).padStart(2, "0"));
            $(".timer.hours .change.increase").text(String(increase).padStart(2, "0"));
        })
        .on("click", ".timer.minutes .change", function () {
            const val = parseInt($(this).text());
            let decrease, increase;

            switch (val) {
                case 0:
                    decrease = 50;
                    increase = val + 10;
                    break;
                case 50:
                    decrease = val - 10;
                    increase = 0;
                    break;
                default:
                    decrease = val - 10;
                    increase = val + 10;
                    break;
            }
            $(".timer.minutes .input").val(String(val).padStart(2, "0"));
            $(".timer.minutes .change.decrease").text(String(decrease).padStart(2, "0"));
            $(".timer.minutes .change.increase").text(String(increase).padStart(2, "0"));
        })
        .on("submit", ".form-callback", function (e) {
            e.preventDefault();
            const submit = $(".form-callback [type=submit]");

            const
                input = $(".form-callback [type=tel]"),
                tel = input.val().replace(/[^\d]/g, ''),
                hours = $(".form-callback [name=hours]").val(),
                minutes = $(".form-callback [name=minutes]").val()
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
                        .post("/callback", {
                            phone: tel,
                            hours: hours,
                            minutes: minutes,
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (responseJson) {
                            modalOpen("callback_done");
                        })
                        .catch(function (error) {
                            modalOpen("callback_done");
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
