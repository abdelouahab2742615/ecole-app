import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./pages/Department";

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
  );
}

export default App;