import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function EquipmentList() {
  const [equipments, setEquipments] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      setErreur("");
      const res = await API.get("/equipment");
      const data = res.data.data?.equipments || [];
      setEquipments(Array.isArray(data) ? data : []);
    } catch (error) {
      setErreur("Impossible de charger les équipements");
      setEquipments([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet équipement ?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/equipment/${id}`);
      fetchEquipments();
    } catch (error) {
      setErreur("Erreur lors de la suppression");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Liste des équipements</h1>
          <p>Consultez, modifiez et supprimez les équipements disponibles.</p>
        </div>

        <div className="top-action-bar">
          <Link to="/equipment/new" className="btn btn-primary">
            Ajouter un équipement
          </Link>
        </div>

        {erreur && <div className="alert alert-error">{erreur}</div>}

        {equipments.length === 0 ? (
          <div className="crud-card">
            <div className="empty-state">Aucun équipement trouvé.</div>
          </div>
        ) : (
          <div className="card-list">
            {equipments.map((item) => (
              <div key={item.id} className="info-card">
                <div className="info-card-header">
                  <h3>{item.nom}</h3>
                  <span className="badge-soft">ID: {item.id}</span>
                </div>

                <div className="info-grid">
                  <div>
                    <strong>Modèle :</strong>
                    <p>{item.modele || "-"}</p>
                  </div>

                  <div>
                    <strong>Laboratoire :</strong>
                    <p>{item.LaboratoryId || "-"}</p>
                  </div>

                  <div className="full-width">
                    <strong>Description :</strong>
                    <p>{item.description || "-"}</p>
                  </div>
                </div>

                <div className="card-actions-row">
                  <Link to={`/equipment/edit/${item.id}`} className="btn btn-warning">
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default EquipmentList;