import "./App.css";
import { useEffect, useState } from "react";
import { getStudents, addStudent, deleteStudent } from "./api/studentApi";

import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

function App() {
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

  const handleSubmit = async () => {
    await addStudent(student);
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
    <div className="container">
      <Navbar />

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

export default App;