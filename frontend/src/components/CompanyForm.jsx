function CompanyForm({
  company,
  handleChange,
  handleSubmit,
  editingId,
}) {
  return (
    <div>
      <h2>{editingId ? "Update Company" : "Add Company"}</h2>

      <input
        type="text"
        name="company_name"
        placeholder="Company Name"
        value={company.company_name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={company.role}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="package"
        placeholder="Package (LPA)"
        value={company.package}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        step="0.01"
        name="eligibility_cgpa"
        placeholder="Eligibility CGPA"
        value={company.eligibility_cgpa}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="date"
        name="drive_date"
        value={company.drive_date}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {editingId ? "Update Company" : "Add Company"}
      </button>
    </div>
  );
}

export default CompanyForm;