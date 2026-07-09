// Task Management Application - Starter Code with Errors


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
        this.id = null;
    }
    
    toggleComplete() {
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

// Functions with errors

// Function with no error handling
function addTask(title, description, priority) {
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

// Function with type checking issues
function updateTaskPriority(taskId, newPriority) {
    // typeof check for parameters
    if(typeof taskId !== "number") throw new Error(`${taskId} should be type number.`);

    if(typeof newPriority !== "number") throw new Error(`${newPriority} should be type number.`);
    
    // null/undefined validation
    if(taskList.length === 0) return false;
    
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

// Function that should use destructuring
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

// Function missing spread/rest operators
function mergeTasks(list1, list2) {
    const merged = [...list1, ...list2]; // Implemented spread operator
    return merged;
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

// Filter function with errors
function getHighPriorityTasks(minPriority) {
    // implemented filter method
    const highPriority = taskList.filter(task => task.priority > minPriority);

    return highPriority;
}

// Object with missing methods
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