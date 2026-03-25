import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./pages/Department";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import RolesList from "./pages/RolesList";
import RoleForm from "./pages/RoleForm";
import EquipmentList from "./pages/EquipmentList";
import EquipmentForm from "./pages/EquipmentForm";
import Equipment from "./pages/Equipment";
import Role from "./pages/Role";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("register")}>Register</button>
      <button onClick={() => setPage("department")}>Departments</button>

      {page === "login" ? (
        <Login onLoginSuccess={() => setPage("department")} />
      ) : page === "register" ? (
        <Register />
      ) : (
        <Department />
      )}
    </div>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/roles" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/roles" element={<Role />} />

        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <RolesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roles/add"
          element={
            <ProtectedRoute>
              <RoleForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roles/edit/:id"
          element={
            <ProtectedRoute>
              <RoleForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipment"
          element={
            <ProtectedRoute>
              <EquipmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipment/add"
          element={
            <ProtectedRoute>
              <EquipmentForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipment/edit/:id"
          element={
            <ProtectedRoute>
              <EquipmentForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;