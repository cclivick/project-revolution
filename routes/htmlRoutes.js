var db = require("../models");
var axios = require("axios");
//var keys = require("../../keys.js")

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/student", function(req, res) {
    db.Question.findAll({
      include:[{
        model: db.Answer
      }]
    }).then(function(data) {
      res.render("student", {
        questions: data
      });
    });
  });
   
  app.get("/teacher", function(req, res) {
    db.Answer.findAll({
      include: [{
        model: db.Question
      }]
    }).then(function(data) {
      res.render("teacher", {
        answers: data
      });
    });
  });

  // app.get("/teacher", function(req, res) {
  //   function firstCall(string) {
  //     axios.get("http://api.wolframalpha.com/v2/query?input=" + string + "&appid=" + keys)
  //       .then(function(response) {
  //         res.json(response);
  //       });
  //     };
  //   firstCall("Germany");
  // });

  // app.get("/teacher/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("teacher", {
  //       example: dbExample
  //     });
  //   });
  // });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
