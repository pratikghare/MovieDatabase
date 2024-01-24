import { db } from "../environment/environment";
import { fetchDbApi, get } from "./ApiService";



export function getTrendingMovies(page: number=1): Promise<any>{
    return fetchDbApi(db.movie.trending + `page=${page}&`);
}

export function getNowPlayingMovies(page: number=1): Promise<any>{
    return fetchDbApi(db.movie.nowPlaying + `page=${page}&`);
}

export function getPopularMovies(page: number=1): Promise<any>{
    return fetchDbApi(db.movie.popular + `page=${page}&`);
}

export function getTopRatedMovies(page: number=1): Promise<any>{
    return fetchDbApi(db.movie.topRated + `page=${page}&`);
}

export function getUpCommingMovies(page: number=1): Promise<any>{
    return fetchDbApi(db.movie.upComing + `page=${page}&`);
}




export function getMoviesBySearch(query: string, page: number=1): Promise<any>{
    return fetchDbApi(db.movie.search + `query=${query}&page=${page}&`);
}

export function getMovieDetailsById(id: string): Promise<any>{
    const url = db.movie.details.split(db.movieParamId).join(id);
    return fetchDbApi(url);
}

export function getMovieDetailsByImdbId(imdbId: string): Promise<any>{
    const url = db.omdbUrl+imdbId;
    return get(url);
}

export function getCreditsByMovieId(id: string): Promise<any>{
    const url = db.movie.credits.split(db.movieParamId).join(id);
    return fetchDbApi(url);
}

export function getPhotosByMovieId(id: string): Promise<any>{
    const url = db.movie.images.split(db.movieParamId).join(id);
    return fetchDbApi(url);
}

export function getVideosByMovieId(id: string): Promise<any>{
    const url = db.movie.videos.split(db.movieParamId).join(id);
    return fetchDbApi(url);
}

export function getSimilarMoviesById(id: string): Promise<any>{
    const url = db.movie.similar.split(db.movieParamId).join(id);
    return fetchDbApi(url);
}

export function getStreamingDetailsByMovieId(id: string): Promise<any>{
    const url = db.movie.watchProviders.split(db.movieParamId).join(id);
    return fetchDbApi(url);
}


// export function getSortedMovieListByReleaseDate(list: Array<any>): Array<any>{
//     let data = getSortedMovieList(list, 'vote_average').filter(item => item.media_type === 'movie');
//     return data;
// }