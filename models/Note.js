const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title:{
        type: String,
    },
    body: {
        type: String,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;