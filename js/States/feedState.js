define(
    ["Models/ArticlesCollection", "Models/TagsCollection", "Views/ArticlesView", "Views/allTagsView", "Views/selTagsView", "Models/receivingTags", "Controllers/tagsControl","jquery"],
    function(ArticleModel, TagsCollection, ArticlesView, allTagsView, selTagsView, receivingTags, tagsControl, $) {
        var feedState = function () {
            $.get("js/articles.json", {}, function (answer) {
                var Articles = new ArticleModel(answer);
                var ArView = new ArticlesView({model: Articles});
                var Tags = new TagsCollection(receivingTags(Articles));
                var AllTags = new allTagsView({model: Tags});
                var SelectedTags = new selTagsView({model: Tags});

                tagsControl(Articles, Tags);
            });
        };
        return feedState;
    }
);