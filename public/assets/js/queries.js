// scrape page for new articles
$("#scrape").on("click",function () {
    $.ajax({
        method: "GET",
        url: "/api/scrape"
    }).then(function(data) {
        console.log(data);
        location.reload();
    }).catch(function(error){
        console.log(error);
    });
});

// save an article
$(document).on("click", ".saveArticle", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "api/articles/save/" + articleId
    }).then(function(savedData){
        console.log(savedData);
        location.reload();
    }).catch(function(error){
        console.log(error);
    });
});

// unsave an article
$(document).on("click", ".unsaveArticle", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "api/articles/unsave/" + articleId
    }).then(function(savedData){
        console.log(savedData);
        location.reload();
    }).catch(function(error){
        console.log(error);
    });
});

// add a note
$(document).on("click", ".addNote", function(){
    const articleId = $(this).parent().attr("data-id");
    const noteText = {title: $(this).siblings("input.newNote-header").val().trim() , body: $(this).siblings("input.newNote").val().trim(), article: articleId};
    console.log(articleId);
    console.log(JSON.stringify(noteText, null, 2));
    $.post(`api/articles/${articleId}`, noteText, function(){
        console.log("successful post");
    })
    .then(function(note){
        console.log(note);
        location.reload();
    }).catch(function(error){
        console.log(error);
    });
});

// remove a note
$(document).on("click", ".removeNote", function(){
    const articleId = $(this).attr("data-id");
    console.log(articleId);
    $.post(`api/notes/remove/${articleId}`, function(){
    }).then(function(note){
        console.log(note);
        location.reload();
    }).catch(function(error){
        console.log(error);
    });
});

// update a note
$(document).on("click", ".updateNote", function(){
    const noteId = $(this).attr("data-id");
    const noteText = {title: $(this).siblings("form").children("input").val().trim() , body: $(this).siblings("form").children("textarea").val().trim()};
    console.log(noteId);
    console.log(JSON.stringify(noteText, null, 2));
    $.post(`api/notes/update/${noteId}`, noteText, function(){
        console.log("successful post");
    })
        .then(function(note){
            console.log(note);
            location.reload();
        }).catch(function(error){
        console.log(error);
    });
});