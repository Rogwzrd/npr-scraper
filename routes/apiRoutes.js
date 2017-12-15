const express = require("express");
const apiRouter = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models/index");

apiRouter.get("/scrape", function(req, res){
    request("http://www.reddit.com/r/tekken", function(req, res, html){

        const $ = cheerio.load(html);

        $("a.title").each(function(i, element){
            const link = $(element).attr("href");
            const title = $(element).text();

            db.Article.create({
                title: title,
                link: link
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

apiRouter.post("/articles", function(req, res){
    let article = req.body;
    res.render('post saved')
});

module.exports = apiRouter;