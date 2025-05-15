export function setupFormulario() {
  const recipeForm = document.getElementById("recipeForm");
  if (recipeForm) {
    recipeForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const form = event.target;
      const formData = {
        nombre: form.nombre.value,
        ingredientes: form.ingredientes.value,
        instrucciones: form.instrucciones.value,
      };
      try {
        const response = await fetch("/src/api/aplipostgres.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          form.reset();
          alert("Receta guardada con éxito");
        } else {
          alert("Error al guardar la receta");
        }
      } catch (error) {
        alert("Error al enviar los datos");
        console.error(error);
      }
    });
  }
}
