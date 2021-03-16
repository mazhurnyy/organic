{
    document.addEventListener("DOMContentLoaded", function () {
        const inputs = document.querySelectorAll(".modal-auth .form .row .input");

        for (let input of inputs) {
            if (input.value.length > 0) {
                input.classList.add("focus");
            }
        }
    });

    // Show password
    document.addEventListener("click", function (e) {
        let button;

        if (e.target.classList.contains("pwd-show")) {
            button = e.target;
        } else {
            button = e.target.closest(".pwd-show");
        }

        if (!button) return true;

        const form = button.closest("form");
        form.querySelector(".pwd-show").classList.add("d-none");
        form.querySelector(".pwd-hide").classList.remove("d-none");

        const inputs = form.querySelectorAll(".pwd-input");
        for (let input of inputs) {
            input.setAttribute("type", "text");
        }
    });

    // Hide password
    document.addEventListener("click", function (e) {
        let button;

        if (e.target.classList.contains("pwd-hide")) {
            button = e.target;
        } else {
            button = e.target.closest(".pwd-hide");
        }

        if (!button) return true;

        const form = button.closest("form");
        form.querySelector(".pwd-show").classList.remove("d-none");
        form.querySelector(".pwd-hide").classList.add("d-none");

        const inputs = form.querySelectorAll(".pwd-input");
        for (let input of inputs) {
            input.setAttribute("type", "password");
        }
    });

    // Inputs in modal auth
    document.addEventListener("input", inputListener);

    document.addEventListener("change", inputListener);

    document.addEventListener("focusin", inputListener);

    document.addEventListener("paste", inputListener);

    function inputListener (e) {
        if (e.target.classList.contains("input") && e.target.closest(".modal-auth")) {
            e.target.classList.add("focus");
        }
    }

    document.addEventListener("focusout", function (e) {
        if (e.target.classList.contains("input") && e.target.closest(".modal-auth")) {
            if (e.target.value.length === 0) {
                e.target.classList.remove("focus");
            }
        }
    });
}

