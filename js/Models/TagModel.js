define(
    ["Backbone"],
    function(Backbone){
        var TagModel = Backbone.Model.extend({
            defaults: {
                "id": "",
                "tagName": "",
                "isSelected": false
            }
        });

        return TagModel;
    }
);