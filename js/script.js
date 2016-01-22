$(document).ready(function() {
    //BEGIN: Model
    var articlesTags = {
        allTags: [],
        selectedTags: []
    };

    function createAllTags(data) {
        _.each(data.articles, function(article) {
            _.each(article.tags, function(tag) {
                articlesTags.allTags.push(tag);
            });
        });
        articlesTags.allTags = _.uniq(articlesTags.allTags);
    }
    //END: Model

    //BEGIN: View
    function displayArticles (data) {
        _.templateSettings.variable = "articles";

        var articlesTemplate = _.template(
            $("script.articles-template").html()
        );

        $(".content-blocks").append(
            articlesTemplate(data.articles)
        );
    }

    function allTagsDisplay () {
        _.templateSettings.variable = "tags";


        var tagsTemplate = _.template(
            $("script.allTags-template").html()
        );

        $(".search-tags").html("");

        $(".search-tags").append(
            tagsTemplate(articlesTags.allTags)
        );
    }

    function selTagsDisplay () {
        _.templateSettings.variable = "tags";

        var tagsTemplate = _.template(
            $("script.selTags-template").html()
        );

        $(".search-header").html("");

        $(".search-header").append(
            tagsTemplate(articlesTags.selectedTags)
        );
    }
    //END: View

    //BEGIN: Controller
    function tagsController() {
        $("input:checkbox").on("change", function() {
            if ($("#" + this.id).prop("checked")) {
                articlesTags.selectedTags.push(this.id);
            }
            else {
                articlesTags.selectedTags = _.without(articlesTags.selectedTags, this.id);
            }
            selTagsDisplay(articlesTags.selectedTags);
        });
    }
    //END: Controller

    $.get("js/articles.json", {}, function(answer) {
        displayArticles(answer);
        createAllTags(answer);
        allTagsDisplay();
        selTagsDisplay();
        tagsController();
    });
});