var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers')//处理不同的请求，对请求做出响应
var handle = {
	"/": requestHandlers.start,
	"/start": requestHandlers.start,
	"/upload":requestHandlers.upload
}

server.start(router.route,handle);
