import { useEffect, useState } from "react";
import API from "../services/api";
import "./CrudPage.css";

function Role() {
  const [roles, setRoles] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles");
      setRoles(res.data.data || []);
    } catch (error) {
      setErreur("Erreur lors du chargement des rôles");
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setEditingId(null);
    setErreur("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    if (!titre.trim()) {
      setErreur("Le titre est obligatoire");
      return;
    }

    try {
      const data = { titre, description };

      if (editingId) {
        await API.put(`/roles/${editingId}`, data);
        setSuccess("Rôle modifié avec succès");
      } else {
        await API.post("/roles", data);
        setSuccess("Rôle ajouté avec succès");
      }

      resetForm();
      fetchRoles();
    } catch (error) {
      setErreur(error.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  const handleEdit = (role) => {
    setTitre(role.titre || "");
    setDescription(role.description || "");
    setEditingId(role.id);
    setErreur("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce rôle ?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/roles/${id}`);
      setSuccess("Rôle supprimé avec succès");
      fetchRoles();
    } catch (error) {
      setErreur(error.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Gestion des rôles</h1>
          <p>Ajoutez, modifiez et supprimez les rôles facilement.</p>
        </div>

        {erreur && <div className="alert alert-error">{erreur}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="crud-card">
          <h2>{editingId ? "Modifier un rôle" : "Ajouter un rôle"}</h2>

          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-group">
              <label>Titre</label>
              <input
                type="text"
                placeholder="Ex: Admin"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Ex: Gestion complète"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Mettre à jour" : "Ajouter"}
              </button>

              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Annuler
              </button>
            </div>
          </form>
        </div>

        <div className="crud-card">
          <div className="section-title">
            <h2>Liste des rôles</h2>
            <span>{roles.length} rôle(s)</span>
          </div>

          {roles.length === 0 ? (
            <p className="empty-state">Aucun rôle trouvé.</p>
          ) : (
            <div className="cards-grid">
              {roles.map((role) => (
                <div className="item-card" key={role.id}>
                  <div className="item-card-header">
                    <h3>{role.titre}</h3>
                    <span className="badge">ID #{role.id}</span>
                  </div>

                  <p className="item-description">
                    {role.description || "Aucune description"}
                  </p>

                  <div className="item-actions">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(role)}
                    >
                      Modifier
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(role.id)}
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
    </div>
  );
}

export default Role;