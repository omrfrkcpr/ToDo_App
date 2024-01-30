//& Selectors
const todoValue = document.getElementById("todoText");
const listContainer = document.getElementById("list-container");
const addDeleteClick = document.getElementById("addDeleteClick");
const resultParagraph = document.querySelector(".result");

//& Event Listeners
todoValue.addEventListener("keypress", handleKeyPress);
addDeleteClick.addEventListener("click", handleAddDeleteClick);
listContainer.addEventListener("click", handleListContainerClick);

//& Empty taskList array to save tasks in local storage
const taskList = [];

//& Functions
// Every time "Enter" key is pressed => add it as a new task
function handleKeyPress(e) {
  if (e.key === "Enter") addDeleteClick.click();
}

// Every time plus sign is clicked => add a new task
function handleAddDeleteClick() {
  const inputValue = todoValue.value;
  if (inputValue === "") {
    alert("Please enter your task");
    todoValue.focus();
  } else {
    // add this newly styled created task as a appenChild to our list as a new item
    const li = document.createElement("li");

    const itemSettingDiv = document.createElement("div");
    itemSettingDiv.className = "item-setting";
    itemSettingDiv.textContent = inputValue;

    const todoControlsSpan = document.createElement("span");
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash todo-controls";
    todoControlsSpan.appendChild(trashIcon);

    li.appendChild(itemSettingDiv);
    li.appendChild(todoControlsSpan);

    // add newly created li element into ul
    listContainer.appendChild(li);

    // Oluşturulan li elementini diziyi güncelleyerek ekle
    taskList.push({
      task: inputValue,
      // Diğer gerekli bilgileri buraya ekleyebilirsiniz
    });

    // reset result field after adding task
    resultParagraph.textContent = "";
    resultParagraph.style.padding = "0rem";

    saveData();
  }
  todoValue.value = ""; // reset input area
}

function handleListContainerClick(e) {
  // Toggle => checked or not
  if (e.target.tagName == "LI" || e.target.classList.contains("item-setting")) {
    e.target.parentElement.classList.toggle("checked");
    e.target.classList.toggle("checked");
    console.log(e.target.classList);
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
      // write the styled result message into <p> tag
      if (listContainer.childElementCount != 0) {
        resultParagraph.textContent = `"${itemText}" is successfully deleted `;
        resultParagraph.style.padding = ".3rem";
      }
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
