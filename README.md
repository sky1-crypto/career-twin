# Career Twin

Career Twin is an AI-powered career assistant that analyzes a user's resume, skills, GitHub profile, coding progress, and career goals to provide personalized guidance for internships and job preparation.

## Features Implemented

### Authentication

* User Registration
* User Login
* JWT Authentication

### Resume Analysis

* Resume Upload (PDF)
* PDF Text Extraction
* Skill Extraction
* Skill Categorization
* Resume Storage in MongoDB

### Skill Intelligence

* Categorizes skills into:

  * Programming
  * Frontend
  * Backend
  * Database
  * DevOps
  * Tools

### Gap Analysis

* Compare user skills against target roles
* Supported roles:

  * Full Stack Developer
  * Backend Developer
  * Software Development Engineer (SDE)

Example Output:

```json
{
  "score": 62.5,
  "have": [
    "javascript",
    "node.js",
    "mongodb"
  ],
  "missing": [
    "react",
    "docker",
    "typescript"
  ]
}
```

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### File Processing

* Multer
* pdf-parse

## Project Structure

```text
career_twin/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the project:

```bash
npm run dev
```

## Upcoming Features

* GitHub Profile Analysis
* LeetCode Progress Tracking
* AI Interview Preparation
* Company-Specific Skill Gap Detection
* Career Readiness Score
* Personalized Learning Roadmap
* LLM-Powered Career Coach

## Author

Sanjeet Kumar
Building Career Twin to help students understand their career readiness, identify skill gaps, and improve their chances of securing internships and full-time opportunities.
