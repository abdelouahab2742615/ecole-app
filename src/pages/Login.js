import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const res = await API.post("/login", { email, mot_de_passe });

      localStorage.setItem("token", res.data.token);
      navigate("/roles");
    } catch (error) {
      setErreur("Email ou mot de passe incorrect");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Connexion</h2>

        {erreur && <p style={styles.error}>{erreur}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={mot_de_passe}
          onChange={(e) => setMotDePasse(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default Login;