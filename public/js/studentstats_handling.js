var $statList = $("#stat-list");


function getstats() {
    return $.ajax({
        url: "api/answers",
        type: "GET"
    });
}
function showstats(){
    getstats().then(function(data){
        var $stats = data.map (function(answer){

        })

    $statsList.empty();
    $statsList.append($stats);
    })
}


$("#getstats").on("click", showstats)