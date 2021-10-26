// // lib.js
// let counter = 3;
// function incCounter() {
//   counter++;
//   console.log('lib',counter)
// }
// module.exports = {
//   counter,
//   incCounter,
// };

// lib.js
let obj = { a: 1 };
function changeA() {
	obj.a = 2;
  console.log('lib',JSON.stringify(obj))
}
module.exports = {
	obj,
	changeA,
};
