import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Student Placement Tracker
      </Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link" to="/">Dashboard</Link>
        <Link className="nav-link" to="/students">Students</Link>
        <Link className="nav-link" to="/companies">Companies</Link>
        <Link className="nav-link" to="/placements">Placements</Link>
      </div>
    </nav>
  );
}

export default Navbar;