// Utilities

const priorities = {"low" : 1, "medium": 2, "high" : 3};


function saveToStorage(data) {
    try {
        localStorage.setItem("tasks", JSON.stringify(data));
    } catch(error) {
        console.log(`Failed to save data: ${error.message}`);
    }
}

function loadFromStorage() {
    try {
        const data = localStorage.getItem("tasks");
        return data ? JSON.parse(data) : [];
    } catch(error) {
        console.error(`Failed to load data: ${error.message}`);
        return [];
    }
}


function generateRandomId() {
    return Math.round(Math.random() * 10000);
}


function formatTaskName(name) {
    let result = name
        .trim()
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return result;
}

function formatTaskPriority(value) {
    let priority = Number(value);
    return priority;
}

function isHighPriority(task) {
    return task.priority === priorities["high"];
}

function isLowPriority(task) {
    return task.priority === priorities["low"];
}

function isMediumPriority(task) {
    return task.priority === priorities["medium"];
}

export {
    isHighPriority, isLowPriority, isMediumPriority,
    formatTaskName, formatTaskPriority, generateRandomId,
    loadFromStorage, saveToStorage, priorities,
}
