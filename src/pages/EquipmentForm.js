import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EquipmentForm() {
  const [nom, setNom] = useState("");
  const [modele, setModele] = useState("nouveau");
  const [description, setDescription] = useState("");
  const [LaboratoryId, setLaboratoryId] = useState("");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (id) {
      fetchEquipment();
    }
  }, [id]);

  const fetchEquipment = async () => {
    try {
      const res = await API.get(`/equipment/${id}`);
      const item = res.data.data || res.data;

      setNom(item.nom || "");
      setModele(item.modele || "nouveau");
      setDescription(item.description || "");
      setLaboratoryId(item.LaboratoryId || "");
    } catch (error) {
      setErreur("Impossible de charger l'equipement");
    }
  };

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
      LaboratoryId,
    };

    try {
      if (id) {
        await API.put(`/equipment/${id}`, body);
      } else {
        await API.post("/equipment", body);
      }

      navigate("/equipment");
    } catch (error) {
      setErreur("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>{id ? "Modifier l'equipement" : "Ajouter un equipement"}</h2>

        {erreur && <p className="error-text">{erreur}</p>}

        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="input-control"
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

        <input
          type="number"
          placeholder="Laboratory ID"
          value={LaboratoryId}
          onChange={(e) => setLaboratoryId(e.target.value)}
          className="input-control"
        />

        <button type="submit" className="btn-primary">
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default EquipmentForm;