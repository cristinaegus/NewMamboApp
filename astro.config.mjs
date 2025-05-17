import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import tailwindcss from "tailwindcss/tailwind.css";

export default defineConfig({
  integrations: [tailwind(), react()],
  toolbar: false, // Desactiva la DevToolbar correctamente
});