$(function () {
    $(document)
        .on("submit", ".form-login", function (e) {
            e.preventDefault();
            const submit = $(".form-login [type=submit]");

            const
                tel_input = $("#login-login"),
                pwd_input = $("#login-password"),
                tel = tel_input.val().replace(/[^\d]/g, ''),
                pwd = pwd_input.val().trim(),
                tel_row = tel_input.parent(),
                pwd_row = pwd_input.parent()
            ;

            if (tel.length === 12) {
                tel_input.removeClass("error").addClass("success");
                tel_row.attr("data-error", "");
            } else {
                tel_input.removeClass("success").addClass("error");
                tel_row.attr("data-error", tel_row.data("txt"));
            }

            if (pwd.length >= 6) {
                pwd_input.removeClass("error").addClass("success");
                pwd_row.attr("data-error", "");
            } else {
                pwd_input.removeClass("success").addClass("error");
                pwd_row.attr("data-error", pwd_row.data("txt"));
            }

            if (tel.length === 12 && pwd.length >= 6) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/login", {
                            phone: tel,
                            password: pwd,
                            remember: true
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            window.location.reload();
                        })
                        .catch(function (error) {
                            catchAuthError(error, tel_input, "phone");

                            if (error.response) {
                                pwd_input.removeClass("success").addClass("error");
                            }
                        })
                        .then(function () {
                            submitOn(submit);
                        })
                    ;
                }, 700);
            }
        })
        .on("submit", ".form-register", function (e) {
            e.preventDefault();
            const submit = $(".form-register [type=submit]");

            const
                tel_input = $("#register-login"),
                tel = tel_input.val().replace(/[^\d]/g, ''),
                tel_row = tel_input.parent()
            ;

            if (tel.length === 12) {
                tel_input.removeClass("error").addClass("success");
                tel_row.attr("data-error", "");
            } else {
                tel_input.removeClass("success").addClass("error");
                tel_row.attr("data-error", tel_row.data("txt"));
            }

            if (tel.length === 12) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/register", {
                            phone: tel
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            $(".modal-password a[data-modal]").attr("data-modal", "register");
                            modalOpen("password");
                        })
                        .catch(function (error) {
                            $(".modal-password a[data-modal]").attr("data-modal", "register");
                            modalOpen("password");
                            return;

                            catchAuthError(error, tel_input, "phone");
                        })
                        .then(function () {
                            submitOn(submit);
                        })
                    ;
                }, 700);
            }
        })
        .on("submit", ".form-reset", function (e) {
            e.preventDefault();
            const submit = $(".form-reset [type=submit]");

            const
                tel_input = $("#reset-login"),
                tel = tel_input.val().replace(/[^\d]/g, ''),
                tel_row = tel_input.parent()
            ;

            if (tel.length === 12) {
                tel_input.removeClass("error").addClass("success");
                tel_row.attr("data-error", "");
            } else {
                tel_input.removeClass("success").addClass("error");
                tel_row.attr("data-error", tel_row.data("txt"));
            }

            if (tel.length === 12) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/reset", {
                            phone: tel
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            $(".modal-password a[data-modal]").attr("data-modal", "reset");
                            modalOpen("password");
                        })
                        .catch(function (error) {
                            $(".modal-password a[data-modal]").attr("data-modal", "reset");
                            modalOpen("password");
                            return;

                            catchAuthError(error, tel_input, "phone");
                        })
                        .then(function () {
                            submitOn(submit);
                        })
                    ;
                }, 700);
            }
        })
        .on("submit", ".form-password", function (e) {
            e.preventDefault();
            const submit = $(".form-password [type=submit]");

            const
                code_input = $("#password-code"),
                password_input = $("#password-password"),
                confirm_input = $("#password-confirm"),
                code = code_input.val().replace(/[^\d]/g, ''),
                password = password_input.val().trim(),
                confirm = confirm_input.val().trim(),
                code_row = code_input.parent(),
                password_row = password_input.parent(),
                confirm_row = confirm_input.parent()
            ;

            if (code.length === 6) {
                code_input.removeClass("error").addClass("success");
                code_row.attr("data-error", "");
            } else {
                code_input.removeClass("success").addClass("error");
                code_row.attr("data-error", code_row.data("txt"));
            }

            if (password.length >= 6) {
                password_input.removeClass("error").addClass("success");
                password_row.attr("data-error", "");
            } else {
                password_input.removeClass("success").addClass("error");
                password_row.attr("data-error", password_row.data("txt"));
            }

            if (confirm === password) {
                confirm_input.removeClass("error").addClass("success");
                confirm_row.attr("data-error", "");
            } else {
                confirm_input.removeClass("success").addClass("error");
                confirm_row.attr("data-error", confirm_row.data("txt"));
            }

            if (code.length === 6 && password.length >= 6 && confirm === password) {
                submitOff(submit);
                setTimeout(function () {
                    axios
                        .post("/" + $(".modal-password a[data-modal]").attr("data-modal") + "/code", {
                            token: code,
                            password: password,
                            password_confirmation: confirm
                        }, {
                            timeout: axiosTimeOut
                        })
                        .then(function (response) {
                            window.location.reload();
                        })
                        .catch(function (error) {
                            catchAuthError(error, code_input, "token");

                            if (error.response) {
                                if (error.response.status === 422) {
                                    let password_txt = error.response.data.errors.password;
                                    password_input.removeClass("success").addClass("error");
                                    password_row.attr("data-error", password_txt);
                                    confirm_input.removeClass("success").addClass("error");
                                }
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

    function catchAuthError(error, tel_input, field) {
        if (error.response) {
            let txt;
            switch (error.response.status) {
                case 403:
                    window.location.assign("/403");
                    break;
                case 405:
                    modalOpen("error");
                    break;
                case 429:
                    txt = error.response.data.errors[field];
                    break;
                case 422:
                    txt = error.response.data.errors[field];
                    break;
                default:
                    txt = error.response.status;
            }
            tel_input.removeClass("success").addClass("error")
                .parent().attr("data-error", txt);
        } else {
            modalOpen("error");
        }
    }
});