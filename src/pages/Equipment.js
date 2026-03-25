import { useEffect, useState } from "react";
import API from "../services/api";
import "./CrudPage.css";

function Equipment() {
  const [equipments, setEquipments] = useState([]);
  const [nom, setNom] = useState("");
  const [modele, setModele] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const res = await API.get("/equipment");
      const data = res.data.data?.equipments || res.data.data || res.data || [];
      setEquipments(Array.isArray(data) ? data : []);
    } catch (error) {
      setErreur("Impossible de charger les équipements");
      setEquipments([]);
    }
  };

  const resetForm = () => {
    setNom("");
    setModele("");
    setDescription("");
    setEditingId(null);
    setErreur("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    if (!nom.trim() || !modele.trim()) {
      setErreur("Le nom et le modèle sont obligatoires");
      return;
    }

    const data = {
      nom,
      modele,
      description,
    };

    try {
      if (editingId) {
        await API.put(`/equipment/${editingId}`, data);
        setSuccess("Équipement modifié avec succès");
      } else {
        await API.post("/equipment", data);
        setSuccess("Équipement ajouté avec succès");
      }

      resetForm();
      fetchEquipments();
    } catch (error) {
      setErreur(error.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  const handleEdit = (item) => {
    setNom(item.nom || "");
    setModele(item.modele || "");
    setDescription(item.description || "");
    setEditingId(item.id);
    setErreur("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet équipement ?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/equipment/${id}`);
      setSuccess("Équipement supprimé avec succès");
      fetchEquipments();
    } catch (error) {
      setErreur(error.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Gestion des équipements</h1>
          <p>Ajoutez, modifiez et supprimez les équipements facilement.</p>
        </div>

        {erreur && <div className="alert alert-error">{erreur}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="crud-card">
          <h2>{editingId ? "Modifier un équipement" : "Ajouter un équipement"}</h2>

          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                placeholder="Ex: Ordinateur"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Modèle</label>
              <input
                type="text"
                placeholder="Ex: Dell"
                value={modele}
                onChange={(e) => setModele(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Ex: PC du laboratoire"
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
            <h2>Liste des équipements</h2>
            <span>{equipments.length} équipement(s)</span>
          </div>

          {equipments.length === 0 ? (
            <p className="empty-state">Aucun équipement trouvé.</p>
          ) : (
            <div className="cards-grid">
              {equipments.map((item) => (
                <div className="item-card" key={item.id}>
                  <div className="item-card-header">
                    <h3>{item.nom}</h3>
                    <span className="badge">ID #{item.id}</span>
                  </div>

                  <p className="item-description">
                    <strong>Modèle :</strong> {item.modele || "Non défini"}
                  </p>

                  <p className="item-description">
                    <strong>Description :</strong> {item.description || "Aucune description"}
                  </p>

                  <div className="item-actions">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Modifier
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
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

export default Equipment;