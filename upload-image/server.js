let util = require("util");
let url = require("url");
let path = require("path");
let http = require("http");
let _ = require("lodash");
let fs = require("fs");



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
