import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      await API.post("/users", {
        nom,
        prenom,
        email,
        mot_de_passe: password,
        date_de_naissance: dateNaissance,
      });

      setSuccess("Utilisateur créé avec succès");
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setDateNaissance("");
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Erreur d'inscription"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-register">
        <div className="auth-header">
          <h1>Inscription</h1>
          <p>Crée un compte pour accéder à l'application.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {erreur && <div className="alert alert-error">{erreur}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                type="text"
                placeholder="Votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                id="prenom"
                type="text"
                placeholder="Votre prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Adresse e-mail</label>
            <input
              id="register-email"
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Mot de passe</label>
            <input
              id="register-password"
              type="password"
              placeholder="Entrez un mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateNaissance">Date de naissance</label>
            <input
              id="dateNaissance"
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            S'inscrire
          </button>
        </form>

        <p className="auth-footer">
          Tu as déjà un compte ?{" "}
          <Link to="/login" className="auth-link">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;