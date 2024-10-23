export interface User {
    emailId: string;
    password: string;
    firstName: string;
    lastName: string;
    profile: string;
    phone: string | null;
}

export enum MediaType {
    MOVIE = "movie", TV = "tv", PERSON = "person"
}
export interface Genre {
    id: number;
    name: string;
}



export enum StreamingType {
    flatrate = "Streaming on", buy = "Buy on", rent = "Available for rent on"
}
export interface Streaming {
    id: number;
    order: number;
    logo: string;
    poster: string;
    name: string;
    url: string;
    type: StreamingType;
}



export interface Credit {
    id: number;
    poster: string;
    order: number;
    adult: boolean;
    character: string;
    creditId: string;
    popularity: number;
    gender: number | null;
    knownFor: string | null;
    name: string | null;
    job: string | null;
    originalName: string | null;
    castId: number | null;
    backdrop: string | null;
    genres: Array<Genre>;
    language: string | null;
    overview: string | null;
    year: string | null;
    rating: number | null;
    votes: number | null;
    mediaType: MediaType;
}
export interface Credits {
    directors: Array<Credit>;
    writers: Array<Credit>;
    producers: Array<Credit>;
    cast: Array<Credit>;
}



export interface Rating {
    source: string;
    rating: string;
    outOf?: string;
    image?: string | null;
}




export interface Image {
    aspectRatio: number;
    poster: string;
    thumbnail: string;
    height: number;
    width: number | null;
}
export interface Video {
    id: string;
    name: string;
    key: string;
    url: string;
    type: string;
    official: boolean;
    site: string;
    size?: number;
    published?: string;
}



export interface MediaDetails {
    // All
    id: number;
    imdbId: string | null;
    name: string;
    poster: string;
    backdrop: string | null;
    thumbnail: string;
    overview: string;
    popularity: number;
    credits: Credits;
    country: string | null;
    mediaType: MediaType;
    // Person
    birthDate: string | null;
    deathDate: string | null;
    department: string | null;
    knownFor: string | null;
    // Movies & TV
    year: string | null;
    released: string | null;
    userRating: number | null;
    ratings: Array<Rating>;
    votes: string | null;
    genres: Array<Genre>;
    images: Array<Image>;
    videos: Array<Video>;
    trailer: Video | null,
    runTime: string | null;
    providers: Array<Streaming>;
    awards: string | null;
    rated: string | null
    boxOffice: string | null;
    production: string | null;
    language: string | null;
    similar: Array<Credit>;
    // TV
    episodeCount: number | null;
    seasonCount: number | null;
    seasonNumber: number | null;
    episodeNumber: number | null;
    episodeType: string | null;
    seasons: Array<MediaDetails>;
    // lastAirDate: string;
    lastEpisode: MediaDetails | null;
    status: string | null;
    tagline: string | null;
}




export interface SearchResults {
    page: number;
    totalPages: number;
    totalResults: number;
    list: Array<MediaDetails>
}





export interface BaseSearch {
    id: number;
    mediaType: MediaType;
}
export interface Recents {
    id: number;
    name: string;
    poster: string;
    mediaType: MediaType;
}




export interface MediaHome {
    title: string;
    type: MediaType;
    list: Array<Credit>;
}


export enum LinksProps {
    trending = ("trending"), nowPlaying = ("nowPlaying"), popular = ("popular"), topRated = ("topRated"), 
    upComing = ("upComing"), search = ("search"), details = ("details"), images = ("images"), credits = ("credits"), 
    videos = ("videos"), similar = ("similar"), watchProviders = ("watchProviders"), 
    movieCredits = ("movieCredits"), tvCredits = ("tvCredits"), 
    season = ("season"), onAir = ("onAir"), externalIds = ("externalIds")
}