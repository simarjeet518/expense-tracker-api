# Expense Tracker API

## setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`.

Create a database with the command `CREATE DATABASE expenses;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=expenses
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run a the development server with `npm run local`.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:7600/api/debug/reset`.
- Use the browser to navigate to `http://localhost:3002/api/debug/reset

- use `http://localhost:3002/api/users/:id` to get users data
