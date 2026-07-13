// Jest Tests

import { Task, taskList, addTask, findTaskByTitle, updateTaskPriority, calculateAveragePriority, SubTask, countCompletedTasks, getHighPriorityTasks, mergeTasks, getTaskDetails } from "../src/app.js";
import { formatTaskName, formatTaskPriority, generateRandomId, isHighPriority, isMediumPriority, isLowPriority } from "../src/utils.js";

describe('Task Class', () => {
    test('should create a task', () => {
        const task = new Task('Test Task', 'Description', 3);
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Description');
        expect(task.priority).toBe(3);
        expect(task.completed).toBe(false);
    });
    
    test('getInfo method should return a string', () => {
        const task = new Task('Test Task', 'Description', 3);
        expect(task.getInfo()).toBe('Task: Test Task - Priority: 3');
    })
    
    test('should change the boolean property', () => {
        const task = new Task('Test Task', 'Description', 3);
        task.toggleCompletion();
        expect(task.completed).toBe(true)
    })

    test('id should be unique', () => {
        const task = new Task('Test Task', 'Description', 3);
        const task2 = new Task('Test Task', 'Description', 2);
        expect(task.id).not.toBe(task2.id);
    })
});

describe('Task Functions', () => {
    beforeEach(() => {
        taskList.length = 0;
    })
    
    test('should add task', () => {
        const task = addTask('New Task', 'Test', 2);

        expect(taskList).toHaveLength(1);
        expect(taskList[0]).toBe(task);
        expect(task).toBeDefined();
    });
    
    test('should find a task by its title', () => {
        const task = addTask('Task Title', 'Description', 1);
        expect(findTaskByTitle('Task Title')).toEqual(task);
    })

    test('should update priority', () => {
        const task = addTask('Task', 'Description', 1);
        const output = updateTaskPriority(task.id, 2);
        expect(task.priority).toBe(2);
        expect(output).toBeTruthy();
    })


    test('should return the average priority', () => {
        addTask('First Task', 'First Description', 1);
        addTask('Second Task', 'Second Description', 2);
        addTask('Third Task', 'Third Description', 3);
        const average = calculateAveragePriority(taskList);
        expect(average).toBe(2);
    })


    test('should not update priority', () => {
        const task = addTask('Title', 'Description', 3);
        const output = updateTaskPriority(task.id, 4);
        expect(task.priority).not.toBe(4);
        expect(output).toBeFalsy();
    })

    test('should throw if incorrect data type', () => {
        expect(() => addTask(10, 'description', 1)).toThrow();
    })

    test('should throw if parameter is not a number', () => {
        expect(() => updateTaskPriority(null, 2)).toThrow();
    })

});

describe('Array Operations', () => {
    beforeEach(() => {
        taskList.length = 0;
    })

    test('should merge tasks into single array', () => {
        const list1 = [{title: 'First', description: 'A', priority: 1}, {title: 'Second', description: 'B', priority: 2}];
        const list2 = [{title: 'Three', description: 'C', priority: 3}];

        expect(mergeTasks(list1, list2)).toEqual([{title: 'First', description: 'A', priority: 1}, {title: 'Second', description: 'B', priority: 2}, {title: 'Three', description: 'C', priority: 3}])
    })

    test('should return a filtered array', () => {
        addTask('First Task', 'First Description', 1);
        addTask('Second Task', 'Second Description', 2);
        addTask('Third Task', 'Third Description', 3);
        const filteredData = getHighPriorityTasks(1);
        expect(filteredData).toHaveLength(2);
    })

    test('should return total completed tasks', () => {
        const task1 = addTask('First Task', 'First Description', 1);
        task1.toggleCompletion()
        const task2 = addTask('Second Task', 'Second Description', 2);
        task2.toggleCompletion()
        const task3 = addTask('Third Task', 'Third Description', 3);

        const totalCompleted = countCompletedTasks(taskList, 0);
        expect(totalCompleted).toBe(2);
    })
});

describe('SubTask', () => {
    test('should be a subtask of Task', () => {
        const task = new Task('First Title', 'First Description', 1);
        const sub = new SubTask('Sub Title', 'Sub Description', 2, task);

        expect(sub).toBeInstanceOf(Task);
        expect(sub.title).toBe('Sub Title');
        expect(sub.description).toBe('Sub Description');
        expect(sub.priority).toBe(2);
        expect(sub.parentTask).toBe(task);
    })
})

describe('destructuring function', () => {
    test("should destructure an object", () => {
        const task = new Task('First', 'Description', 3);
        const details = getTaskDetails(task);

        expect(details).toEqual({title: task.title, description: task.description, priority: task.priority, completed: task.completed});
    })
    
})