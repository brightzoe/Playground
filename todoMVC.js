window.onload = (e) => {
  let newTodo = $(".new")[0];
  newTodo.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && e.target.value !== "") {
      addToList(e.target.value);
      e.target.value = "";
    }
  });
  let i = 0;
  function addToList(value) {
    window.localStorage.setItem(i, value);
    let li = `<li id ='${i++}'><input type ="checkbox"></input>${value}</li>`;
    $("ul").prepend(li);
    //添加了保存在local storage,key('0','1'...)
  }
  //重新打开页面，也要显示之前的,读取local storage
  for (let i = 0; i < localStorage.length - 2; i++) {
    let li = `<li id ='${i}'><input type ="checkbox"></input>${localStorage[i]}</li>`;
    $("ul").prepend(li);
  }

  newTodo.onfocus = (e) => {
    // preventDefault();
    //TODO 取消input选中的黑框
  };

  let all = $("#forall")[0];
  let lis = Array.from($("li"));
  console.log(lis);

  function isAllSelected() {
    for (let i = 0; i < lis.length; i++) {
      if (lis[i].firstElementChild.checked == false) {
        return false;
      }
    }
    return true;
  }
  //如果全选中了，点击这个变色，下一次点击是取消全选；
  if (isAllSelected()) {
    all.classList.add("selected-all");
    all.onclick = (e) => {
      for (let i = 0; i < lis.length; i++) {
        lis[i].firstElementChild.checked = false;
        all.classList.remove("selected-all");
        all.classList.add("selected-none");
      }
    };
  } else {
    all.onclick = (e) => {
      for (let i = 0; i < lis.length; i++) {
        lis[i].firstElementChild.checked = true;
        all.classList.add("selected-all");
      }
    };
  }
};
