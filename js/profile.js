$(function () {
    let canvas, reader = new FileReader();

    $(document)
        .ready(function () {
            pickmeup.defaults.locales['ru'] = {
                days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
            };
            pickmeup("#profile-date", {
                default_date: false,
                format: "d.m.Y",
                locale: "ru"
            });
            $(".pickmeup").appendTo($("#profile-date").parent());
        })
        .on("input", "#avatar-file", function () {
            console.log("input");
        })
        .on("change", "#avatar-file", function () {
            console.log("change");
            $(".modal-avatar_edit .canvas").removeClass("unload");

            if (typeof canvas === "undefined") {
                canvas = $("#avatar-upload").croppie({
                    viewport: {width: 176, height: 176, type: "circle"},
                    boundary: {width: 320, height: 240},
                });
            }

            reader.onload = function (e) {
                canvas.croppie("bind", {
                    url: e.target.result
                });
            };
            reader.readAsDataURL($(this).prop("files")[0]);
        })
        .on("click", ".avatar-save", function () {
            if (typeof canvas === "undefined") return false;

            canvas.croppie("result", {
                type: "base64"
            }).then(function (src) {
                $(".modal-avatar_save .avatar img").attr("src", src);
                modalOpen("avatar_save");
            });
        })
        .on("submit", ".form-avatar_save", function (e) {
            e.preventDefault();
            const submit = $(".form-avatar_save [type=submit]");

            const file = $(".modal-avatar_save .avatar img").attr("src");

            submitOff(submit);
            setTimeout(function () {
                axios
                    .post("/profile/update/avatar", {
                        file: file
                    }, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        changeAvatar(response);
                        modalClose();
                    })
                    .catch(function (error) {
                        changeAvatar({
                            data: {
                                srcset: file,
                                src: file
                            }
                        });
                        modalClose();
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(submit);
                    })
                ;
            }, 700);
        })
        .on("submit", ".form-avatar_del", function (e) {
            e.preventDefault();
            const submit = $(".form-avatar_del [type=submit]");

            submitOff(submit);
            setTimeout(function () {
                axios
                    .post("/profile/delete/avatar", {}, {
                        timeout: axiosTimeOut
                    })
                    .then(function (response) {
                        changeAvatar(response);
                        modalClose();
                    })
                    .catch(function (error) {
                        changeAvatar({
                            data: {
                                srcset: "./images/plugs/avatar/lg.webp",
                                src: "./images/plugs/avatar/lg.png"
                            }
                        });
                        modalClose();
                        return;

                        modalOpen("error");
                    })
                    .then(function () {
                        submitOn(submit);
                    })
                ;
            }, 700);
        })
        .on("submit", ".profile-form", function (e) {
            e.preventDefault();
            const submit = $(".profile-form [type=submit]");

            const
                first_name_input = $("#profile-first_name"),
                first_name_label = $("[for=profile-first_name]"),
                last_name_input = $("#profile-last_name"),
                last_name_label = $("[for=profile-last_name]"),
                date_input = $("#profile-date"),
                gender_input = $("#profile-gender"),
                first_name = first_name_input.val().trim(),
                last_name = last_name_input.val().trim(),
                date = date_input.val(),
                gender = gender_input.val()
            ;

            if (first_name.length >= 2) {
                first_name_input.removeClass("error").addClass("success");
                first_name_label.attr("data-error", "");
            } else {
                first_name_input.removeClass("success").addClass("error");
                first_name_label.attr("data-error", first_name_label.data("txt"));
            }

            if (last_name.length >= 2) {
                last_name_input.removeClass("error").addClass("success");
                last_name_label.attr("data-error", "");
            } else {
                last_name_input.removeClass("success").addClass("error");
                last_name_label.attr("data-error", last_name_label.data("txt"));
            }

            if (first_name.length >= 2 && last_name.length >= 2) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/profile/update", {
                            first_name: first_name,
                            last_name: last_name,
                            birthday: date,
                            gender: gender
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            changeAvatar(response);
                            modalOpen("profile_done");
                        })
                        .catch(function (error) {
                            modalOpen("profile_done");
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
        .on("input change focus paste", "#profile-first_name", function () {
            $("[for=profile-first_name]").attr("data-error", "");
        })
        .on("input change focus paste", "#profile-last_name", function () {
            $("[for=profile-last_name]").attr("data-error", "");
        })
    ;

    function changeAvatar(responseJson) {
        $(".avatar-wrap source").attr("srcset", responseJson.data.srcset);
        $(".avatar-wrap img").attr("src", responseJson.data.src);
        $(".avatar-wrap .delete").removeClass("d-none");
    }
});