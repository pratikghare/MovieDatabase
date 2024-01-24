import { db } from "../environment/environment";
import { fetchDbApi } from "./ApiService";



export function getTrendingPeople(page: number=1): Promise<any>{
    return fetchDbApi(db.person.trending + `page=${page}&`);
}

export function getPopularPeople(page: number=1): Promise<any>{
    return fetchDbApi(db.person.popular + `page=${page}&`);
}

export function getPeopleBySearch(query: string, page: number = 1): Promise<any>{
    return fetchDbApi(db.person.search + `query=${query}&page=${page}&`);
}




export function getPersonDetailsById(id: string): Promise<any>{
    const url = db.person.details.split(db.personParamId).join(id);
    return fetchDbApi(url);
}

export function getPhotosByPersonId(id: string): Promise<any>{
    const url = db.person.images.split(db.personParamId).join(id);
    return fetchDbApi(url);
}

export function getCreditsByPersonId(id: string): Promise<any>{
    const url = db.person.credits.split(db.personParamId).join(id);
    return fetchDbApi(url);
}

export function getMovieCreditsByPersonId(id: string): Promise<any>{
    const url = db.person.movieCredits.split(db.personParamId).join(id);
    return fetchDbApi(url);
}

export function getTVCreditsByPersonId(id: string): Promise<any>{
    const url = db.person.tvCredits.split(db.personParamId).join(id);
    return fetchDbApi(url);
}