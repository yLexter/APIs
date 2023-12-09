import { BrowserHandler, LerMangaSource, SourceHandler } from ".";
import { AnimesVisionSource } from "./anime/AnimesVisionSource";

const browserHandler = new BrowserHandler();

const currentMangaSource = new LerMangaSource(browserHandler);
const currentAnimeSource = new AnimesVisionSource(browserHandler);

const animeSourceHandler = new SourceHandler(currentAnimeSource);
const mangaSourceHandler = new SourceHandler(currentMangaSource);

export { animeSourceHandler, mangaSourceHandler };
