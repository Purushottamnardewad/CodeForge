# CodeForge

A comprehensive microservices-based online coding interview platform built with the MERN stack (MongoDB, Express, React, Node.js). CodeForge provides **24 carefully curated problems** covering all major algorithmic concepts and data structures, designed to help developers practice for technical interviews.

## Features

- **24 Coding Problems**: Comprehensive problem set from Easy to Hard difficulty
- **11 Algorithm Categories**: Arrays, Strings, Trees, Graphs, Dynamic Programming, and more
- **User Authentication**: JWT-based secure authentication system
- **Monaco Code Editor**: Professional code editor with syntax highlighting
- **Real-time Code Execution**: Sandboxed JavaScript execution with VM2
- **Automated Testing**: Run code against multiple test cases instantly
- **Smart Filtering**: Filter by difficulty (Easy/Medium/Hard) and categories
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Progress Tracking**: Track your problem-solving progress

## Problem Categories & Distribution

### 24 Total Problems:
- **Easy**: 15 problems (62%) - Perfect for beginners
- **Medium**: 7 problems (29%) - Intermediate challenges  
- **Hard**: 2 problems (9%) - Advanced algorithmic problems

### Algorithm Categories:

| Category | Count | Examples |
|----------|-------|----------|
| **Array** | 4 | Two Sum, Container With Most Water, Trapping Rain Water |
| **Math** | 3 | Palindrome Number, FizzBuzz, Count Primes |
| **Binary Search** | 3 | Binary Search, Search Insert Position, Median of Two Sorted Arrays |
| **String** | 2 | Valid Palindrome, Longest Substring Without Repeating Characters |
| **Hash Table** | 2 | Valid Anagram, Group Anagrams |
| **Stack** | 2 | Valid Parentheses, Daily Temperatures |
| **Tree** | 2 | Maximum Depth of Binary Tree, Binary Tree Inorder Traversal |
| **Dynamic Programming** | 2 | Climbing Stairs, House Robber |
| **Bit Manipulation** | 2 | Single Number, Number of 1 Bits |
| **Graph** | 1 | Number of Islands |
| **Sorting** | 1 | Merge Sorted Array |

### Featured Hard Problems:
- **Median of Two Sorted Arrays** - Classic binary search optimization
- **Trapping Rain Water** - Advanced array manipulation with multiple solution approaches

All problems are based on real interview questions from top tech companies like Google, Facebook, Amazon, and Microsoft.

## Tech Stack

### **Backend (Node.js + TypeScript)**
- **Express.js** - RESTful API framework
- **MongoDB + Mongoose** - NoSQL database with ODM
- **JWT + bcryptjs** - Authentication and password hashing
- **VM2** - Secure code execution sandbox
- **TypeScript** - Type safety and better development experience

### **Frontend (React + Modern Tools)**
- **React 18** - Latest React with hooks and context
- **Vite** - Lightning-fast build tool (5x faster than CRA)
- **Tailwind CSS** - Utility-first styling framework
- **Monaco Editor** - Professional code editor (VS Code engine)
- **React Router** - Client-side navigation
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful notifications

### **DevOps & Infrastructure**
- **Docker & Docker Compose** - Containerization and orchestration
- **Nginx** - Production web server and reverse proxy
- **MongoDB** - Persistent data storage

## Prerequisites

- Node.js 18+ and npm
- MongoDB 6.0+ (or use Docker)
- Docker & Docker Compose (optional)

## Quick Start

### Docker Setup (Recommended)
```bash
# Clone the repository
git clone https://github.com/Purushottamnardewad/CodeForge.git
cd CodeForge

# Start all services with Docker Compose
docker-compose up --build

# The platform will be available at:
# - Frontend: http://localhost (served by Nginx)
# - Backend API: http://localhost:3001  
# - MongoDB: localhost:27017
```

### Local Development

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd CodeForge
   npm run install:all
   ```

2. **Environment Configuration**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your MongoDB URI and JWT secret
   ```

3. **Database Setup**
   ```bash
   # Start MongoDB (if not using Docker)
   mongod
   
   # Seed the database with 24 coding problems
   npm run seed
   ```

4. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Production Docker Deployment

1. **Build and start containers**
   ```bash
   docker-compose up --build -d
   ```

2. **Verify all services are running**
   ```bash
   docker-compose ps
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017

4. **View logs if needed**
   ```bash
   docker-compose logs -f [frontend|backend|mongodb]
   ```


## Default Credentials

For development, the seeded database includes sample problems but no default users. Register a new account to get started.

## Testing the Platform

## Usage Guide

### For Candidates (Problem Solving)
1. **Registration & Authentication**
   - Create account with email and secure password
   - Login with JWT-based authentication
   
2. **Explore Problems**
   - Browse 24 coding problems across 11 categories
   - Filter by difficulty: Easy (15), Medium (7), Hard (2)
   - Categories include: Array, Math, Binary Search, Tree, String, Stack, Graph, Heap, Dynamic Programming, Linked List, Two Pointers

3. **Code & Test Solutions**
   - Professional Monaco Editor (VS Code engine)
   - Real-time syntax highlighting and error detection
   - Run custom test cases instantly
   - Submit for automated evaluation with VM2 sandbox

4. **Track Progress**
   - View detailed submission results
   - Monitor completion statistics
   - Review solution history

### For Interviewers (Problem Management)
1. **Admin Features**
   - Access problem creation interface
   - Configure test cases and expected outputs
   - Set difficulty levels and problem categories

2. **Live Monitoring**
   - Watch candidate submissions in real-time
   - Evaluate code quality and approach
   - Review problem-solving methodology

3. **Select a problem to solve**
4. **Write your solution in the code editor**  
5. **Run the code to test against test cases**
6. **View the results**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get specific problem
- `POST /api/problems` - Create problem (protected)
- `PUT /api/problems/:id` - Update problem (protected)
- `DELETE /api/problems/:id` - Delete problem (protected)

### Code Execution
- `POST /api/execute/:problemId` - Execute code for a problem

## Security & Architecture

### Security Features
- **JWT Authentication** - Secure token-based user sessions
- **bcrypt Password Hashing** - Industry-standard password encryption
- **Input Validation** - Comprehensive request sanitization
- **Rate Limiting** - API endpoint protection against abuse
- **VM2 Sandboxing** - Isolated code execution environment
- **CORS Configuration** - Cross-origin resource sharing controls
- **Helmet.js Security** - HTTP security headers protection

### Code Execution Safety
- **1-second timeout limits** - Prevents infinite loops
- **Memory usage controls** - Prevents memory exhaustion attacks
- **Restricted API access** - No file system or network access in sandbox
- **Input sanitization** - All user code properly escaped and validated

## Current Status & Roadmap

### MVP Features (Completed)
- [x] **Complete MERN Stack** - MongoDB, Express, React, Node.js
- [x] **24 Coding Problems** - Across 11 categories with full test coverage
- [x] **Secure Authentication** - JWT + bcrypt password protection
- [x] **Professional Code Editor** - Monaco Editor with syntax highlighting
- [x] **Safe Code Execution** - VM2 sandbox with timeout protection
- [x] **Docker Deployment** - Full containerization with Docker Compose
- [x] **Responsive Design** - Tailwind CSS mobile-first approach

### Upcoming Enhancements
- [ ] **Multi-language Support** - Python, Java, C++, Go support
- [ ] **Enhanced Sandbox** - Docker-based code execution containers
- [ ] **Real-time Collaboration** - WebSocket integration for live coding
- [ ] **Progress Analytics** - Detailed user statistics and progress tracking
- [ ] **Discussion Forums** - Community problem discussions
- [ ] **Admin Dashboard** - Advanced problem management interface
- [ ] **Interview Mode** - Video integration for remote interviews
- [ ] **Leaderboards** - Competitive programming features

### Known Limitations & Security Notes
- **JavaScript Only** - Currently supports JavaScript execution only
- **VM2 Security Warning** - VM2 has known security vulnerabilities. For production use, replace with Docker-based code execution containers
- **Basic Sandboxing** - Current sandbox suitable for development/demo, Docker containers recommended for production
- **No Real-time Features** - No live collaboration or real-time updates yet
- **Limited Analytics** - Basic submission tracking without detailed metrics

### Security Recommendations for Production
- Replace VM2 with Docker-based code execution (see `backend/src/utils/sandbox.ts`)
- Implement proper input validation and sanitization
- Add rate limiting per user (currently global)
- Use HTTPS with proper SSL certificates
- Implement proper session management
- Add request logging and monitoring

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Troubleshooting Guide

### Docker Issues
**Containers won't start:**
```bash
# Check container status
docker-compose ps

