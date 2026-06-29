# AI Code Analyser

An intelligent, full-stack application that analyzes project codebases and provides insights using the Gemini API. 

## 🚀 Features

*   **Code Analysis:** Deep contextual evaluation of source code.
*   **Secure Authentication:** Refactored middleware validation for API requests.
*   **Analysis History:** Dedicated dashboard tracking past analysis logs.
*   **Intuitive Editor:** Clean workspace to input and process source files.

---

## 🛠️ Project Structure

```text
AI-code-analyser/
├── client/                 # Frontend (React + Vite)
│   └── src/
│       ├── components/     # Reusable UI elements (Navbar, etc.)
│       ├── hooks/          # Custom Hooks (useAuth)
│       ├── pages/          # EditorPage, HistoryPage, etc.
│       └── services/       # Front-end API clients (analysisService)
└── server/                 # Backend (Node.js + Express)
    ├── middleware/         # Custom route guards (auth.js)
    ├── routes/             # API Endpoints (analysis.js, history.js)
    └── services/           # External API integrators (geminiService)
