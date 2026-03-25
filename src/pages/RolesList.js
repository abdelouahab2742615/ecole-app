import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function RolesList() {
  const [roles, setRoles] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setErreur("");
      const res = await API.get("/roles");
      const data = res.data.data || res.data || [];
      setRoles(Array.isArray(data) ? data : []);
    } catch (error) {
      setErreur("Erreur lors du chargement des rôles");
      setRoles([]);
    }
  };

  const deleteRole = async (id) => {
    const ok = window.confirm("Supprimer ce rôle ?");
    if (!ok) return;

    try {
      await API.delete(`/roles/${id}`);
      fetchRoles();
    } catch (error) {
      setErreur("Suppression impossible");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Liste des rôles</h1>
          <p>Gérez les rôles utilisateur avec une présentation plus moderne.</p>
        </div>

        <div className="top-action-bar">
          <Link to="/roles/new" className="btn btn-primary">
            Ajouter un rôle
          </Link>
        </div>

        {erreur && <div className="alert alert-error">{erreur}</div>}

        {roles.length === 0 ? (
          <div className="crud-card">
            <div className="empty-state">Aucun rôle trouvé.</div>
          </div>
        ) : (
          <div className="card-list">
            {roles.map((role) => (
              <div key={role.id} className="info-card">
                <div className="info-card-header">
                  <h3>{role.titre}</h3>
                  <span className="badge-soft">ID: {role.id}</span>
                </div>

                <p className="card-description">{role.description || "Aucune description"}</p>

                <div className="card-actions-row">
                  <Link to={`/roles/edit/${role.id}`} className="btn btn-warning">
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RolesList;