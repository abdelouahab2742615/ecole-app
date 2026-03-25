import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./pages/Department";

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
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/departments" element={<Department />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;