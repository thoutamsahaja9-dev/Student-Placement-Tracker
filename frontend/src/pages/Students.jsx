import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent
} from "../api/studentApi";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Students() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    graduation_year: "",
    phone: "",
  });

  useEffect(() => {
    loadStudents();
  }, [search]);

  const loadStudents = async () => {
    const data = await getStudents(search);
    setStudents(data);
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (studentData) => {
    setStudent(studentData);
    setEditingId(studentData.student_id);
  };

  const handleSubmit = async () => {
    const cleanedStudent = {
      ...student,
      cgpa: parseFloat(student.cgpa),
      graduation_year: parseInt(student.graduation_year),
    };

    try {
      if (editingId !== null) {
        await updateStudent(editingId, cleanedStudent);
        setEditingId(null);
      } else {
        await addStudent(cleanedStudent);
      }

      await loadStudents();

      setStudent({
        name: "",
        email: "",
        branch: "",
        cgpa: "",
        graduation_year: "",
        phone: "",
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Students Management</h2>

        {/* Search */}
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Form Section */}
      <div className="card shadow-sm p-3 mb-4">
        <StudentForm
          student={student}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
        />
      </div>

      {/* Table Section */}
      <div className="card shadow-sm p-3">
        <StudentTable
          students={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

    </div>
  );
}

export default Students;
