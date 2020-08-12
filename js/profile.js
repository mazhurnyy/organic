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
        .on("change", "#avatar-file", function () {
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

            const file = canvas.croppie("get");
            let fd = new FormData();
            fd.append("file", $("#avatar-file").prop("files")[0]);
            fd.append("points", file.points);
            fd.append("zoom", file.zoom);

            submitOff(submit);
            setTimeout(function () {

                // todo AXIOS
                // передать на сервер файл, координаты, масштаб
                console.log(fd);

                // При успехе получаем пути к новым фото
                const srcset = "./contents/reviews-9.webp";
                const src = "./contents/reviews-9.png";

                $(".avatar-wrap source").attr("srcset", srcset);
                $(".avatar-wrap img").attr("src", src);
                $(".avatar-wrap .delete").removeClass("d-none");
                modalClose();

                // При неудаче без ответа
                // modalOpen("error");

                // В любом случае снимаем блокировку
                submitOn(submit);

            }, 700);
        })
        .on("submit", ".form-avatar_del", function (e) {
            e.preventDefault();
            const submit = $(".form-avatar_del [type=submit]");

            submitOff(submit);
            setTimeout(function () {

                // todo AXIOS
                // Запрос на удаление без данных
                console.log("avatar delete");

                // При успехе получаем пути к заглушкам кот / м / ж1 / ж2
                const srcset = "./images/plugs/avatar/lg.webp";
                const src = "./images/plugs/avatar/lg.png";

                $(".avatar-wrap source").attr("srcset", srcset);
                $(".avatar-wrap img").attr("src", src);
                $(".avatar-wrap .delete").addClass("d-none");
                modalClose();

                // При неудаче без ответа
                // modalOpen("error");

                // В любом случае снимаем блокировку
                submitOn(submit);

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
                profession_input = $("#profile-profession"),
                first_name = first_name_input.val().trim(),
                last_name = last_name_input.val().trim(),
                date = date_input.val(),
                gender = gender_input.val(),
                profession = profession_input.val()
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

                    // todo AXIOS
                    console.log("profile submit: first_name: " + first_name);
                    console.log("profile submit: last_name: " + last_name);
                    console.log("profile submit: date: " + date);
                    console.log("profile submit: gender: " + gender);  //       - / m / f
                    console.log("profile submit: profession: " + profession);

                    // Успех
                    modalOpen("profile_done");

                    // При неудаче без ответа
                    // modalOpen("error");

                    // В любом случае снимаем блокировку
                    submitOn(submit);

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
});