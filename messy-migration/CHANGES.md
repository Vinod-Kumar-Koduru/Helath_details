# Code Refactoring Challenge – Node.js Solution

This repository contains the **refactored and modernized version** of a legacy API. The original application was built using Python/Flask and has been **migrated to Node.js** with the Express.js framework to improve **security, performance, and maintainability**.

---

## Architectural Decision: Migration to Node.js

The legacy Python/Flask code was migrated to **Node.js + Express** for the following reasons:

* My **strong experience and expertise** in the Node.js ecosystem.
* Faster development and debugging using familiar tooling.
* Easier implementation of modern security practices and RESTful design principles.
* Better scalability and long-term maintainability.

---

## 🛠️ Issues Identified and Solutions

| **Issue Identified**       | **Problem Description**                                           | **Solution Implemented**                                                                                     |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **SQL Injection**          | Unsafe template strings allowed attackers to inject SQL commands. | Refactored all queries to use 
  **parameterized statements** (`?`) to prevent injection attacks.               |
| **Plaintext Passwords**    | Passwords were stored and compared in plain text.                 | Integrated **bcrypt** to hash and salt passwords before storing. Authentication uses `bcrypt.compare()`.     |
| **Poor API Responses**     | The API returned raw strings and incorrect HTTP status codes.     | Implemented **JSON responses** with appropriate HTTP status codes (`200`, `201`, `400`, `404`, `500`, etc.). |
| **No Error Handling**      | Errors caused application crashes.                                | Added **try/catch blocks** to gracefully handle errors and return a `500 Internal Server Error` if needed.   |
| **Poor Code Organization** | All logic was tightly coupled in a single file.                   | Introduced a **service layer (`user.service.js`)** to handle DB logic. Routing logic remains in `app.js`.    |

---

##Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: SQLite
* **Security**: bcrypt (for password hashing)

---

## 🚀 Getting Started

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher)
* [npm](https://www.npmjs.com/)

### ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/code-refactor-nodejs.git

# 2. Navigate to the project directory
cd code-refactor-nodejs

# 3. Install dependencies
npm install

# 4. Initialize the database with sample data
node init_db.js

# 5. Start the application
node app.js
```

📡 The API will be available at: [http://localhost:5009](http://localhost:5009)

---

## 🤖 AI Usage Policy

* **Tool Used**: Google Gemini
* **Purpose**: AI assistance was used to:
  * Identify vulnerabilities like **SQL Injection** and **plaintext password storage**.
  * Suggest best practices for **error handling**, **secure authentication**.
  * document preparation
* **Integration**: While suggestions and code snippets were provided by AI, all integration, and 
architecture decisions were made and implemented by me.

---

## 📂 Folder Structure

```
.
├── app.js              # Main Express app
├── init_db.js          # DB initialization script
├── user.service.js     # Service layer for DB operations
├── database.db         # SQLite database (generated)
├── package.json        # Project config and dependencies
└── README.md           # Project documentation
```

---
## URLS
-> GET
  http://localhost:3000/
  http://localhost:3000/users
  http://localhost:3000/user/1
  http://localhost:3000/search?name=Alice
-> POST
  http://localhost:3000/users
    {"name": "Charlie", "email": "charlie@example.com"}
  http://localhost:3000/login
    {"email": "alice@example.com", "password": "yourpassword"}
-> PUT 
  http://localhost:3000/user/1
    {"email": "alice.new@example.com"}
-> DELETE
  http://localhost:3000/user/2

Let me know if you want a version customized for GitHub Pages, deployment instructions, Postman collection, or a Swagger documentation setup.
