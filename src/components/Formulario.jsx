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
      const response = await fetch("/api/aplipostgres", {
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
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        className="border border-gray-300 rounded p-2 w-full"
      />
      <textarea
        name="ingredientes"
        placeholder="Ingredientes"
        value={formData.ingredientes}
        onChange={(e) =>
          setFormData({ ...formData, ingredientes: e.target.value })
        }
        className="border border-gray-300 rounded p-2 w-full"
      />
      <textarea
        name="instrucciones"
        placeholder="Instrucciones"
        value={formData.instrucciones}
        onChange={(e) =>
          setFormData({ ...formData, instrucciones: e.target.value })
        }
        className="border border-gray-300 rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Guardar Receta
      </button>
    </form>
  );
};

export default Formulario;
