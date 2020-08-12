$(function () {
    $(document)
        .on("click", "#wrapper", function (e) {
            if ($("#wrapper").outerWidth() < 1024 && e.target.closest(".navbar-lvl-1") === null) {
                $(".navbar-lvl-1").removeClass("open");
            }
        })
        .on("click", ".navbar-lvl-1 > a", function (e) {
            if ($("#wrapper").outerWidth() < 1024) {
                if ($(this).next().length > 0) {
                    e.preventDefault();
                }

                const prev = $(this).parent().hasClass("open");

                $(".navbar-lvl-1").removeClass("open");

                if (!prev) {
                    $(this).parent().addClass("open");
                }
            }
        })
        .on("mouseover", ".navbar-lvl-1", function () {
            if ($("#wrapper").outerWidth() >= 1024) {
                $(".navbar-lvl-1").removeClass("open");
                $(this).addClass("open");
            }
        })
        .on("mouseleave", ".navbar-lvl-1", function () {
            if ($("#wrapper").outerWidth() >= 1024) {
                $(".navbar-lvl-1").removeClass("open");
            }
        })
        .on("click", ".navbar-toggle", function () {
            $(".navbar").toggleClass("open");
            $(".navbar-toggle").toggleClass("open");
        })
    ;
});
