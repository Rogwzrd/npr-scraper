const express = require('express');
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const htmlRoutes = require("./routes/htmlRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

//handlebars setup
app.engine("handlebars", hbars({ defaultLayout: "main" }));
//This will render handlebars files when res.render is called.
app.set("view engine", "handlebars");

app.get("/", htmlRoutes);

app.listen(PORT, function(){
    console.log("app is running on " + PORT)
});