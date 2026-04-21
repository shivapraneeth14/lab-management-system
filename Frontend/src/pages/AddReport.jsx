import { useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function AddReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    report_type: "",
    report_date: "",
    result_value: "",
    unit: "",
    min_range: "",
    max_range: ""
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (
      !form.report_type ||
      !form.report_date ||
      !form.result_value ||
      !form.unit ||
      !form.min_range ||
      !form.max_range ||
      !file
    ) {
      setError("All fields are required");
      return;
    }

    if (Number(form.min_range) > Number(form.max_range)) {
      setError("Min range cannot be greater than max range");
      return;
    }

    setError("");

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    data.append("patient_id", id);
    data.append("file", file);

    API.post("/reports", data)
      .then(() => navigate(`/patients/${id}`))
      .catch(err => {
        console.log(err);
        setError("Something went wrong");
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Add Report</h1>

        {/* 🔥 ERROR */}
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {/* 🔥 FORM */}
        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Report Type</label>
            <input
              type="text"
              placeholder="e.g. Blood Test"
              className="input"
              onChange={e => setForm({ ...form, report_type: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Report Date</label>
            <input
              type="date"
              className="input"
              onChange={e => setForm({ ...form, report_date: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Result Value</label>
            <input
              type="number"
              placeholder="Enter value"
              className="input"
              onChange={e => setForm({ ...form, result_value: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Unit</label>
            <input
              type="text"
              placeholder="e.g. mg/dL"
              className="input"
              onChange={e => setForm({ ...form, unit: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium">Min Range</label>
              <input
                type="number"
                className="input"
                onChange={e => setForm({ ...form, min_range: e.target.value })}
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 font-medium">Max Range</label>
              <input
                type="number"
                className="input"
                onChange={e => setForm({ ...form, max_range: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload File</label>
            <input
              type="file"
              className="w-full"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleSubmit}
          className="btn-primary mt-6 w-full"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

export default AddReport;