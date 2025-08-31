Travel-Tracker
Travel Tracker is a simple web app built with Node.js, Express, and PostgreSQL that lets you keep track of the countries you’ve visited. You can add new countries, view your travel history, and get instant feedback for duplicates or invalid entries.

Features
- View all visited countries.
- Add a new country by name (case-insensitive, partial matches allowed).
- Prevents duplicate entries.
- Error handling for invalid country names.
- EJS templates for frontend rendering.


---

🛠️ Setup Instructions

1. Clone the repository

git clone https://github.com/your-username/travel-tracker.git
cd travel-tracker

2. Install dependencies

npm install

3. Set up PostgreSQL

Create a database named world

CREATE DATABASE world;

Run the schema and seed files:

psql -U postgres -d world -f schema.sql
psql -U postgres -d world -f seed.sql

4. Update Database Credentials

In index.js, update the PostgreSQL credentials if needed:

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "your_password_here",
  port: 5432,
});

5. Start the server
node index.js


App runs at: http://localhost:3000
