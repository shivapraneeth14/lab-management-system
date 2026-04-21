import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search) return;
    navigate(`/patients?search=${search}`);
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-blue-600">Lab System</h1>

        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/patients" className="text-gray-600 hover:text-blue-600">
          Patients
        </Link>
      </div>

      <div className="flex gap-2">
        <input
          className="input"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="btn-primary">
          Search
        </button>
      </div>
    </div>
  );
}

export default Navbar;