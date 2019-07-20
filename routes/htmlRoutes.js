var db = require("../models");
var axios = require("axios");
var keys = require("../../keys.js")

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/teacher", function(req, res) {
    function firstCall(string) {
      axios.get("http://api.wolframalpha.com/v2/query?input=" + string + "&appid=" + keys)
        .then(function(response) {
          res.json(response);
        });
      };
    firstCall("Germany");
  };

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
