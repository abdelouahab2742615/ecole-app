import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function RoleForm() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchRole = async () => {
    try {
      const res = await API.get(`/roles/${id}`);
      const role = res.data.data || res.data;

      setTitre(role.titre || "");
      setDescription(role.description || "");
    } catch (error) {
      console.log("Erreur chargement :", error.response?.data);
      setErreur("Impossible de charger le rôle");
    }
  };

  useEffect(() => {
    if (id) {
      fetchRole();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!titre.trim()) {
      setErreur("Le titre est obligatoire");
      return;
    }

    const body = {
      titre,
      description,
    };

    try {
      if (id) {
        const res = await API.put(`/roles/${id}`, body);
        console.log("Update success :", res.data);
      } else {
        const res = await API.post("/roles", body);
        console.log("Create success :", res.data);
      }

      navigate("/roles");
    } catch (error) {
      console.log("Erreur enregistrement :", error.response?.data);
      setErreur(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Erreur lors de l'enregistrement"
      );
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>{id ? "Modifier le rôle" : "Ajouter un rôle"}</h2>

        {erreur && <p className="error-text">{erreur}</p>}

        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="input-control"
          required
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