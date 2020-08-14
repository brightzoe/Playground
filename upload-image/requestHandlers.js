let qs = require("querystring");
let fs = require("fs");
let formidable = require("formidable");
let util = require("util");
function start(res) {
  console.log("Request handler 'start' was called.");
  var body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>";
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(body);
  res.end();
}
function upload(res, req) {
  console.log("Request handler 'upload' was called.");

  let form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(req, (error, fields, files) => {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "../store-video-css/test.jpg");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("received image:<br/>");
    res.write("<img src='/show'/>");
    res.end();
  });
}
function show(res) {
  console.log("request hander 'show' was called.");
  fs.readFile("../store-video-css/递归小鲤鱼.jpg", "binary", (error, file) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write(error + "\n");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "image/png" });
      res.write(file, "binary");
      res.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;
