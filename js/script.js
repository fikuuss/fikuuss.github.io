$(document).ready(function() {
    _.templateSettings.variable = "articles";

    var template = _.template(
        $("script.template").html()
    );

    $.get("js/articles.json", {}, function(json) {
        $(".content-blocks").append(
            template(json.articles)
        );
    });
});
