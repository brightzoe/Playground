var grable = require("./grable");
var util = require("util");
var _ = require("lodash");
var fsp = require("fs").promises;
var argument = process.argv[2];
console.log(grable(argument));
function figletTextPromise(text) {
  return new Promise((resolve, reject) => {
    figlet.text(text, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
async function foo() {
  await figletTextPromise(text);
}

function readFileP(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...arguments, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function writeFileP() {
  return new Promise((resolve, reject) => {
    fs.writeFile(...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//将基于callback的函数转换为返回promise的函数
function transformFuncCallbackToPromise(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      f(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}
//将基于promise的函数转换为一个基于回调的函数
function callbackify(f) {
  return function (...args) {
    var cb = args.pop(); //取出回调函数，是参数中的最后一个值
    f(...args).then(
      (result) => {
        cb(null, result);
      },
      (reason) => {
        cb(reason);
      }
    );
  };
}
