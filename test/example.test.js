var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

chai.use(chaiHttp);

var request;

describe("GET /api/answers", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
      request = chai.request(server);
      return db.sequelize.sync({ force: true });
    });
  
    it("should find all examples", function(done) {
      // Add some examples to the db to test with
      db.Answer.bulkCreate([
        { id: 0, country1: "First Example", country2: "First Description", student_name: "Jimmy", answer1: "Hello", answer2: "Hi", answer3: "Hey", comment: "Yo", current: true },
        { id: 1, country1: "Second Example", country2: "Second Description", student_name: "Jimmy", answer1: "Hello", answer2: "Hi", answer3: "Hey", comment: "Yo", current: true }
      ]).then(function() {
        // Request the route that returns all examples
        request.get("/api/answers").end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(2);
  
          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({ text: "First Example", description: "First Description" });
  
          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({ text: "Second Example", description: "Second Description" });
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
    });
  });