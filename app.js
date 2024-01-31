//& Selectors
const todoValueInput = document.getElementById("todo-value");
const listContainerUl = document.getElementById("list-container");
const addTaskI = document.getElementById("add-task");
const clearBtn = document.querySelector(".clearBtn");
const resultPar = document.querySelector(".result");

//& Initials
//toDoList array
let toDoList = [];

//task counts
let totalTasks = 0;
let doneTasks = 0;

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
    // add this newly styled created task as a appenChild into our list as a new item
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

    // push new li element to toDoList

    toDoList.push({
      task_name: inputValue,
      checked: false,
    });

    // reset result field after adding task
    resultPar.textContent = "";
    resultPar.style.padding = "0rem"; // write it later

    // Update task counts (increase)
    totalTasks++;
    updateTaskCounts();

    saveData();
  }
  todoValueInput.value = ""; // reset input area after adding task
}

// Toggle => checked or not
function handleToggleCheckedClick(e) {
  if (e.target.tagName == "LI" || e.target.classList.contains("item-setting")) {
    e.target.parentElement.classList.toggle("checked");
    e.target.classList.toggle("checked");
    console.log(e.target);

    // Update task counts when a task is checked
    const isChecked = e.target.classList.contains("checked");
    if (isChecked) {
      doneTasks++;
    } else {
      doneTasks--;
    }
    updateTaskCounts();

    // Update toDoList with the new checked status
    const itemText = e.target.textContent; // = inputValue
    const tasks = toDoList.filter((task) => task.task_name === itemText); // filter the checked status of more than one item with the same task name

    if (tasks.length > 0) {
      tasks.forEach((task) => {
        task.checked = isChecked; // Update the checked status directly
      });

      saveData();
    }
  }
}

// delete according to target
function handleDeleteTaskClick(e) {
  if (e.target.tagName === "I" && e.target.parentElement.tagName === "SPAN") {
    const itemText = e.target.parentElement.previousElementSibling.textContent; // = inputValue
    if (confirm(`"${itemText}" will be permanently deleted. Are you sure?`)) {
      e.target.parentElement.parentElement.remove(); // clicked li element

      // Remove task from toDoList
      const taskIndex = toDoList.findIndex(
        (task) => task.task_name === itemText
      );
      if (taskIndex !== -1) {
        // Update task counts (decrease)
        totalTasks--;
        if (toDoList[taskIndex].checked) {
          doneTasks--;
        }

        toDoList.splice(taskIndex, 1); // starts with taskIndex and delete 1 item
        updateTaskCounts();
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
    localStorage.removeItem("totalTasks");
    localStorage.removeItem("doneTasks");
    // Reload the page
    location.reload();
  }
}

// save data in local storage : toDoList dizisini JSON formatına çevirip localStorage'a kaydediyor.
function saveData() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  localStorage.setItem("totalTasks", totalTasks);
  localStorage.setItem("doneTasks", doneTasks);
  updateTaskCounts(); // Call updateTaskCounts after saving data
}

// show all saved datas in local storage : localStorage'dan alınan veriyi toDoList dizisine çevirip, bu diziyi kullanarak sayfadaki liste elemanlarını oluşturuyor.
function showTasks() {
  const storedData = localStorage.getItem("toDoList");
  const storedTotalTasks = localStorage.getItem("totalTasks");
  const storedDoneTasks = localStorage.getItem("doneTasks");
  if (storedData) {
    toDoList = JSON.parse(storedData);

    // Update task counts
    totalTasks = storedTotalTasks ? parseInt(storedTotalTasks) : 0;
    doneTasks = storedDoneTasks ? parseInt(storedDoneTasks) : 0;

    // Render tasks from toDoList
    toDoList.forEach((task) => {
      const li = document.createElement("li");

      const itemSettingDiv = document.createElement("div");
      itemSettingDiv.className = "item-setting";
      itemSettingDiv.textContent = task.task_name;

      const todoControlsSpan = document.createElement("span");
      const trashIcon = document.createElement("i");
      trashIcon.className = "fa-solid fa-trash-can todo-controls";
      todoControlsSpan.appendChild(trashIcon);

      li.appendChild(itemSettingDiv);
      li.appendChild(todoControlsSpan);

      // Set checked status : if its true then add checked class
      if (task.checked) {
        li.classList.add("checked");
      }

      // add newly created li element into ul
      listContainerUl.appendChild(li);
    });

    // Update task counts in the UI
    updateTaskCounts();
  }
}

// update total number of tasks and number of completed tasks (done)
function updateTaskCounts() {
  const totalSpan = document.getElementById("total");
  const doneSpan = document.getElementById("done");

  totalSpan.textContent = totalTasks;
  doneSpan.textContent = doneTasks;
}

showTasks();
