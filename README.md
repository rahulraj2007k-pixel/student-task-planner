 # Student Task Planner

A full-stack web application designed to help students create, manage, track, and organize their academic tasks efficiently.

## Features

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

## Technologies Used

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

## Project Structure

```text
student-task-planner/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   └── dashboard.js
│   │
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── screenshots/
│   ├── add-task.png
│   ├── Dashboard.png
│   ├── login.png
│   ├── my-task.png
│   ├── Register.png
│   └── upcoming-task.png
│
├── .gitignore
└── README.md
```

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

## Live Demo

[Student Task Planner - Live Demo](https://student-task-planner-1.onrender.com)

## GitHub Repository

[Student Task Planner - GitHub Repository](https://github.com/rahulraj2007k-pixel/student-task-planner)

## Authentication

The application uses JWT-based authentication.

Passwords are securely hashed using bcryptjs before being stored in the database.

Users can only access and manage their own tasks.

## Database

MongoDB is used for persistent storage.

Mongoose is used to define schemas and interact with MongoDB.

## Deployment

- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas

## Future Improvements

- Task reminder notifications
- Email reminders
- Calendar integration
- Dark mode
- Advanced task analytics
- Mobile application

## Author

Rahul Kumar

BCA Student