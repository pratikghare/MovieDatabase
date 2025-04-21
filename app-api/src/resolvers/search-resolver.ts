import { CompactMediaResults } from "../context/context";
import { SEARCH, SEARCH_DEL } from "../env/env";
import { getSearchResultsData } from "../media-utils";
import { getResolvedTMUrl } from "../utils";

const searchQuery = async (_: any, { query }: { query: string }) => {
    try {
        console.log('Search Query');
        const url = getResolvedTMUrl(SEARCH, [SEARCH_DEL], [query]);
        const response: any = await fetch(url);
        if(!response.ok) throw new Error(`Failed to fetch results: ${response.statusText}`);
        const result = await response.json();

        const searchResults: CompactMediaResults = getSearchResultsData(result);
        return searchResults;
    }
    catch(error) {
        console.log("ERROR: ", error);
    }
}

const searchResolver = {
    Query: {
        searchQuery
    }
}

export default searchResolver;