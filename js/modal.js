$(function () {
    $(document)
        .on("click", "#shadow", function (e) {
            const
                shadow = document.getElementById("shadow"),
                wrapper = document.getElementsByClassName("modal-wrapper")[0]
            ;
            if ((e.target === shadow || e.target === wrapper) && !$(".modal.open").hasClass("modal-important")) {
                modalClose();
            }
        })
        .on("click", ".modal-close", function () {
            modalClose();
        })
        .on("click", "[data-modal]", function () {
            modalOpen($(this).attr("data-modal"));
        })
    ;
});

function modalClose() {
    $(".modal-wrapper").removeClass("open");
    setTimeout(function () {
        $(".modal").removeClass("open");
        $("#shadow").removeClass("open");
        $("#wrapper").focus();
    }, 600);
}

function modalOpen(target) {
    const
        wrap = $(".modal-wrapper"),
        modal = $(".modal-" + target),
        timeout = wrap.hasClass("open") ? 500 : 10
    ;

    if (wrap.hasClass("open")) {
        wrap.removeClass("open");

        setTimeout(function () {
            $(".modal").removeClass("open");
            modal.addClass("open");
        }, timeout);
    } else {
        $("#shadow").addClass("open");
        modal.addClass("open");
    }

    setTimeout(function () {
        wrap.addClass("open");
    }, timeout);

    setTimeout(function () {
        modal.focus();
    }, timeout + 10);
}