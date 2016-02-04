requirejs.config({
    baseUrl: "js/lib",
    paths: {
        jquery: 'jquery.min',
        Backbone: 'backbone-min',
        underscore: 'underscore-min',
        appFolder: "..",
        Controllers: "../Controllers",
        Models: "../Models",
        Templates: "../Templates",
        Views: "../Views"
    },
    "shim": {
        'underscore': {
            exports: '_'
        },

        'Backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(
    ["appFolder/mainApp"]
);