let util = require("util");
let url = require("url");
let path = require("path");
let http = require("http");
let _ = require("lodash");
let fs = require("fs");

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

function start(route, handle) {
  var server = http.createServer((req, res) => {
    //console.log(new URL("localhost:3000" + req.url));//怎么获得全部地址
    let pathname = url.parse(req.url).pathname; //获得请求的地址
    console.log("request for " + pathname + " received");
    route(handle, pathname, res,req);
  });
  server.listen(3000);
}
exports.start = start;
