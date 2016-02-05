define(
    ["underscore"],
    function(_){
        var receivingTags = function (articles) {
            var allTagsNames = [];
            var allTags = [];
            _.each(articles.toJSON(), function (article) {
                _.each(article.tags, function (tag) {
                    allTagsNames.push(tag);
                    allTagsNames = _.uniq(allTagsNames);
                });
            });
            _.each(allTagsNames, function (tagName, id) {
                allTags.push({"id": id, "tagName": tagName});
            });
            return allTags;
        };

        return receivingTags;
    }
);