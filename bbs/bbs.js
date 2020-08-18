const express = require("express");
const open = require("open");
const cookieParser = require("cookie-parser");
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
var nextUserId = 3;
var nextPostId = 3;
let nextCommentId = 3;
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
    replyTo: "1",
    ownerId: "2",
    content: "test",
    createdAt: Date.now(),
  },
  {
    id: "2",
    replyTo: "1",
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("qazwsxedcrfvtgbrightzoe")); //cookie签名

app.use((req, res, next) => {
  if (req.signedCookies.user) {
    //查询并存储签名cookie的用户信息，在请求首页时使用
    req.user = users.find((user) => user.name === req.signedCookies.user);
  }
  next();
});

//打开首页
app.get("/", (req, res, next) => {
  let postInfo = posts.map((post) => {
    return {
      ...post,
      user: users.find((user) => post.ownerId === user.id),
    };
  });
  postInfo.map((post) => {
    post.commentCount = comments.filter((it) => it.replyTo === post.id).length;
  });
  res.render("index.pug", {
    posts: postInfo,
    user: req.user, //cookie存在req里的登陆的用户信息
  }); //渲染首页,后面是数据
});
//帖子详情
app.get("/post/:id", (req, res, next) => {
  let post = posts.find((it) => it.id === req.params.id); //找到符合条件的元素
  if (post) {
    post.user = users.find((user) => post.ownerId === user.id);
    let postData = {
      post: post,
      comments: comments //筛选出这个帖子下的回复
        .filter((it) => it.replyTo === post.id)
        .map((it) => {
          return {
            ...it,
            user: users.find((user) => user.id === it.ownerId),
          };
        }),
    };
    res.render("post.pug", postData);
  } else {
    res.status(404);
    res.render("404.pug");
  }
});

app
  .route("/post")
  //发帖页面
  .get((req, res, next) => {
    res.render("add-post.pug");
  })
  //提交新帖
  .post((req, res, next) => {
    if (!req.user) {
      res.end("未登录用户，无法发帖");
      return;
    }

    console.log("收到发帖请求", req.body);
    let post = req.body;
    post.createdAt = Date.now();
    post.ownerId = req.user.id; //登录用户的id
    post.id = (nextPostId++).toString();
    post.commentCount = 0;
    posts.push(post);
    res.redirect("/post/" + post.id);
  });

app.post("/comment", (req, res, next) => {
  console.log("收到评论请求", req.body, req.user);
  if (req.user) {
    let comment = {
      id: (nextCommentId++).toString(),
      replyTo: req.body.replyTo,
      ownerId: req.user.id,
      content: req.body.comment,
      createdAt: Date.now(),
    };
    comments.push(comment);
    res.redirect("/post/" + req.body.replyTo);
  } else {
    //FIXME 如何既有显示，又能重定向到login,不添加新页面能否做到
     res.send("<p>未登录，<a href='/login'>点击去登录。</a></p>");
  }
});
app
  .route("/register")
  .get((req, res, next) => {
    res.render("register.pug");
  })
  .post((req, res, next) => {
    console.log("收到注册信息", req.body);
    //BUG 验证req.body三个字段的完整。
    //user.name,email不能重复
    //实时验证，用下面conflict-check的接口
    //TODO实时验证是否被占用的细节，register里的tip
    let user = req.body;
    if (users.find((it) => it.name === user.name)) {
      res.render("register-result.pug", {
        result: "用户名已被占用！",
        code: -1,
      });
      return;
    }
    if (users.find((it) => it.email === user.email)) {
      res.render("register-result.pug", {
        result: "邮箱已被占用！",
        code: -1,
      });
      return;
    }
    user.id = (nextUserId++).toString();
    user.avatar = "/upload/avatars/462345.png";
    users.push(user);
    // res.redirect("/login");
    res.render("register-result.pug", {
      result: "账号注册成功！",
      code: 0,
    });
  });
//username-conflict-check?name=xiao
//检测用户名冲突的接口
app.get("/username-conflict-check", (req, res, next) => {
  if (users.some((user) => user.name === req.query.name)) {
    res.json({
      code: -1,
      msg: "用户名已被占用",
    });
  } else {
    res.json({
      code: 0,
      msg: "用户名可以使用",
    });
  }
});

app
  .route("/login")
  .get((req, res, next) => {
    //打开登陆界面
    res.render("login.pug");
  })
  .post((req, res, next) => {
    //输入信息，请求登录
    console.log("收到登录请求", req.body);
    let loginInfo = req.body;
    let user = users.find(
      (user) =>
        user.name === loginInfo.name && user.password === loginInfo.password
    );
    //Ajax
    if (user) {
      //登陆成功
      res.cookie("user", user.name, {
        maxAge: 86400000, //一天内有效
        signed: true, //签名
      });
      res.json({
        code: 0,
        msg: "登陆成功！",
      });
    } else {
      //登陆失败
      res.json({
        code: 1,
        msg: "登陆失败！",
      });
    }
    res.end("ok");
  });

app.get("/logout", (req, res, next) => {
  //退出，清除cookie
  res.clearCookie("user");
  res.redirect("/");
});
app.listen(port, "127.0.0.1", () => {
  console.log("listening on port", port);
  // open("http://localhost:" + port);
});
