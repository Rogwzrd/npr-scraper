const express = require('express');
const htmlRouter = express.Router();
const db = require("../models/index");

htmlRouter.get("/", function(req, res){
    db.Article.find({saved: false},function(err, docs){
        if (err) throw err;
        res.render('index', {article: docs});
    })
});

htmlRouter.get("/saved", function(req, res){

    db.Article.find({saved: true})
        .populate("notes")
        .exec(function(err, docs){
        if (err) throw err;
        console.log(docs);
        res.render('saved', {article: docs});
    });
});

module.exports = htmlRouter;