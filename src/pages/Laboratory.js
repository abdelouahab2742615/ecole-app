import { useEffect, useState } from "react";
import axios from "axios";
import "./CrudPage.css";

function Laboratory() {
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    salle: "",
  });
  const [editId, setEditId] = useState(null);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    chargerLabs();
  }, []);

  const chargerLabs = async () => {
    try {
      setErreur("");
      const res = await axios.get(
        "http://localhost:5000/api/laboratories",
        config
      );

      console.log("Réponse laboratoires :", res.data);

      const data =
        res.data?.data?.laboratories ||
        res.data?.data ||
        res.data?.laboratories ||
        res.data ||
        [];

      setLabs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(
        "Erreur chargement laboratoires :",
        error.response?.data || error
      );
      setErreur(
        error.response?.data?.message ||
          "Erreur lors du chargement des laboratoires"
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      nom: "",
      salle: "",
    });
    setEditId(null);
    setErreur("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    try {
      console.log("Données envoyées laboratoire :", form);

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/laboratories/${editId}`,
          form,
          config
        );
        setSuccess("Laboratoire modifié avec succès");
      } else {
        await axios.post(
          "http://localhost:5000/api/laboratories",
          form,
          config
        );
        setSuccess("Laboratoire ajouté avec succès");
      }

      resetForm();
      chargerLabs();
    } catch (error) {
      console.log(
        "Erreur ajout/modification laboratoire :",
        error.response?.data || error
      );
      setErreur(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Erreur lors de l'ajout ou de la modification"
      );
    }
  };

  const handleEdit = (lab) => {
    setForm({
      nom: lab.nom || "",
      salle: lab.salle || "",
    });
    setEditId(lab.id);
    setErreur("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer ce laboratoire ?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/laboratories/${id}`, config);
      setSuccess("Laboratoire supprimé avec succès");
      chargerLabs();
    } catch (error) {
      console.log("Erreur suppression laboratoire :", error.response?.data || error);
      setErreur(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Laboratoires</h1>
          <p>Ajoutez, modifiez et supprimez les laboratoires facilement.</p>
        </div>

        <div className="crud-card">
          <h2>{editId ? "Modifier un laboratoire" : "Ajouter un laboratoire"}</h2>

          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Salle</label>
                <input
                  type="text"
                  name="salle"
                  placeholder="Salle"
                  value={form.salle}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {erreur && <div className="alert alert-error">{erreur}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="crud-actions">
              <button type="submit" className="btn btn-primary">
                {editId ? "Modifier" : "Ajouter"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="crud-card">
          <div className="section-title">
            <h2>Liste des laboratoires</h2>
            <span className="badge-count">{labs.length}</span>
          </div>

          {labs.length === 0 ? (
            <div className="empty-state">Aucun laboratoire trouvé.</div>
          ) : (
            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Nom</th>
                    <th>Salle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labs.map((lab) => (
                    <tr key={lab.id}>
                      <td>{lab.id}</td>
                      <td>{lab.nom}</td>
                      <td>{lab.salle}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(lab)}
                            className="btn btn-warning btn-xs"
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(lab.id)}
                            className="btn btn-danger btn-xs"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Laboratory;