import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    // server: {port: 3000},
    plugins: [react()],
    base: "/lab4", // Замените RepoName на имя вашего репозитория
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "/"),
            },
        },
    },
})
