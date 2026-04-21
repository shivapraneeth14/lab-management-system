# 🧪 Lab Management System

A full-stack web application to manage patients and their medical reports.  
Built using **React (Frontend)** and **FastAPI (Backend)**.

🔗 GitHub Repository:  
https://github.com/shivapraneeth14/lab-management-system

---

## 🚀 Features

### 👤 Patient Management
- Add new patients
- View all patients
- Search patients by name or ID
- View patient details

### 📊 Report Management
- Add reports with file upload
- View reports for each patient
- Filter reports by status and type
- Edit report details
- Delete reports

### 📈 Dashboard
- Total patients count
- Total reports count
- Abnormal reports count
- Today's reports
- Recent reports table

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- FastAPI
- SQLAlchemy
- SQLite

---

## 📁 Project Structure


lab-management-system/
│
├── frontend/ # React App
├── backend/ # FastAPI Server
├── .gitignore
└── README.md


---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository


git clone https://github.com/shivapraneeth14/lab-management-system.git

cd lab-management-system


---

### 🔹 2. Backend Setup (FastAPI)


cd backend
python -m venv venv
venv\Scripts\activate # Windows

pip install -r requirements.txt

uvicorn main:app --reload


👉 Backend runs at:  
`http://127.0.0.1:8000`

---

### 🔹 3. Frontend Setup (React)


cd frontend
npm install
npm run dev


👉 Frontend runs at:  
`http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|--------|-------------|
| GET | /patients | Get all patients |
| POST | /patients | Add patient |
| GET | /patients/{id} | Get patient details |
| POST | /reports | Add report |
| PUT | /reports/{id} | Update report |
| DELETE | /reports/{id} | Delete report |
| GET | /dashboard | Dashboard data |

---

## 📌 Notes

- Uploaded files are stored in `uploads/` folder
- `.gitignore` excludes unnecessary files like `node_modules`, `venv`, and uploads
- Ensure backend is running before frontend

---

## 🎯 Future Improvements

- Authentication (Login/Signup)
- Role-based access (Admin/User)
- Better analytics dashboard
- File preview support

---

## 👨‍💻 Author

Shiva Praneeth  

---

## 📄 License

This project is for educational purposes.
