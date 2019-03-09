// Required Dependencies
var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var db = require("./models");
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
mongoose.connect("mongodb://localhost/CashScraper");

// Handlebars Configuration
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get("/home", function(req, res) {
  res.render("articleSection");
});

// "/home" is the default homepage of CashScraper
app.get("/", function(req, res) {
  res.redirect("/home");
});

app.get("/scrape", function(req, res) {
  axios.get("http://www.daveramsey.com/blog").then(function(response) {
    var $ = cheerio.load(response.data);

    $("section article").each(function(i, element) {
      var result = {};

      result.image = $(element)
        .find("img")
        .attr("src");
      result.catergory = $(element)
        .children("header")
        .find("p")
        .text();
      result.title = $(element)
        .find("img")
        .attr("alt");
      result.summary = $(element)
        .children("div")
        .find("p")
        .text();
      result.link =
        "http://www.daveramsey.com" +
        $(element)
          .children("header")
          .find("a")
          .attr("href");

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
      return i < 11;
    });
    res.send("Scrape Complete");
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(error) {
      res.json(error);
    });
});

// Ensures Application's Host is Listening
app.listen(PORT, function() {
  console.log("Application is running at http://localhost:" + PORT + "\n");
});
