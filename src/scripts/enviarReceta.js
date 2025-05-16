export function setupFormulario() {
  const recipeForm = document.getElementById("recipeForm");
  if (recipeForm) {
    recipeForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      
      try {
        const response = await fetch("/api/aplipostgres", {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          event.target.reset();
          alert("Receta guardada con éxito");
        } else {
          const data = await response.json();
          alert(data.error || "Error al guardar la receta");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al enviar los datos");
      }
    });
  }
}