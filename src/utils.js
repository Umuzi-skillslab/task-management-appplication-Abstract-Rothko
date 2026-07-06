// Utilities - Starter Code (WITH ERRORS AND MISSING FEATURES)

// Bug: Not using proper data structures
const priorities = ["low", "medium", "high"];

// Bug: Missing JSON operations
function saveToStorage(data) {
    // Bug: Not converting to JSON
    localStorage.setItem("tasks", data);
}

function loadFromStorage() {
    // Bug: Not parsing JSON
    const data = localStorage.getItem("tasks");
    return data;
}


function generateRandomId() {
    return Math.round(Math.random() * 100 - 1);
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

function isHighPriority(task) {
    return task.priority === "high";
}

// Missing: Class definitions
// Missing: Inheritance example
// Missing: Module exports
// Missing: Proper use of operators (logical, comparison)
// Missing: Recursion
// Missing: Functional programming patterns
// Missing: Proper scope demonstration
