$(document).ready(function() {

    //BEGIN: Model
    function articlesModel(articles) {
        this.articles = articles.articles;
    }

    function tagsModel(articles) {
        this.tags = {
            allTags: receivingTags(articles),
            selectedTags: []
        };

        function receivingTags (articles) {
            var allTags = [];
            _.each(articles, function(article) {
                _.each(article.tags, function(tag) {
                    allTags.push(tag);
                });
            });
            return _.uniq(allTags);
        }
    }
    //END: Model

    //BEGIN: View
    function displayArticles (articles) {
        _.templateSettings.variable = "articles";

        var articlesTemplate = _.template(
            $("script.articles-template").html()
        );

        $(".content-blocks").append(
            articlesTemplate(articles)
        );
    }

    function articlesTagsDisplay (tags) {
        _.templateSettings.variable = "tags";


        var tagsTemplate = _.template(
            $("script.allTags-template").html()
        );

        $(".search-tags").html("");

        $(".search-tags").append(
            tagsTemplate(tags)
        );
    }

    function selectedTagsDisplay (tags) {
        _.templateSettings.variable = "tags";

        var tagsTemplate = _.template(
            $("script.selTags-template").html()
        );

        $(".search-header").html("");

        $(".search-header").append(
            tagsTemplate(tags)
        );
    }
    //END: View

    //BEGIN: Controller
    function controller (data) {
        var readOnlyArticlesModel = new articlesModel(data);
        var readOnlyTagsModel = new tagsModel(readOnlyArticlesModel.articles);

        displayArticles(readOnlyArticlesModel.articles);
        articlesTagsDisplay(readOnlyTagsModel.tags.allTags);
        selectedTagsDisplay(readOnlyTagsModel.tags.selectedTags);

        tagsControl();

        function tagsControl() {
            $("input:checkbox").on("change", function() {
                if ($("#" + this.id).prop("checked")) {
                    readOnlyTagsModel.tags.selectedTags.push(this.id);
                }
                else {
                    readOnlyTagsModel.tags.selectedTags = _.without(readOnlyTagsModel.tags.selectedTags, this.id);
                }
                selectedTagsDisplay(readOnlyTagsModel.tags.selectedTags);
                console.log(readOnlyTagsModel.tags.selectedTags);
            });
        }
    }
    //END: Controller

    $.get("js/articles.json", {}, function(answer) {
        controller(answer);
    });
});