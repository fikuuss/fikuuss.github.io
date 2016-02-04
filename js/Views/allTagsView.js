define(
    ["Backbone", "underscore", "jquery", "text!Templates/allTags-template.html"],
    function(Backbone, _, $, template){
        var allTagsView = Backbone.View.extend({
            initialize: function() {
                this.render()
            },

            el: $(".search-tags"),

            template:
                _.template(template, {variable: "tags"})
            ,

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
            }
        });

        return allTagsView;
    }
);