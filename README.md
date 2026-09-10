# Job Application Tracker

A full-stack MERN application for managing job applications, tracking interview progress, and monitoring recruitment status through a responsive dashboard.

## Features

- **Secure Authentication** — User signup/login with JWT-based session handling and bcrypt password hashing
- **Application Dashboard** — Add, view, and manage job applications in one place
- **Status Tracking** — Track each application through stages (Applied, Interviewing, Offer, Rejected, etc.)
- **Search & Filtering** — Quickly find applications by company, role, or status
- **User-Scoped Data** — Each user only sees and manages their own application data
- **Full CRUD Operations** — Create, read, update, and delete application records via REST APIs

## Tech Stack

**Frontend:** React, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Authentication:** JWT (JSON Web Tokens), bcrypt

## Project Structure

```
job-application-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components (Dashboard, Login, etc.)
│   │   ├── services/       # API calls to backend
│   │   └── App.js
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose schemas (User, Application)
│   ├── routes/             # API route handlers
│   ├── middleware/         # Auth middleware (JWT verification)
│   ├── controllers/        # Route logic
│   └── server.js
├── .env.example             # Sample environment variables
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hendrapandian/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the backend server**
   ```bash
   cd server
   npm start
   ```

6. **Run the frontend**
   ```bash
   cd client
   npm start
   ```

The app should now be running at `http://localhost:3000` with the API on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint              | Description                     | Auth Required |
|--------|------------------------|----------------------------------|----------------|
| POST   | `/api/auth/register`  | Register a new user             | No             |
| POST   | `/api/auth/login`     | Log in and receive a JWT         | No             |
| GET    | `/api/applications`   | Get all applications for user    | Yes            |
| POST   | `/api/applications`   | Create a new application entry   | Yes            |
| PUT    | `/api/applications/:id` | Update an application entry    | Yes            |
| DELETE | `/api/applications/:id` | Delete an application entry    | Yes            |

## Screenshots

*(Add screenshots of your dashboard, login page, and application list here)*

## Future Improvements

- Email reminders for interview dates
- Analytics view (applications sent vs. responses vs. offers)
- Resume/cover letter file attachments per application
- Kanban-style drag-and-drop status board

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Hendra Pandian**
[LinkedIn](https://www.linkedin.com/in/hendra-pandian-b38867340/) · [GitHub](https://github.com/hendrapandian)
