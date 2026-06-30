function PlacementForm({
  placement,
  handleChange,
  handleSubmit,
  editingId,
}) {
  return (
    <div>
      <h2>{editingId ? "Update Placement" : "Add Placement"}</h2>

      <input
        type="number"
        name="student_id"
        placeholder="Student ID"
        value={placement.student_id}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="company_id"
        placeholder="Company ID"
        value={placement.company_id}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="placement_status"
        placeholder="Status"
        value={placement.placement_status}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="date"
        name="placement_date"
        value={placement.placement_date}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {editingId ? "Update Placement" : "Add Placement"}
      </button>
    </div>
  );
}

export default PlacementForm;