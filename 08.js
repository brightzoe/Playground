//@ts-nocheck

//TODO 快速排序
function qSort(ary, start = 0, end = ary.length - 1) {
  var pivotIndex = Math.floor((end - start + 1) * Math.random()) + start;
  var pivot = ary[pivotIndex];
  swap(ary, pivotIndex, end);
  var i = start - 1;
  for (var j = start; j < end; j++) {
    if (ary[j] < pivot) {
      i++;
      swap(ary, i, j);
    }
  }
}
function swap(ary, i, j) {
  if (i !== j) {
    var temp = ary[i];
    ary[i] = ary[j];
    ary[j] = temp;
  }
}

let field = document.getElementById("field");
let ball = document.getElementById("ball"); //40*40px

field.addEventListener("click", (e) => {
  if (e.clientX && e.clientY) {
    //鼠标的点击范围包括border
    let left = e.clientX - field.offsetLeft - 10 - ball.offsetWidth / 2;
    //鼠标x-场地X-场地border-ball的一半
    let top = e.clientY - field.offsetTop - 10 - ball.offsetHeight / 2;
    left = left < 0 ? 0 : left;
    left =
      left > field.clientWidth - ball.clientWidth
        ? field.clientWidth - 40
        : left;
    top = top < 0 ? 0 : top;
    top =
      top > field.clientHeight - ball.clientHeight
        ? field.clientHeight - 40
        : top;
    //处理好边界，不能盖过border
    ball.style.left = left + "px";
    ball.style.top = top + "px";
  } else {
    return;
  }
});

let menu = document.querySelector(".menu");
let title = document.querySelector(".title");
title.onclick = function (e) {
  menu.classList.toggle("open"); //改变状态，如果没则添加，如果有则删除
};

let tree = document.getElementById("tree");
let li = tree.querySelectorAll("li");
for (let item of li) {
  let span = document.createElement("span");
  item.prepend(span); //把span插入li当作第一个子元素
  span.append(span.nextSibling); //把它后面的兄弟当作它儿子
}
tree.addEventListener("click", function (e) {
  //li>span点击，li ul：hidden
  if (e.target.tagName !== "SPAN") {
    return;
  }
  let ul = e.target.parentNode.querySelector("ul");
  ul.hidden = !ul.hidden;
});

//选择文件
let ul2 = document.getElementById("ul");
ul2.onmousedown = () => false; //取消选中行为
ul2.addEventListener("click", function (e) {
  if (e.target.tagName != "LI") {
    return;
  }
  if (!e.ctrlKey && !e.metaKey) {
    for (let item of ul2.querySelectorAll("li")) {
      item.classList.remove("selected");
      e.target.classList.add("selected");
    }
  } else {
    e.target.classList.toggle("selected");
  }
});

//mouseover / mouseout 显示最深的有注解的元素
let tooltip;
let house = document.getElementById("house");
house.addEventListener("mouseover", function (e) {
  let anchor = e.target.closest("[data-tooltip]"); //用最近的符合条件的祖先，保证每次显示的都是最深度的
  if (!anchor) {
    return;
  }
  tooltip = showTip(anchor, anchor.dataset.tooltip); //记录出现的这个，以便移除
});
house.addEventListener("mouseout", function (e) {
  if (tooltip) {
    tooltip.remove(); //删除这个元素本身
    //tooltip = false
  }
});

function showTip(anchor, html) {
  let tip = document.createElement("div");
  anchor.prepend(tip);
  tip.className = "tooltip";
  tip.innerHTML = html;
  //设置tip位置
  let coords = anchor.getBoundingClientRect();
  let left = coords.left + (anchor.offsetWidth - tip.offsetWidth) / 2;
  if (left < 0) {
    left = 0;
  }
  let top = coords.top + (anchor.offsetHeight - tip.offsetHeight) / 2;
  if (top < 0) {
    top = 0;
  }
  tip.style.left = left + "px";
  tip.style.top = top + "px";
  return tip;
}

img.ready = function () {
  return new Promise((resolve, reject) => {
    this.onload = () => {
      resolve();
    };
    this.onerror = () => {
      reject();
    };
  });
};

cat
  .reduce((seq, cat) => {
    return seq
      .then(() => {
        return getImgPromise(cat.fullUrl);
      })
      .then((img) => {
        document.body.appendChild(img);
      });
  }, Promise.resolve())
  .then(() => {
    console.log("All cats downloaded");
  });
//将表单元素转换为query string
function normalizeForm(form) {
  return Array.from(form.elements)
    .filter((it) => it.name)
    .reduce((prev, curr) => prev + curr.name + "=" + curr.value + "&", "")
    .slice(-1);
}

function getSelected(selectNode) {
  Array.from(selectNode.options)
    .filter((it) => it.selected)
    .map((it) => Number(it.value))
    .reduce((prev, curr) => prev + curr);
}

//作业: 实现表单元素的序列化; jQuery('form').serialize
//'form?name=xx&age=18'
function serialize(formNode) {
  var res = "";
  for (let i = 0; i < formNode.elements.length; i++) {
    let element = formNode.elements[i];
    if (element.name) {
      let name = element.name;
      let nodeName = element.nodeName;
      if (nodeName == "INPUT") {
        switch (element.type) {
          case "radio":
          case "checkbox":
            if (element.checked) {
              res += name + "=" + (element.value || "on");
              if (i < formNode.elements.length - 1) {
                res += "&";
              }
            }
            break;
          default:
            res += name + "=" + (element.value || "on");
            if (i < formNode.elements.length - 1) {
              res += "&";
            }
        }
      } else if (nodeName == "TEXTAREA") {
        res += name + "=" + element.value;
      } else if (nodeName == "SELECT") {
        if (element.multiple) {
          Array.from(element.options).forEach((option) => {
            if (option.selected) {
              res += name + "=" + element.value;
              if (i < formNode.elements.length - 1) {
                res += "&";
              }
            }
          });
        } else {
          res += name + "=" + element.value;
          if (i < form.elements.length - 1) {
            res += "&";
          }
        }
      }
    }
  }
  return res;
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (e) => {
      reject(new Error(e));
    };
    reader.readAsText(file);
  });
}

xhr = new XMLHttpRequest()
xhr.open('get','/author')
xhr.setRequestHeader('Accept', 'application/json')
xhr.send()
xhr.responseText 