import { CompactMediaResults } from '../context/context';
import { ADULT_DEL, MOVIE, PERSON, SEARCH, SEARCH_DEL, TV } from '../env/env';
import { getHomePageData, getSearchResultsData } from '../media-utils';
import { getResolvedTMUrl } from '../utils';

const searchQuery = async (_: any, { query, includeAdult }: { query: string, includeAdult?: boolean }) => {
    try {
        console.log('Search Query');
        const url = getResolvedTMUrl(SEARCH , [SEARCH_DEL, ADULT_DEL], [query, includeAdult ? 'true' : 'false']);
        const response: any = await fetch(url);
        if(!response.ok) throw new Error(`Failed to fetch results: ${response.statusText}`);
        const result = await response.json();

        const searchResults: CompactMediaResults = getSearchResultsData(result);
        return searchResults;
    }
    catch(error) {
        console.log('ERROR: ', error);
    }
}


const homePageQuery = async () => {
    try {
        console.log('HomePage Query');
        const urls = [getResolvedTMUrl(MOVIE.nowPlaying, [], []), getResolvedTMUrl(TV.topRated, [], []), getResolvedTMUrl(PERSON.popular, [], [])];
        const all: Array<Promise<any>> = urls.map((url) => fetch(url));
        const responses: Array<any> = await Promise.all(all);
        const data: any[] = await Promise.all(responses.map((response: any) => response.json()));
        
        return getHomePageData(data[0].results, data[1].results, data[2].results);
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
}

const searchResolver = {
    Query: {
        searchQuery, homePageQuery
    }
}

export default searchResolver;