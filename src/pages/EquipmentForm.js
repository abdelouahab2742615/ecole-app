import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./CrudPage.css";

function EquipmentForm() {
  const [nom, setNom] = useState("");
  const [modele, setModele] = useState("");
  const [description, setDescription] = useState("");
  const [laboratories, setLaboratories] = useState([]);
  const [laboratoryId, setLaboratoryId] = useState("");

  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    chargerLaboratoires();
    if (id) chargerEquipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const chargerLaboratoires = async () => {
    try {
      const res = await API.get("/laboratories");
      const data = res.data.data?.laboratories || [];
      setLaboratories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const chargerEquipment = async () => {
    try {
      const res = await API.get(`/equipment/${id}`);
      const eq = res.data.data || res.data;

      setNom(eq.nom || "");
      setModele(eq.modele || "");
      setDescription(eq.description || "");
      setLaboratoryId(eq.LaboratoryId || "");
    } catch (error) {
      setErreur("Impossible de charger l'équipement");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    const data = {
      nom,
      modele,
      description,
      LaboratoryId: laboratoryId,
    };

    if (!nom) {
      setErreur("Le nom est obligatoire");
      return;
    }

    try {
      if (id) {
        await API.put(`/equipment/${id}`, data);
        setSuccess("Équipement modifié avec succès");
      } else {
        await API.post("/equipment", data);
        setSuccess("Équipement ajouté avec succès");
      }

      setTimeout(() => {
        navigate("/equipment");
      }, 900);
    } catch (error) {
      setErreur("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>{id ? "Modifier un équipement" : "Ajouter un équipement"}</h1>
          <p>Remplissez les informations de l'équipement.</p>
        </div>

        <div className="crud-card">
          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Nom de l'équipement"
                />
              </div>

              <div className="form-group">
                <label>Modèle</label>
                <input
                  type="text"
                  value={modele}
                  onChange={(e) => setModele(e.target.value)}
                  placeholder="Modèle"
                />
              </div>

              <div className="form-group">
                <label>Laboratoire</label>
                <select
                  value={laboratoryId}
                  onChange={(e) => setLaboratoryId(e.target.value)}
                >
                  <option value="">Choisir un laboratoire</option>
                  {laboratories.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>

            {erreur && <div className="alert alert-error">{erreur}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="crud-actions">
              <button className="btn btn-primary">
                {id ? "Modifier" : "Ajouter"}
              </button>

              <Link to="/equipment" className="btn btn-secondary">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EquipmentForm;