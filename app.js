//& Selectors
const todoValueInput = document.getElementById("todo-value");
const listContainerUl = document.getElementById("list-container");
const addTaskI = document.getElementById("add-task");
const clearBtn = document.querySelector(".clearBtn");
const resultPar = document.querySelector(".result");

//& Initial toDoList array
let toDoList = [];

//& Event Listeners
todoValueInput.addEventListener("keypress", handleKeyPress);
listContainerUl.addEventListener("click", handleToggleCheckedClick);
listContainerUl.addEventListener("click", handleDeleteTaskClick);
addTaskI.addEventListener("click", handleAddTaskClick);
clearBtn.addEventListener("click", handleClearBtnClick);

//& Functions
// Every time "Enter" key is pressed => add it as a new task
function handleKeyPress(e) {
  if (e.key === "Enter") addTaskI.click();
}

// Every time plus sign is clicked => add a new task
function handleAddTaskClick() {
  const inputValue = todoValueInput.value;
  if (inputValue === "") {
    alert("Please enter your task");
    todoValueInput.focus();
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
    listContainerUl.appendChild(li);

    // Oluşturulan li elementini toDoList'e ekle
    toDoList.push({
      task: inputValue,
      checked: false,
      // Diğer gerekli bilgileri buraya ekleyebilirsiniz
    });

    // reset result field after adding task
    resultPar.textContent = "";
    resultPar.style.padding = "0rem";

    saveData();
  }
  todoValueInput.value = ""; // reset input area
}

// Toggle => checked or not
function handleToggleCheckedClick(e) {
  if (e.target.tagName == "LI" || e.target.classList.contains("item-setting")) {
    e.target.parentElement.classList.toggle("checked");
    e.target.classList.toggle("checked");
    console.log(e.target.classList);

    // Update toDoList with the new checked status
    const itemText = e.target.textContent;
    const task = toDoList.find((task) => task.task === itemText);
    if (task) {
      task.checked = !task.checked;
      saveData();
    }
  }
}

function handleDeleteTaskClick(e) {
  // delete according to target
  if (e.target.tagName === "I" && e.target.parentElement.tagName === "SPAN") {
    const itemText = e.target.parentElement.previousElementSibling.textContent;
    if (confirm(`"${itemText}" will be permanently deleted. Are you sure?`)) {
      e.target.parentElement.parentElement.remove(); // li element but clicked one

      // Remove task from toDoList
      const taskIndex = toDoList.findIndex((task) => task.task === itemText);
      if (taskIndex !== -1) {
        toDoList.splice(taskIndex, 1);
        saveData();
      }

      // write the styled result message into <p> tag
      if (listContainerUl.childElementCount != 0) {
        resultPar.textContent = `"${itemText}" is successfully deleted `;
        resultPar.style.padding = ".3rem";
      }
    }
  }
}

// return to default page (reset all)
function handleClearBtnClick() {
  if (confirm("Your ToDo List will be permanently cleared. Are you sure?")) {
    // Clear local storage
    localStorage.removeItem("toDoList");
    // Reload the page
    location.reload();
  }
}

// save data in local storage : toDoList dizisini JSON formatına çevirip localStorage'a kaydediyor.
function saveData() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// show all saved datas in local storage : localStorage'dan alınan veriyi toDoList dizisine çevirip, bu diziyi kullanarak sayfadaki liste elemanlarını oluşturuyor.
function showTasks() {
  const storedData = localStorage.getItem("toDoList");
  if (storedData) {
    toDoList = JSON.parse(storedData);

    // Render tasks from toDoList
    toDoList.forEach((task) => {
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
      listContainerUl.appendChild(li);
    });
  }
}

showTasks();
