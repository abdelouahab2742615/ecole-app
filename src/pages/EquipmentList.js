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
      const res = await API.get("/equipment");
      const data = res.data.data?.equipments || [];
      setEquipments(Array.isArray(data) ? data : []);
    } catch (error) {
      setErreur("Impossible de charger les équipements");
      setEquipments([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet équipement ?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/equipment/${id}`);
      fetchEquipments();
    } catch (error) {
      setErreur("Erreur lors de la suppression");
    }
  };

  return (
    <div>
      <h2>Liste des équipements</h2>

      <Link to="/equipment/new">Ajouter un équipement</Link>

      {erreur && <p>{erreur}</p>}

      {equipments.length === 0 ? (
        <p>Aucun équipement trouvé</p>
      ) : (
        equipments.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <h3>{item.nom}</h3>
            <p>Modèle : {item.modele}</p>
            <p>Description : {item.description}</p>
            <p>Laboratoire : {item.LaboratoryId || "-"}</p>

            <Link to={`/equipment/edit/${item.id}`}>Modifier</Link>
            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}

export default EquipmentList;