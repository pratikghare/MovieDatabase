import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
    query Query($query: String!) {
        searchQuery(query: $query) {
            page
            totalPages
            totalResults
            list {
                id
                mediaType
                name
                overview
                thumbnail
                backdrop
                voteAverage
                voteCount
                subtext
                rating
                character
                department
            }
        }
    }
`