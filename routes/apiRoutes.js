const express = require("express");
const apiRouter = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models/index");

// scrape page for new articles and add them to the database
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
    })
});

// save an article
apiRouter.post("/articles/save/:id", function(req, res){
    db.Article.update({_id: req.params.id}, {$set: {saved: true}},function(err, docs){
        console.log(docs);
    });
    res.send('post saved')
});

// unsave an article
apiRouter.post("/articles/unsave/:id", function(req, res){
    db.Article.update({_id: req.params.id}, {$set: {saved: false}},function(err, docs){
        console.log(docs);
    });
    res.send('post unsaved')
});

// create a new note
apiRouter.post("/articles/:id", function(req, res){
    db.Note.create(req.body)
        .then(function(newNote){
            console.log("/////new note////");
            console.log(newNote);
            console.log("/////new note////");
            return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {notes: newNote._id}}, {new: true})
        })
        .then(function(articleNote){
            console.log("////article note////");
            console.log(articleNote);
            console.log("////article note////");
        })
        .catch(function(err){
            console.log(err)
    });
    res.status(200).end();
});

// remove a note
apiRouter.post("/notes/remove/:id", function(req, res) {
    db.Note.find({_id: req.params.id})
        .then(function (noteData) {
            console.log("/////retrieving article id from note for deletion/////////")
            console.log(noteData);
            console.log("//////////////////////////////////////////////////////////")
            return db.Article.update({_id: noteData[0].article}, {"$pull": {"notes": req.params.id}}, {safe: true})
        })
        .then(function (removedData) {
            console.log(removedData);
            return db.Note.remove({_id: req.params.id})
        })
        .catch(function (err) {
            console.log(err)
        });
    res.status(200).end();
});

apiRouter.post("/notes/update/:id", function(req, res){
    db.Note.findOneAndUpdate({_id: req.params.id}, {$set: {title: req.body.title, body: req.body.body}})
        .then(function(updatedNote){
            console.log(updatedNote)
        })
        .catch(function(err) {
            console.log(err);
        });
    res.status(200).end();
});
module.exports = apiRouter;