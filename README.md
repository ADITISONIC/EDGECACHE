# 🚀 EdgeCache

A scalable, production-style **URL Shortener Backend** built with **Node.js, Express, TypeScript, MongoDB Atlas, and Redis**. EdgeCache provides secure authentication, high-performance URL redirection using Redis caching, rate limiting, analytics, and Docker support.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👤 User Registration & Login
- 🔗 URL Shortening
- 🎯 Custom Short URL Aliases
- ⚡ Redis Cache for Faster Redirects
- 📊 Click Analytics
- 🗑️ Delete URLs (User Ownership Protected)
- 🚦 API Rate Limiting
- 🐳 Docker & Docker Compose Support
- ☁️ MongoDB Atlas Integration
- 🏗️ Clean MVC Architecture

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB Atlas
- Redis

### Authentication
- JWT (JSON Web Token)
- bcrypt

### DevOps
- Docker
- Docker Compose

### Other Libraries
- Mongoose
- Express Rate Limit
- Helmet
- CORS
- Morgan
- NanoID

---

# 📂 Project Structure

```text
EdgeCache/
│
├── src/
│   ├── cache/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/<your-github-username>/EdgeCache.git

cd EdgeCache
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5049

MONGO_URI=your_mongodb_connection_string

REDIS_URL=redis://localhost:6379

JWT_SECRET=your_secret_key

RATE_LIMIT_MAX_REQUESTS=100

RATE_LIMIT_WINDOW=60
```

Start the development server

```bash
npm run dev
```

---

# 🐳 Running with Docker

Build and start the application

```bash
docker compose up --build
```

This starts

- EdgeCache API
- Redis Server

MongoDB is hosted on **MongoDB Atlas**.

---

# 📡 API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## URL Management

### Create Short URL

```
POST /api/urls/shorten
```

Example Request

```json
{
  "originalUrl": "https://github.com",
  "customAlias": "github"
}
```

---

### Redirect

```
GET /:shortId
```

---

### Get My URLs

```
GET /api/urls/my
```

---

### Delete URL

```
DELETE /api/urls/:id
```

---

# 📊 Example Response

```json
{
  "success": true,
  "shortUrl": "http://localhost:5049/github",
  "data": {
    "originalUrl": "https://github.com",
    "shortId": "github",
    "clicks": 0
  }
}
```

---

# 🔒 Security Features

- Passwords hashed using bcrypt
- JWT-based authentication
- Protected routes
- Ownership-based authorization
- Configurable API rate limiting
- Helmet security headers
- CORS support

---

# ⚡ Performance Optimizations

- Redis Cache-Aside Pattern
- Reduced MongoDB reads using Redis
- Configurable request rate limiting
- Optimized MongoDB indexing

---

# 🧠 Architecture

```
Client
   │
   ▼
Express API
   │
   ├────────► JWT Authentication
   │
   ├────────► Redis Cache
   │             │
   │        Cache Hit
   │             │
   │             ▼
   │       Return URL
   │
   └────────► MongoDB Atlas
                   │
              Store URLs
              Analytics
              User Data
```

---

# 🚀 Future Improvements

- QR Code Generation
- User Dashboard Analytics
- Custom Domains
- Swagger API Documentation
- Automated Testing (Jest & Supertest)
- CI/CD Pipeline
- URL Expiration Notifications

---

# 💡 What I Learned

While building EdgeCache, I gained practical experience with:

- Designing RESTful APIs
- Authentication & Authorization
- Redis Caching Strategies
- Docker & Containerization
- MongoDB Data Modeling
- Rate Limiting
- Clean Backend Architecture
- Production-ready Express Applications

---

# 👨‍💻 Author

**Aditi**

If you found this project useful, feel free to ⭐ the repos
