//实现 promise 并发控制
function poolLimit(limit, urls, callback) {
  //先并发limit 个请求，当有请求回来时，发送一个新的请求
  let index = limit; //通过闭包维护添加请求的index
  for (let i = 0; i < index; i++) {
    addRequest(i);
  }

  // 添加第几个请求，请求完成后发起新的一个请求
  function addRequest(i) {
    console.log("添加任务", i);
    request(urls[i]).then((res) => {
      callback(res);
      if (index < urls.length - 1) {
        index++;
        addRequest(index); //有完成了的，从之前添加到的索引 index 开始取新的 url 发起请求
      }
    });
  }

  //请求函数
  function request(url) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(`任务${url} 完成`);
      }, Math.random() * 2000);
    });
  }
}

const urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
poolLimit(3, urls, (data) => console.log(data));

//---------------------
// 使用limit 监听
function pool2(urls, limit) {
  let pool = []; //并发池
  let index = limit; //最大并发量

  //先循环把并发池塞满
  while (pool.length < index) {
    let url = urls.shift();
    addTask(url);
  }
  //利用Promise.race方法来获得并发池中某任务完成的信号
  let race = Promise.race(pool);
  run(race);

  //每当并发池跑完一个任务，就再塞入一个任务
  function run(race) {
    race.then((res) => {
      let url = urls.shift();
      if (url !== undefined) {
        addTask(url);
        console.log("pool", JSON.stringify(pool));
        run(Promise.race(pool));
      }
    });
  }
  //添加任务
  function addTask(url) {
    let task = request(url);
    pool.push(task);
    task.then((res) => {
      //请求结束后将该Promise任务从并发池中移除
      pool.splice(pool.indexOf(task), 1);
      console.log(`${url} 结束，当前并发数：${pool.length}`);
    });
  }

  function request(url) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`任务${url}完成`);
      }, 1000);
    });
  }
}
pool2(urls,3)

//---------------------
function getUrlByPromise(urls, limit) {
  limitLoad()
    .then((res) => {
      console.log("资源全部加载成功", res);
    })
    .catch((rej) => {
      console.log("资源加载失败", rej);
    });

  /**
   * 一个执行异步逻辑的promise函数，返回成功的异步id，或者失败的id
   */
  function request(url, idx) {
    return new Promise(async (resolve, reject) => {
      console.log(`发起第${idx}个请求`);
      const res = await fetch(url);
      if (!res) {
        return reject();
      }
      return resolve();
    });
  }

  function limitLoad() {
    // 限制请求数量的数组，idx是第几个位置，用于验证是第几个位置的接口请求成功，需要更换接口
    const promises = urls.slice(0, limit).map((t, idx) => {
      // 这里返回结束的idx，是限制数组的下标
      return request(t, idx).then(() => idx);
    });
    // 这里的reduce返回一个Promise.resolve()的promise，是包含了里面所有的fetch请求回调注册完成的
    return (
      urls
        .reduce((acc, curr, index) => {
          if (index < maxLoad) {
            return acc;
          }
          return (
            acc
              // 这里的对未来的请求的注册，先给每一个item注册这样的函数
              // 当回调被执行的时候，就是某个位置的请求完成，并且返回位置的下标
              .then(() => Promise.race(promises))
              .catch((err) => console.log(err))
              .then((idx) => {
                // 第几个位置的请求结束，就重新放入一个请求，这个请求是当前的下标，并且返回当前的位置
                console.log(`第${idx}个位置的请求结束，将第${index}个接口放入,共${urls.length}个请求`);
                promises[idx] = request(curr, index).then(() => idx);
              })
          );
        }, Promise.resolve())
        // promise.all控制并发数
        .then(() => Promise.all(promises))
    );
  }
}
