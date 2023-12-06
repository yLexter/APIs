import { LerMangaSource } from "./LerMangaSource";
import { IMangaSource } from "./interfaces";
import puppeteer, { Browser } from "puppeteer";

export class BrowserHandler {
   private static browser: Browser;

   static async getBrowser() {
      if (!BrowserHandler.browser)
         BrowserHandler.browser = await puppeteer.launch();

      return BrowserHandler.browser;
   }
}

class MangaSource {
   constructor(private mangaSource: IMangaSource) {}

   async search(query: string) {
      return this.mangaSource.search(query);
   }
}

const currentMangaSource = new LerMangaSource(BrowserHandler);
const mangaSource = new MangaSource(currentMangaSource);

export { mangaSource };
