import React, { useEffect, useState } from "react";
import API from "../services/api";

function Department() {
  const [nom, setNom] = useState("");
  const [domaine, setDomaine] = useState("");
  const [histoire, setHistoire] = useState("");
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const loadDepartments = async () => {
    try {
      const response = await API.get("/departments");
      setDepartments(response.data.data?.departments || response.data || []);
    } catch (error) {
      setErreur("Erreur de chargement");
      setDepartments([]);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const resetForm = () => {
    setNom("");
    setDomaine("");
    setHistoire("");
    setEditingId(null);
    setErreur("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    const domaineNettoye = domaine.trim().toLowerCase();
    let domaineFinal = domaineNettoye;

    if (domaineNettoye === "litterature") {
      domaineFinal = "littérature";
    }

    if (
      domaineFinal !== "sciences" &&
      domaineFinal !== "littérature" &&
      domaineFinal !== "autre"
    ) {
      setErreur("Le domaine doit être sciences, littérature ou autre");
      return;
    }

    try {
      const data = {
        nom: nom.trim(),
        domaine: domaineFinal,
        histoire: histoire.trim(),
      };

      if (editingId) {
        await API.put(`/departments/${editingId}`, data);
        setSuccess("Département modifié avec succès");
      } else {
        await API.post("/departments", data);
        setSuccess("Département ajouté avec succès");
      }

      resetForm();
      loadDepartments();
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Erreur sur le département"
      );
    }
  };

  const handleEdit = (department) => {
    setNom(department.nom || "");
    setDomaine(department.domaine || "");
    setHistoire(department.histoire || "");
    setEditingId(department.id || department._id);
    setErreur("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer ce département ?");
    if (!ok) return;

    setErreur("");
    setSuccess("");

    try {
      await API.delete(`/departments/${id}`);
      setSuccess("Département supprimé avec succès");
      loadDepartments();
    } catch (error) {
      setErreur("Erreur de suppression");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Départements</h1>
          <p>Gérez les départements de l'application avec une interface claire et moderne.</p>
        </div>

        <div className="crud-card">
          <h2>{editingId ? "Modifier un département" : "Ajouter un département"}</h2>

          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Nom du département"
                  required
                />
              </div>

              <div className="form-group">
                <label>Domaine</label>
                <select
                  value={domaine}
                  onChange={(e) => setDomaine(e.target.value)}
                  required
                >
                  <option value="">Choisir un domaine</option>
                  <option value="sciences">Sciences</option>
                  <option value="littérature">Littérature</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Histoire</label>
              <textarea
                rows="4"
                value={histoire}
                onChange={(e) => setHistoire(e.target.value)}
                placeholder="Ajoutez une description ou l'histoire du département"
              />
            </div>

            {erreur && <div className="alert alert-error">{erreur}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="crud-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Modifier" : "Ajouter"}
              </button>

              {editingId && (
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="crud-card">
          <div className="section-title">
            <h2>Liste des départements</h2>
            <span className="badge-count">{departments.length}</span>
          </div>

          {departments.length === 0 ? (
            <div className="empty-state">Aucun département trouvé.</div>
          ) : (
            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Domaine</th>
                    <th>Histoire</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => {
                    const departmentId = department.id || department._id;

                    return (
                      <tr key={departmentId}>
                        <td>{departmentId}</td>
                        <td>{department.nom}</td>
                        <td>{department.domaine}</td>
                        <td>{department.histoire || "-"}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              onClick={() => handleEdit(department)}
                              className="btn btn-warning btn-xs"
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(departmentId)}
                              className="btn btn-danger btn-xs"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Department;