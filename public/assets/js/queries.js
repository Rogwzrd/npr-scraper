$("#scrape").on("click",function () {
    $.ajax({
        method: "GET",
        url: "/api/scrape"
    }).then(function(data) {
        console.log(data);
    })
});

$(document).on("click", ".saveArticle", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "api/articles/saved/" + articleId
    }).then(function(savedData){
        console.log(savedData)
    })
});