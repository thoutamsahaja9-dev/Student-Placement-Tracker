import { useEffect, useState } from "react";
import { getStudents, addStudent, deleteStudent } from "../api/studentApi";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Students() {
  const [students, setStudents] = useState([]);
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
  }, []);

  const loadStudents = async () => {
    const data = await getStudents();
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
  if (editingId) {
    await updateStudent(editingId, student);
    setEditingId(null);
  } else {
    await addStudent(student);
  }

  loadStudents();

  setStudent({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
    graduation_year: "",
    phone: "",
  });
};

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div>
      <StudentForm
        student={student}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <StudentTable
        students={students}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Students;