import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const reports = data.recent_reports || [];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <p>Total Patients</p>
          <h2>{data.total_patients}</h2>
        </div>

        <div className="card">
          <p>Total Reports</p>
          <h2>{data.total_reports}</h2>
        </div>

        <div className="card">
          <p>Abnormal</p>
          <h2 className="text-red-500">{data.abnormal_reports}</h2>
        </div>

        <div className="card">
          <p>Today</p>
          <h2>{data.today_reports}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="card mt-6">
        <h2 className="mb-3">Recent Reports</h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Patient</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{r.patient_name}</td>
                <td>{r.report_type}</td>
                <td>
                  <span className={
                    r.status === "Abnormal"
                      ? "badge-abnormal"
                      : r.status === "Normal"
                      ? "badge-normal"
                      : "badge-pending"
                  }>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;