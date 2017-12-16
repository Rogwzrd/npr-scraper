const express = require("express");
const apiRouter = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models/index");

apiRouter.get("/scrape", function(req, res){
    request("http://www.npr.com", function(req, res, html){

        const $ = cheerio.load(html);

        $("div.story-text").each(function(i, element){
            const link = $(element).children("a").attr("href");
            const title = $(element).children("a").children("h1").text();
            const teaser = $(element).children("a").children("p.teaser").text();

            db.Article.create({
                title: title,
                link: link,
                teaser: teaser
            }).then(function(dbArticle){
                console.log(dbArticle)
            }).catch(function(err){
                console.log(err);
            });
        });
    });
});

apiRouter.get("/articles", function(req, res){
    db.Article.find({})
        .then(function(data){
        console.log("server side database pull");
            console.log(data);
            res.send(data);
        })
        .catch(function(error){
            console.log(error);
        })
});

apiRouter.post("/articles/saved/:id", function(req, res){
    let articleId = req.params.id;
    db.Article.update({_id: articleId}, {$set: {saved: true}},function(err, docs){
        console.log(docs);
    });
    res.send('post saved')
});

module.exports = apiRouter;