import { Pool } from "pg";

export async function post({ request }) {
  const formData = await request.formData();
  const nombre = formData.get("nombre");
  const ingredientes = formData.get("ingredientes");
  const instrucciones = formData.get("instrucciones");

  const connectionString =
    "postgresql://recetasmambo_owner:npg_OXlzTMFJ2Dw5@ep-gentle-hat-a2ld8qdm-pooler.eu-central-1.aws.neon.tech/recetasmambo?sslmode=require";

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const query = `
      INSERT INTO recetas (nombre, ingredientes, instrucciones)
      VALUES ($1, $2, $3)
    `;
    const values = [nombre, ingredientes, instrucciones];

    await pool.query(query, values);
    return new Response(
      JSON.stringify({ message: "Receta guardada con éxito" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al guardar la receta:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar la receta" }),
      { status: 500 }
    );
  } finally {
    await pool.end();
  }
}