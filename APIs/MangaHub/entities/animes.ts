import { IAnimeMangaDetails } from ".";

export interface IAnimeVisionDetails extends IAnimeMangaDetails {
   totalEps: number;
   age: number;
   season: string;
   status: string;
   epDuration: string;
   producers: string[];
   studies: string[];
}

export interface IAnimeVisionResponse {
   name: string | null;
   description: string | null;
   stats: string[] | null;
   moreInfo: string[][] | null;
}
