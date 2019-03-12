// Required Dependencies
var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var db = require("./models/Index.js");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var PORT = process.env.PORT || 3000;

// Middleware Configuration

// For Logging Requests
app.use(logger("dev"));

// Parse Request Body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Makes Public a Static Folder
app.use(express.static("public"));

// Establishing MongoDB Connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/CashScraper";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Handlebars Configuration
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/routes")(app, db, axios, cheerio);

// Ensures Application's Host is Listening
app.listen(PORT, function() {
  console.log("Application is running at http://localhost:" + PORT + "\n");
});
