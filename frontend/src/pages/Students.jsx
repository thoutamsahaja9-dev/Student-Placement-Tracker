import { useEffect, useState } from "react";
import { getStudents, addStudent, deleteStudent, updateStudent } from "../api/studentApi";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Students() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId]=useState(null);
  const [search, setSearch]=useState("");
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
  console.log("Searching:", search);
  const data = await getStudents(search);
  console.log(data);
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
    console.log("Error in handleSubmit:", error);
  }
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
      editingId={editingId}
    />

    <br />

    <input
      type="text"
      placeholder="Search by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <br />
    <br />

    <StudentTable
      students={students}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  </div>
);
}

export default Students;