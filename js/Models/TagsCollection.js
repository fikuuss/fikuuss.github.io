define(
    ["Backbone", "Models/TagModel"],
    function(Backbone, TagModel){
        var TagsCollection = Backbone.Collection.extend({
            model: TagModel
        });

        return TagsCollection;
    }
);