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
      const response = await API.get("/api/departments");
      console.log("Departments:", response.data);

      setDepartments(response.data.data.departments);
    } catch (error) {
      console.log("Erreur:", error.response?.data);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    try {
      if (editingId) {
        await API.put(`/api/departments/${editingId}`, {
          nom,
          domaine,
          histoire,
        });
        setSuccess("Departement modifie avec succes");
      } else {
        await API.post("/api/departments", {
          nom,
          domaine,
          histoire,
        });
        setSuccess("Departement ajoute avec succes");
      }

      resetForm();
      loadDepartments();
    } catch (error) {
      console.log("Erreur:", error.response?.data);
      setErreur(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Erreur sur le departement"
      );
    }
  };

  const handleEdit = (department) => {
    setNom(department.nom || "");
    setDomaine(department.domaine || "");
    setHistoire(department.histoire || "");
    setEditingId(department.id);
    setErreur("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    setErreur("");
    setSuccess("");

    try {
      await API.delete(`/api/departments/${id}`);
      setSuccess("Departement supprime avec succes");
      loadDepartments();
    } catch (error) {
      console.log("Erreur:", error.response?.data);
      setErreur("Erreur de suppression");
    }
  };

  return (
    <div>
      <h2>Départements</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Domaine :</label>
          <input
            type="text"
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Histoire :</label>
          <textarea
            value={histoire}
            onChange={(e) => setHistoire(e.target.value)}
          ></textarea>
        </div>

        {erreur && <p style={{ color: "red" }}>{erreur}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">
          {editingId ? "Modifier" : "Ajouter"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Annuler
          </button>
        )}
      </form>

      <hr />

      <h3>Liste des départements</h3>

      {departments.length === 0 ? (
        <p>Aucun département</p>
      ) : (
        <table border="1" cellPadding="8">
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
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.nom}</td>
                <td>{department.domaine}</td>
                <td>{department.histoire}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(department)}>
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(department.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Department;