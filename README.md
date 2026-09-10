# Student Task Planner

A full-stack web application designed to help students create, manage, track, and organize their academic tasks efficiently.

## ðŸš€ Features

- User Registration and Login
- Secure password hashing using bcryptjs
- JWT-based authentication
- Create new tasks
- Edit existing tasks
- Delete tasks
- Task priorities:
  - Low
  - Medium
  - High
- Task statuses:
  - Pending
  - In Progress
  - Completed
- Filter tasks by status
- Filter tasks by priority
- Dashboard task summary
- Completion percentage
- Visual progress bar
- Upcoming task section
- Overdue task indicator
- Due Today indicator
- Due Soon indicator
- User-specific task management
- MongoDB database persistence
- Responsive dashboard design

## ðŸ› ï¸ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## ðŸ“ Project Structure

```text
student-task-planner/
â”‚
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â””â”€â”€ db.js
â”‚   â”‚
â”‚   â”œâ”€â”€ controllers/
â”‚   â”‚   â”œâ”€â”€ authController.js
â”‚   â”‚   â”œâ”€â”€ dashboardController.js
â”‚   â”‚   â””â”€â”€ taskController.js
â”‚   â”‚
â”‚   â”œâ”€â”€ middleware/
â”‚   â”‚   â””â”€â”€ authMiddleware.js
â”‚   â”‚
â”‚   â”œâ”€â”€ models/
â”‚   â”‚   â”œâ”€â”€ User.js
â”‚   â”‚   â””â”€â”€ Task.js
â”‚   â”‚
â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â”œâ”€â”€ authRoutes.js
â”‚   â”‚   â”œâ”€â”€ dashboardRoutes.js
â”‚   â”‚   â””â”€â”€ taskRoutes.js
â”‚   â”‚
â”‚   â”œâ”€â”€ .env
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ server.js
â”‚
â”œâ”€â”€ frontend/
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â””â”€â”€ style.css
â”‚   â”‚
â”‚   â”œâ”€â”€ js/
â”‚   â”‚   â”œâ”€â”€ auth.js
â”‚   â”‚   â””â”€â”€ dashboard.js
â”‚   â”‚
â”‚   â”œâ”€â”€ index.html
â”‚   â”œâ”€â”€ login.html
â”‚   â””â”€â”€ register.html
â”‚
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md
## Project Screenshots

### 1. Registration Page
![Registration Page](screenshots/Register.png)

### 2. Login Page
![Login Page](screenshots/login.png)

### 3. Dashboard
![Dashboard](screenshots/Dashboard.png)

### 4. Add Task
![Add Task](screenshots/add-task.png)

### 5. My Tasks
![My Tasks](screenshots/my-task.png)

### 6. Upcoming Tasks
![Upcoming Tasks](screenshots/upcoming-task.png)



