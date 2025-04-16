export enum MediaType {
    PERSON = "person", TV = "tv", MOVIE = "movie"
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
    character?: string;
    department?: string;
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

export interface WatchProvider {
    id: string;
    name: string;
    path: string;
    displayPriority: string;
}

export interface WatchProviders {
    subscription: WatchProvider[];
    rent: WatchProvider[];
    buy: WatchProvider[];
}

export interface Image {
    path: string;
    width: number;
    height: number;
    aspectRatio: number;
    thumbnail: string;
}

export interface ImageData {
    backdrops: Image[];
    list: Image[];
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
    images: ImageData;
    subtext: string[];
    year?: string;
}

export interface Movie extends Media {
    rating?: number;
    tagline: string;
    videos: Video[];
    similar: CompactMedia[];
    recommendations: CompactMedia[];

    runtime?: string;
    budget?: string;
    revenue?: string;
    productionCompanies?: ProductionCompany[];
    productionCountries?: string[];
    spokenLanguages?: SpokenLanguage[];

    rated?: string;
    released?: string;
    awards?: string;
    boxOffice?: string;
    production?: string;
    website?: string;
    ratings: Ratings[];
    dvd?: string;
    watchProviders: WatchProviders;
}

export interface TvShow extends Media {
    rating?: number;
    tagline: string;
    videos: Video[];
    similar: CompactMedia[];
    recommendations: CompactMedia[];

    firstAirDate: string;
    lastAirDate: string;
    numberOfEpisodes?: number;
    numberOfSeasons?: number;
    productionCompanies?: ProductionCompany[];
    productionCountries?: string[];
    spokenLanguages?: SpokenLanguage[];

    rated?: string;
    released?: string;
    awards?: string;
    boxOffice?: string;
    production?: string;
    website?: string;
    ratings: Ratings[];
    dvd?: string;
    watchProviders: WatchProviders;
}

export interface Person extends Media {
    birthday?: string;
    deathday?: string;
    placeOfBirth?: string;
    knownForDepartment?: string;
    alsoKnownAs: string[];
}