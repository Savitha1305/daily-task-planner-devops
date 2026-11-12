
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Add a new task
addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
});

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Display saved tasks when page opens
displayTasks();
