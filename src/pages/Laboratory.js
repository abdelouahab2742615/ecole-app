import { useEffect, useState } from "react";
import axios from "axios";

function Laboratory() {
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    salle: ""
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    chargerLabs();
  }, []);

  const chargerLabs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/laboratories", config);
      setLabs(res.data.data.laboratories);
    } catch (error) {
      console.log(error.response);
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
        await axios.put(`http://localhost:5000/api/laboratories/${editId}`, form, config);
      } else {
        await axios.post("http://localhost:5000/api/laboratories", form, config);
      }

      setForm({
        nom: "",
        salle: ""
      });

      setEditId(null);
      chargerLabs();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (lab) => {
    setForm({
      nom: lab.nom,
      salle: lab.salle
    });
    setEditId(lab.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/laboratories/${id}`, config);
      chargerLabs();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <h2>Laboratoires</h2>

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
          name="salle"
          placeholder="Salle"
          value={form.salle}
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
                <button type="button" onClick={() => handleEdit(lab)}>
                  Modifier
                </button>
                <button type="button" onClick={() => handleDelete(lab.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Laboratory;