import fs from "fs";
import path from "path";

export async function post({ request }) {
  const receta = await request.json();
  const filePath = path.resolve("./recetas.json");

  try {
    let recetas = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      recetas = JSON.parse(data);
    }

    recetas.push(receta);
    fs.writeFileSync(filePath, JSON.stringify(recetas, null, 2));

    return new Response(
      JSON.stringify({ message: "Receta guardada con éxito" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error al guardar la receta" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
