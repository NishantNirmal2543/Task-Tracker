Here’s the README entirely in code format, with all points included in markdown syntax:

markdown
Copy code

# Task Tracker

Task Tracker is a task management application that allows users to track and manage their tasks effectively. This project is built with Next.js and includes user authentication, a dashboard for managing tasks, and a mobile-responsive layout.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Assumptions](#assumptions)
- [Project Highlights](#project-highlights)
- [Built With](#built-with)


## Getting Started

To get a local copy of the project up and running, follow the steps below.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.0 or higher recommended)
- [Git](https://git-scm.com/)
- An active internet connection to install dependencies

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NishantNirmal2543/Task-Tracker.git
   ```
2. **Navigate to the project directory**
   ```bash
   cd Task-Tracker
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Running the Project Locally**
   After completing the installation, you can start the development server:

   ```bash
    npm run dev
    Once the server is running, open your browser and go to:

    http://localhost:3000
    You should now see the Task Tracker application running locally.
   ```

### Additional Notes

If you encounter a dependency conflict, try running:

npm install --legacy-peer-deps

### Assumptions

- The user credentials are stored locally for demo purposes (default credentials: username admin, password password).
- No back-end database is connected in the local setup, so data is not persistent between sessions.
- A login page serves as the home page for this project.

### Project Highlights

- User Authentication: Basic login functionality is implemented. Only authorized users can access the dashboard.
- Task Dashboard: A centralized dashboard allows users to create, manage, and track tasks.
- Responsive Design: The project is mobile-responsive, with a desktop-first layout and mobile adjustments.
- Chart Integration: Task trends are visualized with react-chartjs-2 (requires compatibility with React version 18 or lower).

### Built With

- Next.js - The React framework for production
- React - JavaScript library for building user interfaces
- Chart.js - Data visualization library for charts
- CSS - For styling the components
