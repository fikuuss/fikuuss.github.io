define(
    ["Backbone", "underscore", "jquery", "text!Templates/articles-template.html"],
    function(Backbone, _, $, template){
        var ArticlesView = Backbone.View.extend({
            initialize: function() {
                this.model.bind('change', this.render, this);
                this.render()
            },

            el: $(".content-blocks"),

            template:
                _.template(template, {variable: "articles"})
            ,

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });

        return ArticlesView;
    }
);