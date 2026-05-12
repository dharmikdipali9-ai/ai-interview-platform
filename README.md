# AI Mock Interview Platform

An AI-powered mock interview platform built using React, Django REST Framework, PostgreSQL, and OpenAI/Groq APIs. The platform helps users practice technical interviews with AI-generated questions, real-time responses, and performance evaluation.

---

## 🚀 Live Demo

### Frontend
https://ai-interview-platform-rho-ten.vercel.app

### Backend API
https://ai-interview-platform-yd7c.onrender.com

---

## ✨ Features

- 🔐 JWT Authentication (Login/Register)
- 🤖 AI-generated interview questions
- 🧠 Technical mock interview sessions
- 📊 Score and feedback evaluation
- ⚡ REST API integration
- 🌐 Fully responsive UI
- ☁️ Deployed on Vercel + Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router
- CSS / Bootstrap CSS

### Backend
- Django
- Django REST Framework
- JWT Authentication
- OpenAI / Groq API

### Database
- PostgreSQL (Supabase)

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```bash
project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── interview_ai/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in both frontend and backend directories.

---

### 🔹 Backend `.env`

```env
SECRET_KEY=your_secret_key

DEBUG=False

DATABASE_URL=your_supabase_database_url

OPENAI_API_KEY=your_openai_api_key

GROQ_API_KEY=your_groq_api_key
```

---

### 🔹 Frontend `.env`

```env
REACT_APP_API_URL=https://ai-interview-platform-yd7c.onrender.com/api
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/dharmikdipali9-ai/ai-interview-platform

cd project
```

---

## 🔹 Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux/Mac

```bash
source venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Run Migrations

```bash
python manage.py migrate
```

---

### Start Backend Server

```bash
python manage.py runserver
```

---

## 🔹 Frontend Setup

### Install Dependencies

```bash
npm install
```

---

### Start Frontend

```bash
npm start
```

---

## 🔐 Authentication

The application uses JWT Authentication.

After login:
- Access token stored in localStorage
- Axios interceptor automatically attaches Bearer token

---

## 🌍 Deployment

### Frontend
Deployed on Vercel.

### Backend
Deployed on Render.

### Database
Hosted on Supabase PostgreSQL.

---

## 📸 Screenshots

Add screenshots of:
## Login Page

<img width="1365" height="679" alt="login-page" src="https://github.com/user-attachments/assets/77138096-672d-4a0e-9b1a-ed60175d6a7b" />

## Dashboard

<img width="1350" height="678" alt="Dashboard" src="https://github.com/user-attachments/assets/8965b7ff-e434-4b99-8f87-90406ae07996" />

## Interview Session

<img width="1352" height="680" alt="Interview-session" src="https://github.com/user-attachments/assets/d4eb3635-69a1-4894-b256-ffecc1d31712" />

## Result Page

<img width="1349" height="680" alt="Result" src="https://github.com/user-attachments/assets/2aee1b6f-60f4-41fe-9937-a741334260ab" />


---

## 🧠 Future Improvements

- 🎤 Voice-based interviews
- 📹 Video interview support
- 📝 Resume analysis
- 📈 Advanced analytics dashboard
- 🧑‍💼 Role-based interview generation

---

## 👩‍💻 Author

### Dipali Dharmik

Full Stack Developer | Python Developer

#### Skills
- React.js
- Django REST Framework
- PostgreSQL
- REST APIs
- AI Integrations

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
