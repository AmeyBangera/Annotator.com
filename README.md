# Annotator Marketplace

A full-stack MERN application that connects experts in various fields with companies/individuals who need help annotating datasets.

## 🎯 Project Overview

**Annotator** is a marketplace platform with two main user types:

1. **Experts** - Users who have expertise in specific fields (ML, NLP, Computer Vision, etc.) and want to earn money by annotating datasets
2. **Companies** - Organizations that need their datasets annotated and can post jobs targeting experts in specific fields

## 🏗️ Architecture

This is a monorepo containing:

- **Frontend** (`/frontend`) - React 18 + Vite + Tailwind CSS
- **Backend** (`/backend`) - Node.js + Express + MongoDB

## 🚀 Features

### For Experts
- ✅ Create profile and select areas of expertise
- ✅ Browse available annotation jobs
- ✅ Apply for jobs matching their expertise
- ✅ Track applications and earnings

### For Companies
- ✅ Post annotation jobs
- ✅ Target jobs to specific expertise areas
- ✅ Review applications from experts
- ✅ Manage job postings

### General
- ✅ User authentication with JWT
- ✅ Secure password hashing with bcryptjs
- ✅ Responsive UI with Tailwind CSS
- ✅ RESTful API backend

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud instance)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Annotator.com
```

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/annotator
# JWT_SECRET=your_secret_key
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Development Mode

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be running at `http://localhost:5000`

### Production Build

Frontend:
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
Annotator.com/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── PostJob.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/
    ├── models/
    │   ├── User.js
    │   └── Job.js
    ├── controllers/
    │   ├── authController.js
    │   └── jobController.js
    ├── routes/
    │   ├── auth.js
    │   └── jobs.js
    ├── middleware/
    │   └── auth.js
    ├── index.js
    ├── .env.example
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login

### Jobs
- `GET /jobs` - Get all available jobs
- `POST /jobs` - Create new job (company only)
- `GET /jobs/:id` - Get job details
- `POST /jobs/:id/apply` - Apply for a job (expert only)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. When a user logs in or signs up:

1. User credentials are validated
2. A JWT token is generated
3. Token is stored in localStorage on the frontend
4. Token is included in API request headers for protected routes

## 🗄️ Database Schema

### User Model
- name
- email (unique)
- password (hashed)
- role ('expert' or 'company')
- expertise (array of fields)
- createdAt

### Job Model
- title
- description
- requiredFields (array of expertise fields)
- compensation
- deadline
- postedBy (reference to User)
- status ('open', 'in-progress', 'completed', 'closed')
- applications (array of applications with user and status)
- createdAt

## 🎨 UI Components

- **Navbar** - Navigation with auth-dependent links
- **Home Page** - Landing page with features overview
- **SignUp Page** - Registration form for both expert and company roles
- **Dashboard** - View available jobs or posted jobs
- **PostJob Page** - Form to create new annotation jobs

## 🚦 Getting Started Development

1. Set up both backend and frontend environments
2. Start MongoDB locally or configure a cloud database
3. Update `.env` in backend with your database URI
4. Run `npm install` in both directories
5. Start both servers with `npm run dev`
6. Open browser to `http://localhost:5173`

## 📝 Next Steps / Future Enhancements

- [ ] Add payment integration (Stripe/PayPal)
- [ ] Implement real-time notifications
- [ ] Add annotation workspace interface
- [ ] Rating and review system
- [ ] Advanced job filtering and search
- [ ] Portfolio/work history for experts
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please open an issue in the repository.
