$(function () {
    $(document)
        .on("click", ".brands-filter li.button", function () {
            $(this).closest(".brands-filter").find("li.active").removeClass("active").addClass("button");
            $(this).removeClass("button").addClass("active");

            if (this.hasAttribute("data-c-clean")) {
                $(".brand-link").removeClass("d-none");
            } else if (this.hasAttribute("data-c")) {
                $(".brand-link").addClass("d-none");
                $(".brand-link.c-" + $(this).data("c")).removeClass("d-none");

            } else if (this.hasAttribute("data-l-clean")) {
                $(".brand-group").removeClass("d-none");
            } else if (this.hasAttribute("data-l")) {
                $(".brand-group").addClass("d-none");
                $(".brand-group.l-" + $(this).data("l")).removeClass("d-none");
            }
        })
    ;
});
