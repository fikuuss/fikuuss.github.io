$(document).ready(function() {
    function createAllTags(data) {
        var allTags = [];
        _.each(data.articles, function(article) {
            _.each(article.tags, function(tag) {
                allTags.push(tag);
            });
        });
        var uniqTags = _.uniq(allTags);

        return uniqTags;
    }

    function displayArticles (data) {
        _.templateSettings.variable = "articles";

        var articlesTemplate = _.template(
            $("script.articles-template").html()
        );

        $(".content-blocks").append(
            articlesTemplate(data.articles)
        );
    }

    function displayTags (data) {
        var articlesTags = createAllTags(data);

        _.templateSettings.variable = "tags";

        var tagsTemplate = _.template(
            $("script.tags-template").html()
        );

        $(".search-tags").append(
            tagsTemplate(articlesTags)
        );
    }

    $.get("js/articles.json", {}, function(answer) {
        displayArticles(answer);
        displayTags(answer);
    });
});
