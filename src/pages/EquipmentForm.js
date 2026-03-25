import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EquipmentForm() {
  const [nom, setNom] = useState("");
  const [modele, setModele] = useState("nouveau");
  const [description, setDescription] = useState("");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchEquipment = async () => {
    try {
      const res = await API.get(`/equipment/${id}`);
      const item = res.data.data || res.data;

      setNom(item.nom || "");
      setModele(item.modele || "nouveau");
      setDescription(item.description || "");
    } catch (error) {
      console.log("Erreur chargement :", error.response?.data);
      setErreur("Impossible de charger l'équipement");
    }
  };

  useEffect(() => {
    if (id) {
      fetchEquipment();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!nom.trim()) {
      setErreur("Le nom est obligatoire");
      return;
    }

    const body = {
      nom,
      modele,
      description,
    };

    console.log("Données envoyées :", body);

    try {
      if (id) {
        const res = await API.put(`/equipment/${id}`, body);
        console.log("Update success :", res.data);
      } else {
        const res = await API.post("/equipment", body);
        console.log("Create success :", res.data);
      }

      navigate("/equipment");
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
        <h2>{id ? "Modifier l'équipement" : "Ajouter un équipement"}</h2>

        {erreur && <p className="error-text">{erreur}</p>}

        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="input-control"
          required
        />

        <select
          value={modele}
          onChange={(e) => setModele(e.target.value)}
          className="input-control"
        >
          <option value="nouveau">nouveau</option>
          <option value="ancien">ancien</option>
          <option value="refait">refait</option>
        </select>

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

export default EquipmentForm;