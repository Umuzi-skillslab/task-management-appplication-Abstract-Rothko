// DOM Manipulation
import { addTask, taskList, Task, calculateAveragePriority, countCompletedTasks } from './app.js'
import { formatTaskName, formatTaskPriority, saveToStorage, loadFromStorage, isHighPriority, isMediumPriority, isLowPriority } from './utils.js';

function setupEventListeners() {
    const taskInput = document.querySelector("#task-input");
    const taskItems = document.querySelector(".task-list");
    const sortButton = document.getElementById("sort-btn");
    const showStatsButton = document.getElementById("show-stats-btn");
    const hideStatsButton = document.getElementById("hide-stats-btn");

    // null checks before adding listeners
    if(!taskInput) {
        console.log("Task input returned null. Problem arose fetching it.");
        return;
    }

    if(!taskItems) {
        console.log("Task Items returned null. Problem arose fetching it.");
        return;
    }

    if(!sortButton) {
        console.log("Sort button returned null. Problem arose fetching it.");
        return;
    }

    if(!showStatsButton) {
        console.log("Show stats button returned null. Problem arose fetching it.");
        return;
    }

    if(!hideStatsButton) {
        console.log("Hide stats button returned null. Problem arose fetching it.");
        return;
    }
    
    // Event listeners
    taskInput.addEventListener("submit", handleAddTask);
    taskItems.addEventListener("click", handleTaskClick);
    showStatsButton.addEventListener("click", handleShowStats);
    hideStatsButton.addEventListener("click", () => {
      const statistics = document.querySelector(".statistics");
      statistics.style.display = "none";
    });
    sortButton.addEventListener("click", () => {
      taskList.sort((a,b) => (b.priority - a.priority));
      displayTasks();
    })
}

function handleAddTask(event) {
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    const prioInput = document.getElementById("priority");
    
    // Prevent reloading
    event.preventDefault();
    
    const title = titleInput.value;
    const description = descInput.value;
    const priority = prioInput.value;
    
    // Validation Check
    if(title.trim() === "" || description.trim() === "") {
        alert("Please complete all details");
        return;
    }
    
    addTask(formatTaskName(title), formatTaskName(description), formatTaskPriority(priority));
    displayTasks();
    
    this.reset()
}

function displayTasks() {
    const container = document.getElementById("task-list");
    const statsButtons = document.querySelector(".stats-btns");

    statsButtons.style.display = taskList < 1 ? "none" : "block";

    // Loop to clear content
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < taskList.length; i++) {
        const div = document.createElement("div");
        let status = taskList[i].completed ? "Completed" : "Pending";

        // Creation of Delete Button
        const delButton = document.createElement("button");
        delButton.setAttribute("class", "delete-btn");
        delButton.setAttribute("data-id", taskList[i].id);
        delButton.innerText = "Delete";
        
        // Creation of Complete Button - Mark as Complete
        const completeButton = document.createElement("button");
        completeButton.setAttribute("class", "complete-btn");
        completeButton.setAttribute("data-id", taskList[i].id);
        completeButton.innerText = taskList[i].completed ? "Undo" : "Complete";

        // Creation of Button that raises priority level
        const raisePriorityButton = document.createElement("button");
        raisePriorityButton.setAttribute("class", "raise-btn");
        raisePriorityButton.setAttribute("data-id", taskList[i].id);
        raisePriorityButton.innerText = "Raise Priority";

        // Creation of button that lowers priority level
        const lowerPriorityButton = document.createElement("button");
        lowerPriorityButton.setAttribute("class", "lower-btn");
        lowerPriorityButton.setAttribute("data-id", taskList[i].id);
        lowerPriorityButton.innerText = "Lower Priority";
        
        div.insertAdjacentHTML("beforeend", `<h3>Title: ${taskList[i].title}</h3>`);
        div.insertAdjacentHTML("beforeend", `<p>Description: ${taskList[i].description}</p>`);
        div.insertAdjacentHTML("beforeend", `<p>Completion Status: ${status}</p>`);
        div.insertAdjacentHTML("beforeend", `<p>Priority: ${taskList[i].priority}</p>`);
        
        if(taskList[i].completed) {
            div.classList.add("completed");
        }

        if(isHighPriority(taskList[i])) {
          raisePriorityButton.classList.add("high-priority");
        }

        if(isLowPriority(taskList[i])) {
          lowerPriorityButton.classList.add("low-priority");
        }
        
        div.append(completeButton);
        div.append(delButton);
        div.append(raisePriorityButton);
        div.append(lowerPriorityButton);
        
        container.appendChild(div);

    }

    saveToStorage(taskList);
}


function handleTaskClick(event) {
    const target = event.target;
    const id = target.getAttribute("data-id");
    const task = taskList.find((entry) => String(entry.id) === id)

    if (!id) return;

    if (target.classList.contains("delete-btn")) {
        deleteEntry(id);
    } else if (target.classList.contains("complete-btn")) {
        if(task) {
          task.toggleCompletion();
          displayTasks();
        }

    } else if(target.classList.contains("raise-btn")) {
        if(task) {
            if(isLowPriority(task) || isMediumPriority(task)) {
                task.priority += 1;
                displayTasks();
            }
        }
        

    } else if(target.classList.contains("lower-btn")) {
        if(task) {
            if(isHighPriority(task) || isMediumPriority(task)) {
                task.priority -= 1;
                displayTasks();
            }
        }

    }
}

function handleShowStats() {
    const totalTasks = taskList.length;
    const totalCompleted = countCompletedTasks(taskList, 0);
    const avgPriority = calculateAveragePriority();

    const statistics = document.querySelector(".statistics");

    while(statistics.firstChild) {
        statistics.removeChild(statistics.firstChild);
    }

    statistics.style.display = "block";

    const div = document.createElement("div");

    div.insertAdjacentHTML("beforeend", `<h3>Statistics</h3>`);
    div.insertAdjacentHTML("beforeend", `<p>Total Tasks: ${totalTasks}</p>`);
    div.insertAdjacentHTML("beforeend", `<p>Total Completed: ${totalCompleted}</p>`);
    div.insertAdjacentHTML("beforeend", `<p>Average Priority: ${avgPriority}</p>`);

    statistics.appendChild(div);
}

function deleteEntry(id) {
    const index = taskList.findIndex((entry) => String(entry.id) === id);
    if (index !== -1) {
        taskList.splice(index, 1);
        displayTasks();
    }
}

function loadTasks() {
    try {
        const loadedTasks = loadFromStorage() || [];
        const result = loadedTasks.map(task => Object.assign(new Task(task.title, task.description, task.priority), task));
        taskList.push(...result);
        return taskList;
    } catch(error) {
        console.error("Problem loading tasks: ", error);
    }
    
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); 
    displayTasks();
    setupEventListeners();
});
