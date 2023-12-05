import { LerMangaSource } from "./LerMangaSource";
import { IMangaSource } from "./interfaces";
import puppeteer from "puppeteer";

class MangaSource {
   constructor(private mangaSource: IMangaSource) {}

   async search(query: string) {
      return this.mangaSource.search(query);
   }
}

const currentMangaSource = new LerMangaSource(puppeteer);
const mangaSource = new MangaSource(currentMangaSource);

export { mangaSource };
