$(document).ready(function() {
    $.get("js/articles.json", {}, function(data) {
        function createAllTags() {
            var allTags = [];
            _.each(data.articles, function(article) {
                _.each(article.tags, function(tag) {
                    allTags.push(tag);
                });
            });

            return allTags;
        }

        var allTags = _.uniq(createAllTags());

        //BEGIN: display articles template
        _.templateSettings.variable = "articles";

        var articlesTemplate = _.template(
            $("script.articles-template").html()
        );

        $(".content-blocks").append(
            articlesTemplate(data.articles)
        );
        //END: display articles template

        //BEGIN: display tags template
        _.templateSettings.variable = "tags";

        var tagsTemplate = _.template(
            $("script.tags-template").html()
        );

        $(".search-tags").append(
            tagsTemplate(allTags)
        );
        //END: display tags template

        //BEGIN: tags control
        var selectedTags = [];

        $('form').on('change', 'input[type="checkbox"]', function() {
            if ($("#" + this.id).prop("checked"))
            {
                selectedTags.push(this.name);
            }
            else {
                selectedTags = _.without(selectedTags, this.name);
            }

        });

        //END: tags control
    });
});