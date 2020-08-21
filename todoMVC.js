let todoInput = document.querySelector("#todoInput");
let todoList = document.querySelector("#todoList");
let toggleAllInput = document.querySelector("#all");
let stateWarp = document.querySelector(".state");
let leftCount = document.querySelector(".left-count");
let clearCompletedBtn = document.querySelector("#clear-completed");
let categorySelect = document.querySelector("#category-select");
categorySelect.onclick = (e) => {
  //筛选活动的，完成的，还是全部
  if (e.target.matches("input")) {
    todoList.classList.remove("all", "active", "completed");
    todoList.classList.add(e.target.value);
  }
};
toggleAllInput.onclick = (e) => {
  let completed = todoList.querySelectorAll("li.completed");
  if (completed.length === todoList.children.length) {
    //全被选中了
    Array.from(todoList.children).forEach((it) => {
      it.classList.remove("completed");
      it.firstElementChild.checked = false;
    });
    setSelectAllAndLeftCountAndClearBtn();
  } else {
    Array.from(todoList.children).forEach((it) => {
      it.classList.add("completed");
      it.firstElementChild.checked = true;
    });
    setSelectAllAndLeftCountAndClearBtn();
  }
};
todoInput.onkeyup = function (e) {
  //添加了新的todo,在下面创建一个结构
  if (e.key === "Enter") {
    addTodo({ content: e.target.value.trim(), completed: false });
    e.target.value = ''
    save()
  }
};
clearCompletedBtn.onclick = (e) => {
  //清楚已完成的，清除完这个按钮消失
  let toDeleted = document.querySelectorAll(".completed");
  toDeleted.forEach((it) => {
    todoList.removeChild(it);
  });
  clearCompletedBtn.style.display = "none";
};

function setSelectAllAndLeftCountAndClearBtn() {
  //判断是不是全被选了
  let actives = todoList.querySelectorAll("input:first-child:not(:checked)");
  let completed = todoList.querySelectorAll("input:first-child:checked");
  if (actives.length) {
    toggleAllInput.checked = false;
  } else {
    toggleAllInput.checked = true;
  }
  leftCount.textContent = actives.length + "items left";
  if (completed.length) {
    clearCompletedBtn.style.display = "inline-block";
  } else {
    clearCompletedBtn.style.display = "none";
  }
}
let todos = JSON.parse(localStorage.todos) || [];
todos.forEach((todo) => {
  addTodo(todo);
});
function addTodo(todo) {
  let todoText = todo.content;
  if (todoText.trim() !== "") {
    this.value = "";
    let li = document.createElement("li");
    li.classList.add("todo-item");
    todo.completed && li.classList.add("completed");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = (e) => {
      //这一项是否完成
      if (checkbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      setSelectAllAndLeftCountAndClearBtn();
      save()
    };

    let span = document.createElement("span");
    span.textContent = todoText;
    span.ondblclick = (e) => {
      //编辑这条todo
      li.classList.add("editing");
      setTimeout(() => {
        editBox.focus();
      });
    };
    let editBox = document.createElement("input"); //默认不显示，编辑这条的时候才显示
    editBox.type = "text";
    editBox.value = todoText;
    editBox.onkeyup = (e) => {
      //编辑这条todo，编辑完了
      if (e.key === "Enter") {
        span.textContent = editBox.value;
        li.classList.remove("editing");
      }
    };
    editBox.onblur = (e) => {
      span.textContent = editBox.value;
      li.classList.remove("editing");
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.onclick = (e) => {
      //点个X
      todoList.removeChild(li);
      setSelectAllAndLeftCountAndClearBtn();

      if (!todoList.children.length) {
        //todo列表没有东西，隐藏下面state
        stateWarp.style.display = "none";
      }
      save()
    };
    li.append(checkbox, span, editBox, deleteBtn);
    todoList.append(li);
    stateWarp.style.display = "block";
    setSelectAllAndLeftCountAndClearBtn();
  }
}
function save() {
  //存在localstorage里面
  let todos = Array.from(todoList.children).map((li) => {
    return {
      completed: li.firstElementChild.checked,
      content: li.firstElementChild.nextElementSibling.textContent,
    };
  });
  localStorage.todos = JSON.stringify(todos);
}
