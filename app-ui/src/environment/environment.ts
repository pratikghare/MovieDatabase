export const SECRET_KEY = `MOVIE_DATABASE_KEY_PUBLIC`;
const API_KEY = `api_key=70d4fecc6bb44c331e68ff7d257fa365`;
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
export const MULTI_SEARCH = `https://api.themoviedb.org/3/search/multi?${API_KEY}&query=`;

// DELIMETERS
export const MOVIE_DEL = `{movie_id}`;
export const TV_DEL = `{series_id}`;
export const PERSON_DEL = `{person_id}`;

// URLS
export const MOVIE = {
    trending: `https://api.themoviedb.org/3/trending/movie/week?${API_KEY}`,
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}`,
    popular: `https://api.themoviedb.org/3/movie/popular?${API_KEY}`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?${API_KEY}`,
    upComing: `https://api.themoviedb.org/3/movie/upcoming?${API_KEY}`,

    search: `https://api.themoviedb.org/3/search/movie?${API_KEY}`,
    details: `https://api.themoviedb.org/3/movie/{movie_id}?${API_KEY}`,
    images: `https://api.themoviedb.org/3/movie/{movie_id}/images?${API_KEY}`,
    credits: `https://api.themoviedb.org/3/movie/{movie_id}/credits?${API_KEY}`,
    videos: `https://api.themoviedb.org/3/movie/{movie_id}/videos?${API_KEY}`,
    similar: `https://api.themoviedb.org/3/movie/{movie_id}/similar?${API_KEY}`,
    watchProviders: `https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?${API_KEY}`,
}

export const PERSON = {
    trending: `https://api.themoviedb.org/3/trending/person/week?${API_KEY}`,
    popular: `https://api.themoviedb.org/3/person/popular?${API_KEY}`,

    search: `https://api.themoviedb.org/3/search/person?${API_KEY}`,
    details: `https://api.themoviedb.org/3/person/{person_id}?${API_KEY}`,
    images: `https://api.themoviedb.org/3/person/{person_id}/images?${API_KEY}`,
    credits: `https://api.themoviedb.org/3/person/{person_id}/combined_credits?${API_KEY}`,
    movieCredits: `https://api.themoviedb.org/3/person/{person_id}/movie_credits?${API_KEY}`,
    tvCredits: `https://api.themoviedb.org/3/person/{person_id}/tv_credits?${API_KEY}`,
}

export const TV = {
    trending: `https://api.themoviedb.org/3/trending/tv/week?${API_KEY}`,
    topRated: `https://api.themoviedb.org/3/tv/top_rated?${API_KEY}`,
    popular: `https://api.themoviedb.org/3/tv/popular?${API_KEY}`,
    
    search: `https://api.themoviedb.org/3/search/tv?${API_KEY}`,
    details: `https://api.themoviedb.org/3/tv/{series_id}?${API_KEY}`,
    similar: `https://api.themoviedb.org/3/tv/{series_id}/similar?${API_KEY}`,
    videos: `https://api.themoviedb.org/3/tv/{series_id}/videos?${API_KEY}`,
    images: `https://api.themoviedb.org/3/tv/{series_id}/images?${API_KEY}`,
    credits: `https://api.themoviedb.org/3/tv/{series_id}/credits?${API_KEY}`,
    season: `https://api.themoviedb.org/3/tv/{series_id}/season/{season_no}?${API_KEY}`,
    onAir: `https://api.themoviedb.org/3/tv/on_the_air?${API_KEY}`,
    externalIds: `https://api.themoviedb.org/3/tv/{series_id}/external_ids?${API_KEY}`,
    watchProviders: `https://api.themoviedb.org/3/tv/{series_id}/watch/providers?${API_KEY}`
}

// GENRES
export const MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}`;
export const TV_GENRES = `https://api.themoviedb.org/3/genre/tv/list?${API_KEY}`;


// ENCRYPTED
export const RECENTS = "U2FsdGVkX1+nek9pCWqmguB96mRCuvv7Cemdl4HT8BA=";