// DOM Manipulation - Starter Code with Errors
import { addTask, taskList } from './app.js'
import { generateRandomId, formatTaskName, formatTaskPriority } from './utils.js';
// Missing: proper DOM selectors
function setupEventListeners() {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.querySelector("#task-input");
    const taskItems = document.querySelector(".task-list");

    // Missing: null checks before adding listeners
    if(!taskInput) {
        console.log("Task input returned null. Problem arose fetching it.");
        return;
    }

    if(!taskItems) {
        console.log("Task Items returned null. Problem arose fetching it.");
        return;
    }
    
    taskInput.addEventListener("submit", handleAddTask);
    taskItems.addEventListener("click", handleTaskClick);
}

// Function with DOM manipulation errors
function handleAddTask(event) {
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    const prioInput = document.getElementById("priority");
    
    // No validation
    event.preventDefault();
    
    const title = titleInput.value;
    const description = descInput.value;
    const priority = prioInput.value;
    
    if(title.trim() === "" || description.trim() === "") {
        alert("Please complete all details");
        return;
    }
    
    addTask(formatTaskName(title), formatTaskName(description), formatTaskPriority(priority));
    displayTasks();
    
    this.reset()
}

// Function that should use better selectors
function displayTasks() {
    const container = document.getElementById("task-list");
    
    // Loop to clear content
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < taskList.length; i++) {
        const div = document.createElement("div");
        let status = taskList[i].completed ? "Completed" : "Pending";
        taskList[i].id = generateRandomId();

        const delButton = document.createElement("button");
        delButton.setAttribute("class", "delete-btn");
        delButton.setAttribute("data-id", taskList[i].id);
        delButton.innerText = "Delete";
        
        const completeButton = document.createElement("button");
        completeButton.setAttribute("class", "complete-btn");
        completeButton.setAttribute("data-id", taskList[i].id);
        completeButton.innerText = taskList[i].completed ? "Undo" : "Complete";
        
        div.insertAdjacentHTML("beforeend", `<h3>${status}</h3>`);
        div.insertAdjacentHTML("beforeend", `<h3>${taskList[i].title}</h3>`);
        div.insertAdjacentHTML("beforeend", `<p>${taskList[i].description}</p>`);
        div.insertAdjacentHTML("beforeend", `<p>${taskList[i].priority}</p>`);
        
        if(taskList[i].completed) {
            div.classList.add("completed");
        }
        
        div.append(completeButton);
        div.append(delButton);
        
        container.appendChild(div);

    }
}

// Function with event handling issues
function handleTaskClick(event) {
  const target = event.target;
  const id = target.getAttribute("data-id");

  if (!id) return;

  if (target.classList.contains("delete-btn")) {
    deleteEntry(id);
  } else if (target.classList.contains("complete-btn")) {
    const person  = taskList.find((entry) => String(entry.id) === id)
    if(person) {
      person.toggleComplete();
      displayTasks();
    }
  }
}

function deleteEntry(id) {
  const index = taskList.findIndex((entry) => String(entry.id) === id);
  if (index !== -1) {
    taskList.splice(index, 1);
    displayTasks();
  }
}

// Missing: JSON conversion functions
// Missing: functions to save/load tasks from localStorage

// Initialize (wrong placement - should use DOMContentLoaded)
document.addEventListener("DOMContentLoaded", setupEventListeners);
