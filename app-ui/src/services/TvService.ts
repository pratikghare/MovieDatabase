import { db } from "../environment/environment";
import { fetchDbApi, get } from "./ApiService";



export function getTrendingTV(page: number=1): Promise<any>{
    return fetchDbApi(db.tv.trending + `page=${page}&`);
}

export function getPopularTV(page: number=1): Promise<any>{
    return fetchDbApi(db.tv.popular + `page=${page}&`);
}

export function getTopRatedTV(page: number=1): Promise<any>{
    return fetchDbApi(db.tv.topRated + `page=${page}&`);
}




export function getTVsBySearch(query: string, page: number = 1): Promise<any>{
    return fetchDbApi(db.tv.search + `query=${query}&page=${page}&`);
}

export function getTVDetailsById(id: string): Promise<any>{
    const url = db.tv.details.split(db.tvParamId).join(id);
    return fetchDbApi(url);
}

export function getTVDetailsByImdbId(imdbId: string): Promise<any>{
    const url = db.omdbUrl+imdbId;
    return get(url);
}

export function getVideosByTvId(id: string): Promise<any>{
    const url = db.tv.videos.split(db.tvParamId).join(id);
    return fetchDbApi(url);
}

export function getCreditsByTvId(id: string): Promise<any>{
    const url = db.tv.credits.split(db.tvParamId).join(id);
    return fetchDbApi(url);
}

export function getPhotosByTvId(id: string): Promise<any>{
    const url = db.tv.images.split(db.tvParamId).join(id);
    return fetchDbApi(url);
}

export function getExternalIdsByTvId(id: string): Promise<any>{
    const url = db.tv.externalIds.split(db.tvParamId).join(id);
    return fetchDbApi(url);
}

export function getStreamingDetailsByTvId(id: string): Promise<any>{
    const url = db.tv.watchProviders.split(db.tvParamId).join(id);
    return fetchDbApi(url);
}

