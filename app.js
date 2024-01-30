const todoValue = document.getElementById("todoText"),
  listContainer = document.getElementById("list-container"),
  addUpdateClick = document.getElementById("AddUpdateClick");

// Every time "Enter" key is also pressed => add a new task
todoValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addUpdateClick.click();
});

// Every time plus sign is clicked => add a new task
addUpdateClick.addEventListener("click", () => {
  if (todoValue.value === "") {
    alert("Please enter your task");
    todoValue.focus();
  } else {
    // add input value to our lists as a new item
    let li = document.createElement("li");
    const todoItem = `<div class="item-setting">${todoValue.value}</div><span><i class="fa-solid fa-trash todo-controls"></i></span>`;

    li.innerHTML = todoItem;
    listContainer.appendChild(li);
  }
  todoValue.value = ""; // reset input
  document.querySelector("P").textContent = "";
  saveData();
});

// Toggle checked or delete according to target
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (
      e.target.tagName === "I" &&
      e.target.parentElement.tagName === "SPAN"
    ) {
      const itemText =
        e.target.parentElement.previousElementSibling.textContent; // e.target = i => e.target.parentElement = span => e.target.parentElement.previousElementSibling = div
      if (confirm(`${itemText} will be permanently deleted. Are you sure?`)) {
        // Check if the clicked element is the trash icon inside a span
        e.target.parentElement.parentElement.remove();
        saveData();
        // Get the <P> tag and write the message into it
        const pTag = document.querySelector("P");
        pTag.textContent = `${itemText} is successfully deleted `;
      }
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTast() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTast();
