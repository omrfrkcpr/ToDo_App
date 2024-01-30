//& Selectors
const todoValue = document.getElementById("todoText");
const listContainer = document.getElementById("list-container");
const addDeleteClick = document.getElementById("addDeleteClick");
const resultParagraph = document.querySelector(".result");

//& Event Listeners
todoValue.addEventListener("keypress", handleKeyPress);
addDeleteClick.addEventListener("click", handleAddDeleteClick);
listContainer.addEventListener("click", handleListContainerClick);

//& Functions
// Every time "Enter" key is pressed => add it as a new task
function handleKeyPress(e) {
  if (e.key === "Enter") addDeleteClick.click();
}

// Every time plus sign is clicked => add a new task
function handleAddDeleteClick() {
  const inputValue = todoValue.value.trim();
  if (inputValue === "") {
    alert("Please enter your task");
    todoValue.focus();
  } else {
    // add this newly created task as a appenChild to our list as a new item
    const li = document.createElement("li");
    li.innerHTML = `<div class="item-setting">${inputValue}</div><span><i class="fa-solid fa-trash todo-controls"></i></span>`;
    listContainer.appendChild(li);
    saveData();
  }
  todoValue.value = ""; // reset input area
  if (
    listContainer.childElementCount === 0 ||
    listContainer.children[0].tagName !== "LI"
  ) {
    resultParagraph.textContent = "";
  }
}

function handleListContainerClick(e) {
  // Toggle => checked or not
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
  // delete according to target
  else if (
    e.target.tagName === "I" &&
    e.target.parentElement.tagName === "SPAN"
  ) {
    // e.target = i => e.target.parentElement = span => e.target.parentElement.previousElementSibling = div
    const itemText = e.target.parentElement.previousElementSibling.textContent;
    if (confirm(`${itemText} will be permanently deleted. Are you sure?`)) {
      e.target.parentElement.parentElement.remove(); // li element but clicked one
      // console.log(e.target.parentElement.parentElement);
      saveData();
      // write the result message into <p> tag
      resultParagraph.textContent = `${itemText} is successfully deleted `;
    }
  }
}

// save data in local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// show all saved datas in local storage
function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTasks();
