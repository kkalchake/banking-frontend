# Banking App Frontend

A modern frontend interface for the Simple Banking Application, built with **React** and **Vite**. This application handles user authentication (login/registration) and banking operations by communicating with a Spring Boot backend.

## 🚀 Tech Stack

* **Framework:** [React](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** CSS
* **Linting:** ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* npm (Node Package Manager)

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/kkalchake/banking-frontend.git](https://github.com/kkalchake/banking-frontend.git)
    cd banking-frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The app will typically run at `http://localhost:5173` (check your terminal for the exact port).

## 🔌 Backend Integration

This frontend is designed to work with a local Java/Spring Boot backend.
* **Backend URL:** The app expects the backend to be running at `http://localhost:8080`.
* **Endpoints Used:**
    * `POST /api/register` - Create a new user
    * `POST /api/login` - Authenticate user
    * `POST /api/account` - Create a new bank account
    * `GET /api/balance` - Check balance
    * `POST /api/deposit` - Deposit funds
    * `POST /api/withdraw` - Withdraw funds

> **Note:** Ensure your backend server is running before attempting to log in or register.

## 📂 Project Structure

```text
banking-frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # React components (Login, Dashboard, etc.)
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── .env             # Environment variables
├── index.html       # HTML entry point
└── vite.config.js   # Vite configuration
