$("#scrape").on("click",function () {
    $.ajax({
        method: "GET",
        url: "/api/scrape"
    }).then(function(data) {
        console.log(data);
    })
});

$(function(){
    console.log("page on load");
    $.ajax({
        method: "GET",
        url: "/api/articles"
    }).then(function (data) {
        console.log(data);
        for (let i = 0; i<data.length; i++) {
            console.log("article #" + i.toString());
            const wrapper = $("<div>");
            const newArticle = $("<a>")
                .attr("href", "https://www.reddit.com"+ data[i].link)
                .attr("target", "_blank")
                .text(data[i].title)
                .attr("data-id", data[i]._id);
            wrapper.append(newArticle);
            $("#articleSpace").append(wrapper);
        }
    }).catch(function (err) {
        console.log(err)
    })
});