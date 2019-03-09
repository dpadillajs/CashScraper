// Required Dependency for Building Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Note Object
var NoteSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

var Note = mongoose.model("Note", NoteSchema);

// Exporting Note Object
module.exports = Note;
