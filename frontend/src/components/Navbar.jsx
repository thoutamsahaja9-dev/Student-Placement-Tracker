import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h1>🎓 Student Placement Tracker</h1>

      <li>
        <Link to="/login">Login</Link>
      </li>

      <Link to="/">Dashboard</Link>{" | "}
      <Link to="/students">Students</Link>{" | "}
      <Link to="/companies">Companies</Link>{" | "}
      <Link to="/placements">Placements</Link>

      <hr />
    </nav>
  );
}

export default Navbar;