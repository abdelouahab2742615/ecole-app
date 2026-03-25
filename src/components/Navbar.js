import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          Ecole App
        </Link>

        {/* Home */}
        <Link
          to="/"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Home
        </Link>

        {/* Liens protégés */}
        {token && (
          <>
            <Link
              to="/roles"
              style={styles.link}
              onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Roles
            </Link>

            <Link
              to="/equipment"
              style={styles.link}
              onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Equipment
            </Link>
          </>
        )}
      </div>

      <div>
        {token ? (
          <button onClick={logout} style={styles.button}>
            Déconnexion
          </button>
        ) : (
          <Link
            to="/login"
            style={styles.link}
            onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#1f2937",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    transition: "0.3s", // 🔥 animation fluide
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;