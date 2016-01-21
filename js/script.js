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

    function tagsDisplay (data) {
        _.templateSettings.variable = "tags";


        var tagsTemplate = _.template(
            $("script.tags-template").html()
        );

        $(".search").html("");

        $(".search").append(
            tagsTemplate(data)
        );
    }
    //END: View

    //BEGIN: Controller
    function tagsController() {
        $("input:checkbox").on("change", function() {

            if ($("#" + this.id).prop("checked")) {
                alert("Ena");
                articlesTags.selectedTags.push(this.name);
            }
            else {
                alert("Dis");
                articlesTags.selectedTags = _.without(articlesTags.selectedTags, this.name);
            }
            tagsDisplay(articlesTags);
        });
    }
    //END: Controller

    $.get("js/articles.json", {}, function(answer) {
        displayArticles(answer);
        createAllTags(answer);
        tagsDisplay(articlesTags);
    });

    $(document).ajaxComplete(function() {
        tagsController();
    });
});