var net = require("net");
var server = net.createServer(); //创建TCP服务器对象
var port = 80;
var msgs = [
  //示例数据
  {
    name: "Lily",
    content: "hello",
    timestamp: 1594626663191,
  },
  {
    name: "Jim",
    content: "world",
    timestamp: 1594626063191,
  },
];
server.on("connection", (socket) => {
  socket.on("data", (data) => {
    //解析消息
    var d = data.toString(); //直接拿到的数据要转成字符串使用
    var [headers, body] = d.split("\r\n\r\n");
    var [firstLine, ...lines] = headers.split("\r\n");
    var [method, path] = firstLine.split(" ");

    if (method === "POST") {
      var msg = parseQueryString(body);
      msg.timestamp = Date.now();
      msgs.push(msg); //存储了这次信息然后结束
      //FIXME:这次不用get跳转了。出现在预览里？只有一条请求，不是两条了
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("\r\n");
      socket.end(JSON.stringify(msgs));//end加参数，把最新的所有消息响应出来，再次打开还是有记录

      // socket.write("HTTP/1.1 302 Moved\r\n"); //用GET跳转到首页
      // socket.write("Location:/\r\n");
      // socket.write("\r\n");
      // socket.end();
      return; //结束了on data
    }
    socket.write("HTTP/1.1 200 OK\r\n");
    socket.write("Content-Type:text/html;charset=UTF-8\r\n"); //charset防止乱码
    socket.write("\r\n");
    socket.write(`
		<form method="GET" action="">
		Name: <input type="text" name="name"><br>
		Message: <textarea name="content"></textarea><br>
		<button type = "submit">Submit</button>
		</form>
		
		<script>
			var btn = document.querySelector("button")
			var nameInput = document.querySelector('[name="name"]')
			var contentInput = document.querySelector('[name="content"]')
			btn.addEventListener('click',e=>{
				e.preventDefault()//阻止默认提交
				var xhr = new XMLHttpRequest()//点击button创建一个新的xhr请求
				xhr.open('post','/')//代表当前页
				xhr.send('name='+nameInput.value+'&content='+contentInput.value)//请求体

				xhr.onload = function(e){
					if(xhr.status == 200){
						var div =document.createElement('div')
						div.innerHTML ='<h3>'+nameInput.value+'<small>'+ new Date()+'</small></h3><p>'+contentInput.value+'</p>'
						document.body.insertBefore(div,document.querySelector("hr").nextSibling)
						nameInput.value=''
						contentInput.value=''
					}
				}
			})
		</script>
		<hr>
		${Array.from(msgs)
      .reverse()
      .map(
        (msg) => `
       		<div>
						<h3>${msg.name.replace(/</g, "&lt;")}<small>${new Date(
          msg.timestamp
        ).toString()}</small></h3>
						<p>${msg.content.replace(/</g, "&lt;")}</p>
					</div>
			`
      )
      .join("")}
		`); //防止写入源代码，XSS攻击

    socket.end();
  });
  socket.on("error", () => {});
});

server.listen(port, () => {
  //服务套接字监听port
  console.log("listening on port", port); //监听成功后触发的事件
});

function parseQueryString(str) {
  //name=aa&content=bb 转成对象
  return str.split("&").reduce((result, pair) => {
    var [key, val] = pair.split("=");
    result[key] = decodeURIComponent(val);
    return result;
  }, {});
}
