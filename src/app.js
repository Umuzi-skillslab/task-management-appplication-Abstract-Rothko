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
        // Missing: id property
    }
    
    // Missing: method to toggle completion
    toggleComplete() {
        if(this.completed) {
            this.completed = false;
        } else {
            this.completed = true;
        }

        return this.completed;
    }
    
    getInfo() {
        return `Task: ${this.title} - Priority: ${this.priority}`; // Changed to string literal
    }
}

// Subtask class with inheritance issues
class SubTask extends Task {
    constructor(title, description, priority, parentTask) {
        super(title, description, priority); // super() added
        this.parentTask = parentTask;
    }
}

// Functions with errors

// Function with no error handling
function addTask(title, description, priority) {
    const newTask = new Task(title, description, priority);  // var changed to const
    taskList.push(newTask);
    taskCounter++;
    return newTask;
}

// Function with incorrect loop
function displayAllTasks() {
    // for-of loop implemented
    for (let task of taskList) {
        console.log(task.title);
    }
}

// Function missing parameter
function findTaskByTitle(title) {
    // title parameter added
    // Wrong loop construct
    let i = 0;
    while (i < taskList.length) {
        if (taskList[i].title === title) {
            return taskList[i];
        }
        // Missing: i++
        i++;
    }
    return undefined;
}

// Function with type checking issues
function updateTaskPriority(taskId, newPriority) {
    // Missing: typeof check for parameters
    // Missing: null/undefined validation
    
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

// Function that should use destructuring but doesn't
function getTaskDetails(task) {
    // Should destructure task properties
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

// Recursive function with error
function countCompletedTasks(tasks, index) {
    // Missing: base case check
    // Missing: null/undefined check
    
    if (tasks[index].completed) {
        return 1 + countCompletedTasks(tasks, index + 1);
    } else {
        return countCompletedTasks(tasks, index + 1);
    }
}

// Function with Math object issues
function calculateAveragePriority() {
    let total = 0;
    // Implemented check for empty array
    if(taskList.length === 0) return 0;

    for (let i = 0; i < taskList.length; i++) {
        total += taskList[i].priority;
    }
    // Should use Math.round or toFixed
    return Math.round(total / taskList.length); // Implemented Math.round
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
    
    // Missing: method to add task using functional approach
    // Missing: method using array methods (map, filter, reduce)
    
    getTotalTasks: function() {
        return this.tasks.length;
    }
};

// Export issues - should be a module
// Missing: proper module exports
