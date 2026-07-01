import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    placements: 0,
    rate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const students = await axios.get("https://student-placement-tracker-jrnn.onrender.com");
      const companies = await axios.get("https://student-placement-tracker-jrnn.onrender.com");
      const placements = await axios.get("https://student-placement-tracker-jrnn.onrender.com");
      const rate = await axios.get("https://student-placement-tracker-jrnn.onrender.com");

      setStats({
        students: students.data.total_students,
        companies: companies.data.total_companies,
        placements: placements.data.total_placements,
        rate: rate.data.placement_rate,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row text-center">

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Total Students</h5>
            <h2>{stats.students}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Total Companies</h5>
            <h2>{stats.companies}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Placements</h5>
            <h2>{stats.placements}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Placement Rate</h5>
            <h2>{stats.rate}%</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
