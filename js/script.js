$(document).ready(function() {

    //BEGIN: Model
    function articlesModel(articles) {
        this.articles = articles.articles;
    }

    function tagsModel(articles) {
        this.tags = {
            allTags: receivingTags(articles),
            selectedTags: receivingTags(articles)
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

        $(".content-blocks").html("");

        $(".content-blocks").append(
            articlesTemplate(articles)
        );
    }

    function displayArticlesTags (tags) {
        _.templateSettings.variable = "tags";


        var tagsTemplate = _.template(
            $("script.allTags-template").html()
        );

        $(".search-tags").html("");

        $(".search-tags").append(
            tagsTemplate(tags)
        );
    }

    function displaySelectedTags (tags) {
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
        var selectedArticles = readOnlyArticlesModel.articles;

        console.log(readOnlyArticlesModel.articles);

        displayArticles(selectedArticles);
        displayArticlesTags(readOnlyTagsModel.tags.allTags);
        displaySelectedTags(readOnlyTagsModel.tags.selectedTags);

        tagsControl();

        function tagsControl() {
            $("input:checkbox").on("change", function() {
                if ($("#" + this.id).prop("checked")) {
                    readOnlyTagsModel.tags.selectedTags.push(this.id);
                }
                else {
                    readOnlyTagsModel.tags.selectedTags = _.without(readOnlyTagsModel.tags.selectedTags, this.id);
                }
                displaySelectedTags(readOnlyTagsModel.tags.selectedTags);
                articleControl();
            });
        }

        function articleControl() {
            _.each(readOnlyArticlesModel.articles, function(article) {
                var flag = true;
                _.each(readOnlyTagsModel.tags.selectedTags, function(selTag) {
                    console.log(_.contains(article.tags, selTag));
                    if (!(_.contains(article.tags, selTag))) {
                        flag = false;
                    }
                });
                if (flag) {
                    selectedArticles.push(article);
                    selectedArticles = _.uniq(selectedArticles);
                    console.log("pushed");
                    console.log(selectedArticles);
                }
                else {
                    selectedArticles = _.without(selectedArticles, article);
                    console.log(selectedArticles);
                }
            });
            displayArticles(selectedArticles);
        }
    }
    //END: Controller

    $.get("js/articles.json", {}, function(answer) {
        controller(answer);
    });
});