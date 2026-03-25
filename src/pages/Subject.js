import { useEffect, useState } from "react";
import axios from "axios";

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    code: "",
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
    chargerSubjects();
  }, []);

  const chargerSubjects = async () => {
    try {
      setErreur("");
      const res = await axios.get("http://localhost:5000/api/subjects", config);
      setSubjects(res.data.data.subjects || []);
    } catch (error) {
      setErreur("Erreur lors du chargement des sujets");
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
      code: "",
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
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/subjects/${editId}`,
          form,
          config
        );
        setSuccess("Sujet modifié avec succès");
      } else {
        await axios.post("http://localhost:5000/api/subjects", form, config);
        setSuccess("Sujet ajouté avec succès");
      }

      resetForm();
      chargerSubjects();
    } catch (error) {
      setErreur("Erreur lors de l'ajout ou de la modification");
    }
  };

  const handleEdit = (subject) => {
    setForm({
      nom: subject.nom,
      code: subject.code,
    });

    setEditId(subject.id || subject._id);
    setErreur("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer ce sujet ?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`, config);
      setSubjects(subjects.filter((subject) => (subject.id || subject._id) !== id));
      setSuccess("Sujet supprimé avec succès");
    } catch (error) {
      setErreur("Erreur lors de la suppression");
    }
  };

  return (
    <div className="crud-page">
      <div className="crud-container">
        <div className="crud-header">
          <h1>Sujets</h1>
          <p>Ajoutez et gérez les sujets dans un tableau lisible.</p>
        </div>

        <div className="crud-card">
          <h2>{editId ? "Modifier un sujet" : "Ajouter un sujet"}</h2>

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
                <label>Code</label>
                <input
                  type="text"
                  name="code"
                  placeholder="Code"
                  value={form.code}
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
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="crud-card">
          <div className="section-title">
            <h2>Liste des sujets</h2>
            <span className="badge-count">{subjects.length}</span>
          </div>

          {subjects.length === 0 ? (
            <div className="empty-state">Aucun sujet trouvé.</div>
          ) : (
            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Nom</th>
                    <th>Code</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((s) => {
                    const subjectId = s.id || s._id;

                    return (
                      <tr key={subjectId}>
                        <td>{subjectId}</td>
                        <td>{s.nom}</td>
                        <td>{s.code}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              onClick={() => handleEdit(s)}
                              className="btn btn-warning btn-xs"
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(subjectId)}
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

export default Subject;