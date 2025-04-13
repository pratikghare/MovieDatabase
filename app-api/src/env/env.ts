export const PORT = 4462;

// REGION
export const DEFAULT_REGION = "IN";

// MULTI SEARCH
export const SEARCH = `https://api.themoviedb.org/3/search/multi?query={query}&`;
export const SEARCH_DEL = `{query}`;

// DEFAULT IMAGE PATH
export const APP_IMAGE_PATH = "/";
export const IMAGE_NOT_FOUND = `${APP_IMAGE_PATH}not_found.png`;
export const DEFAULT_BG_IMAGE = `${APP_IMAGE_PATH}bg-default.jpg`;

// IMAGES
export const IMAGE_URLS = [
    'https://image.tmdb.org/t/p/w92',
    'https://image.tmdb.org/t/p/w154',
    'https://image.tmdb.org/t/p/w185',
    'https://image.tmdb.org/t/p/w342',
    'https://image.tmdb.org/t/p/w500'
]
export const IMAGE_URL = `https://image.tmdb.org/t/p/original`;
export const SHORT_IMAGE_URL = IMAGE_URLS[4];

// VIDEO
export const VIDEOS = [
    {
        site: "YouTube",
        url: "www.youtube.com/watch?v="
    },
    {
        site: "Vimeo",
        url: "https://vimeo.com/"
    }
]

export const OMDB_URL = `https://www.omdbapi.com/?i={id}&apikey=`;
export const OMDB_DEL = `{id}`;

// URLS
export const MOVIE = {
    trending: `https://api.themoviedb.org/3/trending/movie/week?`,
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?`,
    popular: `https://api.themoviedb.org/3/movie/popular?`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?`,
    upComing: `https://api.themoviedb.org/3/movie/upcoming?`,

    search: `https://api.themoviedb.org/3/search/movie?`,
    details: `https://api.themoviedb.org/3/movie/{movie_id}?`,
    images: `https://api.themoviedb.org/3/movie/{movie_id}/images?`,
    videos: `https://api.themoviedb.org/3/movie/{movie_id}/videos?`,
    credits: `https://api.themoviedb.org/3/movie/{movie_id}/credits?`,
    similar: `https://api.themoviedb.org/3/movie/{movie_id}/similar?`,
    recommendations: `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?`,
    watchProviders: `https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?`,
    reviews: `https://api.themoviedb.org/3/movie/{movie_id}/reviews?`,
    externalIds: `https://api.themoviedb.org/3/tv/{series_id}/external_ids?`,

    delimiter: `{movie_id}`
}

export const PERSON = {
    trending: `https://api.themoviedb.org/3/trending/person/week?`,
    popular: `https://api.themoviedb.org/3/person/popular?`,

    search: `https://api.themoviedb.org/3/search/person?`,
    details: `https://api.themoviedb.org/3/person/{person_id}?`,
    images: `https://api.themoviedb.org/3/person/{person_id}/images?`,
    credits: `https://api.themoviedb.org/3/person/{person_id}/combined_credits?`,
    movieCredits: `https://api.themoviedb.org/3/person/{person_id}/movie_credits?`,
    tvCredits: `https://api.themoviedb.org/3/person/{person_id}/tv_credits?`,
    taggedImages: `https://api.themoviedb.org/3/person/{person_id}/tagged_images?`,
    externalIds: `https://api.themoviedb.org/3/tv/{series_id}/external_ids?`,

    delimiter: `{person_id}`
}

export const TV = {
    trending: `https://api.themoviedb.org/3/trending/tv/week?`,
    topRated: `https://api.themoviedb.org/3/tv/top_rated?`,
    popular: `https://api.themoviedb.org/3/tv/popular?`,
    
    search: `https://api.themoviedb.org/3/search/tv?`,
    details: `https://api.themoviedb.org/3/tv/{series_id}?`,
    images: `https://api.themoviedb.org/3/tv/{series_id}/images?`,
    videos: `https://api.themoviedb.org/3/tv/{series_id}/videos?`,
    credits: `https://api.themoviedb.org/3/tv/{series_id}/aggregate_credits?`,
    similar: `https://api.themoviedb.org/3/tv/{series_id}/similar?`,
    recommendations: `https://api.themoviedb.org/3/tv/{series_id}/recommendations?`,
    watchProviders: `https://api.themoviedb.org/3/tv/{series_id}/watch/providers?`,

    onAir: `https://api.themoviedb.org/3/tv/on_the_air?`,
    externalIds: `https://api.themoviedb.org/3/tv/{series_id}/external_ids?`,

    delimiter: `{series_id}`,
}

export const TV_SEASON = {
    trending: `https://api.themoviedb.org/3/trending/tv/week?`,
    topRated: `https://api.themoviedb.org/3/tv/top_rated?`,
    popular: `https://api.themoviedb.org/3/tv/popular?`,
    
    search: `https://api.themoviedb.org/3/search/tv?`,
    details: `https://api.themoviedb.org/3/tv/{series_id}/season/{season_no}?`,
    similar: `https://api.themoviedb.org/3/tv/{series_id}/similar?`,
    videos: `https://api.themoviedb.org/3/tv/{series_id}/videos?`,
    images: `https://api.themoviedb.org/3/tv/{series_id}/images?`,
    credits: `https://api.themoviedb.org/3/tv/{series_id}/aggregate_credits?`,
    onAir: `https://api.themoviedb.org/3/tv/on_the_air?`,
    externalIds: `https://api.themoviedb.org/3/tv/{series_id}/external_ids?`,
    watchProviders: `https://api.themoviedb.org/3/tv/{series_id}/watch/providers?`,

    delimiter: `{season_no}`
}


// GENRES
export const MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?`;
export const TV_GENRES = `https://api.themoviedb.org/3/genre/tv/list?`;