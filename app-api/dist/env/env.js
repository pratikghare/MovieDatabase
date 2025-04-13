"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TV_GENRES = exports.MOVIE_GENRES = exports.TV_SEASON = exports.TV = exports.PERSON = exports.MOVIE = exports.OMDB_DEL = exports.OMDB_URL = exports.VIDEOS = exports.SHORT_IMAGE_URL = exports.IMAGE_URL = exports.IMAGE_URLS = exports.DEFAULT_BG_IMAGE = exports.IMAGE_NOT_FOUND = exports.APP_IMAGE_PATH = exports.SEARCH_DEL = exports.SEARCH = exports.DEFAULT_REGION = exports.PORT = void 0;
exports.PORT = 4462;
// REGION
exports.DEFAULT_REGION = "IN";
// MULTI SEARCH
exports.SEARCH = `https://api.themoviedb.org/3/search/multi?query={query}&`;
exports.SEARCH_DEL = `{query}`;
// DEFAULT IMAGE PATH
exports.APP_IMAGE_PATH = "/";
exports.IMAGE_NOT_FOUND = `${exports.APP_IMAGE_PATH}not_found.png`;
exports.DEFAULT_BG_IMAGE = `${exports.APP_IMAGE_PATH}bg-default.jpg`;
// IMAGES
exports.IMAGE_URLS = [
    'https://image.tmdb.org/t/p/w92',
    'https://image.tmdb.org/t/p/w154',
    'https://image.tmdb.org/t/p/w185',
    'https://image.tmdb.org/t/p/w342',
    'https://image.tmdb.org/t/p/w500'
];
exports.IMAGE_URL = `https://image.tmdb.org/t/p/original`;
exports.SHORT_IMAGE_URL = exports.IMAGE_URLS[4];
// VIDEO
exports.VIDEOS = [
    {
        site: "YouTube",
        url: "www.youtube.com/watch?v="
    },
    {
        site: "Vimeo",
        url: "https://vimeo.com/"
    }
];
exports.OMDB_URL = `https://www.omdbapi.com/?i={id}&apikey=`;
exports.OMDB_DEL = `{id}`;
// URLS
exports.MOVIE = {
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
};
exports.PERSON = {
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
};
exports.TV = {
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
};
exports.TV_SEASON = {
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
};
// GENRES
exports.MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?`;
exports.TV_GENRES = `https://api.themoviedb.org/3/genre/tv/list?`;
