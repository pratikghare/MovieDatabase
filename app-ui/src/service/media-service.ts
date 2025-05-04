import { CompactMediaResults, MediaType } from '../context/media-context';
import { query } from './graphql-service';
import { SEARCH_QUERY, SEASON_SCHEMA } from './media-schema';

export const fetchByMultiSearch = (term: string): Promise<CompactMediaResults> => query(SEARCH_QUERY, { query: term }).then((data: any) => data.searchQuery);


export const fetchSeasonDetails = (id: string, media: MediaType, seasonNumber: number): Promise<any> => {
    return query(SEASON_SCHEMA, { id, media, seasonNumber }).then((data: any) => data.seasonDetails);
}