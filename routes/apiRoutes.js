var db = require("../models");

module.exports = function(app) {
  app.get("/api/questions", function(req, res) {
    db.Question.findAll({}).then(function(dataQuestions) {
      res.json(dataQuestions);
    });
  });

  app.post("/api/questions", function(req, res) {
    db.Question.update({
      current: false
    },
    {
      where:{
    }    
    }).then(function(result) {
      db.Answer.update({
        current: false
      },
      {
        where:{
      }    
      }).then(function(result) {
        db.Question.create(req.body).then(function(data) {
          res.json(data);
        });
      });
    })
  });

  app.post("/api/answers", function(req, res){
    db.Answer.create(req.body).then(function(data) {
      res.json(data)
    })
  })

  app.get("/api/answers", function(req, res) {
    db.Answer.findAll({}).then(function(dataAnswers) {
      res.json(dataAnswers);
    });
  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
