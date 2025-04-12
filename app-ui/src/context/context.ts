export enum MediaType {
    PERSON = 'person', TV = 'tv', MOVIE = 'movie'
}

export interface CompactMedia {
    id: string;
    mediaType: MediaType;
    name: string;
    overview?: string;
    poster?: string;
    thumbnail?: string;
    backdrop?: string;
    voteAverage?: number;
    voteCount?: number;
    subtext: string[];
    rating?: number;
}

export interface CompactMediaResults {
    page: number;
    totalPages: number;
    totalResults: number;
    list: Array<CompactMedia>;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    country: string;
    path?: string;
}

export interface SpokenLanguage {
    id: string;
    englishName: string;
    name: string;
}

export interface Image {
    path: string;
    width: number;
    height: number;
    aspectRatio: number;
}

export interface ImageData {
    total: number;
    backdrops: Image[];
    posters: Image[];
}

export interface Video {
    url: string;
    site: string;
    type: string;
    name: string;
}

export interface Credits {
    directors: CompactMedia[];
    writers: CompactMedia[];
    cast: CompactMedia[];
    crew: CompactMedia[];
}

export interface Ratings {
    source: string;
    label: string;
    rating: string;
    scale: string;
    logo: string;
}

export interface Media {
    id: string;
    mediaType: MediaType;
    imdbId?: string;
    name: string;
    overview?: string;
    poster?: string;
    thumbnail?: string;
    backdrop?: string;
    popularity?: number;
    voteAverage?: number;
    voteCount?: number;
    genres?: Genre[];
    credits?: Credits;
    images: Image[];
    subtext: String[];
}

export interface Movie extends Media {
    tagline: string;
    videos: Video[];
    similar: CompactMedia[];
    recommendations: CompactMedia[];

    runtime?: string;
    budget?: number;
    revenue?: number;
    productionCompanies?: ProductionCompany[];
    productionCountries?: String[];
    spokenLanguages?: SpokenLanguage[];

    rated?: string;
    released?: string;
    awards?: string;
    boxOffice?: string;
    production?: string;
    website?: string;
    ratings: Ratings[];
    dvd?: string;
}

export interface TvShow extends Media {
    tagline: string;
    videos: Video[];
    similar: CompactMedia[];
    recommendations: CompactMedia[];

    firstAirDate: string;
    lastAirDate: string;
    numberOfEpisodes?: number;
    numberOfSeasons?: number;
    productionCompanies?: ProductionCompany[];
    productionCountries?: String[];
    spokenLanguages?: SpokenLanguage[];

    rated?: string;
    released?: string;
    awards?: string;
    boxOffice?: string;
    production?: string;
    website?: string;
    ratings: Ratings[];
    dvd?: string;
}

export interface Person extends Media {
    birthday?: string;
    deathday?: string;
    placeOfBirth?: string;
    knownForDepartment?: string;
    alsoKnownAs: string[];
}
