import { MediaType, SearchResults } from "../context/details-context";
import { getResolvedTMUrl, getThumbnail } from "../utils";

const multi: string = "https://api.themoviedb.org/3/search/multi?query={query}&api_key=";

const searchQuery = async (_: any, { query }: { query: string }) => {
    console.log("HERE")
    try {
        const url = getResolvedTMUrl(multi, ["{query}"], [query]);
        console.log(url)
        const response: any = await fetch(url);
        // if(!response.ok) throw new Error(`Failed to fetch results: ${response.statusText}`);
        const jsonResponse = await response.json();
        const results = jsonResponse.results;
        const massaged: Array<SearchResults> = [
            
        ]
        results.forEach((item: any) => {
            massaged.push({
                id: item.id,
                mediaType: MediaType.PERSON,
                name: item?.name ? item.name : "",
                character: "",
                thumbnail: getThumbnail(item),
                genre: [],
                rating: 0,
                gender: "",
                department: "",
                releaseDate: ""
            });
        })
        return massaged
    }
    catch(error) {
        console.log(error);
    }
}

export const detailsResolver = {
    Query: {
        searchQuery
    }
}