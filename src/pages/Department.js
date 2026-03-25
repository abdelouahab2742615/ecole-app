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
      console.log("Departments:", response.data);
      setDepartments(response.data.data?.departments || response.data || []);
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
      setErreur("le domaine doit être sciences, littérature ou autre");
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
        setSuccess("Departement modifie avec succes");
      } else {
        await API.post("/departments", data);
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
    setEditingId(department.id || department._id);
    setErreur("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    setErreur("");
    setSuccess("");

    try {
      await API.delete(`/departments/${id}`);
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
          <select
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
            required
          >
            <option value="">Choisir un domaine</option>
            <option value="sciences">sciences</option>
            <option value="littérature">littérature</option>
            <option value="autre">autre</option>
          </select>
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
            {departments.map((department) => {
              const departmentId = department.id || department._id;

              return (
                <tr key={departmentId}>
                  <td>{departmentId}</td>
                  <td>{department.nom}</td>
                  <td>{department.domaine}</td>
                  <td>{department.histoire}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(department)}>
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(departmentId)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Department;