function start() {
	console.log("Request handler 'start' was called.");
	function sleep(interval) {
		var startTime = new Date().getTime()
		while(new Date().getTime()<startTime+interval){}
	}
	sleep(10000)
	return "hello Start"
}
function upload() {
	console.log("Request handler 'upload' was called.");
	return "hello upload"
}
exports.start = start;
exports.upload = upload;
