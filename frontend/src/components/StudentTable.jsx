function StudentTable({ students, handleDelete, handleEdit }) {
  return (
    <div>
      <h2>Students</h2>

      <table  className="table table-striped table-hover" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>CGPA</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.student_id}>
              <td>{s.student_id}</td>
              <td>{s.name}</td>
              <td>{s.branch}</td>
              <td>{s.cgpa}</td>
              <td>
              <button onClick={() => handleEdit(s)}>Edit</button>
              {" "}
             <button onClick={() => handleDelete(s.student_id)}>
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

export default StudentTable;