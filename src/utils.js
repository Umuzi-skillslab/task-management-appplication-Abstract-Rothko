// Utilities - Starter Code (WITH ERRORS AND MISSING FEATURES)

// Bug: Not using proper data structures
export const priorities = {"low" : 1, "medium": 2, "high" : 3};


export function saveToStorage(data) {
    try {
        localStorage.setItem("tasks", JSON.stringify(data));
    } catch(error) {
        console.log(`Failed to save data: ${error.message}`);
    }
}

export function loadFromStorage() {
    try {
        const data = JSON.parse(localStorage.getItem("tasks"));
        return data;
    } catch(error) {
        console.log(`Failed to load data: ${error.message}`);
    }
}


export function generateRandomId() {
    return Math.round(Math.random() * 100 - 1);
}


export function formatTaskName(name) {
    let result = name
        .trim()
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return result;
}

export function isHighPriority(task) {
    return task.priority === "high";
}

// Missing: Class definitions
// Missing: Inheritance example
// Missing: Module exports
// Missing: Proper use of operators (logical, comparison)
// Missing: Recursion
// Missing: Functional programming patterns
// Missing: Proper scope demonstration
