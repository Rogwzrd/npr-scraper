$("#scrape").on("click",function () {
    $.ajax({
        method: "GET",
        url: "/api/scrape"
    }).then(function(data) {
        console.log(data);
        window.reload();
    }).catch(function(error){
        console.log(error);
    });
});

$(document).on("click", ".saveArticle", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "api/articles/save/" + articleId
    }).then(function(savedData){
        console.log(savedData)
    }).catch(function(error){
        console.log(error);
    });
});

$(document).on("click", ".unsaveArticle", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "api/articles/unsave/" + articleId
    }).then(function(savedData){
        console.log(savedData)
    }).catch(function(error){
        console.log(error);
    });
});

$(document).on("click", ".addNote", function(){
    const articleId = $(this).parent().attr("data-id");
    const noteText = {title: "header" , body: $(this).siblings("input").val().trim()};
    console.log(articleId);
    console.log(noteText);
    $.post(`api/articles/${articleId}`, noteText, function(){
        console.log("successful post")
    })
    .then(function(note){
        console.log(note);
    }).catch(function(error){
        console.log(error);
    });
});

$(document).on("click", ".removeNote", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.post(`api/notes/remove/${articleId}`, function(){
    }).then(function(note){
        console.log(note);
    }).catch(function(error){
        console.log(error);
    });
});