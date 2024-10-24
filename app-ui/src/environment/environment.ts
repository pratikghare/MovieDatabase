export const SECRET_KEY = `MOVIE_DATABASE_KEY_PUBLIC`;
export const API_KEY = `api_key=70d4fecc6bb44c331e68ff7d257fa365`;
export const QUERY_API = `http://localhost:3500`;
const OMDB_KEY = `apikey=df39e1ba`;
export const OMDB_URL = `https://www.omdbapi.com/?${OMDB_KEY}&i=`;

// REGION
export const DEFAULT_REGION = "IN";

// DEFAULT IMAGE PATH
export const APP_IMAGE_PATH = "/";
export const IMAGE_NOT_FOUND = `${APP_IMAGE_PATH}not_found.jpg`;
export const DEFAULT_BG_IMAGE = `${APP_IMAGE_PATH}bg-default.jpg`;
// IMAGES
export const IMAGE_URL = `https://image.tmdb.org/t/p/original`;
export const SHORT_IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
export const POSTER_RATIO: number = (200/300);
// VIDEO
export const YOUTUBE_URL = `www.youtube.com/watch?v=`;
export const VIMEO_URL = `https://vimeo.com/`

// MULTI SEARCH
export const MULTI_SEARCH = `https://api.themoviedb.org/3/search/multi?query=`;

// DELIMETERS
export const MOVIE_DEL = `{movie_id}`;
export const TV_DEL = `{series_id}`;
export const PERSON_DEL = `{person_id}`;

// URLS
export const MOVIE = {
    trending: `https://api.themoviedb.org/3/trending/movie/week`,
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing`,
    popular: `https://api.themoviedb.org/3/movie/popular`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated`,
    upComing: `https://api.themoviedb.org/3/movie/upcoming`,

    search: `https://api.themoviedb.org/3/search/movie`,
    details: `https://api.themoviedb.org/3/movie/{movie_id}`,
    images: `https://api.themoviedb.org/3/movie/{movie_id}/images`,
    credits: `https://api.themoviedb.org/3/movie/{movie_id}/credits`,
    videos: `https://api.themoviedb.org/3/movie/{movie_id}/videos`,
    similar: `https://api.themoviedb.org/3/movie/{movie_id}/similar`,
    recommendations: `https://api.themoviedb.org/3/movie/{movie_id}/recommendations`,
    watchProviders: `https://api.themoviedb.org/3/movie/{movie_id}/watch/providers`,
}

export const PERSON = {
    trending: `https://api.themoviedb.org/3/trending/person/week`,
    popular: `https://api.themoviedb.org/3/person/popular`,

    search: `https://api.themoviedb.org/3/search/person`,
    details: `https://api.themoviedb.org/3/person/{person_id}`,
    images: `https://api.themoviedb.org/3/person/{person_id}/images`,
    credits: `https://api.themoviedb.org/3/person/{person_id}/combined_credits`,
    movieCredits: `https://api.themoviedb.org/3/person/{person_id}/movie_credits`,
    tvCredits: `https://api.themoviedb.org/3/person/{person_id}/tv_credits`,
}

export const TV = {
    trending: `https://api.themoviedb.org/3/trending/tv/week`,
    topRated: `https://api.themoviedb.org/3/tv/top_rated`,
    popular: `https://api.themoviedb.org/3/tv/popular`,
    
    search: `https://api.themoviedb.org/3/search/tv`,
    details: `https://api.themoviedb.org/3/tv/{series_id}`,
    similar: `https://api.themoviedb.org/3/tv/{series_id}/similar`,
    recommendations: `https://api.themoviedb.org/3/tv/{series_id}/recommendations`,
    videos: `https://api.themoviedb.org/3/tv/{series_id}/videos`,
    images: `https://api.themoviedb.org/3/tv/{series_id}/images`,
    credits: `https://api.themoviedb.org/3/tv/{series_id}/credits`,
    season: `https://api.themoviedb.org/3/tv/{series_id}/season/{season_no}`,
    onAir: `https://api.themoviedb.org/3/tv/on_the_air`,
    externalIds: `https://api.themoviedb.org/3/tv/{series_id}/external_ids`,
    watchProviders: `https://api.themoviedb.org/3/tv/{series_id}/watch/providers`
}

// GENRES
export const MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list`;
export const TV_GENRES = `https://api.themoviedb.org/3/genre/tv/list`;


// ENCRYPTED
export const RECENTS = "U2FsdGVkX1+nek9pCWqmguB96mRCuvv7Cemdl4HT8BA=";