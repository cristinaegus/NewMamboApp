import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ingredientes: "",
    instrucciones: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
      nombre: form.elements.namedItem("nombre")?.value || "",
      ingredientes: form.elements.namedItem("ingredientes")?.value || "",
      instrucciones: form.elements.namedItem("instrucciones")?.value || "",
    };

    try {
      const response = await fetch("/api/guardar-receta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Receta guardada con éxito");
        form.reset();
        // fetchRecetas(); // Actualiza la lista de recetas
      } else {
        alert("Error al guardar la receta");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />
      <textarea
        name="ingredientes"
        placeholder="Ingredientes"
        value={formData.ingredientes}
        onChange={(e) =>
          setFormData({ ...formData, ingredientes: e.target.value })
        }
      />
      <textarea
        name="instrucciones"
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
