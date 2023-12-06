import { Browser } from "puppeteer";
import { IMangaDetails } from "../entities/entities";
import { IMangaSource } from "./interfaces";
import { BrowserHandler } from "./MangaSource";

export class LerMangaSource implements IMangaSource {
   public readonly url: string;
   public readonly browser: BrowserHandler;

   constructor(browserHandler: BrowserHandler) {
      this.url = "https://lermanga.org";
      this.browser = browserHandler;
   }

   async fetchData(query: string) {
      const url = this.getQuery(query);
   }

   async search(query: string): Promise<IMangaDetails> {
      throw new Error();
   }

   getQuery(query: string) {
      return `${this.url}/?s=%s#gsc.tab=0&gsc.q=%s&gsc.page=1`.replace(
         /%s/g,
         query
      );
   }
}
