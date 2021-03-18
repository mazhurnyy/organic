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

    // Submits
    document.querySelector(".form-login").addEventListener("submit", function (e) {
        e.preventDefault();
        const submit = document.querySelector(".form-login [type=submit]");

        const
            tel_input = document.querySelector("#login-login"),
            pwd_input = document.querySelector("#login-password"),
            tel = tel_input.value.replace(/[^\d]/g, ''),
            pwd = pwd_input.value.trim(),
            tel_row = tel_input.closest(".row"),
            pwd_row = pwd_input.closest(".row")
        ;

        let error = false;

        if (tel.length === 12) {
            tel_input.classList.remove("error");
            tel_input.classList.add("success");
            tel_row.dataset.error = "";
        } else {
            tel_input.classList.remove("success");
            tel_input.classList.add("error");
            tel_row.dataset.error = tel_row.dataset.txt;
            error = true;
        }

        if (pwd.length >= 6) {
            pwd_input.classList.remove("error");
            pwd_input.classList.add("success");
            pwd_row.dataset.error = "";
        } else {
            pwd_input.classList.remove("success");
            pwd_input.classList.add("error");
            pwd_row.dataset.error = pwd_row.dataset.txt;
            error = true;
        }

        if (error) return;

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
                        pwd_input.classList.remove("success");
                        pwd_input.classList.add("error");
                    }
                })
                .then(function () {
                    submitOn(submit);
                })
            ;
        }, 700);
    });

    document.querySelector(".form-register").addEventListener("submit", function (e) {
        e.preventDefault();
        const submit = document.querySelector(".form-register [type=submit]");

        const
            tel_input = document.querySelector("#register-login"),
            tel = tel_input.value.replace(/[^\d]/g, ''),
            tel_row = tel_input.closest(".row")
        ;

        let error = false;

        if (tel.length === 12) {
            tel_input.classList.remove("error");
            tel_input.classList.add("success");
            tel_row.dataset.error = "";
        } else {
            tel_input.classList.remove("success");
            tel_input.classList.add("error");
            tel_row.dataset.error = tel_row.dataset.txt;
            error = true;
        }

        if (error) return;

        submitOff(submit);
        setTimeout(function () {
            axios
                .post("/register", {
                    phone: tel
                }, {
                    timeout: axiosTimeOut
                })
                .then(function (response) {
                    const attribute = document.querySelector(".modal-password a[data-modal]");
                    attribute.dataset.modal = "register";
                    modalOpen("password");
                })
                .catch(function (error) {
                    const attribute = document.querySelector(".modal-password a[data-modal]");
                    attribute.dataset.modal = "register";
                    modalOpen("password");
                    return;

                    catchAuthError(error, tel_input, "phone");
                })
                .then(function () {
                    submitOn(submit);
                })
            ;
        }, 700);
    });

    document.querySelector(".form-reset").addEventListener("submit", function (e) {
        e.preventDefault();

        const submit = document.querySelector(".form-reset [type=submit]");

        const
            tel_input = document.querySelector("#reset-login"),
            tel = tel_input.value.replace(/[^\d]/g, ''),
            tel_row = tel_input.closest(".row")
        ;

        let error = false;

        if (tel.length === 12) {
            tel_input.classList.remove("error");
            tel_input.classList.add("success");
            tel_row.dataset.error = "";
        } else {
            tel_input.classList.remove("success");
            tel_input.classList.add("error");
            tel_row.dataset.error = tel_row.dataset.txt;
            error = true;
        }

        if (error) return;

        submitOff(submit);
        setTimeout(function () {
            axios
                .post("/reset", {
                    phone: tel
                }, {
                    timeout: axiosTimeOut
                })
                .then(function (response) {
                    const attribute = document.querySelector(".modal-password a[data-modal]");
                    attribute.dataset.modal = "reset";
                    modalOpen("password");
                })
                .catch(function (error) {
                    const attribute = document.querySelector(".modal-password a[data-modal]");
                    attribute.dataset.modal = "reset";
                    modalOpen("password");
                    return;

                    catchAuthError(error, tel_input, "phone");
                })
                .then(function () {
                    submitOn(submit);
                })
            ;
        }, 700);
    });

    document.querySelector(".form-password").addEventListener("submit", function (e) {
        e.preventDefault();

        const submit = document.querySelector(".form-password [type=submit]");

        const
            code_input = document.querySelector("#password-code"),
            password_input = document.querySelector("#password-password"),
            confirm_input = document.querySelector("#password-confirm"),
            code = code_input.value.replace(/[^\d]/g, ''),
            password = password_input.value.trim(),
            confirm = confirm_input.value.trim(),
            code_row = code_input.closest(".row"),
            password_row = password_input.closest(".row"),
            confirm_row = confirm_input.closest(".row")
        ;

        let error = false;

        if (code.length === 6) {
            code_input.classList.remove("error");
            code_input.classList.add("success");
            code_row.dataset.error = "";
        } else {
            code_input.classList.remove("success");
            code_input.classList.add("error");
            code_row.dataset.error = code_row.dataset.txt;
            error = true;
        }

        if (password.length >= 6) {
            password_input.classList.remove("error");
            password_input.classList.add("success");
            password_row.dataset.error =  "";
        } else {
            password_input.classList.remove("success");
            password_input.classList.add("error");
            password_row.dataset.error = password_row.dataset.txt;
            error = true;
        }

        if (confirm === password) {
            confirm_input.classList.remove("error");
            confirm_input.classList.add("success");
            confirm_row.dataset.error = "";
        } else {
            confirm_input.classList.remove("success");
            confirm_input.classList.add("error");
            confirm_row.dataset.error = confirm_row.dataset.txt;
            error = true;
        }

        if (error) return;

        submitOff(submit);

        setTimeout(function () {
            axios
                .post("/" + document.querySelector(".modal-password a[data-modal]").dataset.modal + "/code", {
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
                            password_row.dataset.error = error.response.data.errors.password;
                            password_input.classList.remove("success");
                            password_input.classList.add("error");
                            confirm_input.classList.remove("success");
                            confirm_input.classList.add("error");
                        }
                    }
                })
                .then(function () {
                    submitOn(submit);
                })
            ;
        }, 700);
    });

    function catchAuthError(error, input, field) {
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
            input.classList.remove("success");
            input.classList.add("error");
            input.closest(".row").dataset.error = txt;
        } else {
            modalOpen("error");
        }
    }
}