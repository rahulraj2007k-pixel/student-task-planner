 const API_URL = "https://student-task-planner-8foj.onrender.com/api";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

// ==========================================
// AUTH CHECK
// ==========================================

if (!token) {
    window.location.href = "login.html";
}

// ==========================================
// DOM ELEMENTS
// ==========================================

const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const clearFilters = document.getElementById("clearFilters");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const upcomingTasksContainer =
    document.getElementById("upcomingTasks");

// ==========================================
// USER NAME
// ==========================================

if (user) {
    welcomeUser.textContent = `Welcome, ${user.name}`;
}

// ==========================================
// LOGOUT
// ==========================================

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
});

// ==========================================
// OPEN ADD TASK MODAL
// ==========================================

addTaskBtn.addEventListener("click", () => {

    taskForm.reset();

    document.getElementById("taskId").value = "";

    document.getElementById("modalTitle").textContent =
        "Add New Task";

    taskModal.classList.add("show");
});

// ==========================================
// CLOSE MODAL
// ==========================================

closeModal.addEventListener("click", () => {
    taskModal.classList.remove("show");
});

// Close modal by clicking outside
window.addEventListener("click", (event) => {

    if (event.target === taskModal) {
        taskModal.classList.remove("show");
    }

});

// ==========================================
// LOAD DASHBOARD SUMMARY
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(
            `${API_URL}/dashboard/summary`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to load dashboard"
            );
        }

        // Summary cards
        document.getElementById("totalTasks").textContent =
            data.totalTasks;

        document.getElementById("pendingTasks").textContent =
            data.pendingTasks;

        document.getElementById("inProgressTasks").textContent =
            data.inProgressTasks;

        document.getElementById("completedTasks").textContent =
            data.completedTasks;

        document.getElementById("overdueTasks").textContent =
            data.overdueTasks;

        document.getElementById("completionPercentage").textContent =
            `${data.completionPercentage}%`;

        // Progress bar
        if (progressBar) {
            progressBar.style.width =
                `${data.completionPercentage}%`;
        }

        // Progress percentage
        if (progressText) {
            progressText.textContent =
                `${data.completionPercentage}%`;
        }

    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );
    }
}

// ==========================================
// LOAD TASKS
// ==========================================

async function loadTasks() {

    try {

        let url = `${API_URL}/tasks`;

        const params = new URLSearchParams();

        if (statusFilter.value) {

            params.append(
                "status",
                statusFilter.value
            );
        }

        if (priorityFilter.value) {

            params.append(
                "priority",
                priorityFilter.value
            );
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(
            url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load tasks"
            );
        }

        displayTasks(data.tasks);

    } catch (error) {

        console.error(
            "Task Loading Error:",
            error
        );

        taskList.innerHTML = `
            <div class="no-tasks">
                <h3>Unable to load tasks</h3>
                <p>Please check your server connection.</p>
            </div>
        `;
    }
}

// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks(tasks) {

    if (!tasks || tasks.length === 0) {

        taskList.innerHTML = `
            <div class="no-tasks">
                <h3>No tasks found</h3>
                <p>Add a new task to get started.</p>
            </div>
        `;

        return;
    }

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const taskCard =
            document.createElement("div");

        taskCard.className = "task-card";

        const reminder =
            getReminderStatus(task);

        taskCard.innerHTML = `

            <div class="task-content">

                <div class="task-top">

                    <h3>
                        ${escapeHTML(task.title)}
                    </h3>

                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                </div>

                <p class="task-description">
                    ${escapeHTML(
                        task.description ||
                        "No description"
                    )}
                </p>

                <div class="task-info">

                    <span>
                        📅 ${formatDate(task.dueDate)}
                    </span>

                    <span class="status ${getStatusClass(task.status)}">
                        ${task.status}
                    </span>

                    ${
                        reminder
                            ? `
                                <span class="reminder ${reminder.className}">
                                    ${reminder.icon}
                                    ${reminder.text}
                                </span>
                            `
                            : ""
                    }

                </div>

            </div>

            <div class="task-actions">

                <button
                    class="edit-btn"
                    onclick="editTask('${task._id}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask('${task._id}')"
                >
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(taskCard);
    });
}

// ==========================================
// REMINDER STATUS
// ==========================================

function getReminderStatus(task) {

    if (task.status === "Completed") {
        return null;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const dueDate =
        new Date(task.dueDate);

    dueDate.setHours(
        0,
        0,
        0,
        0
    );

    const difference =
        Math.ceil(
            (dueDate - today) /
            (1000 * 60 * 60 * 24)
        );

    if (difference < 0) {

        return {
            text: "Overdue",
            icon: "🔴",
            className: "overdue"
        };
    }

    if (difference === 0) {

        return {
            text: "Due Today",
            icon: "🟠",
            className: "due-today"
        };
    }

    if (difference <= 2) {

        return {
            text: "Due Soon",
            icon: "🟡",
            className: "due-soon"
        };
    }

    return {
        text: "Upcoming",
        icon: "🟢",
        className: "upcoming"
    };
}

// ==========================================
// LOAD UPCOMING TASKS
// ==========================================

async function loadUpcomingTasks() {

    try {

        const response = await fetch(
            `${API_URL}/tasks`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load upcoming tasks"
            );
        }

        const today = new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const upcomingTasks =
            data.tasks
                .filter(task => {

                    // Completed tasks are excluded
                    if (
                        task.status ===
                        "Completed"
                    ) {
                        return false;
                    }

                    const dueDate =
                        new Date(
                            task.dueDate
                        );

                    dueDate.setHours(
                        0,
                        0,
                        0,
                        0
                    );

                    return dueDate >= today;
                })
                .sort(
                    (a, b) =>
                        new Date(a.dueDate) -
                        new Date(b.dueDate)
                )
                .slice(0, 5);

        displayUpcomingTasks(
            upcomingTasks
        );

    } catch (error) {

        console.error(
            "Upcoming Tasks Error:",
            error
        );

        upcomingTasksContainer.innerHTML = `
            <div class="no-tasks">
                <h3>Unable to load upcoming tasks</h3>
                <p>Please try again.</p>
            </div>
        `;
    }
}

// ==========================================
// DISPLAY UPCOMING TASKS
// ==========================================

function displayUpcomingTasks(tasks) {

    if (!tasks || tasks.length === 0) {

        upcomingTasksContainer.innerHTML = `
            <div class="no-tasks">
                <h3>No upcoming tasks</h3>
                <p>You are all caught up!</p>
            </div>
        `;

        return;
    }

    upcomingTasksContainer.innerHTML = "";

    tasks.forEach(task => {

        const reminder =
            getReminderStatus(task);

        const item =
            document.createElement("div");

        item.className =
            "upcoming-task";

        item.innerHTML = `

            <div class="upcoming-task-info">

                <h3>
                    ${escapeHTML(task.title)}
                </h3>

                <span>
                    📅 ${formatDate(task.dueDate)}
                </span>

            </div>

            <div class="upcoming-task-right">

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

                ${
                    reminder
                        ? `
                            <span class="reminder ${reminder.className}">
                                ${reminder.icon}
                                ${reminder.text}
                            </span>
                        `
                        : ""
                }

            </div>

        `;

        upcomingTasksContainer.appendChild(item);
    });
}

// ==========================================
// EDIT TASK
// ==========================================

async function editTask(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/tasks`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load task"
            );
        }

        const task =
            data.tasks.find(
                item => item._id === id
            );

        if (!task) {

            alert("Task not found");

            return;
        }

        document.getElementById("taskId").value =
            task._id;

        document.getElementById("taskTitle").value =
            task.title;

        document.getElementById("taskDescription").value =
            task.description || "";

        document.getElementById("taskPriority").value =
            task.priority;

        document.getElementById("taskStatus").value =
            task.status;

        document.getElementById("taskDueDate").value =
            task.dueDate.split("T")[0];

        document.getElementById("modalTitle").textContent =
            "Edit Task";

        taskModal.classList.add("show");

    } catch (error) {

        console.error(
            "Edit Task Error:",
            error
        );

        alert(
            "Unable to edit task"
        );
    }
}

// ==========================================
// ADD / UPDATE TASK
// ==========================================

taskForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const taskId =
            document.getElementById("taskId").value;

        const taskData = {

            title:
                document.getElementById(
                    "taskTitle"
                ).value.trim(),

            description:
                document.getElementById(
                    "taskDescription"
                ).value.trim(),

            priority:
                document.getElementById(
                    "taskPriority"
                ).value,

            status:
                document.getElementById(
                    "taskStatus"
                ).value,

            dueDate:
                document.getElementById(
                    "taskDueDate"
                ).value
        };

        if (
            !taskData.title ||
            !taskData.dueDate
        ) {

            alert(
                "Task title and due date are required."
            );

            return;
        }

        try {

            let url =
                `${API_URL}/tasks`;

            let method = "POST";

            if (taskId) {

                url =
                    `${API_URL}/tasks/${taskId}`;

                method = "PUT";
            }

            const response =
                await fetch(
                    url,
                    {
                        method,

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body:
                            JSON.stringify(
                                taskData
                            )
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Something went wrong"
                );

                return;
            }

            taskModal.classList.remove(
                "show"
            );

            taskForm.reset();

            document.getElementById(
                "taskId"
            ).value = "";

            await loadDashboard();
            await loadTasks();
            await loadUpcomingTasks();

        } catch (error) {

            console.error(
                "Save Task Error:",
                error
            );

            alert(
                "Unable to save task."
            );
        }
    }
);

// ==========================================
// DELETE TASK
// ==========================================

async function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );

    if (!confirmDelete) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/tasks/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            alert(
                data.message ||
                "Unable to delete task"
            );

            return;
        }

        await loadDashboard();
        await loadTasks();
        await loadUpcomingTasks();

    } catch (error) {

        console.error(
            "Delete Task Error:",
            error
        );

        alert(
            "Unable to delete task."
        );
    }
}

// ==========================================
// FILTERS
// ==========================================

statusFilter.addEventListener(
    "change",
    loadTasks
);

priorityFilter.addEventListener(
    "change",
    loadTasks
);

clearFilters.addEventListener(
    "click",
    () => {

        statusFilter.value = "";
        priorityFilter.value = "";

        loadTasks();
    }
);

// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}

// ==========================================
// STATUS CLASS
// ==========================================

function getStatusClass(status) {

    if (status === "Completed") {
        return "completed";
    }

    if (status === "In Progress") {
        return "in-progress";
    }

    return "pending";
}

// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

// ==========================================
// INITIAL LOAD
// ==========================================

loadDashboard();
loadTasks();
loadUpcomingTasks();
