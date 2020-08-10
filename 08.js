var util = require("util");
var _ = require("lodash");
var fs = require('fs')
var fsp = require("fs").promises;
var argument = process.argv[2];
var figlet = require("figlet");
figlet.text('hello', (error, result) => {
  console.log(result);
});
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
  var text = await figletTextPromise("hello promise");
  console.log(text);
}

fs.readFile('08.js', 'utf8', (error, result) => {
  if (error) {
    console.log(error)
  } else {
    console.log(result)
  }
})
function readFileP(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

fs.writeFile('08.js', 'hello', error => {//一次性写入
  if (error) {
    console.log(error)
  } else {
    console.log('ok')
  }
})
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



