var db = require("../models");

var axios = require("axios");

module.exports = function(app) {
  app.get("/api/questions", function(req, res) {
    db.Question.findAll({
      include: [
        {
          model: db.Answer
        }
      ]
    }).then(function(dataQuestions) {
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
      //API calls part of the create function?
      }).then(function(result) {
        db.Question.create(req.body).then(function(data) {
          //Ajax request
          var country1 = req.body.country1;
          var keys = require("../APIkeys");
          axios
          .get(
            "http://api.wolframalpha.com/v2/query?input=" +
              country1 +
              "&format=image,plaintext&output=JSON&appid=" +
              keys
          )
          .then(function(response) {
            var apiResult = response.data.queryresult;
            var country1formatted;
            for (var i = 1; i < apiResult.pods.length - 1; i++) {
              if (i === 2 || i === 3) {
                continue;
              }
              var title = apiResult.pods[i].title;
              country1formatted +=
                title.toUpperCase() +
                  "\n" +
                  apiResult.pods[i].subpods[0].plaintext +
                  "\n;" +
                  "\n";
                  db.Question.update({
                    country1data: country1formatted
                  },
                  {
                    where: {
                      country1 : country1
                    }
                  })
            }
          }).then(function(data) {
            var country2 = req.body.country2;
            var keys = require("../APIkeys");
            axios
            .get(
              "http://api.wolframalpha.com/v2/query?input=" +
              country2 +
              "&format=image,plaintext&output=JSON&appid=" +
              keys
            )
            .then(function(response) {
              var apiResult = response.data.queryresult;
              var country2formatted;
              for (var i = 1; i < apiResult.pods.length - 1; i++) {
                if (i === 2 || i === 3) {
                  continue;
                }
                var title = apiResult.pods[i].title;
                country2formatted +=
                  title.toUpperCase() +
                    "\n" +
                    apiResult.pods[i].subpods[0].plaintext +
                    "\n;" +
                    "\n";
                    db.Question.update({
                      country2data: country2formatted
                    },
                    {
                      where: {
                        country2 : country2
                      }
                    }
                );
              }
            })
          })
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

  app.put("/api/answers/:id", function(req, res) {
    db.Answer.update({
      grade: req.body.grade
    },
    {
      where:{
        id: req.body.id
      }    
    }).then(function(data) {
          res.json(data);
    });
  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};

