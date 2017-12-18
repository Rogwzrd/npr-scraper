const express = require('express');
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;


// body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// static files served to the client side
app.use(express.static("public"));


// handlebars setup
app.engine("handlebars", hbars({ defaultLayout: "main" }));
// this will render handlebars files when res.render is called.
app.set("view engine", "handlebars");
// this will determine the file path for handlebars views
app.set('views', path.join(__dirname, 'views'));

//mongoose setup
mongoose.Promise = Promise;

if (process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://localhost/npr-scraper", {
        useMongoClient: true
    });
}



// routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

app.use("/", htmlRoutes);
app.use("/api/", apiRoutes);


app.listen(PORT, function(){
    console.log("app is running on " + PORT)
});