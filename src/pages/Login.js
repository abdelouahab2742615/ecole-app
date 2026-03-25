import API from "../services/api";
import React, { useState } from "react";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const response = await API.post("/api/login", {
        email,
        mot_de_passe: password,
      });

      localStorage.setItem("token", response.data.token);
      console.log("Success:", response.data);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Erreur de connexion"
      );
      console.log("Erreur:", error.response?.data);
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {erreur && <p style={{ color: "red" }}>{erreur}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;