import { CompactMediaResults } from '../context/context';
import { query } from './graphql-service';
import { SEARCH_QUERY } from './media-schema';

export const fetchByMultiSearch = (term: string): Promise<CompactMediaResults> => query(SEARCH_QUERY, { query: term }).then((data: any) => data.searchQuery);
