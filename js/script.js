_.templateSettings.variable = "articles";

var template = _.template(
    $("script.template").html()
);

var articles =  [
    {
        id: 1,
        title: "unknown title",
        tags: [
            "tag1", "tag2", "tag3"
        ],
        date: "unknown",
        author: "unknown author",
        fullArticle: "full text of article"
    }, {
        id: 2,
        title: "unknown title",
        tags: [
            "tag1", "tag2", "tag3"
        ],
        date: "unknown",
        author: "unknown author",
        fullArticle: "full text of article"
    },  {
        id: 3,
        title: "unknown title",
        tags: [
            "tag1", "tag2", "tag3"
        ],
        date: "unknown",
        author: "unknown author",
        fullArticle: "full text of article"
    }
];


$(".content-blocks").append(
    template(articles)
);