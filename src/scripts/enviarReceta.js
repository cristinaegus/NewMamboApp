export function setupFormulario() {
  const recipeForm = document.getElementById("recipeForm");
  const recetasList = document.getElementById("recetasList");

  // Función para renderizar todas las recetas guardadas
  function renderRecetas() {
    recetasList.innerHTML = "";
    const recetas = JSON.parse(localStorage.getItem("recetas") || "[]");
    recetas.forEach(({ nombre, ingredientes, instrucciones }) => {
      const card = document.createElement("div");
      card.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4";
      card.innerHTML = `
        <div class="p-6">
          <h2 class="text-2xl font-bold text-sky-700 mb-2">${nombre}</h2>
          <h3 class="text-lg font-semibold text-gray-700 mb-1">Ingredientes:</h3>
          <ul class="list-disc list-inside mb-2">
            ${ingredientes.split('\n').map(ing => `<li>${ing}</li>`).join('')}
          </ul>
          <h3 class="text-lg font-semibold text-gray-700 mb-1">Instrucciones:</h3>
          <p class="text-gray-600 whitespace-pre-line">${instrucciones}</p>
        </div>
      `;
      recetasList.appendChild(card);
    });
  }

  // Renderizar recetas al cargar la página
  renderRecetas();

  if (recipeForm) {
    recipeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = recipeForm.nombre.value;
      const ingredientes = recipeForm.ingredientes.value;
      const instrucciones = recipeForm.instrucciones.value;

      // Guardar en localStorage
      const recetas = JSON.parse(localStorage.getItem("recetas") || "[]");
      recetas.push({ nombre, ingredientes, instrucciones });
      localStorage.setItem("recetas", JSON.stringify(recetas));

      // Limpiar el formulario y renderizar de nuevo
      recipeForm.reset();
      renderRecetas();
      alert("Receta guardada con éxito");
    });
  }
}

