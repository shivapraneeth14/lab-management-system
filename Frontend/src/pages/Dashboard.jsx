import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    API.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const reports = data.recent_reports || [];

  // ✅ FILTER LOGIC
  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter(r => r.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <p>Total Patients</p>
          <h2>{data.total_patients || 0}</h2>
        </div>

        <div className="card">
          <p>Total Reports</p>
          <h2>{data.total_reports || 0}</h2>
        </div>

        <div className="card">
          <p>Abnormal</p>
          <h2 className="text-red-500">{data.abnormal_reports || 0}</h2>
        </div>

        <div className="card">
          <p>Today</p>
          <h2>{data.today_reports || 0}</h2>
        </div>
      </div>

      {/* ✅ FILTER DROPDOWN */}
      <div className="mt-6">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Normal">Normal</option>
          <option value="Abnormal">Abnormal</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="card mt-6">
        <h2 className="mb-3">Recent Reports</h2>

        {filteredReports.length === 0 ? (
          <p className="p-3">No reports found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Patient</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{r.patient_name}</td>
                  <td>{r.report_type}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
