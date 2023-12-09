import { IAnimeMangaDetails } from ".";

export interface IMangaDetails extends IAnimeMangaDetails {
   releaseDate: string | null;
   coverImageURL: string | null;
   rating: string | null;
   totalChapters: string | null;
}

export interface IMangaResponse {
   name: string | null;
   genres: string[] | null;
   description: string | null;
   releaseDate: string | null;
   coverImageURL: string | null;
   rating: string | null;
   totalChapters: string | null;
}
