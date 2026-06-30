function Dashboard() {
  return (
    <div>
      <h1>🎓 Student Placement Tracker</h1>

      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "200px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <h3>Total Students</h3>
          <h2>0</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "200px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <h3>Total Companies</h3>
          <h2>0</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "200px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <h3>Placed Students</h3>
          <h2>0</h2>
        </div>
      </div>

      <br />

      <h3>Welcome!</h3>
      <p>
        Use the navigation bar to manage students, companies and placements.
      </p>
    </div>
  );
}

export default Dashboard;