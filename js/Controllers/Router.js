define(
    ["Backbone", "States/feedState", "States/articleViewState"],
    function(Backbone, feedState, articleViewState){
        var Router = Backbone.Router.extend({
            routes: {
                "": "feedState",
                "feed": "feedState",
                "article/:id": "articleViewState"
            },

            feedState: function(){
                feedState();
            },

            articleViewState: function(id) {
                articleViewState(id)
            }
        });

        return Router;
    }
);