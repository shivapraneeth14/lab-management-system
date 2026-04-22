import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, Link } from "react-router-dom";

function PatientDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // ✅ DATE FILTER STATES
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    API.get(`/patients/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const patient = data.patient || {};
  const reports = data.reports || [];

  const handleDelete = (reportId) => {
    API.delete(`/reports/${reportId}`)
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  };

  // ✅ FILTER LOGIC (STATUS + TYPE + DATE)
  const filteredReports = reports.filter(r => {
    const statusMatch =
      statusFilter === "All" || r.status === statusFilter;

    const typeMatch =
      typeFilter === "All" || r.report_type === typeFilter;

    const dateMatch =
      (!startDate || new Date(r.report_date) >= new Date(startDate)) &&
      (!endDate || new Date(r.report_date) <= new Date(endDate));

    return statusMatch && typeMatch && dateMatch;
  });

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {patient.name || "Patient"}
        </h1>

        <Link to={`/add-report/${id}`} className="btn-primary">
          + Add Report
        </Link>
      </div>

      {/* PATIENT INFO */}
      <div className="card mb-6">
        <p><span className="font-medium">Age:</span> {patient.age || "-"}</p>
        <p><span className="font-medium">Gender:</span> {patient.gender || "-"}</p>
        <p><span className="font-medium">Contact:</span> {patient.contact || "-"}</p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-4">

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="input w-40"
        >
          <option value="All">All Status</option>
          <option value="Normal">Normal</option>
          <option value="Abnormal">Abnormal</option>
          <option value="Pending">Pending</option>
        </select>

        {/* TYPE */}
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="input w-48"
        >
          <option value="All">All Types</option>
          <option value="Blood Test">Blood Test</option>
          <option value="Urine Test">Urine Test</option>
          <option value="Lipid Panel">Lipid Panel</option>
          <option value="Custom">Custom</option>
        </select>

        {/* ✅ DATE RANGE */}
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="input"
        />

        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="input"
        />
      </div>

      {/* REPORTS TABLE */}
      <div className="card overflow-hidden">
        <h2 className="text-lg font-semibold mb-3">
          Reports
        </h2>

        {filteredReports.length === 0 ? (
          <p className="p-3">No reports found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Type</th>
                <th>Result</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map(r => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{r.report_type}</td>

                  <td>
                    {r.result_value} {r.unit}
                  </td>

                  <td>
                    <span
                      className={
                        r.status === "Abnormal"
                          ? "badge-abnormal"
                          : r.status === "Normal"
                          ? "badge-normal"
                          : "badge-pending"
                      }
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="space-x-3">
                    <Link
                      to={`/edit-report/${r.id}`}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientDetail;
