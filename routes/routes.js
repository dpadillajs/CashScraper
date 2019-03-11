module.exports = function(app, db, axios, cheerio) {
  app.get("/", function(req, res) {
    db.Article.find({})
      .then(function(articles) {
        if (Object.keys(articles).length === 0) {
          res.render("noArticles");
        } else {
          res.render("articleSection", { articles: articles });
        }
      })
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });
  });

  app.get("/articles", function(req, res) {
    res.render("savedSection");
  });

  app.post("/scrape", function(req, res) {
    db.Article.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      }
    });

    axios.get("http://www.daveramsey.com/blog").then(function(response) {
      var $ = cheerio.load(response.data);

      $("section article").each(function(i, element) {
        var result = {};

        result.image = $(element)
          .find("img")
          .attr("src");
        result.catergory = $(element)
          .children("header")
          .children("p")
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

      res.redirect("/");
    });
  });

  app.post("/cleared", function(req, res) {
    db.Article.deleteMany({})
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });

    res.render("noArticles");
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
};
