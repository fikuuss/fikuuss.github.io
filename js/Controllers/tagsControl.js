define(
    ["jquery", "Controllers/articleControl"],
    function($, articleControl){
        var tagsControl = function (articles, tags) {
            $("input:checkbox").on("change", function() {
                var selectedTag = tags.findWhere({"tagName": this.id});
                selectedTag.set({"isSelected": $("#" + this.id).prop("checked")});
                tags.add(selectedTag.attributes, {merge:true});

                articleControl(articles, tags)
            });
        };

        return tagsControl;
    }
);