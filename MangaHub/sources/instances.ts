import {
   AnimeHandler,
   AnimeMangaHandler,
   BrowserHandler,
   LerMangaSource,
   MangaHandler,
} from ".";
import { AnimesVisionSource } from "./anime/AnimesVisionSource";

const browserHandler = new BrowserHandler();

const defaultMangaSource = new LerMangaSource(browserHandler);
const defaultAnimeSource = new AnimesVisionSource(browserHandler);

const animeSourceHandler = new AnimeHandler(
   [defaultAnimeSource],
   defaultAnimeSource
);
const mangaSourceHandler = new MangaHandler(
   [defaultMangaSource],
   defaultMangaSource
);

const app = new AnimeMangaHandler(animeSourceHandler, mangaSourceHandler);

export { app };
