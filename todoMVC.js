let newTodo = $(".new")[0];
newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter" && e.target.value !== "") {
    addToList(e.target.value);
    e.target.value = "";
  }
});
function addToList(value) {
	let li = `<li><input type ="checkbox"></input>${value}</li>`;
	$('ul').prepend(li);
	
}
