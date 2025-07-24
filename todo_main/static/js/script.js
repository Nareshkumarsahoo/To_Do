let taskList = document.getElementById("taskList");
let searchInput = document.getElementById("searchInput");

// Load tasks from localStorage
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed, task.timestamp));
};

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const timestamp = new Date().toLocaleString();
  renderTask(taskText, false, timestamp);
  saveTask(taskText, false, timestamp);

  input.value = "";
}

// Render task
function renderTask(text, completed, timestamp) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const textDiv = document.createElement("div");
  textDiv.className = "task-text";

  const span = document.createElement("span");
  span.innerText = text;
  span.onclick = () => {
    li.classList.toggle("completed");
    updateStorage();
  };

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "🗑️";
  delBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  textDiv.appendChild(span);
  textDiv.appendChild(delBtn);

  const time = document.createElement("div");
  time.className = "timestamp";
  time.innerText = timestamp;

  li.appendChild(textDiv);
  li.appendChild(time);

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed, timestamp) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed, timestamp });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage after change
function updateStorage() {
  const items = taskList.querySelectorAll("li");
  const tasks = [];
  items.forEach(item => {
    const text = item.querySelector("span").innerText;
    const completed = item.classList.contains("completed");
    const timestamp = item.querySelector(".timestamp").innerText;
    tasks.push({ text, completed, timestamp });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAllTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

// Filter tasks
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const tasks = taskList.querySelectorAll("li");
  tasks.forEach(task => {
    const text = task.innerText.toLowerCase();
    task.style.display = text.includes(filter) ? "block" : "none";
  });
});

// Support Enter key
document.getElementById("taskInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});
