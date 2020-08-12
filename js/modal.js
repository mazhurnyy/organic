$(function () {
    $(document)
        .on("click", "#shadow", function (e) {
            if (e.target === document.getElementById("shadow") && !$(".modal.open").hasClass("modal-important")) {
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
    $(".modal").removeClass("open");
    setTimeout(function () {
        $("#shadow").removeClass("open");
    }, 600);
}

function modalOpen(target) {
    const m = $(".modal"),
        timeout = m.hasClass("open") ? 500 : 10
    ;

    if (m.hasClass("open")) {
        m.removeClass("open");
    } else {
        $("#shadow").addClass("open");
    }

    setTimeout(function () {
        $(".modal-" + target).addClass("open");
    }, timeout);
}