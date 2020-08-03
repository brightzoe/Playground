// var figlet = require("figlet");
// figlet.text("Vegetable", (error, data) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(data);
//   }
// });

var grable = require("./grable");
var argument = process.argv[2];
console.log(grable(argument));
