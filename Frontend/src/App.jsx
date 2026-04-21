import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import PatientDetail from "./pages/PatientDetail";
import AddReport from "./pages/AddReport";
import EditReport from "./pages/EditReport";

function App() {
  return (
    <BrowserRouter>
      {/* 🔥 FULL PAGE */}
      <div className="min-h-screen bg-gray-100">

        <Navbar />

        {/* 🔥 FULL WIDTH CONTENT */}
        <div className="w-full px-6 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/add-report/:id" element={<AddReport />} />
            <Route path="/edit-report/:id" element={<EditReport />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;