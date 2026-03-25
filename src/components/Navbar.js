import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Ecole App
        </Link>

        <div className="navbar-links">
          <Link
            to="/login"
            className={`nav-link ${isActive("/login") ? "active" : ""}`}
          >
            Connexion
          </Link>

          <Link
            to="/register"
            className={`nav-link ${isActive("/register") ? "active" : ""}`}
          >
            Inscription
          </Link>

          <Link
            to="/departments"
            className={`nav-link ${isActive("/departments") ? "active" : ""}`}
          >
            Départements
          </Link>

          <Link
            to="/equipment"
            className={`nav-link ${isActive("/equipment") ? "active" : ""}`}
          >
            Équipements
          </Link>

          <Link
            to="/roles"
            className={`nav-link ${isActive("/roles") ? "active" : ""}`}
          >
            Rôles
          </Link>

          <Link
            to="/subjects"
            className={`nav-link ${isActive("/subjects") ? "active" : ""}`}
          >
            Sujets
          </Link>

          <Link
            to="/laboratories"
            className={`nav-link ${
              isActive("/laboratories") ? "active" : ""
            }`}
          >
            Laboratoires
          </Link>
        </div>

        <div className="navbar-actions">
          {token ? (
            <button onClick={logout} className="btn btn-danger btn-sm">
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;