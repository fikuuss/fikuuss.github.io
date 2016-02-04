$(document).ready(function() {

    //BEGIN: Model
    var ArticleModel = Backbone.Model.extend({
        defaults: {
            "id": "",
            "title": "",
            "tags": "",
            "date": "",
            "author": "",
            "text": "",
            "isShowed": true
        }
    });

    var ArticlesCollection = Backbone.Collection.extend({
        model: ArticleModel
    });

    var TagModel = Backbone.Model.extend({
        defaults: {
            "id": "",
            "tagName": "",
            "isSelected": false
        }
    });

    var TagsCollection = Backbone.Collection.extend({
        model: TagModel
    });

    function receivingTags (articles) {
        var allTagsNames = [];
        var allTags = [];
        _.each(articles.toJSON(), function(article) {
            _.each(article.tags, function(tag) {
                allTagsNames.push(tag);
                allTagsNames = _.uniq(allTagsNames);
            });
        });
        _.each(allTagsNames, function(tagName, id) {
            allTags.push({"id": id, "tagName": tagName});
        });
        return allTags;
    }
    //END: Model

    //BEGIN: View
    var ArticlesView = Backbone.View.extend({
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.render()
        },

        el: $(".content-blocks"),

        template:
            _.template($("script.articles-template").html(), {variable: "articles"})
        ,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    var allTagsView = Backbone.View.extend({
        initialize: function() {
            this.render()
        },

        el: $(".search-tags"),

        template:
            _.template($("script.allTags-template").html(), {variable: "tags"})
        ,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    var selectedTagsView = Backbone.View.extend({
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.render()
        },

        el: $(".search-header"),

        template:
            _.template($("script.selTags-template").html(), {variable: "tags"})
        ,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });
    //END: View

    //BEGIN: Controller
    function Controller (articles, tags) {

        $("input:checkbox").on("change", function() {
            var selectedTag = tags.findWhere({"tagName": this.id});
            selectedTag.set({"isSelected": $("#" + this.id).prop("checked")});
            tags.add(selectedTag.attributes, {merge:true});

            articleControl(articles, tags)
        });

        function articleControl(articles, tags) {
            var selectedTagsNames = [];
            _.each(tags.where({"isSelected": true}), function(tag) {
                selectedTagsNames.push(tag.attributes.tagName);
            });

            _.each(articles.models, function (article) {
                var flag = true;
                _.each(selectedTagsNames, function (selTag) {
                    if (!(_.contains(article.attributes.tags, selTag))) {
                        flag = false;
                    }
                });
                article.set({"isShowed": flag});
            });
        }
    }
    //END: Controller

    /*function deleteLabel(text) {
     var words = text.split(' ');
     words.splice(_.indexOf(words, "!--continue--!"), 1);

     return words.join(" ");
     }*/

    $.get("js/articles.json", {}, function(answer) {
        var articles = new ArticlesCollection(answer);
        var articlesView = new ArticlesView({model: articles});
        var allTags = new TagsCollection(receivingTags(articles));
        var tagsView = new allTagsView({model: allTags});
        var selTagsView = new selectedTagsView({model: allTags});
        Controller(articles, allTags);
    });
});