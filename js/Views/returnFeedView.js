define(
    ["Backbone", "underscore", "jquery", "text!Templates/allTags-template.html"],
    function(Backbone, _, $, template){
        var returnFeedView = Backbone.View.extend({
            initialize: function() {
                this.render()
            },

            el: $(".search-tags"),

            render: function() {
                this.$el.html('<a href="#feed">Возврат ко всем статьям</a>');
            }
        });

        return returnFeedView;
    }
);