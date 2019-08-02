$(document).ready(function() {
  var $country1 = $("#country1").data("id")
  var $country2 = $("#country2").data("id")
  var $answer1 = $("#answer1");
  var $answer2 = $("#answer2");
  var $answer3 = $("#answer3");
  var $comment = $("#comment");
  var $student_name = $("#student_name")
  var $submitBtnAns = $("#submitAns");
  var QuestionId = $(".currentquestion").data("id")
  var table1 = $("#countryOneTable").data("id");
  var table2 = $("#countryTwoTable").data("id");
  
  function formatTable1() {
    var table1characters;
    for(var i = 0 ; i < table1.length ; i++) {
      table1characters += table1[i];
      if(table1[i] === ";") {
        console.log(table1characters);
        $("#countryOneTableBody").append("<tr><td>" + table1characters + "</td></tr>");
        table1characters = "";
      }
    }
  }
  function formatTable2() {
    var table2characters;
    for(var i = 0 ; i < table2.length ; i++) {
      table2characters += table2[i];
      if(table2[i] === ";") {
        console.log(table2characters);
        $("#countryTwoTableBody").append("<tr><td>" + table2characters + "</td></tr>");
        table2characters = "";
      }
    }
  }
  formatTable1();
  formatTable2();

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

  function showcomments(){
    $("#comments").removeAttr("style")
  }

  var handleFormSubmit = function(event) {
    event.preventDefault();
    
    var answer = {
      QuestionId: QuestionId,    
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
    showcomments()
  };

  $submitBtnAns.on("click", handleFormSubmit);

})