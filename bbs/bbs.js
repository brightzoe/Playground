const express = require("express");
//const open = require("open");
const cookieParser = require("cookie-parser");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3000;

let db;

sqlite
  .open({
    filename: __dirname + "/bbs.db",
    driver: sqlite3.Database,
  })
  .then((value) => {
    db = value;
  });

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

app.use(async (req, res, next) => {
  if (req.signedCookies.user) {
    //查询并存储签名cookie的用户信息，在请求有登录信息的页面时使用
    req.user = await db.get(
      "select rowid as id, * from users where name =?",
      req.signedCookies.user
    );
  }
  next();
});

//打开首页
app.get("/", async (req, res, next) => {
  let posts = await db.all(
    "select posts.rowid as id,title,posts.content,posts.createdAt,posts.userId,categoryId,name ,avatar,count(*) as commentCount from posts join comments join users on posts.userId=users.rowid where posts.rowid=comments.postId GROUP BY postId"
  ); //三表连接，鸭梨山大

  res.render("index.pug", {
    posts: posts,
    user: req.user, //cookie存在req里的登陆的用户信息
  }); //渲染首页,后面是数据
});
//帖子详情
app.get("/post/:id", async (req, res, next) => {
  let postId = req.params.id;
  let post = await db.get(
    "select posts.rowid as id,title,content,createdAt,userId,name,avatar from posts join users on posts.userId= users.rowid where posts.rowid=?",
    postId
  );

  //找到符合条件的元素
  if (post) {
    let comments = await db.all(
      "select * from comments join users on comments.userId=users.rowid  where postId = ? order by createdAt desc",
      postId
    );
    let postData = {
      post: post,
      comments: comments,
      user: req.user,
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
    res.render("add-post.pug", {
      user: req.user,
    });
  })
  //提交新帖
  .post(async (req, res, next) => {
    if (!req.user) {
      res.end("未登录用户，无法发帖");
      return;
    }

    console.log("收到发帖请求", req.body);
    let post = req.body;
    await db.run("insert into posts values(?,?,?,?,?)", [
      post.title,
      post.content,
      new Date().toISOString(),
      req.user.id,
      1,
    ]);
    let postId = await db.get(
      "select rowid as id,* from posts order by rowid desc limit 1"
    );
    res.redirect("/post/" + postId.id);
  });

app.post("/comment", async (req, res, next) => {
  console.log("收到评论请求", req.body, req.user);
  let comment = req.body;
  if (req.user) {
    await db.run("insert into comments values (?,?,?,?)", [
      comment.postId,
      req.user.id,
      comment.comment,
      new Date().toISOString(),
    ]);

    res.redirect("/post/" + comment.postId);
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
  .post(async (req, res, next) => {
    console.log("收到注册信息", req.body);
    //实时验证是否可用，用下面conflict-check的接口
    //TODO实时验证是否被占用的细节，register里的tip
    let user = req.body;

    try {
      await db.run("INSERT INTO users VALUES(?,?,?,?)", [
        user.name,
        user.password,
        user.email,
        user.name + ".png",
      ]);
      res.render("register-result.pug", {
        result: "账号注册成功！",
        code: 0,
      });
    } catch (error) {
      res.render("register-result.pug", {
        result: "账号注册失败！" + error.toString(),
        code: 0,
      });
    }
  });
//username-conflict-check?name=xiao
//检测用户名冲突的接口
app.get("/username-conflict-check", async (req, res, next) => {
  let user = await db.get("select * from users where name = ?", req.query.name);
  if (user) {
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
  .route("/login") //存储referer,登陆后返回之前浏览的页面
  .get((req, res, next) => {
    //打开登陆界面

    res.render("login.pug", {
      previousUrl: req.get("referer"),
    });
  })
  .post(async (req, res, next) => {
    //输入信息，请求登录
    console.log("收到登录请求", req.body);
    let loginInfo = req.body;
    let user = await db.get(
      "select * from users where name =? and password =?",
      [loginInfo.name, loginInfo.password]
    );

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
app.get("/user/:id", async (req, res, next) => {
  //用户详情页
  let userInfo = await db.get(
    "select * from users where rowid=?",
    req.params.id
  );
  if (userInfo) {
    let userPostsPromise = db.all(
      "select * from posts where userId = ? order by createdAt desc",
      req.params.id
    );
    //用户发过的贴子和评论
    let userCommentsPromise = db.all(
      "select comments.postId,posts.title as postTitle,comments.content,comments.createdAt from comments join posts on comments.postId=posts.rowid where comments.userId = ? order by comments.createdAt desc",
      req.params.id
    );
    let [userPosts, userComments] = await Promise.all([
      userPostsPromise,
      userCommentsPromise,
    ]);

    res.render("user-profile.pug", {
      user: req.user, //登录的用户
      userInfo, //查看的用户
      userPosts,
      userComments,
    });
  } else {
    res.render("404.pug"); //查无此人
  }
});
app.listen(port, "127.0.0.1", () => {
  console.log("listening on port", port);
  // open("http://localhost:" + port);
});
