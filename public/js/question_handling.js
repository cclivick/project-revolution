$(document).ready(function() {

  var $country1 = $("#country1");
  var $country2 = $("#country2");
  var $question1 = $("#question1");
  var $question2 = $("#question2");
  var $question3 = $("#question3");
  var $submitBtnQuest = $("#submitQuest");
  var $viewarchive = $("#viewarchive")
  var archive = []

  function saveQuestion (question) {
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/questions",
      data: JSON.stringify(question)
    }).then(
      function() {
        location.reload()
      }
    )
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
      $(function(){
        $("#alert1" ).dialog();
      });
      return;
    }
    else{
      $.ajax("/api/answers", {
        type: "GET"
      }).then(function(res){
        for(var i=0; i<res.length; i++){
          if(res[i].current){
            if(res[i].grade==null){
              $(function(){
                $("#alert2" ).dialog();
              });
              return
            }
          }
        }
        saveQuestion(question)
        $country1.val("");
        $country2.val("");
        $question1.val("");
        $question2.val("");
        $question3.val("");
      })
    }
  };

  function viewarchive(){
    $("#archivebuttons").empty()
    $.ajax("/api/questions", {
      type: "GET"
    }).then(function(res){
      archive=res
      for(var i = 0; i<archive.length; i++){
        if(!archive[i].current){
          var a = $("<button>")
          a.addClass("archeachbutton button secondary")
          a.attr("id", archive[i].id)
          a.text(archive[i].country1 + " and " + archive[i].country2)
          $("#archivebuttons").append(a)
        }
      }
    })
  }

  function vieweacharchive(){
    $("#archive").empty()
    var id=$(this).attr("id")
    for(var i = 0; i<archive.length; i++){
      if(id==archive[i].id){
        var b = $("<h2>")
        b.html("Country #1: " + archive[i].country1 + " Country #2: " + archive[i].country2)
        $("#archive").append(b)
        for (var j=0; j<archive[i].Answers.length;j++){
          var c = $("<p>")
          c.text("Student: "+ archive[i].Answers[j].student_name + "; Answer1: "+ archive[i].Answers[j].answer1 + "; Answer2: "+ archive[i].Answers[j].answer2 + "; Answer3: "+ archive[i].Answers[j].answer3 + "; Comment: " + archive[i].Answers[j].comment + "; Grade: " + archive[i].Answers[j].grade)
          $("#archive").append(c)
        }
      }
    }
  }

  $submitBtnQuest.on("click", handleFormSubmit)
  $viewarchive.on("click", viewarchive)
  $(document).on("click", ".archeachbutton", vieweacharchive)
  $(document).on("click", ".grade", function () {
    event.preventDefault()
    var thisGrade = $(this).val()
    var id = $(this).data("id")
    $.ajax("/api/answers/" + id, {
      type: "PUT",
      data: {
        id: id,
        grade: thisGrade
      }
    }).then(
      function() {
        location.reload()
      }
    )
  })
})