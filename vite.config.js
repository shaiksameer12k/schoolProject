import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Replace with your desired port number
    host: true, // Add this to expose the server to your network
  },
});