Budget Tracker (MERN Stack)
A simple and intuitive Budget Tracker web application built with MERN stack that allows users to:
Add, edit, delete, and filter budgets.
Securely register and login using JWT authentication.
Track budgets by category and time period (last 7 / 30 days).
View total budgets and total amount at a glance.

Live Demo 👉 https://dainty-malasada-65b9be.netlify.app

🚀 Features
✅ User Authentication
Register (with strong password rules)
Login / Logout (JWT-based)

✅ Budget Management
Add budget with title, amount, category (custom category support)
Edit existing budget
Delete budget
Filter budgets (All, Last 7 Days, Last 30 Days)
View total count and total amount

✅ UI
Responsive, clean, simple UI
Success / error messages display (like real apps)

✅ Tech
MERN stack (MongoDB, Express, React, Node.js)
Axios for API requests
CSS styling


🛠 Tech Stack
Layer	            Technology
Frontend	        ReactJS, Axios, CSS
Backend	            Node.js, Express.js
Database	        MongoDB Atlas
Authentication	    JWT (JSON Web Tokens)
Deployment	        Netlify (Frontend), Glitch (Backend)
Version Control	    GitHub

📂 Folder Structure
/client → React Frontend  
/server → Node + Express Backend  

📝 Installation (Local)
1️⃣ Clone repo
git clone https://github.com/TayyabaAbbas-Arain/budget-tracker-in-mern-stack.git
cd budget-tracker-in-mern-stack

2️⃣ Setup backend
cd budget-tracker-server
npm install
create .env file → Add MONGO_URI, JWT_SECRET, PORT
npm run dev

3️⃣ Setup frontend
cd ../client
npm install
npm start

💡 Future Improvements
Improve Visualization
Export budgets as CSV
Pagination / infinite scroll
Better UI/UX with frameworks like Tailwind or Material-UI

📌 Author
👤 Tayyaba Abbas Arain
Sole Developer — Designed and implemented the entire app.

📎 Links
🌐 Live App:https://tayyabaabbasarain-budget-tracker.netlify.app/
💻 GitHub Repo:https://github.com/TayyabaAbbas-Arain/budget-tracker-in-mern-stack.git