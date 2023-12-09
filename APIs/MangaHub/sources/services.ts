import puppeteer, { Browser } from "puppeteer";
import { IAnimeMangaDetails } from "../entities";

abstract class Source {
   public readonly browserHandler: BrowserHandler;
   public readonly url: string;

   constructor(browser: BrowserHandler, url: string) {
      this.browserHandler = browser;
      this.url = url;
   }

   public abstract getQuery(query: string): string;
   public abstract search(query: string): Promise<IAnimeMangaDetails>;

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
      if (!this.browser) this.browser = await puppeteer.launch();

      return this.browser;
   }
}

class SourceHandler {
   constructor(private mangaSource: Source) {}

   async search(query: string) {
      return this.mangaSource.search(query);
   }
}

export { BrowserHandler, Source, SourceHandler };
