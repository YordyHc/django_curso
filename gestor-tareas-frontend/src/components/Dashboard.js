// src/components/Dashboard.js
import React, { useEffect, useState, useContext, useCallback } from "react";
import API from "../services/api";
import AuthContext from "../context/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { authTokens, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Low",
  });

  const fetchTasks = useCallback(async () => {
    const res = await API.get("tasks/tasks/", {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    });
    setTasks(res.data);
  }, [authTokens.access]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (e) => {
    e.preventDefault(); // 👈 esto evita que el formulario recargue la página
    console.log("Enviando:", form); // 👈 Añade esto
    try {
      const response = await API.post("tasks/tasks/", form, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setTimeout(() => {
        fetchTasks();
      }, 200);
      console.log("Respuesta del servidor:", response.data); // Aquí muestras la respuesta exitosa
      fetchTasks();
      setForm({
        title: "",
        description: "",
        due_date: "",
        priority: "Low",
      });
    } catch (err) {
      // Si la petición falla, muestra el error y la respuesta que envió el backend (si hay)
      console.error("Error al crear tarea:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`tasks/tasks/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    });
    fetchTasks();
  };

  return (
    <div>
      <div className="top-bar">
        <h2>Mis Tareas</h2>
        <button className="logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.priority} - {task.due_date}
            <button onClick={() => handleDelete(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button>Crear</button>
      </form>
    </div>
  );
}
