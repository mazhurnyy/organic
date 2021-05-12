$(function () {
    $(document).on("click", ".navbar-toggle", function () {
        $(".navbar").toggleClass("open");
        $(".navbar-toggle").toggleClass("open");
    });

    $(document)
        .on("click", "#wrapper", function (e) {
            if (mobile && e.target.closest(".navbar-lvl-1") === null) {
                $(".navbar-lvl-1").removeClass("open");
            }
        })
        .on("click", ".navbar-lvl-1 > a", function (e) {
            if ($("#wrapper").outerWidth() < 768 || mobile) {
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
            if ($("#wrapper").outerWidth() < 768 || mobile) return false;

            $(".navbar-lvl-1").removeClass("open");
            $(this).addClass("open");
        })
        .on("mouseleave", ".navbar-lvl-1", function () {
            if ($("#wrapper").outerWidth() < 768 || mobile) return false;

            $(".navbar-lvl-1").removeClass("open");
        })
    ;

    $(document)
        .on("click", "#wrapper", function (e) {
            if (mobile && e.target.closest(".navbar-lvl-2") === null) {
                $(".navbar-lvl-2").removeClass("open");
            }
        })
        .on("click", ".navbar-lvl-2 > a", function (e) {
            if ($("#wrapper").outerWidth() >= 768 && mobile) {
                if ($(this).next().length > 0) {
                    e.preventDefault();
                }

                const prev = $(this).parent().hasClass("open");

                $(".navbar-lvl-2").removeClass("open");

                if (!prev) {
                    $(this).parent().addClass("open");
                }
            }
        })
        .on("mouseover", ".navbar-lvl-2", function () {
            if ($("#wrapper").outerWidth() < 768 || mobile) return false;

            $(".navbar-lvl-2").removeClass("open");
            $(this).addClass("open");
        })
        .on("mouseleave", ".navbar-lvl-2", function () {
            if ($("#wrapper").outerWidth() < 768 || mobile) return false;

            $(".navbar-lvl-2").removeClass("open");
        })
    ;
});