import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function RoleForm() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();


  // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (id) {
            fetchRole();
        }
    }, [id]);

  const fetchRole = async () => {
    try {
      const res = await API.get(`/roles/${id}`);
      const role = res.data.data || res.data;
      setTitre(role.titre || "");
      setDescription(role.description || "");
    } catch (error) {
      setErreur("Impossible de charger le role");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!titre.trim()) {
      setErreur("Le titre est obligatoire");
      return;
    }

    try {
      const body = { titre, description };

      if (id) {
        await API.put(`/roles/${id}`, body);
      } else {
        await API.post("/roles", body);
      }

      navigate("/roles");
    } catch (error) {
      setErreur("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>{id ? "Modifier le role" : "Ajouter un role"}</h2>

        {erreur && <p className="error-text">{erreur}</p>}

        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="input-control"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-control"
          rows="4"
        />

        <button type="submit" className="btn-primary">
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default RoleForm;