const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick");

todoValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addUpdateClick.click();
});

addUpdateClick.addEventListener("click", () => {
  if (todoValue.value === "") {
    alert("Please enter your task");
    todoValue.focus();
  }

  // add input value to our lists as a new item
  let li = document.createElement("li");
  const todoItems = `<div>${todoValue.value}</div><div><i class="fa-regular fa-pen-to-square todo-controls"></i><i class="fa-solid fa-trash todo-controls"></i></div>`;

  li.innerHTML = todoItems;
  listItems.appendChild(li);
  todoValue.value = ""; // reset input
});
