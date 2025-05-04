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
`;


export const SEASON_SCHEMA = gql`
    query Query($id: ID!, $media: String!, $seasonNumber: Int!) {
        seasonDetails(id: $id, media: $media, seasonNumber: $seasonNumber) {
            id
            seasonNumber
            airDate
            year
            episodeCount
            name
            overview
            poster
            thumbnail
            voteAverage
            rating
            episodes {
                id
                name
                overview
                poster
                runtime
                airDate
                rating
                voteAverage
                voteCount
                seasonNumber
                episodeNumber
                episodeType
            }
            credits {
                ...CreditsFields
            }
        }
    }

    fragment CreditsFields on Credits {
        directors {
            ...CompactMediaFields
        }
        writers {
            ...CompactMediaFields
        }
        cast {
            ...CompactMediaFields
        }
        crew {
            ...CompactMediaFields
        }
    }

    fragment CompactMediaFields on CompactMedia {
        id
        mediaType
        name
        overview
        thumbnail
        backdrop
        voteAverage
        voteCount
        subtext
        character
        department
        year
        order
        releaseDate
    }
`;
