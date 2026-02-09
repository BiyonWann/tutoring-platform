# User Service

User registration, login, and JWT-based authentication.

## Tech Stack 

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** JWT + bcrypt

## Project Structure

```
src/
├── config/           # Environment variable validation and app config
│   └── index.ts
├── controllers/      # HTTP request/response 
│   └── authController.ts
├── services/         # Business logic 
│   └── authService.ts
├── routes/           # Routing definition
│   └── authRoutes.ts
├── middleware/       # Express middleware
│   ├── auth.ts             # jwt auth stamp 
│   └── errorHandler.ts     # to easily handle errors 
├── utils/            # Shared functions 
│   ├── jwt.ts              # Token generation & verification
│   └── password.ts         # Password hashing & comparison
├── types/            # TypeScript interfaces (can change/delete)
│   └── index.ts
├── __tests__/        # Testing
└── server.ts         # App entry point
```

### src/folders

- Routes: define endpoints/attach middleware
- Controllers: parse the http request and call the correct service
- Services: contains business logic and talks to database 
- Middleware: runs before controllers for auth checks/error handling 

## Setup

### 1. Clone Repo

```bash
git clone https://github.com/YOUR_USERNAME/tutoring-platform.git
cd tutoring-platform/user-service
```

### 2. Dependencies

```bash
npm install
```

### 3. `.env` file

Create a `.env` file in this directory (will send database_url and jwt seperately):

```
DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres"
PORT=3001
NODE_ENV="development"
JWT_SECRET="your-jwt-secret"
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Push schema to database

```bash
npm run prisma:push
```

### 6. Run the dev server

```bash
npm run dev
```

## API Endpoints (to implement)
- POST | `/api/auth/signup` 
- POST | `/api/auth/signin` 
- GET | `/api/auth/me` 

## Database Schema

The `User` model:

| Field | Type | Notes |
|---|---|---|
| id | UUID | Auto-generated |
| email | String | Unique |
| password | String | Stored as bcrypt hash |
| firstName | String | |
| lastName | String | |
| role | String | Defaults to "student" |
| createdAt | DateTime | Auto-set |
| updatedAt | DateTime | Auto-updated |

## Available Scripts

| Script | Functionality|
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run prisma:generate` | Regenerate Prisma Client after schema changes |
| `npm run prisma:push` | Sync schema to database |
| `npm run prisma:studio` | Open database in browser |
