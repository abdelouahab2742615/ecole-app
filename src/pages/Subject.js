import { useEffect, useState } from "react";
import axios from "axios";

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    code: ""
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    chargerSubjects();
  }, []);

  const chargerSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subjects", config);
      setSubjects(res.data.data.subjects);
    } catch (error) {
      console.log("Erreur chargement :", error.response || error.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/subjects/${editId}`, form, config);
      } else {
        await axios.post("http://localhost:5000/api/subjects", form, config);
      }

      setForm({
        nom: "",
        code: ""
      });

      setEditId(null);
      chargerSubjects();
    } catch (error) {
      console.log("Erreur ajout/modification :", error.response || error.message);
    }
  };

  const handleEdit = (subject) => {
    setForm({
      nom: subject.nom,
      code: subject.code
    });

    setEditId(subject.id || subject._id);
  };

  const handleDelete = async (id) => {
    try {
      console.log("ID à supprimer :", id);

      await axios.delete(`http://localhost:5000/api/subjects/${id}`, config);

      setSubjects(subjects.filter((subject) => (subject.id || subject._id) !== id));
    } catch (error) {
      console.log("Erreur suppression :", error.response || error.message);
    }
  };

  return (
    <div>
      <h2>Sujets</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
        />

        <input
          type="text"
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>IDENTIFIANT</th>
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
                  <button type="button" onClick={() => handleEdit(s)}>
                    Modifier
                  </button>
                  <button type="button" onClick={() => handleDelete(subjectId)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Subject;