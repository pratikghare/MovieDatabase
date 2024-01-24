import { db } from "../environment/environment"


export function get(url: string): Promise<any>{
    const options: any = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
}

export function fetchDbApi(url: string): Promise<any>{
    return get(url+db.apiKey);
}