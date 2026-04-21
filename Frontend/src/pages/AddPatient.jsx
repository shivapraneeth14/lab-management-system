import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: ""
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!form.name || !form.age || !form.gender || !form.contact) {
      alert("All fields are required");
      return;
    }

    API.post("/patients", form)
      .then(() => navigate("/patients"))
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Add Patient</h1>

        {/* 🔥 FORM */}
        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="input"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              className="input"
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <input
              type="text"
              placeholder="Enter gender"
              className="input"
              onChange={e => setForm({ ...form, gender: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact</label>
            <input
              type="text"
              placeholder="Enter contact"
              className="input"
              onChange={e => setForm({ ...form, contact: e.target.value })}
            />
          </div>

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleSubmit}
          className="btn-primary mt-6 w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddPatient;