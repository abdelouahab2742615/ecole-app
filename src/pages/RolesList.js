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
      const res = await API.get("/roles");
      const data = res.data.data || res.data || [];
      setRoles(Array.isArray(data) ? data : []);
    } catch (error) {
      setErreur("Erreur lors du chargement des roles");
      setRoles([]);
    }
  };

  const deleteRole = async (id) => {
    const ok = window.confirm("Supprimer ce role ?");
    if (!ok) return;

    try {
      await API.delete(`/roles/${id}`);
      fetchRoles();
    } catch (error) {
      setErreur("Suppression impossible");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Liste des roles</h2>
        <Link to="/roles/new" className="btn-primary">
          Ajouter un role
        </Link>
      </div>

      {erreur && <p className="error-text">{erreur}</p>}

      {roles.length === 0 ? (
        <p>Aucun role trouvé</p>
      ) : (
        <div className="card-grid">
          {roles.map((role) => (
            <div key={role.id} className="card-item">
              <h3>{role.titre}</h3>
              <p>{role.description}</p>

              <div className="card-actions">
                <Link to={`/roles/edit/${role.id}`} className="btn-edit">
                  Modifier
                </Link>
                <button onClick={() => deleteRole(role.id)} className="btn-delete">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RolesList;