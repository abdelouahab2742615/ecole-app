import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const response = await API.post("/login", {
        email,
        mot_de_passe: motDePasse,
      });

      const token =
        response.data.token ||
        response.data.data?.token ||
        response.data.accessToken ||
        response.data.data?.accessToken;

      if (!token) {
        setErreur("Token introuvable dans la réponse du serveur");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/departments");
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Email ou mot de passe incorrect"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Connexion</h1>
          <p>Connecte-toi à ton espace pour gérer l'application.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {erreur && <div className="alert alert-error">{erreur}</div>}

          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Se connecter
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ?{" "}
          <Link to="/register" className="auth-link">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;