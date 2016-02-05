define(
    ["Backbone", "underscore", "jquery", "text!Templates/articleView-template.html"],
    function(Backbone, _, $, template){
        var fullArticleView = Backbone.View.extend({
            initialize: function() {
                this.model.bind('change', this.render, this);
                this.render()
            },

            el: $(".content-blocks"),

            template:
                _.template(template, {variable: "article"})
            ,

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });

        return fullArticleView;
    }
);