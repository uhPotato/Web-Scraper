// Require mongoose
var mongoose = require("mongoose");

// require the connection
var db = require("../config/connection");

// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  // using unique and dropDups to prevent duplicate articles
  title: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  // link is a required string
  link: {
    type: String,
    required: true,
    unique: true
  },
  // whether it is saved
  saved: {
    type: Boolean,
    default: 0
  },
  // save notes, ref refers to the Note model
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;