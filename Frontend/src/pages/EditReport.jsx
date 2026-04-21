import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function EditReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patient_id: "",
    report_type: "",
    report_date: "",
    result_value: "",
    unit: "",
    min_range: "",
    max_range: ""
  });

  const [error, setError] = useState("");

  // 🔥 LOAD EXISTING REPORT
  useEffect(() => {
    API.get("/reports")
      .then(res => {
        const report = res.data.find(r => r.id === parseInt(id));

        if (report) {
          setForm({
            patient_id: report.patient_id,
            report_type: report.report_type,
            report_date: report.report_date,
            result_value: report.result_value,
            unit: report.unit,
            min_range: report.min_range,
            max_range: report.max_range
          });
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  // 🔥 SUBMIT UPDATE
  const handleSubmit = () => {
    if (
      !form.report_type ||
      !form.report_date ||
      !form.result_value ||
      !form.unit ||
      !form.min_range ||
      !form.max_range
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

    API.put(`/reports/${id}`, data)
      .then(() => {
        navigate(`/patients/${form.patient_id}`);
      })
      .catch(err => {
        console.log(err);
        setError("Something went wrong");
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Edit Report</h1>

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
              value={form.report_type}
              className="input"
              onChange={e => setForm({ ...form, report_type: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Report Date</label>
            <input
              type="date"
              value={form.report_date}
              className="input"
              onChange={e => setForm({ ...form, report_date: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Result Value</label>
            <input
              type="number"
              value={form.result_value}
              className="input"
              onChange={e => setForm({ ...form, result_value: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Unit</label>
            <input
              type="text"
              value={form.unit}
              className="input"
              onChange={e => setForm({ ...form, unit: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block mb-1 font-medium">Min Range</label>
              <input
                type="number"
                value={form.min_range}
                className="input"
                onChange={e => setForm({ ...form, min_range: e.target.value })}
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 font-medium">Max Range</label>
              <input
                type="number"
                value={form.max_range}
                className="input"
                onChange={e => setForm({ ...form, max_range: e.target.value })}
              />
            </div>
          </div>

        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleSubmit}
          className="btn-primary mt-6 w-full"
        >
          Update Report
        </button>
      </div>
    </div>
  );
}

export default EditReport;