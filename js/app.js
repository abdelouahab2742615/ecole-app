import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Subject from "./pages/Subject";
import Laboratory from "./pages/Laboratory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./pages/Department";
import EquipmentList from "./pages/EquipmentList";
import EquipmentForm from "./pages/EquipmentForm";
import RolesList from "./pages/RolesList";
import RoleForm from "./pages/RoleForm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="navbar">

        <Link to="/login">
          <button>Se connecter</button>
        </Link>

        <Link to="/register">
          <button>Registre</button>
        </Link>

        <Link to="/departments">
          <button>Départements</button>
        </Link>

        <Link to="/equipment">
          <button>Équipements</button>
        </Link>

        <Link to="/roles">
          <button>Rôles</button>
        </Link>

        <Link to="/subjects">
          <button>Sujets</button>
        </Link>

        <Link to="/laboratories">
          <button>Laboratoires</button>
        </Link>

      </div>

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

    </BrowserRouter>
  );
}

export default App;