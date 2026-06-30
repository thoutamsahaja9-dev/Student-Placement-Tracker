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
    const students = await axios.get("http://127.0.0.1:8000/stats/students");
    const companies = await axios.get("http://127.0.0.1:8000/stats/companies");
    const placements = await axios.get("http://127.0.0.1:8000/stats/placements");
    const rate = await axios.get("http://127.0.0.1:8000/stats/placement-rate");

    setStats({
      students: students.data.total_students,
      companies: companies.data.total_companies,
      placements: placements.data.total_placements,
      rate: rate.data.placement_rate,
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <h3>Total Students: {stats.students}</h3>
        <h3>Total Companies: {stats.companies}</h3>
        <h3>Total Placements: {stats.placements}</h3>
        <h3>Placement Rate: {stats.rate}%</h3>
      </div>
    </div>
  );
}

export default Dashboard;