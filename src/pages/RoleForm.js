import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./CrudPage.css";

function RoleForm() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      chargerRole();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const chargerRole = async () => {
    try {
      setErreur("");
      const res = await API.get(`/roles/${id}`);
      const role = res.data.data || res.data;

      setTitre(role.titre || "");
      setDescription(role.description || "");
    } catch (error) {
      setErreur("Impossible de charger le rôle");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    const data = {
      titre: titre.trim(),
      description: description.trim(),
    };

    if (!data.titre) {
      setErreur("Le titre est obligatoire");
      return;
    }

    try {
      if (id) {
  setErreur("Modification non supportée par le backend");
  return;
} else {
        await API.post("/roles", data);
        setSuccess("Rôle ajouté avec succès");
      }

      setTimeout(() => {
        navigate("/roles");
      }, 900);
    } catch (error) {
  console.log("Erreur update role :", error.response?.data);
  console.log("Status :", error.response?.status);

  setErreur(
    error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      "Erreur lors de l'enregistrement du rôle"
  );
}
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>{id ? "Modifier un rôle" : "Ajouter un rôle"}</h1>
          <p>
            Remplissez les informations du rôle, puis enregistrez-le dans
            l'application.
          </p>
        </div>

        <div className="crud-card">
          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="titre">Titre</label>
                <input
                  id="titre"
                  type="text"
                  placeholder="Exemple : Admin"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Décrivez le rôle"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {erreur && <div className="alert alert-error">{erreur}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="crud-actions">
              <button type="submit" className="btn btn-primary">
                {id ? "Enregistrer les modifications" : "Ajouter"}
              </button>

              <Link to="/roles" className="btn btn-secondary">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoleForm;