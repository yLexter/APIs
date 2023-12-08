export interface IAnimeDetails {
   name: string;
   description: string;
   genres: string[];
   eps: number;
}

export interface IAnimeVisionDetails extends IAnimeDetails {}

export interface IAnimeVisionResponse {
   name: string | null;
   description: string | null | undefined;
   stats: string[] | null;
   moreInfo: (string[] | null)[] | null;
}
