let util = require("util");
let path = require("path");
let http = require("http");
let _ = require("lodash");
let fs = require("fs");
let fsp = require("fs").promises;
let argument = process.argv[2];
let figlet = require("figlet");
const { generateKeyPair } = require("crypto");

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
    let file = path.join(fullPath, fileName);
    let statObj = fs.statSync(file);
    if (statObj.isFile()) {
      res.push(fileName);
    } else if (statObj.isDirectory()) {
      res.push(...listFiles(path.resolve(file)));
    }
  }
  return res;
}
function listFilesCb(dirpath, cb) {
  //回调回调加回调
  let res = [];
  var fullDirPath = path.resolve(dirpath);
  fs.readdir(fullDirPath, (err, names) => {
    var count = 0;
    for (let name of names) {
      let fullName = path.join(fullDirPath, name);
      fs.stat(fullName, (err, stat) => {
        if (stat.isFile()) {
          res.push(fullName);
          count++;
          if (count == names.length) {
            cb(null, res);
          }
        } else if (stat.isDirectory()) {
          listFilesCb(fullName, (err, files) => {
            res.push(...files);
            count++;
            if (count == names.length) {
              cb(null, res);
            }
          });
        }
      });
    }
  });
}
// listFilesCb("笔记", (err, files) => {
//   console.log(files);
// });
function listFilesPromise(dirpath, cb) {
  let fullDirPath = path.resolve(dirpath);
  var fullNames;
  var res = [];
  fsp
    .readdir(fullDirPath)
    .then((names) => {
      fullNames = names.map((name) => path.join(fullDirPath, name));
      return fullNames.map(fsp.stat);
    })
    .then((infos) => {
      for (var i = 0; i < infos.length; i++) {
        var info = infos[i];
        var fullName = fullNames[i];
        if (info.isFile()) {
          res.push(fullName);
        } else if (info.isDirectory()) {
          listFilesPromise(fullName).then((files) => {
            res.push(...files);
          });
        }
      }
    });
}
//tree，以缩进方式打开当前文件夹的目录树
