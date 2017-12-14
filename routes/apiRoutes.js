const express = require("express");
const apiRouter = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models/index");

apiRouter.get("/scrape", function(req, res){
    request("http://www.reddit.com/r/tekken", function(req, res, html){
        const $ = cheerio.load(html);
        const results = [];

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
        })
    });
    res.status(200).end();
});

apiRouter.post("/submit", function(req, res){
    res.render('post saved')
});

module.exports = apiRouter;