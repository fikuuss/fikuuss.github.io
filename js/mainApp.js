require(
    ["Backbone", "Controllers/Router", "Controllers/hashControl"],
    function(Backbone, Router, hashControl) {
        var Router = new Router();
        Backbone.history.start();
        hashControl();
    }
);