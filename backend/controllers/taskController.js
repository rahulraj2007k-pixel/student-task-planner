 const Task = require("../models/Task");

// ==========================================
// CREATE TASK
// ==========================================
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            status
        } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({
                message: "Title and due date are required"
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            status,
            user: req.user
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// GET ALL USER TASKS + FILTER
// ==========================================
const getTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;

        // Only current logged-in user's tasks
        const filter = {
            user: req.user
        };

        // Status filter
        if (status) {
            filter.status = status;
        }

        // Priority filter
        if (priority) {
            filter.priority = priority;
        }

        const tasks = await Task.find(filter)
            .sort({ dueDate: 1 });

        res.status(200).json({
            count: tasks.length,
            filters: {
                status: status || "All",
                priority: priority || "All"
            },
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// UPDATE TASK
// ==========================================
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user
        });

        // Task doesn't belong to current user
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const {
            title,
            description,
            priority,
            dueDate,
            status
        } = req.body;

        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.priority = priority ?? task.priority;
        task.dueDate = dueDate ?? task.dueDate;
        task.status = status ?? task.status;

        const updatedTask = await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// DELETE TASK
// ==========================================
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user
        });

        // Task doesn't belong to current user
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};