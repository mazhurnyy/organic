$(function () {
    $(document)
        .ready(function () {
            if ($("#wrapper").outerWidth() < 768) {
                $("#content-brands .details-categories").removeAttr("open");
            } else {
                $("#content-brands .details-categories").attr("open", "open");
            }
        })
        .on("click", ".brands-filter li.button", function () {
            $(this).closest(".brands-filter").find("li.active").removeClass("active").addClass("button");
            $(this).removeClass("button").addClass("active");

            if (this.hasAttribute("data-c-clean")) {
                $(".brand-link").removeClass("d-none");
                $(".brand-group h2").removeClass("d-none");
                $(".brand-group ul").removeClass("d-none");

            } else if (this.hasAttribute("data-c")) {
                $(".brand-link").addClass("d-none");
                $(".brand-link.c-" + $(this).data("c")).removeClass("d-none");

                document.querySelectorAll(".brand-group").forEach(function (el) {
                    const elements = el.querySelectorAll(".brand-link:not(.d-none)").length;

                    if (elements) {
                        el.querySelector("h2").classList.remove("d-none");
                        el.querySelector("ul").classList.remove("d-none");
                    } else {
                        el.querySelector("h2").classList.add("d-none");
                        el.querySelector("ul").classList.add("d-none");
                    }
                });

            } else if (this.hasAttribute("data-l-clean")) {
                $(".brand-group").removeClass("d-none");

            } else if (this.hasAttribute("data-l")) {
                $(".brand-group").addClass("d-none");
                $(".brand-group.l-" + $(this).data("l")).removeClass("d-none");
            }
        })
    ;
});
