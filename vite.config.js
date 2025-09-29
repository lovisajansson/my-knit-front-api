// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/adjust-stitches": {
                target: "https://my-knit-calc-api.onrender.com",
                changeOrigin: true,
                secure: true,
            },
        },
    },
});
