📘 API Documentation – Budget Pro
This document describes the available API endpoints of the Budget Pro application.


🟢 Auth Routes
🔹 POST /api/register
Register a new user.

Request Body:
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "Password123!"
}

Response:
{
  "message": "User registered successfully"
}


🔹 POST /api/login
Login user and get JWT token.

Request Body:
{
  "email": "user@example.com",
  "password": "Password123!"
}

Response:
{
  "token": "jwt_token_here"
}


🟢 Budget Routes (Protected – requires JWT token)
All these routes require this header:
Authorization: Bearer <your_jwt_token>

🔹 GET /api/budgets
Get all budgets of the logged-in user.

Response:
[
  {
    "_id": "id",
    "title": "Grocery",
    "amount": 5000,
    "category": "Food",
    "createdAt": "date"
  },
  ...
]

🔹 POST /api/budgets
Create a new budget.

Request Body:
{
  "title": "Grocery",
  "amount": 5000,
  "category": "Food"
}

Response:
{
  "message": "Budget created successfully"
}

🔹 PUT /api/budgets/:id
Update an existing budget.

Request Body:
{
  "title": "Updated Title",
  "amount": 6000,
  "category": "Rent"
}


Response:
{
  "message": "Budget updated successfully"
}

🔹 DELETE /api/budgets/:id
Delete a budget.

Response:
{
  "message": "Budget deleted successfully"
}

🧪 How to Test the API Easily
You can use the Thunder Client VS Code extension for testing the API endpoints:

✅ Steps:
Install Thunder Client Extension

Test the endpoints:
Open Thunder Client tab.
Click New Request.
Enter the API URL (e.g., https://your-backend-url/api/login).
Select POST, GET, PUT, or DELETE as needed.
In the Body tab, choose JSON and enter request data.
For protected routes, add Authorization header:
Bearer <your_jwt_token>
Click Send to see the response.

Verify responses:
Check status codes (200, 201, etc.)
Confirm JSON response data.
