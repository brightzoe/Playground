const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3333 });
let data = [
	{
		name: "灯泡",
		key: "qqqq",
		attr: { 亮度: 20, 温度: 30 },
	},
	{ name: "空调", key: "kkkk", attr: { 湿度: 40, 温度: 14 } },
];

server.on("connection", function connection(socket) {
	console.log("connected");
	socket.on("message", function incoming(message) {
		console.log("received: %s", message);
	});
	for (let obj of data) {
		setInterval(() => {
			obj.xx++;
		}, 1000 + 1000 * Math.random());
	}
	setInterval(() => {
		socket.send(JSON.stringify(data));
	}, 2000);
});

//client componentDidMount
// let ws = new WebSocket(`ws://localhost:3333`);
// ws.onmessage = (e) => {
// 	this.setState({ dataSource: JSON.parse(e.data) });
// 	console.log(e);
// 	ws.send(Math.random());
// };
// setTimeout(() => {
// 	ws.close();
// }, 60000);
