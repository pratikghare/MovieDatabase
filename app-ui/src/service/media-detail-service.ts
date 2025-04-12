import { gql } from "@apollo/client";
import { MediaType, Movie, Person, TvShow } from "../context/details-context";
import { query } from "./graphql-service";

const MEDIA_DETAILS = gql`
    query Query($id: ID!, $media: String!) {
        details(id: $id, media: $media) {
            id
            mediaType
            name
            overview
            poster
            thumbnail
            backdrop
            popularity
            voteAverage
            voteCount
            subtext
            images {
                path
                width
                height
                aspectRatio
            }
            ... on Movie {
                tagline
                credits {
                    ...CreditsFields
                }
                videos {
                    url
                    site
                    type
                    name
                }
                genres {
                    id
                    name
                }
                similar {
                    ...CompactMediaFields
                }
                recommendations {
                    ...CompactMediaFields
                }
                released
                runtime
                budget
                revenue
                productionCompanies {
                    id
                    name
                    country
                    path
                }
                productionCountries
                spokenLanguages {
                    id
                    englishName
                    name
                }
                rated
                awards
                boxOffice
                production
                website
                ratings {
                    source
                    label
                    rating
                    scale
                    logo
                }
                dvd
            }
            ... on TvShow {
                tagline
                credits {
                    ...CreditsFields
                }
                videos {
                    url
                    site
                    type
                    name
                }
                genres {
                    id
                    name
                }
                similar {
                    ...CompactMediaFields
                }
                recommendations {
                    ...CompactMediaFields
                }
                released
                firstAirDate
                lastAirDate
                numberOfEpisodes
                numberOfSeasons
                productionCompanies {
                    id
                    name
                    country
                    path
                }
                productionCountries
                spokenLanguages {
                    id
                    englishName
                    name
                }
                rated
                awards
                boxOffice
                production
                website
                ratings {
                    source
                    label
                    rating
                    scale
                    logo
                }
                dvd
            }
            ... on Person {
                credits {
                    cast {
                        ...CompactMediaFields
                    }
                }
                birthday
                deathday
                placeOfBirth
                knownForDepartment
                alsoKnownAs
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
    }
`;


export const fetchMediaDetails = (id: string, media: MediaType): Promise<Movie | TvShow | Person> => 
    query(MEDIA_DETAILS, { id, media }).then(data => data.details);