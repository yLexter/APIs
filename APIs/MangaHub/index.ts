import express from "express";
import { mangaRouter } from "./controllers/manga/MangaController";

const app = express();
const PORT = 3000;

app.use("/api", mangaRouter);

app.listen(PORT, () => {
   console.log(`Server Running in: ${PORT}`);
});
