import { IMangaDetails } from "../entities/entities";

export interface IMangaSource {
    getQuery: (query: string) => string 
    search(query: string): Promise<IMangaDetails>
}