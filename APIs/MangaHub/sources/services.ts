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
      return new Promise(resolve => setTimeout(resolve, seconds * 1000));
   }
}

class BrowserHandler {
   private browser: Browser | null;

   constructor() {
      this.browser = null;
      this.setBrowser();
   }

   async setBrowser() {
      this.browser = await puppeteer.launch();
   }

   async getBrowser() {
      if (!this.browser) this.browser = await puppeteer.launch();

      return this.browser;
   }
}

abstract class SourceHandler {
   public constructor(
      private listAnimeSource: Source[],
      private sourceDefault: Source
   ) {}

   public getSourceByUrl(url?: string) {
      if (!url) return this.sourceDefault;

      const source = this.listAnimeSource.find(
         source => source.url === url.toLowerCase()
      );

      if (!source)
         throw new Error(
            "URL de site inválida! Verifique a lista de sites disponíveis no repositório do github: https://github.com/yLexter/APIs"
         );

      return source;
   }

   public search(query: string, url?: string) {
      const source = this.getSourceByUrl(url);

      return source.search(query);
   }
}

class AnimeHandler extends SourceHandler {}
class MangaHandler extends SourceHandler {}

class AnimeMangaHandler {
   constructor(
      public readonly anime: AnimeHandler,
      public readonly manga: MangaHandler
   ) {}
}

export {
   BrowserHandler,
   Source,
   AnimeHandler,
   MangaHandler,
   AnimeMangaHandler,
};
