$(document).ready(function() {

  var $country1 = $("#country1").data("id")
  var $country2 = $("#country2").data("id")
  var $answer1 = $("#answer1");
  var $answer2 = $("#answer2");
  var $answer3 = $("#answer3");
  var $comment = $("#comment");
  var $student_name = $("#student_name")
  var $submitBtnAns = $("#submitAns");

  function saveAnswer (answer) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/answers",
      data: JSON.stringify(answer)
    })
  }

  var handleFormSubmit = function(event) {
    event.preventDefault();
    
    var answer = {   
      country1: $country1,
      country2: $country2,
      current: true,
      answer1: $answer1.val().trim(),
      answer2:  $answer2.val().trim(),
      answer3:  $answer3.val().trim(),
      comment: $comment.val().trim(),
      student_name: $student_name.val().trim()
    };

    if (!(answer.student_name && answer.answer1 && answer.answer2 && answer.answer3 && answer.comment)) {
      alert("You must fill all the fields!");
      return;
    }

    saveAnswer(answer)

    $student_name.val("");
    $answer1.val("");
    $answer2.val("");
    $answer3.val("");
    $comment.val("")
  };

  $submitBtnAns.on("click", handleFormSubmit)

})