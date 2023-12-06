import { IMangaDetails } from "../../entities/manga/entities";

export abstract class MangaSource {
   public abstract getQuery(query: string): string;
   public abstract search(query: string): Promise<IMangaDetails>;

   public async sleep(seconds: number) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
   }
}
