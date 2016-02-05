define(
    ["Models/ArticlesCollection", "Views/fullArticleView", "Views/returnFeedView", "jquery"],
    function(ArticleModel, fullArticleView, returnFeedView, $) {
        var articleViewState = function (id) {
            $.get("js/articles.json", {}, function (answer) {
                console.log(id);
                var Articles = new ArticleModel(answer);
                var selectArticle = Articles.findWhere({"id": id});
                var ArView = new fullArticleView({model: selectArticle});
                var retFeed = new returnFeedView();

            });
        };

        return articleViewState;
    }
);