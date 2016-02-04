define(
    ["Backbone", "underscore"],
    function(Backbone, _){
        var ArticleModel = Backbone.Model.extend({
            defaults: {
                "id": "",
                "title": "",
                "tags": "",
                "date": "",
                "author": "",
                "text": "",
                "isShowed": true,


                "cutArticle": function (text) {
                    var words = text.split(' ');
                    if (_.contains(words, "!--continue--!")) {
                        var nwords = _.indexOf(words, "!--continue--!");

                        words.splice(nwords, words.length - 1);
                    }

                    return words.join(" ") + "...";
                }
            }
        });

        return ArticleModel;
    }
);