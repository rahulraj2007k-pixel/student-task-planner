const Task = require("../models/Task");

// ==========================================
// GET DASHBOARD SUMMARY
// ==========================================
const getDashboardSummary = async (req, res) => {
    try {
        // Get all tasks of logged-in user
        const tasks = await Task.find({
            user: req.user
        });

        // Total tasks
        const totalTasks = tasks.length;

        // Status counts
        const pendingTasks = tasks.filter(
            task => task.status === "Pending"
        ).length;

        const inProgressTasks = tasks.filter(
            task => task.status === "In Progress"
        ).length;

        const completedTasks = tasks.filter(
            task => task.status === "Completed"
        ).length;

        // Current date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Overdue tasks
        const overdueTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);

            return dueDate < today && task.status !== "Completed";
        }).length;

        // Upcoming tasks
        const upcomingTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);

            return dueDate >= today && task.status !== "Completed";
        }).length;

        // Completion percentage
        const completionPercentage =
            totalTasks === 0
                ? 0
                : Math.round((completedTasks / totalTasks) * 100);

        res.status(200).json({
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            overdueTasks,
            upcomingTasks,
            completionPercentage
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getDashboardSummary
};