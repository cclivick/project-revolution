$(document).ready(function() {

  var $country1 = $("#country1");
  var $country2 = $("#country2");
  var $question1 = $("#question1");
  var $question2 = $("#question2");
  var $question3 = $("#question3");
  var $submitBtnQuest = $("#submitQuest");

  function saveQuestion (question) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/questions",
      data: JSON.stringify(question)
    })
  }

  var handleFormSubmit = function(event) {
    event.preventDefault();
    
    var question = {    
      country1: $country1.val().trim(),
      country2: $country2.val().trim(),
      question1: $question1.val().trim(),
      question2: $question2.val().trim(),
      question3: $question3.val().trim(),
      current: true
    };

    if (!(question.country1 && question.country2 && question.question1 && question.question2 && question.question3)) {
      alert("You must fill all the fields!");
      return;
    }

    saveQuestion(question)

    $country1.val("");
    $country2.val("");
    $question1.val("");
    $question2.val("");
    $question3.val("");
  };

  $submitBtnQuest.on("click", handleFormSubmit)

})