// DOM Manipulation - Starter Code with Errors
import { addTask, taskList } from './app.js'
// Missing: proper DOM selectors
function setupEventListeners() {
    // Wrong selector method
    const addButton = document.getElementById("add-task-btn");  // Wrong - mixing ID and class
    const taskInput = document.querySelector("#task-input");

    // Missing: null checks before adding listeners
    taskInput.addEventListener("submit", handleAddTask);
    
    // Missing: other event listeners for form submission, etc.
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
    
    addTask(title, description, priority);
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
        div.insertAdjacentHTML("beforeend", `<h3>${taskList[i].title}</h3>`);
        div.insertAdjacentHTML("beforeend", `<p>${taskList[i].description}</p>`);
        div.insertAdjacentHTML("beforeend", `<p>${taskList[i].priority}</p>`);
        container.appendChild(div);
        
        // Missing: task ID, completion status, event handlers for delete/complete
    }
}

// Function with event handling issues
function handleTaskClick(event) {
    // Missing: event.target check
    // Missing: proper event delegation
    
    const taskId = event.target.id;  // Wrong way to get task ID
    
    // Should toggle task completion
    console.log("Task clicked: " + taskId);
}

// Missing: JSON conversion functions
// Missing: functions to save/load tasks from localStorage

// Initialize (wrong placement - should use DOMContentLoaded)
document.addEventListener("DOMContentLoaded", setupEventListeners);
