// DOM Manipulation - Starter Code with Errors
import { addTask, taskList } from './app.js'
// Missing: proper DOM selectors
function setupEventListeners() {
    // Wrong selector method
    const addButton = document.getElementById("add-task-btn");  // Wrong - mixing ID and class
    const taskInput = document.querySelector("#task-input");

    // Missing: null checks before adding listeners
    addButton.addEventListener("click", handleAddTask);
    
    // Missing: other event listeners for form submission, etc.
}

// Function with DOM manipulation errors
function handleAddTask() {
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    const prioInput = document.getElementById("priority");
    
    // No validation
    // Should use event.preventDefault() if form
    
    const title = titleInput.value;
    const description = descInput.value;
    const priority = prioInput.value;
    
    // Missing: priority input
    
    addTask(title, description, priority);
    displayTasks();
    
    // Missing: clear inputs after adding
}

// Function that should use better selectors
function displayTasks() {
    const container = document.getElementById("task-list");
    
    // Should clear existing content first
    // Missing: null check
    
    // Inefficient - should use template literals and insertAdjacentHTML
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
