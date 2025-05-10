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
    character?: string;
    department?: string;
    order?: number;
    releaseDate?: string;
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
    key: string;
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
    key: string;
    url: string;
    site: string;
    type: string;
    name: string;
    embedUrl: string;
    thumbnail: string;
}

export interface Credits {
    directors: CompactMedia[];
    writers: CompactMedia[];
    cast: CompactMedia[];
    crew: CompactMedia[];
}

export interface Ratings {
    source: string;
    rating: number;
    scale: number;
    label?: string;
    logo?: string;
    showStars: boolean;
    type: 'image' | 'svg' | 'box' | 'text';
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

export interface Author {
    name: string;
    username: string;
    image?: string;
    rating: number;
}

export interface Review {
    id: string;
    author: Author;
    content: string;
    created: string;
    updated: string;
}

export interface ReviewResults {
    list: Review[];
    total: number;
    page: number;
    totalPages: number;
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
    reviews: ReviewResults;
}

export interface CompactEpisode {
    id: string;
    name: string;
    overview: string;
    poster?: string;
    runtime?: string;
    airDate: string;
    rating?: number;
    voteAverage: number;
    voteCount: number;
    seasonNumber: number;
    episodeNumber: number;
    episodeType?: string;
}

export interface Season {
    id: string;
    seasonNumber: number;
    airDate?: string;
    year?: string;
    episodeCount?: number;
    name: string;
    overview: string;
    poster?: string;
    thumbnail?: string;
    voteAverage?: number;
    rating?: number;
    episodes: CompactEpisode[];
    credits: Credits;
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
    reviews: ReviewResults;
    lastAirEpisode?: CompactEpisode;
    nextAirEpisode?: CompactEpisode;
    seasons: Season[];
}

export interface Person extends Media {
    birthday?: string;
    deathday?: string;
    placeOfBirth?: string;
    knownForDepartment?: string;
    alsoKnownAs: string[];
}

export interface HomePageGrid {
    nowPlaying?: Array<CompactMedia>;
    trendingPeople?: Array<CompactMedia>;
    topRatedTV?: Array<CompactMedia>;
}

export interface MediaReducer {
    search: CompactMediaResults;
    details?: Movie | Person | TvShow | Media;
    loader: boolean;
    homePage?: HomePageGrid;
    homePageLoader?: boolean;
}

export enum PAGES {
    DETAILS, HOME, LOGIN, REGISTER, IMAGES, IMAGE_VIEWER, VIDEOS, CREDITS, ADV_SEARCH, SEASONS
}