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
            "isSelected": true
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
            var selectedTag;
            if ($("#" + this.id).prop("checked")) {
                selectedTag = tags.findWhere({"tagName": this.id});
                selectedTag.set({"isSelected": true});
                tags.add(selectedTag.attributes, {merge:true});
            }
            else {
                selectedTag = tags.findWhere({"tagName": this.id});
                selectedTag.set({"isSelected": false});
                tags.add(selectedTag.attributes, {merge:true});
            }
            articleControl(articles, tags)
        });

        function articleControl(articles, tags) {
            var selectedTagsNames = [];
            _.each(tags.where({"isSelected": true}), function(tag) {
                selectedTagsNames.push(tag.attributes.tagName);
            });

            _.each(articles.models, function (article) {
                var flag = true;
                var selectedArticle;
                _.each(selectedTagsNames, function (selTag) {
                    if (!(_.contains(article.attributes.tags, selTag))) {
                        flag = false;
                    }
                });

                if (flag) {
                    selectedArticle = article;
                    console.log(selectedArticle);
                    selectedArticle.set({"isShowed": true});
                    articles.add(selectedArticle.attributes, {merge: true});
                }
                else {
                    selectedArticle = article;
                    console.log(selectedArticle);
                    selectedArticle.set({"isShowed": false});
                    articles.add(selectedArticle.attributes, {merge: true});
                }
            });
        }
    }
    //END: Controller

    $.get("js/articles.json", {}, function(answer) {
        var articles = new ArticlesCollection(answer);
        var articlesView = new ArticlesView({model: articles});
        var allTags = new TagsCollection(receivingTags(articles));
        var tagsView = new allTagsView({model: allTags});
        var selTagsView = new selectedTagsView({model: allTags});
        Controller(articles, allTags);
    });
});