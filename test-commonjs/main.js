// // main.js
// let mod = require('./lib');
//
// console.log(mod.counter);  // 3
// mod.incCounter();
// console.log(mod.counter); // 3

//  main.js
const mod = require("./lib.js");
console.log(JSON.stringify(mod.obj)); // {"a":1}
mod.changeA();
console.log(JSON.stringify(mod.obj)); // {"a":2}
