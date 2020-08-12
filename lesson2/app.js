// 引入依赖
var express = require("express");
var utility = require("utility");

// 建立 express 实例
var app = express();
app.get("/", (req, res) => {
  //get的数据，从req.query中的q参数
  //post的数据，从req.body里面。不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理。
  var q = req.query.q;
  // 调用 utility.md5 方法，得到 md5 之后的值
  var md5Value = utility.md5(q);
  res.send(md5Value);
});
app.listen(3000, () => {
  console.log("app is listening at port 3000");
});
