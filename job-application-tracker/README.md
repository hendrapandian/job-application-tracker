# Job Application Tracker

A full-stack web application for tracking job applications, interviews, and recruitment progress.

## Features

- User registration and login
- JWT authentication
- Add, edit, and delete job applications
- Track application status
- Search and filter applications
- Dashboard statistics
- User-specific application data
- REST API
- MongoDB persistence

## Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router

### Backend
- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
job-application-tracker/
├── client/
├── server/
├── .gitignore
├── LICENSE
└── README.md
```

## Setup

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Start the backend:

```bash
npm run dev
```

### 2. Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Applications

- `GET /api/applications`
- `GET /api/applications/stats`
- `GET /api/applications/:id`
- `POST /api/applications`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

## GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
