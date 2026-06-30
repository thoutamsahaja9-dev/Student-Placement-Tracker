function CompanyTable({ companies, handleEdit, handleDelete }) {
  return (
    <div>
      <h2>Companies</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Role</th>
            <th>Package (LPA)</th>
            <th>Eligibility CGPA</th>
            <th>Drive Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company.company_id}>
              <td>{company.company_id}</td>
              <td>{company.company_name}</td>
              <td>{company.role}</td>
              <td>{company.package}</td>
              <td>{company.eligibility_cgpa}</td>
              <td>{company.drive_date}</td>
              <td>
                <button onClick={() => handleEdit(company)}>
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => handleDelete(company.company_id)}
                >
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

export default CompanyTable;