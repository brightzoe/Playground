let http = require("http");
const express = require("express");
const { fstat, createReadStream } = require("fs");
const server = express();
server.use((req, res, next) => {
  //middle ware 中间件
  //可以添加多个中间件函数
  console.log(req.method, req.url);
  next();
});
server.use((req, res, next) => {
  if (req.method == "GET" || req.method == "POST") {
    next();
  } else {
    res.end("method not allowed");
  }
});

server.use((req, res, next) => {
  let body = "";
  req.on("data", (data) => {
    body += data.toString();
  });
  req.on("end", () => {
    req.body = body;
    next();
  });
});
server.use((req, res, next) => {
  res.json({ a: 1, b: 2 }); //已经write和end了，不要多余end
});

server.use(express.json());

server.listen(3000, "127.0.0.1", () => {
  console.log("listening on port", 3000);
});
