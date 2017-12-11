const express = require('express');
const htmlRouter = express.Router();

htmlRouter.get("/", function(req, res){
    res.render('index')
});

htmlRouter.get("/saved", function(req, res){
    res.render('saved')
});

module.exports = htmlRouter;