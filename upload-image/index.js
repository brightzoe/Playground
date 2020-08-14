// var server = require("./server");
// var router = require("./router");
// var requestHandlers = require('./requestHandlers')//处理不同的请求，对请求做出响应
// var handle = {
// 	"/": requestHandlers.start,
// 	"/start": requestHandlers.start,
// 	"/upload": requestHandlers.upload,
// 	"/show":requestHandlers.show
// }
// server.start(router.route, handle);

//formidable官方例子
var formidable = require("formidable"),
  http = require("http"),
  util = require("util");
let fs = require("fs");
http
  .createServer(function (req, res) {
    if (req.url == "/upload" && req.method.toLowerCase() == "post") {
      // parse a file upload
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.write("received upload:\n\n");
        fs.renameSync(files.upload.path, "/store-video-css/test.jpg");
        res.end(files.upload.path);
      });
      return;
    }

    // show a file upload form
    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        "</form>"
    );
  })
  .listen(8888);
