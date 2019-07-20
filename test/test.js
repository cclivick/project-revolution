require("dotenv").config();
var axios = require("axios");
var keys = require("../APIkeys.js");

console.log(keys);

// function firstCall(string) {
//   axios.get("http://api.wolframalpha.com/v2/query?input=" + string + "&format=image,plaintext&output=JSON&appid=" + keys) 
//     .then(function(response) {
//       console.log(response.data.queryresult.success);
//     });
// };

//firstCall("germany+vs+france");
