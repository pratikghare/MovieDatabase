export enum MediaType {
    PERSON, TV, MOVIE
}

export interface Genre {
    id: number;
    genre: string;
}

export interface SearchResults {
    id: number;
    mediaType: MediaType;
    name: string;
    character: string;
    thumbnail: string;
    genre: Array<Genre>;
    rating: number;
    gender: string;
    department: string;
    releaseDate: string;
}