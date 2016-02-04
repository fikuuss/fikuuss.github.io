define(
    ["Backbone", "underscore", "Models/ArticleModel"],
    function(Backbone, _, ArticleModel){
        var ArticlesCollection = Backbone.Collection.extend({
            model: ArticleModel
        });

        return ArticlesCollection;
    }
);