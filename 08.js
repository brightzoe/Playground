let util = require("util");
let path = require("path");
let _ = require("lodash");
let fs = require("fs");
let fsp = require("fs").promises;
let argument = process.argv[2];
let figlet = require("figlet");
const { generateKeyPair } = require("crypto");

// figlet.text("hello", (error, result) => {
//   console.log(result);
// });

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

// fs.readFile('08.js', 'utf8', (error, result) => {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log(result)
//   }
// })
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

// fs.writeFile('08.js', 'hello', error => {//一次性写入
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('ok')
//   }
// })
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
    let cb = args.pop(); //取出回调函数，是参数中的最后一个值
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

function getAllFile(path) {
  fs.readdir(path, (error, data) => {
    for (let subpath of data) {
      let statObj = fs.statSync(path + "/" + subpath);
      if (statObj.isDirectory()) {
        console.log("dir:" + subpath);
        getAllFile(path + "/" + subpath);
      } else {
        console.log("file:" + subpath);
      }
    }
  });
}

function listFiles(dirPath) {
  //递归返回dir文件夹中所有文件的完全路径
  //同步＋异步（promise，callback，async.await)
  let res = [];
  let fullPath = path.resolve(dirPath);
  let fileNames = fs.readdirSync(fullPath);
  for (let fileName of fileNames) {
    let statObj = fs.statSync(path.join(fullPath,fileName));
    if (statObj.isFile()) {
      res.push(fileName);
    } else if (statObj.isDirectory()) {
      res.push(...listFiles(path.resolve(fileName)));
    }
  }
  return res;
}
listFiles("d://note");
//tree，以缩进方式打开当前文件夹的目录树
