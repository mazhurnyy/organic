$(function () {
    $(document)
        .on("click", ".search-open", function () {
            $(".search-form").addClass("open");
            $(".search-input").focus();
        })
        .on("click", ".search-close", function () {
            $(".search-form").removeClass("open");
        })
        .on("click", "#wrapper", function (e) {
            if ($("#wrapper").outerWidth() > 768
                && e.target.closest(".search-form") === null
                && e.target.closest(".search-open") === null
            ) {
                $(".search-form").removeClass("open");
            }
        })
        .on("submit", ".search-form", function (e) {
            e.preventDefault();

            // todo Поиск
            window.location.assign("./search.html");
        })
        .on("input", ".search-input", function () {
            const
                text = $(this).val()
            ;

            // todo Поиск
            console.log("fast search: " + text);
        })
    ;
});