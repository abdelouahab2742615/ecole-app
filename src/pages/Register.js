import React, { useState } from "react";
import API from "../services/api";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    try {
      const response = await API.post("/api/users", {
        nom,
        prenom,
        email,
        mot_de_passe: password,
        date_de_naissance: dateNaissance,
      });

      setSuccess("Utilisateur cree avec succes");
      console.log("Success:", response.data);
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Erreur d'inscription"
      );
      console.log("Erreur:", error.response?.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Date de naissance :</label>
          <input
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            required
          />
        </div>

        {erreur && <p style={{ color: "red" }}>{erreur}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;