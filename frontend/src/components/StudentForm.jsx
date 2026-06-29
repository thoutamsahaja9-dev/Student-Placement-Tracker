function StudentForm({
  student,
  handleChange,
  handleSubmit,
}) {
  return (
    <div>
      <h2>Add Student</h2>

      <input
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="branch"
        placeholder="Branch"
        value={student.branch}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="cgpa"
        placeholder="CGPA"
        value={student.cgpa}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="graduation_year"
        placeholder="Graduation Year"
        value={student.graduation_year}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="phone"
        placeholder="Phone"
        value={student.phone}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        Add Student
      </button>
    </div>
  );
}

export default StudentForm;