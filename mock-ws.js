const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3333 });
let data = [
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0108",
		名称: "108",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,
		code: "0108",
		key: "96fcb512c9714aee932a636d79d8c4ed",
		name: "108",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0107",
		名称: "107",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0107",
		key: "00e116b04d2b4d44a16881d7a4ba86e2",
		name: "107",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0106",
		名称: "106",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0106",
		key: "1ce8eb67c98640db8f19885fa36a3fe7",
		name: "106",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0105",
		名称: "105",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0105",
		key: "cb85c9aa41084b938ed47800361d96ca",
		name: "105",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0104",
		名称: "104",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0104",
		key: "7c0e273e76ea43f09aaff004286cdedc",
		name: "104",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0103",
		名称: "103",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0103",
		key: "41a5f19f472b4c7984c58db4531fe6cf",
		name: "103",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0102",
		名称: "102",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0102",
		key: "503e3e8233674f38ba81b9414ec49c3e",
		name: "102",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0101",
		名称: "101",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0101",
		key: "bb7c094d46b74140a664cd71b79cf45b",
		name: "101",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0100",
		名称: "100",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,

		code: "0100",
		key: "74bdbbba75da4b56a5bed7c33d5215f7",
		name: "100",
	},
	{
		2: 0,
		3: 1,
		66: 0,
		134: 0,
		222: 0,
		1122: 0,
		6633: 0,
		编码: "0099",
		名称: "99",
		gdff: 0,
		gfde: 0,
		fdqq: 0,
		qqff: 0,
		qqxx: 0,
		xx: 0,
		code: "0099",
		key: "a1cfc7169f74423d96cbb2e4051b1880",
		name: "99",
	},
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
