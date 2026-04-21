import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useLocation } from "react-router-dom";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();

  useEffect(() => {
    API.get("/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 READ SEARCH FROM URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    if (query) {
      setSearch(query);
    }
  }, [location.search]);

  // 🔥 FILTER LOGIC
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toString().includes(search)
  );

  return (
    <div>
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Patients</h1>

        <Link
          to="/add-patient"
          className="btn-primary"
        >
          + Add Patient
        </Link>
      </div>

      {/* 🔥 SEARCH */}
      <p className="font-medium mb-1">Search Patients</p>

      <input
        type="text"
        placeholder="Search by name or ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input mb-4 md:w-80"
      />

      {/* 🔥 TABLE */}
      <div className="card overflow-hidden">
        {filteredPatients.length === 0 ? (
          <p className="p-4">No patients found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map(p => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{p.id}</td>

                  <td>
                    <Link
                      to={`/patients/${p.id}`}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      {p.name}
                    </Link>
                  </td>

                  <td>{p.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Patients;