window.onload = (e) => {
  let newTodo = $(".new")[0];
  newTodo.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && e.target.value !== "") {
      addToList(e.target.value);
      e.target.value = "";
    }
  });

  function addToList(value) {
    let i = $("ul")[0].children.length;
    window.localStorage.setItem(i, value);
    let newLi = `<li id ='${i}'>
		<input type ="checkbox"></input>
		${value}
		<button id='${"btn" + i}' class="not-hover"></button>
		<label for='${"btn" + i++}' class="not-hover">×</label>
		</li>`;
    $("ul").prepend(newLi);
    let li = $("ul")[0].firstElementChild;
    li.addEventListener("mouseover", (e) => {
      li.lastElementChild.classList.remove("not-hover");
      li.lastElementChild.classList.add("del-label");
    });
    li.addEventListener("mouseout", (e) => {
      li.lastElementChild.classList.remove("del-label");
      li.lastElementChild.classList.add("not-hover");
    });
    //添加了保存在local storage,key('0','1'...)
  }
  //重新打开页面，也要显示之前的,读取local storage
  for (let i = 0; i < localStorage.length; i++) {
    let li = `<li id ='${i}'><input type ="checkbox"></input>${
      localStorage[i]
    }<button id='${"btn" + i}' class="not-hover"></button>
		<label for='${"btn" + i}' class="not-hover">×</label></li>`;
    $("ul").prepend(li);
  }

  let all = $("#forall")[0];
  let lis = Array.from(document.getElementsByTagName("li"));

  for (let li of lis) {
    li.addEventListener("mouseover", (e) => {
      li.lastElementChild.classList.remove("not-hover");
      li.lastElementChild.classList.add("del-label");
    });
    li.addEventListener("mouseout", (e) => {
      li.lastElementChild.classList.remove("del-label");
      li.lastElementChild.classList.add("not-hover");
    });
  }
  function isAllSelected() {
    let lis = Array.from(document.getElementsByTagName("li"));
    for (let i = 0; i < lis.length; i++) {
      if (lis[i].firstElementChild.checked == false) {
        return false;
      }
    }
    return true;
  }
  //如果全选中了，下一次点击是取消全选;否则点击时全选
  //TODO 可能有问题
  all.onclick = (e) => {
    if (isAllSelected()) {
      console.log(lis.length);
      for (let i = 0; i < lis.length; i++) {
        lis[i].firstElementChild.checked = false;
        all.classList.remove("selected-all");
        all.classList.add("selected-none");
        lis[i].classList.remove("bechecked");
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        lis[i].firstElementChild.checked = true;
        all.classList.remove("selected-none");
        all.classList.add("selected-all");
        lis[i].classList.add("bechecked");
      }
    }
  };

  $("ul")[0].addEventListener("change", (e) => {
    console.log("ul change");
    if (isAllSelected()) {
      //如果全选中了，上面的变成红色；否则上面的不变色
      all.classList.remove("selected-none");
      all.classList.add("selected-all");
    } else {
      all.classList.remove("selected-all");
      all.classList.add("selected-none");
    }
    for (let i = 0; i < lis.length; i++) {
      //监听每个checkbox,被选中了，添加删除线
      if (lis[i].firstElementChild.checked == true) {
        lis[i].classList.add("bechecked");
      } else {
        lis[i].classList.remove("bechecked");
      }
    }
  });

  //TODO 没有old隐藏上面的all
  //button,删元素，删local Storage
  $("ul")[0].addEventListener("click", (e) => {
    if (e.target.matches(".del-label")) {
      localStorage.removeItem(e.target.parentNode.id);
      e.target.parentNode.remove();
    }
  });
};
