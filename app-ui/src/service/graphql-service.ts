import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client';
const uri = import.meta.env.VITE_API_URL;

const client = new ApolloClient({
    uri, cache: new InMemoryCache()
});

/**
 * Function to perform GraphQL queries
 * @param query - GraphQL query document
 * @param mutation - GraphQL mutation document
 * @param variables - Optional query/mutation variables
 * @returns Promise resolving to query/mutation data
 */

export const query = (query: DocumentNode, variables: Record<string, any>): Promise<any> =>
    client.query({query, variables})
    .then((response: any) => response.data)
    .catch((error: any) => {
        console.log(error);
        throw error;
    })