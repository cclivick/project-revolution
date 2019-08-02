var db = require("../models");
var axios = require("axios");

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
        //"student" is the file to render to
        questions: data
        //defining the template on "student" file
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

  app.get("*", function(req, res) {
    res.render("404");
  });
};
