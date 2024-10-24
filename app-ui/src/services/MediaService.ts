import { MOVIE, MOVIE_DEL, MULTI_SEARCH, OMDB_URL, PERSON, PERSON_DEL, TV, TV_DEL } from "../environment/environment";
import { get } from "./ApiService";
import { LinksProps, MediaType } from "../Model/Model";

//DUMMY
import details from "../../../../dummy/details.json";
import omdb from "../../../../dummy/omdb.json";
import credits from "../../../../dummy/credits.json";



const getURL = (property: LinksProps, id: number, type: MediaType): string => {
    let env: any = null;
    switch(type) {
        case MediaType.MOVIE:
            env = MOVIE;
            return String(env.hasOwnProperty(property) ? env[`${property}`].replace(MOVIE_DEL, id+"") : "") + "";
        case MediaType.PERSON:
            env = PERSON;
            return String(env.hasOwnProperty(property) ? env[`${property}`].replace(PERSON_DEL, id+"") : "") + "";
        case MediaType.TV:
            env = TV;
            return String(env.hasOwnProperty(property) ? env[`${property}`].replace(TV_DEL, id+"") : "") + "";
        default:
            return "";
    }
}




export function searchByQuery(query: string): Promise<any> {
    return get(MULTI_SEARCH + query);
}

export function fetchDetails(id: number, type: MediaType): Promise<any> {
    return get(getURL(LinksProps.details, id, type));
    return new Promise((resolve) => setTimeout(() => {resolve(details)}, 500));
}
export function fetchExternalIds(id: number): Promise<any> {
    return get(getURL(LinksProps.externalIds, id, MediaType.TV));
}
export function fetcOMDBDetails(id: string): Promise<any> {
    return get(OMDB_URL+id, false);
    return new Promise((resolve) => setTimeout(() => {resolve(omdb)}, 500));
}
export function fetchCredits(id: number, type: MediaType): Promise<any> {
    return get(getURL(LinksProps.credits, id, type));
    return new Promise((resolve) => setTimeout(() => {resolve(credits)}, 500));
}
export function fetchRecommendations(id: number, type: MediaType): Promise<any> {
    return get(getURL(LinksProps.recommendations, id, type));
    return new Promise((resolve) => setTimeout(() => {resolve(credits)}, 500));
}
export function fetchVideos(id: number, type: MediaType): Promise<any>  {
    return get(getURL(LinksProps.videos, id, type));
}
export function fetchImages(id: number, type: MediaType): Promise<any>  {
    return get(getURL(LinksProps.images, id, type));
}
export function fetchWatchProviders(id: number, type: MediaType): Promise<any>  {
    return get(getURL(LinksProps.watchProviders, id, type));
}
export function fetchSimilar(id: number, type: MediaType): Promise<any>  {
    return get(getURL(LinksProps.similar, id, type));
}







export function fetchNowPlaying(): Promise<any> {
    return get(MOVIE.nowPlaying);
}
export function fetchTopRatedMovies(): Promise<any> {
    return get(MOVIE.topRated);
}

export function fetchPopularPeople(): Promise<any> {
    return get(PERSON.popular);
}

export function fetchTrendingTV(): Promise<any> {
    return get(TV.trending);
}
export function fetchTopRatedTV(): Promise<any> {
    return get(TV.topRated);
}