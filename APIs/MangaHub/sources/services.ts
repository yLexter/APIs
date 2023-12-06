import { LerMangaSource } from ".";
import { IMangaDetails } from "../entities/manga/entities";
import puppeteer, { Browser } from "puppeteer";

abstract class Source {
   public abstract getQuery(query: string): string;
   public abstract search(query: string): Promise<IMangaDetails>;

   public async sleep(seconds: number) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
   }
}

class BrowserHandler {
   private browser: Browser | null;

   constructor() {
      this.browser = null;
   }

   async getBrowser() {
      if (!this.browser)
         this.browser = await puppeteer.launch({ headless: true });

      return this.browser;
   }
}

class SourceHandler {
   constructor(private mangaSource: Source) {}

   async search(query: string) {
      return this.mangaSource.search(query);
   }
}

const browserHandler = new BrowserHandler();

const currentMangaSource = new LerMangaSource(browserHandler);
const currentAnimeSource = new LerMangaSource(browserHandler);

const mangaSourceHandler = new SourceHandler(currentMangaSource);
const animeSourceHandler = new SourceHandler(currentAnimeSource);

export { mangaSourceHandler, animeSourceHandler, BrowserHandler, Source };
