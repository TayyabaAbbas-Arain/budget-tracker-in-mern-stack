# Budget Tracker in MERN Stack

A full-stack budget tracking application built with the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS). This app allows users to register, log in, and manage their income and expenses with a simple and intuitive interface.

## 🚀 Features

- User Registration & Login (Authentication)
- Add, edit, delete income and expense entries (CRUD)
- View list of all transactions
- Track totals of income, expenses, and balance
- Display budget summary in real-time
- Chart (coming soon for data visualization)
- Protected routes (accessible only to logged-in users)
- Clean UI using React and CSS
- Fully modular folder structure

---

## 🛠️ Tech Stack

**Frontend:**  
- ReactJS  
- Axios  
- React Router DOM

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT for authentication  
- bcrypt for password hashing

---

## 🗂️ Folder Structure

Tayyaba-Abbas-Arain_Final-EAD-Project/
│
├── budget-tracker-client/ # Frontend (React)
│ └── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Login, Register, Dashboard
│ ├── services/ # API calls
│ └── App.js # Routes and structure
│
├── budget-tracker-server/ # Backend (Express + Node)
│ ├── controllers/ # authController, budgetController
│ ├── middleware/ # JWT auth middleware
│ ├── models/ # User and Budget schemas
│ ├── routes/ # API route files
│ └── server.js # Server entry point
│
└── README.md