# View specific container logs  
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb

# Rebuild containers
docker-compose down && docker-compose up --build
```

**Database connection errors:**
```bash
# Ensure MongoDB container is healthy
docker exec codeforge-db mongosh --eval "db.adminCommand('ping')"

# Reseed database if needed
docker exec codeforge-backend npm run seed
```

### Local Development Issues
**MongoDB Connection:**
- Ensure MongoDB is running: `brew services start mongodb-community`  
- Check connection string in `backend/.env`
- Verify port 27017 is not blocked

**Port Conflicts:**
- Frontend (3000): `lsof -ti :3000 | xargs kill`
- Backend (5000): `lsof -ti :5000 | xargs kill`  
- MongoDB (27017): `lsof -ti :27017 | xargs kill`

**Dependencies:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# For both frontend and backend
npm run clean:install
```

### Common Solutions
- **White screen**: Check browser console for errors, ensure backend is running
- **API errors**: Verify backend URL in frontend axios configuration
- **Authentication issues**: Clear localStorage and login again
- **Code execution timeout**: Check for infinite loops in submitted code

### Port Already in Use
- Change ports in `.env` and `vite.config.js`
- Kill processes using the ports

### Docker Issues
- Ensure Docker daemon is running
- Check Docker Compose version compatibility
- Clear volumes if data is corrupted: `npm run docker:clean`

## Support

For issues and questions, please open an issue on GitHub.


### `.gitignore` (root)
```
# Dependencies
node_modules/
*/node_modules/

# Production builds
dist/
build/
*/dist/
*/build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*/.env

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Testing
coverage/
.nyc_output/

# Docker
.dockerignore
docker-compose.override.yml

# Temporary files
*.tmp
*.temp
.cache/

# TypeScript
*.tsbuildinfo

# MongoDB
*.lock
```

### `Makefile` (optional - for easier commands)
```makefile
.PHONY: help install dev build test clean docker-up docker-down seed

help:
	@echo "Available commands:"
	@echo "  make install    - Install all dependencies"
	@echo "  make dev        - Start development servers"
	@echo "  make build      - Build for production"
	@echo "  make seed       - Seed the database"
	@echo "  make docker-up  - Start Docker containers"
	@echo "  make docker-down - Stop Docker containers"
	@echo "  make clean      - Clean all builds and dependencies"

install:
	npm run install:all

dev:
	npm run dev

build:
	npm run build

seed:
	npm run seed

docker-up:
	docker-compose up -d
	@echo "Waiting for services to start..."
	@sleep 10
	docker exec coding-platform-backend npm run seed

docker-down:
	docker-compose down

docker-clean:
	docker-compose down -v

clean:
	rm -rf node_modules
	rm -rf backend/node_modules backend/dist
	rm -rf frontend/node_modules frontend/dist

logs:
	docker-compose logs -f

restart: docker-down docker-up
```

## Testing Instructions

### Manual Testing Checklist

1. **Authentication Flow**
   - [ ] Register new user
   - [ ] Login with credentials
   - [ ] Logout functionality
   - [ ] Protected route access

2. **Problem Management**
   - [ ] View all problems
   - [ ] Filter by difficulty
   - [ ] View problem details
   - [ ] See examples and constraints

3. **Code Execution**
   - [ ] Write solution in editor
   - [ ] Run code against test cases
   - [ ] View pass/fail results
   - [ ] Handle runtime errors

4. **UI/UX**
   - [ ] Responsive design on mobile
   - [ ] Loading states
   - [ ] Error messages
   - [ ] Success notifications

## Complete Setup Instructions for CodeForge

### Development Mode Setup

