{
    document.addEventListener("click", function (e) {
        const
            shadow = document.querySelector("#shadow"),
            wrapper = shadow.querySelector(".modal-wrapper"),
            modal = wrapper.querySelector(".modal.open")
        ;
        if (e.target !== shadow && e.target !== wrapper) return true;

        if (modal.classList.contains("modal-important")) return true;

        modalClose();
    });

    document.addEventListener("click", function (e) {
        if (!e.target.classList.contains("modal-close") && !e.target.closest(".modal-close")) return true;

        modalClose();
    });

    document.addEventListener("click", function (e) {
        const
            t1 = e.target,
            t2 = t1.closest("[data-modal]")
        ;
        if (!t1.dataset.modal && !t2) return true;

        modalOpen(t1.dataset.modal ?? t2.dataset.modal);
    });
}

function modalClose() {
    const
        shadow = document.querySelector("#shadow"),
        wrapper = shadow.querySelector(".modal-wrapper"),
        modal = wrapper.querySelector(".modal.open")
    ;
    wrapper.classList.remove("open");

    setTimeout(function () {
        modal.classList.remove("open");
        shadow.classList.remove("open");
    }, 600);
}

function modalOpen(t) {
    const
        shadow = document.querySelector("#shadow"),
        wrapper = shadow.querySelector(".modal-wrapper"),
        modal = wrapper.querySelector(".modal.open"),
        target = wrapper.querySelector(".modal-" + t)
    ;

    let timeout = wrapper.classList.contains("open") ? 500 : 10;

    if (wrapper.classList.contains("open")) {
        wrapper.classList.remove("open");

        setTimeout(function () {
            modal.classList.remove("open");
            target.classList.add("open");
        }, timeout);
    } else {
        shadow.classList.add("open");
        target.classList.add("open");
    }

    setTimeout(function () {
        wrapper.classList.add("open");
    }, timeout);
}