//& Selectors
const todoValue = document.getElementById("todoText");
const listContainer = document.getElementById("list-container");
const addDeleteClick = document.getElementById("addDeleteClick");
const clearAll = document.querySelector(".clearBtn");
const resultParagraph = document.querySelector(".result");

//& Initial taskList array
let taskList = [];

//& Event Listeners
todoValue.addEventListener("keypress", handleKeyPress);
listContainer.addEventListener("click", handleListContainerClick);
addDeleteClick.addEventListener("click", handleAddDeleteClick);
clearAll.addEventListener("click", () => {
  if (confirm("Your ToDo List will be permanently cleared. Are you sure?")) {
    // Clear local storage
    localStorage.removeItem("taskList");
    // Reload the page
    location.reload();
  }
});

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
    trashIcon.className = "fa-solid fa-trash-can todo-controls";
    todoControlsSpan.appendChild(trashIcon);

    li.appendChild(itemSettingDiv);
    li.appendChild(todoControlsSpan);

    // add newly created li element into ul
    listContainer.appendChild(li);

    // Oluşturulan li elementini taskList'e ekle
    taskList.push({
      task: inputValue,
      checked: false,
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

    // Update taskList with the new checked status
    const itemText = e.target.textContent;
    const task = taskList.find((task) => task.task === itemText);
    if (task) {
      task.checked = !task.checked;
      saveData();
    }
  }
  // delete according to target
  else if (
    e.target.tagName === "I" &&
    e.target.parentElement.tagName === "SPAN"
  ) {
    const itemText = e.target.parentElement.previousElementSibling.textContent;
    if (confirm(`${itemText} will be permanently deleted. Are you sure?`)) {
      e.target.parentElement.parentElement.remove(); // li element but clicked one

      // Remove task from taskList
      const taskIndex = taskList.findIndex((task) => task.task === itemText);
      if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        saveData();
      }

      // write the styled result message into <p> tag
      if (listContainer.childElementCount != 0) {
        resultParagraph.textContent = `"${itemText}" is successfully deleted `;
        resultParagraph.style.padding = ".3rem";
      }
    }
  }
}

// save data in local storage : taskList dizisini JSON formatına çevirip localStorage'a kaydediyor.
function saveData() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// show all saved datas in local storage : localStorage'dan alınan veriyi taskList dizisine çevirip, bu diziyi kullanarak sayfadaki liste elemanlarını oluşturuyor.
function showTasks() {
  const storedData = localStorage.getItem("taskList");
  if (storedData) {
    taskList = JSON.parse(storedData);

    // Render tasks from taskList
    taskList.forEach((task) => {
      const li = document.createElement("li");

      const itemSettingDiv = document.createElement("div");
      itemSettingDiv.className = "item-setting";
      itemSettingDiv.textContent = task.task;

      const todoControlsSpan = document.createElement("span");
      const trashIcon = document.createElement("i");
      trashIcon.className = "fa-solid fa-trash-can todo-controls";
      todoControlsSpan.appendChild(trashIcon);

      li.appendChild(itemSettingDiv);
      li.appendChild(todoControlsSpan);

      // Set checked status
      if (task.checked) {
        li.classList.add("checked");
        itemSettingDiv.textContent = itemSettingDiv.textContent; // Force reflow for updating styles
      }

      // add newly created li element into ul
      listContainer.appendChild(li);
    });
  }
}

showTasks();
