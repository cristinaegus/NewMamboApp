import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ingredientes: "",
    instrucciones: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/guardar-receta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Receta guardada con éxito");
      setFormData({ nombre: "", ingredientes: "", instrucciones: "" });
    } else {
      alert("Error al guardar la receta");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />
      <textarea
        placeholder="Ingredientes"
        value={formData.ingredientes}
        onChange={(e) =>
          setFormData({ ...formData, ingredientes: e.target.value })
        }
      />
      <textarea
        placeholder="Instrucciones"
        value={formData.instrucciones}
        onChange={(e) =>
          setFormData({ ...formData, instrucciones: e.target.value })
        }
      />
      <button type="submit">Guardar Receta</button>
    </form>
  );
};

export default Formulario;
