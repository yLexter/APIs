
export interface IMangaDetails {
    title: string;
    author: string;
    genres: string[];
    status: 'Ongoing' | 'Completed';
    description: string;
    releaseDate?: Date;
    coverImageURL?: string;
  }