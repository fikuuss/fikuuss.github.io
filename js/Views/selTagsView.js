define(
    ["Backbone", "underscore", "jquery", "text!Templates/selTags-template.html"],
    function(Backbone, _, $, template){
        var selectedTagsView = Backbone.View.extend({
            initialize: function() {
                this.model.bind('change', this.render, this);
                this.render()
            },

            el: $(".search-header"),

            template:
                _.template(template, {variable: "tags"})
            ,

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });

        return selectedTagsView;
    }
);