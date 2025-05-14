import { Pool } from "pg";

export async function post({ request }) {
  const formData = await request.json();

  // String de conexión a la base de datos
  const connectionString =
    "postgresql://recetasmambo_owner:npg_OXlzTMFJ2Dw5@ep-gentle-hat-a2ld8qdm-pooler.eu-central-1.aws.neon.tech/recetasmambo?sslmode=require";

  // Crear un pool de conexiones
  const pool = new Pool({
    connectionString,
  });

  try {
    // Inserta los datos en la base de datos
    const query = `
      INSERT INTO Recetas (nombre, ingredientes, instrucciones)
      VALUES ($1, $2, $3)
    `;
    const values = [
      formData.nombre,
      formData.ingredientes,
      formData.instrucciones,
    ];

    await pool.query(query, values);

    return new Response(
      JSON.stringify({ message: "Receta guardada con éxito" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al guardar la receta:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar la receta" }),
      {
        status: 500,
      }
    );
  } finally {
    // Cierra el pool de conexiones
    await pool.end();
  }
}
