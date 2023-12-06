import { Source } from "..";
import { IMangaDetails } from "../../entities";

class AnimesBrSource extends Source {
   public getQuery(query: string): string {
      throw new Error("Method not implemented.");
   }
   public search(query: string): Promise<IMangaDetails> {
      throw new Error("Method not implemented.");
   }
}
