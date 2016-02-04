define(
    ["Backbone", "underscore"],
    function(Backbone, _){
        var articleControl = function (articles, tags) {
            var selectedTagsNames = [];
            _.each(tags.where({"isSelected": true}), function(tag) {
                selectedTagsNames.push(tag.attributes.tagName);
            });

            _.each(articles.models, function (article) {
                var flag = true;
                _.each(selectedTagsNames, function (selTag) {
                    if (!(_.contains(article.attributes.tags, selTag))) {
                        flag = false;
                    }
                });
                article.set({"isShowed": flag});
            });
        };

        return articleControl;
    }
);