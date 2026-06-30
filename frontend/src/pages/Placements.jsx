import { useEffect, useState } from "react";
import { getPlacements, addPlacement, deletePlacement } from "../api/placementApi";
import { getStudents } from "../api/studentApi";
import { getCompanies } from "../api/companyApi";

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [placement, setPlacement] = useState({
    student_id: "",
    company_id: "",
    placement_status: "",
    placement_date: "",
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const p = await getPlacements();
    const s = await getStudents();
    const c = await getCompanies();

    setPlacements(p);
    setStudents(s);
    setCompanies(c);
  };

  const handleChange = (e) => {
    setPlacement({
      ...placement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await addPlacement(placement);
    setPlacement({
      student_id: "",
      company_id: "",
      placement_status: "",
      placement_date: "",
    });

    loadAll();
  };

  const handleDelete = async (id) => {
    await deletePlacement(id);
    loadAll();
  };

  return (
    <div>
      <h2>Placements</h2>

      {/* FORM */}
      <div>
        <select name="student_id" value={placement.student_id} onChange={handleChange}>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.student_id} value={s.student_id}>
              {s.name}
            </option>
          ))}
        </select>

        <br /><br />

        <select name="company_id" value={placement.company_id} onChange={handleChange}>
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.company_id} value={c.company_id}>
              {c.company_name}
            </option>
          ))}
        </select>

        <br /><br />

        <select
          name="placement_status"
          value={placement.placement_status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
          <option value="Placed">Placed</option>
        </select>

        <br /><br />

        <input
          type="date"
          name="placement_date"
          value={placement.placement_date}
          onChange={handleChange}
        />

        <br /><br />

        <button onClick={handleSubmit}>Add Placement</button>
      </div>

      <hr />

      {/* TABLE */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Company</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {placements.map((p) => (
            <tr key={p.placement_id}>
              <td>{p.placement_id}</td>
              <td>{p.student_name}</td>
              <td>{p.company_name}</td>
              <td>{p.placement_status}</td>
              <td>{p.placement_date}</td>
              <td>
                <button onClick={() => handleDelete(p.placement_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Placements;