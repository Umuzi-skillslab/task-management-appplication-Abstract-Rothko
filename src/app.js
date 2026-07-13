// Task Management Application
import { generateRandomId } from "./utils.js";

// Global variables 
const taskList = [];  // Fixed: const added
let taskCounter = 0;  // Fixed: let added

// Task class with errors
class Task {
    constructor(title, description, priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.id = generateRandomId();
    }
    
    toggleCompletion() {
        this.completed = !this.completed;
    }
    
    getInfo() {
        return `Task: ${this.title} - Priority: ${this.priority}`;
    }
}


class SubTask extends Task {
    constructor(title, description, priority, parentTask) {
        super(title, description, priority); // super() added
        this.parentTask = parentTask;
    }
}

// Function that adds task object to taskList
function addTask(title, description, priority) {
    if(typeof title !== "string" || typeof description !== "string" || typeof priority !== "number") {
        throw new Error("Parameter is not correct data type");
    }

    const newTask = new Task(title, description, priority);
    taskList.push(newTask);
    taskCounter++;
    return newTask;
}

function displayAllTasks() {
    // for-of loop implemented
    for (let task of taskList) {
        console.log(task.title);
    }
}

function findTaskByTitle(title) { // title parameter added
    let i = 0;
    while (i < taskList.length) {
        if (taskList[i].title === title) {
            return taskList[i];
        }
        i++;
    }
    return undefined;
}

function updateTaskPriority(taskId, newPriority) {
    // typeof check for parameters
    if(typeof taskId !== "number") throw new Error(`${taskId} should be type number.`);

    if(typeof newPriority !== "number") throw new Error(`${newPriority} should be type number.`);
    
    // null/undefined validation
    if(taskList.length === 0) return false;
    
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId && (newPriority > 0 && newPriority < 4)) { // Create bounds for newPriority parameter
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

// Function uses destructuring
function getTaskDetails(task) {
    // destructure task properties
    const { title, description, priority, completed } = task;
    
    return {
        title: title,
        description: description,
        priority: priority,
        completed: completed
    };
}

function mergeTasks(...lists) {
    return lists.reduce((merged, list) => [...merged, ...list], []);
}

// Recursive function
function countCompletedTasks(tasks, index) {
    // Added base case check
    if(index === (tasks.length - 1)) {
        return tasks[index].completed ? 1 : 0;
    }

    // Added null/undefined check
    if(tasks.length === 0) return 0;

    if(index > (tasks.length - 1) || typeof index !== "number") throw new Error(`${index} should be a number between 0 - ${tasks.length}`);
    
    if (tasks[index].completed) {
        return 1 + countCompletedTasks(tasks, index + 1);
    } else {
        return countCompletedTasks(tasks, index + 1);
    }
}

function calculateAveragePriority() {
    let total = 0;
    const tasks = taskList;
    // Implemented check for empty array
    if(tasks.length === 0) return 0;

    for (let task of tasks) {
        total += task.priority;
    }
    return Math.round(total / tasks.length); // Implemented Math.round
}

function getHighPriorityTasks(minPriority) {
    // implemented filter method
    const highPriority = taskList.filter(task => task.priority > minPriority);

    return highPriority;
}

// Task Manager Object
const TaskManager = {
    tasks: taskList,
    
    addTask: function(title, description, priority) {
        const newTask = new Task(title, description, priority);
        this.tasks.push(newTask);
        return newTask;
    },

    displayAllTasks: function() {
        return this.tasks.forEach(task => {console.log(task.title)});
    },

    countCompletedTasks: function() {
        return this.tasks.reduce((acc, task) => acc + (task.completed ? 1 : 0), 0);
    },

    getTotalTasks: function() {
        return this.tasks.length;
    }
};

// Export Modules
export { 
    taskList, taskCounter, addTask, displayAllTasks, Task, 
    SubTask, findTaskByTitle, updateTaskPriority, getHighPriorityTasks, 
    mergeTasks, getTaskDetails, countCompletedTasks, 
    calculateAveragePriority, TaskManager 
};