import { BrowserHandler, Source } from "..";
import { IMangaDetails } from "../../entities";

class AnimesBrSource extends Source {
   constructor(browserHandler: BrowserHandler) {
      super(browserHandler, "https://animesbr.cc/");
   }

   public getQuery(query: string): string {
      const querySanitized = query.replace(" ", "+");

      return `$${this.url}?s=${querySanitized}`;
   }

   public search(query: string): Promise<IMangaDetails> {
      throw new Error("Method not implemented.");
   }
}

export { AnimesBrSource };
