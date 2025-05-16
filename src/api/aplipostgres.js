import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function post({ request }) {
  try {
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const ingredientes = formData.get("ingredientes");
    const instrucciones = formData.get("instrucciones");

    const { data, error } = await supabase
      .from('recetas')
      .insert([
        {
          nombre,
          ingredientes,
          instrucciones,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Receta guardada con éxito" }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error al guardar la receta:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar la receta" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}