1. **Prerequisites Installation**
   ```bash
   # Install Node.js 18+
   node --version
   npm --version
   
   # Install MongoDB (macOS)
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. **Project Setup**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd CodeForge
   
   # Install all dependencies
   npm run install:all
   ```

3. **Environment Configuration**
   ```bash
   # Copy and configure backend environment
   cp backend/.env.example backend/.env
   
   # Edit backend/.env file to customize:
   # - MONGODB_URI (if using custom MongoDB setup)
   # - JWT_SECRET (use a strong secret for production)
   # - PORT (if you want to change from 5000)
   ```

4. **Database Initialization**
   ```bash
   # Seed the database with coding problems
   npm run seed
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run dev:backend   # Backend on :5000
   npm run dev:frontend  # Frontend on :3000
   ```

6. **Access Your Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

### Docker Production Setup

1. **Quick Production Deployment**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd CodeForge
   
   # Start all services with Docker Compose
   npm run docker:up
   
   # Wait for services to start, then seed database
   sleep 30
   docker exec codeforge-backend npm run seed
   ```

2. **Production Services**
   - Frontend: http://localhost (port 80)
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017

3. **Docker Management Commands**
   ```bash
   # View service status
   docker-compose ps
   
   # View logs
   npm run docker:logs
   # Or specific service logs
   docker-compose logs -f frontend
   docker-compose logs -f backend
   docker-compose logs -f mongodb
   
   # Stop services
   npm run docker:down
   
   # Clean restart (removes all data)
   npm run docker:clean
   npm run docker:up
   
   # Rebuild containers
   docker-compose up --build -d
   ```

### API Integration Verification

1. **Test Backend API**
   ```bash
   # Health check
   curl http://localhost:5000/api/health
   
   # Get all problems
   curl http://localhost:5000/api/problems
   
   # Register a user
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

2. **Frontend-Backend Connection**
   - Open http://localhost:3000 (dev) or http://localhost (production)
   - Register a new account
   - Browse problems
   - Try submitting a solution

### Troubleshooting Common Issues

1. **Port Conflicts**
   ```bash
   # Kill processes on specific ports
   lsof -ti :3000 | xargs kill  # Frontend
   lsof -ti :5000 | xargs kill  # Backend
   lsof -ti :27017 | xargs kill # MongoDB
   ```

2. **Database Connection Issues**
   ```bash
   # Check MongoDB is running
   brew services list | grep mongodb
   
   # Test MongoDB connection
   mongosh
   
   # For Docker
   docker exec codeforge-db mongosh --eval "db.adminCommand('ping')"
   ```

3. **Docker Issues**
   ```bash
   # Check Docker is running
   docker --version
   docker-compose --version
   
   # Remove all containers and volumes
   docker-compose down -v
   docker system prune -a
   
   # Rebuild everything
   docker-compose up --build -d
   ```

4. **Clean Installation**
   ```bash
   # Remove all node_modules and reinstall
   rm -rf node_modules frontend/node_modules backend/node_modules
   rm -f package-lock.json frontend/package-lock.json backend/package-lock.json
   npm run install:all
   ```

### Production Deployment Checklist

- [ ] Update `.env` files with production values
- [ ] Change default MongoDB credentials in `docker-compose.yml`
- [ ] Update JWT_SECRET to a strong random string
- [ ] Configure domain names and SSL certificates
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies for database
- [ ] Set up CI/CD pipelines
- [ ] Configure reverse proxy (nginx) for domain routing
- [ ] Implement rate limiting and security headers
- [ ] Set up error monitoring (e.g., Sentry)

## Final Notes

CodeForge is now fully configured and ready to run! The project provides a complete foundation for a coding interview platform with:

- **Full MERN Stack Implementation**: MongoDB, Express.js, React, Node.js
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Professional Code Editor**: Monaco Editor (VS Code engine)
- **Safe Code Execution**: VM2 sandbox for JavaScript execution
- **24 Curated Problems**: Covering all major algorithmic concepts
- **Docker Deployment**: Complete containerization with Docker Compose
- **Production Ready**: Security middleware, rate limiting, error handling

The architecture is designed to be **scalable**, **maintainable**, **extensible** and **secure**.
