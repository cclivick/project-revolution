require("dotenv").config();

var axios = require("axios");
var keys = require("./APIkeys.js");

function firstCall(string) {
  axios
    .get(
      "http://api.wolframalpha.com/v2/query?input=" +
        string +
        "&format=image,plaintext&output=JSON&appid=" +
        keys
    )
    .then(function(response) {
      var apiResult = response.data.queryresult;
      for (var i = 1; i < apiResult.pods.length - 1; i++) {
        if (i === 2 || i === 3) {
          continue;
        }
        var title = apiResult.pods[i].title;
        console.log(
          title.toUpperCase() +
            "\n" +
            apiResult.pods[i].subpods[0].plaintext +
            "\n------------------------------------" +
            "\n"
        );
      }
    });
}

firstCall("france");
