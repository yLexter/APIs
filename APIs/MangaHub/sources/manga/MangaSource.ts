import { LerMangaSource } from "./LerMangaSource";
import { MangaSource } from "./interfaces";
import puppeteer, { Browser } from "puppeteer";

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

class MangaSourceHandler {
   constructor(private mangaSource: MangaSource) {}

   async search(query: string) {
      return this.mangaSource.search(query);
   }
}

const browserHandler = new BrowserHandler();
const currentMangaSource = new LerMangaSource(browserHandler);
const mangaSourceHandler = new MangaSourceHandler(currentMangaSource);

export { mangaSourceHandler, BrowserHandler };
