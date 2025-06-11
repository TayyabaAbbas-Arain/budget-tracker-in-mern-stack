require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budgets');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));


/*
Library	    Purpose 
express	    Backend server aur routes banane ke liye
mongoose	MongoDB ke saath asaani se kaam karne ke liye
bcryptjs	Passwords ko secure (hash) karne ke liye
JWT         jsonwebtoken token generate aur verify karne ke liye
cors	    React frontend ko backend se securely connect karne ke liye
dotenv	    Secrets (.env file) securely manage karne ke liye
*/

/*
Great question! Let me explain JWT Auth clearly for you:

---

### What is **JWT Authentication**?

**JWT** stands for **JSON Web Token**. It’s a secure way to verify the identity of a user after they log in, so the server knows who is making requests without asking for username/password every time.

---

### How does it work?

1. **User logs in** with email/password.
2. Server checks credentials and, if correct, creates a **JWT token** (a string of letters and numbers).
3. Server sends this token back to the user.
4. User’s frontend stores the token (usually in localStorage or memory).
5. For every API request (like adding a budget), frontend sends this token in the request header.
6. Server checks the token to **verify user identity** and allows or denies the action.

---

### Why are we using JWT for your project?
* **Secure:** Passwords are never sent with each request.
* **Stateless:** Server doesn’t need to store session data; token carries the info.
* **Industry standard:** Used in many real-world apps and projects.
* **Project requirements:** Your project requires user authentication; JWT is a good modern approach.
* **Easy to implement:** Many libraries support JWT (like jsonwebtoken in Node.js).

---


### Summary:

| What JWT does            | Why use it?                          |
| ------------------------ | ------------------------------------ |
| Verifies logged-in user  | Secure, scalable, and modern         |
| Stores identity in token | No need to keep server session state |
| Used on every request    | Makes API calls authorized           |

*/