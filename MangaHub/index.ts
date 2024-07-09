import express from "express";
import { mangaRouter } from "./controllers/MangaController";
import { animesRouter } from "./controllers/AnimeController";
import { headerHandler } from "./controllers";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(headerHandler);

app.use("/mangas", mangaRouter);
app.use("/animes", animesRouter);

app.listen(PORT, () => {
   console.log(`Server Running in: ${PORT}`);
});
