const express = require("express");
const open = require("open");
const app = express();
const port = 3000;
var users = [
  {
    id: "1",
    name: "xiaomiao",
    password: "miao",
    email: "gas@qq.com",
    avatar: "/upload/avatars/52.png",
  },
  {
    id: "2",
    name: "danny",
    password: "xiaomiao",
    email: "fasdf@qq.com",
    avatar: "/upload/avatars/sfa.png",
  },
];
var nextPostId = 3
var posts = [
  {
    id: "1",
    title: "weather",
    content: "今天好热呀",
    createdAt: Date.now(),
    ownerId: "1",
    commentCount: 0,
  },

  {
    id: "2",
    title: "pretty boy",
    content: "宋威龙绝世美颜",
    createdAt: Date.now(),
    ownerId: "2",
    commentCount: 0,
  },
];
var comments = [
  {
    id: "1",
    replayTo: "1",
    ownerId: "2",
    content: "test",
    createdAt: Date.now(),
  },
  {
    id: "2",
    replayTo: "1",
    ownerId: "1",
    content: "test 再试一下",
    createdAt: Date.now(),
  },
];

app.locals.pretty = true;
app.set("views", __dirname + "/views");

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(__dirname + "/static")); //文件资源服务器
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res, next) => {
  let postInfo = posts.map((post) => {
    return {
      ...post,
      user: users.find((user) => post.ownerId === user.id),
    };
  });
  postInfo.map((post) => {
    post.commentCount = comments.filter((it) => it.replayTo === post.id).length;
  });
  res.render("index.pug", {
    posts: postInfo,
  }); //渲染首页,后面是数据
});

app.get("/post/:id", (req, res, next) => {
  let post = posts.find((it) => it.id === req.params.id); //找到符合条件的元素
  if (post) {
    post.user = users.find((user) => post.ownerId === user.id);
    res.render("post.pug", {
      post: post,
      comments: comments //筛选出这个帖子下的回复
        .filter((it) => it.replayTo === post.id)
        .map((it) => {
          return {
            ...it,
            user: users.find((user) => user.id === it.ownerId),
          };
        }),
    });
  } else {
    res.status(404);
    res.render("404.pug");
  }
});

app
  .route("/post")
  .get((req, res, next) => {
    res.render("add-post.pug");
  })
  .post((req, res, next) => {
    console.log("收到发帖请求", req.body);
    let post = req.body
    post.createdAt = Date.now()
    post.ownerId = '1'
    post.id = (nextPostId++).toString()
    post.commentCount = 0
    posts.push(post)
    res.redirect('/post/'+post.id)
    
  });

app.listen(port, "127.0.0.1", () => {
  console.log("listening on port", port);
  // open("http://localhost:" + port);
});


