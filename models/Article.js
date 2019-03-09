// Required Dependency for Building Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Article Object
var ArticleSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  catergory: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

// Exporting Article Object
module.exports = Article;
