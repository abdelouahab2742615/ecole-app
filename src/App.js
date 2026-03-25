import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import Subject from "./pages/Subject";
import Laboratory from "./pages/Laboratory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./pages/Department";
import EquipmentList from "./pages/EquipmentList";
import EquipmentForm from "./pages/EquipmentForm";
import RolesList from "./pages/RolesList";
import RoleForm from "./pages/RoleForm";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/departments" element={<Department />} />

            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/equipment/new" element={<EquipmentForm />} />
            <Route path="/equipment/edit/:id" element={<EquipmentForm />} />

            <Route path="/roles" element={<RolesList />} />
            <Route path="/roles/new" element={<RoleForm />} />
            <Route path="/roles/edit/:id" element={<RoleForm />} />

            <Route path="/subjects" element={<Subject />} />
            <Route path="/laboratories" element={<Laboratory />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;