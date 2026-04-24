# 🧪 pss-lab-report

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
## 🤖 AI Usage Log

### Tools Used
- ChatGPT (primary)
- GitHub Copilot (optional if you used)

---

### How AI Was Used

1. **Project Setup**
- Used AI to generate initial FastAPI and React project structure
- Helped in setting up routers, database models, and API structure

2. **Backend Development**
- Generated CRUD APIs for patients and reports
- Assisted in writing status logic for abnormal/normal reports
- Helped debug file upload issue (`uploads` folder missing)

3. **Frontend Development**
- Used AI to build React components using hooks
- Generated forms for patient and report creation
- Improved UI using Tailwind CSS

4. **Debugging**
- Fixed API connection issues between frontend and backend
- Resolved deployment issues on Render and Vercel
- Debugged environment variable issues

5. **Deployment**
- Guided through deploying backend on Render
- Helped configure frontend deployment on Vercel

---

### What I Fixed Manually

- Corrected API endpoint mismatches
- Fixed file upload bug by creating `uploads` directory
- Adjusted UI layout and styling manually
- Handled edge cases like empty data and invalid inputs

---

### Key Learnings

- Learned how to effectively use AI for debugging and development
- Understood limitations of AI-generated code and how to correct it
- Improved ability to structure full-stack applications quickly

## 👨‍💻 Author

Shiva Praneeth  

---

## 📄 License

This project is for educational purposes.
