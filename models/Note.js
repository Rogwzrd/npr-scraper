const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title:{
        type: String,
    },
    body: {
        type: String,
    }
});

const Article = mongoose.model("Note", NoteSchema);

module.exports = Article;