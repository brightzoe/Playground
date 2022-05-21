const p = new Promise((resolve, reject) => {
  // resolve("成功的结果");
  reject("失败的结果");
});
console.log("p", p);
//------------------------ then
console.log(Promise.prototype.then);

const t = p.then(
  (value) => {
    console.log(value); // p 的状态为 fulfilled 时执行。value 是上面resolve 的参数
  },
  (error) => {
    console.log(error); // p 的状态为 rejected 时执行
    return error;
  }
);

console.log("t", t);
//------------------------ then的参数哪里来
new Promise((resolve, reject) => {
  resolve("给then 的参数");
})
  .then(
    (value) => {
      console.log(value);
      // return '123'; //改变这个 promise 的状态，给下一个promise 的参数
      throw error;
    },
    (error) => {
      console.log(error);
    }
  )
  .then(
    (value) => {
      console.log(value);
    },
    (error) => {
      console.log(error);
    }
  );
//-------------------------- catch　里面接什么
console.log(Promise.prototype.catch);

new Promise((res, rej) => {
  rej("rej");
})
  .catch((error) => {
    console.log(error);
    return error;
  })
  .then((value) => {
    console.log(value);
  });

new Promise((res, rej) => {
  console.log(a);
})
  .catch((err) => {
    console.log(err);
    console.log(e);
  })
  .catch((err) => {
    console.log(err);
  });

//-----------链式穿透
new Promise((resolve, reject) => {
  resolve();
})
  .then((value) => {
    //成功时被执行
    console.log(value);
  })
  .catch((error) => {
    //失败时被执行
    console.log(error);
  });

//-------------------------------- 实际使用
new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "./data.json");
  xhr.send("data");
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status === 200) {
      resolve(xhr.responseText);
    } else {
      reject(xhr.statusText);
    }
  };
})
  .then((data) => {
    const { id } = JSON.parse(data);
    console.log(id);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("get", "./data.json");
      xhr.send(id);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      };
    });
  })
  .then((data) => {
    console.log(data);
  });

//----------------------封装函数
function request(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(data);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
  });
}

request("GET", "./data.json")
  .then((val) => {
    return request("GET", `./data.json`, val);
  })
  .then((val) => {
    return request("GET", `./data.json`, val);
  })
  .then((val) => {
    console.log(val);
  });
