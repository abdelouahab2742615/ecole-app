import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Department from "./pages/Department";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <button onClick={() => setPage("login")}>Se connecter</button>
      <button onClick={() => setPage("register")}>Registre</button>
      <button onClick={() => setPage("department")}>Départements</button>

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