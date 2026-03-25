import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

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
      <div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;