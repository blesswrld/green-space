import { defineConfig } from "vite";

export default defineConfig({
    // 1. Указываем, что корень проекта теперь в папке 'src'
    root: "src",

    // 2. Указываем Vite, где искать статичные файлы (картинки, шрифты)
    publicDir: "../public",

    build: {
        // 3. Указываем, куда будет собираться билд проекта
        outDir: "../dist",
    },
});
