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
        fullArticle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor, velit sit amet fermentum convallis, ante erat dignissim risus, eu faucibus eros elit et neque. Duis a turpis mollis, rutrum turpis id, dictum est. Cras quis enim facilisis, auctor quam a, gravida justo. Cras ultrices nec turpis in mattis. Nunc vel laoreet justo, interdum lobortis felis. Mauris aliquam maximus urna, eget porttitor eros euismod in. Proin efficitur volutpat lectus eu tempor. Nunc a faucibus urna. Integer iaculis nisl non ornare tincidunt. Suspendisse varius ut ligula a fermentum. Pellentesque pellentesque sit amet sapien ut ullamcorper. Maecenas lacus sapien, faucibus tincidunt facilisis ac, elementum a ex. Aliquam pharetra dictum nulla, at aliquam lorem luctus a. Integer efficitur neque dui, vitae facilisis ante rutrum eu. Cras eget cursus nibh. Nunc eget est malesuada, mollis eros nec, cursus lacus."
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