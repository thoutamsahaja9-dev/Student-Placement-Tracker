import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudents, addStudent, deleteStudent } from "./api/studentApi";

import Navbar from "./components/Navbar";
import Student from "./pages/Students";

import Companies from "./pages/Companies";
import Dashboard from "./pages/Dashboard";
import Placements from "./pages/Placements";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Student />} />
          
          <Route path="/companies" element={<Companies />} />
          <Route path="/placements" element={<Placements />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;