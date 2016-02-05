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
                alert("Work")
            },

            articleViewState: function(id) {
                console.log(id);
                articleViewState(id)
            }
        });

        return Router;
    }
);