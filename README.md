# Bookit

Bookit is a full-stack web application that allows users to browse, view details, and book exciting experiences like treks, hikes, and adventures.  
This project is divided into two parts:
- **bookit-frontend** (React + Tailwind CSS)
- **bookit-backend** (Node.js + Express + MongoDB)

---

## 🚀 Features

- Browse available experiences with images, duration, and tags  
- View detailed experience info with available slots  
- Select date/time and proceed to checkout  
- Responsive and clean UI built using Tailwind CSS  
- Backend API with MongoDB integration  

---

## 🧩 Project Structure

```
Bookit/
├── bookit-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── bookit-backend/
    ├── server.js
    ├── models/
    ├── routes/
    ├── controllers/
    ├── .env
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MohdAbdulRah/Bookit.git
cd Bookit
```

---

### 2️⃣ Setup Backend (bookit-backend)

```bash
cd bookit-backend
npm install
```

#### Create `.env` file in backend:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

#### Create `.env` file in frontend:
```
VITE_API_BASE=http://localhost:5000/api
```

#### Run backend:
```bash
npm start
```
The backend should now run at `http://localhost:5000`.

---

### 3️⃣ Setup Frontend (bookit-frontend)

```bash
cd ../bookit-frontend
npm install
```

#### Update API URL
Inside `src/pages/Home.jsx` or `api.js`, set your backend URL:
```js
const API_BASE = "http://localhost:5000/api";
```

#### Run frontend:
```bash
npm run dev
```
The frontend will start at `http://localhost:5173`.

---

##  Tech Stack

**Frontend:** React, Tailwind CSS, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Tools:** Vite, Axios  

---

##  Author

**Name:** Mohd Abdul Rahman  
**GitHub:** [@MohdAbdulRah](https://github.com/MohdAbdulRah)  
**Email:** mohdabdulrahman510@gmail.com  

---

