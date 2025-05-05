import { gql } from '@apollo/client';
import { MediaType, Movie, Person, TvShow } from '../context/media-context';
import { query } from './graphql-service';

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
                backdrops {
                    path
                    width
                    height
                    aspectRatio
                    thumbnail
                }
                list {
                    path
                    width
                    height
                    aspectRatio
                    thumbnail
                }
            }
            ... on Movie {
                rating
                tagline
                year
                credits {
                    ...CreditsFields
                }
                videos {
                    url
                    site
                    type
                    name
                    embedUrl
                    thumbnail
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
                reviews {
                    list {
                        ...Reviews
                    }
                    total
                    page
                    totalPages
                }
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
                    rating
                    scale
                    showStars
                    type
                    label
                    logo
                }
                dvd
                watchProviders {
                    ...WatchProviders
                }
            }
            ... on TvShow {
                rating
                tagline
                year
                credits {
                    ...CreditsFields
                }
                videos {
                    url
                    site
                    type
                    name
                    embedUrl
                    thumbnail
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
                reviews {
                    list {
                        ...Reviews
                    }
                    total
                    page
                    totalPages
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
                    rating
                    scale
                    showStars
                    type
                    label
                    logo
                }
                dvd
                watchProviders {
                    ...WatchProviders
                }
                lastAirEpisode {
                    ...CompactEpisode
                }
                nextAirEpisode {
                    ...CompactEpisode
                }
                seasons {
                    ...Season
                }
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


    fragment Reviews on Review {
        id
        author {
            name
            username
            image
            rating
        }
        content
        created
        updated
    }

    fragment WatchProviders on WatchProviders {
        subscription {
            ...WatchProviderFields
        }
        rent {
            ...WatchProviderFields
        }
        buy {
            ...WatchProviderFields
        }
    }

    fragment WatchProviderFields on WatchProvider {
        id
        name
        path
        displayPriority
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

    fragment CompactEpisode on CompactEpisode {
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

    fragment Season on Season {
        id
        seasonNumber
        name
        overview
        airDate
        year
        episodeCount
        poster
        thumbnail
        voteAverage
        rating
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


export const fetchMediaDetails = (id: string, media: MediaType): Promise<Movie | TvShow | Person> =>
    query(MEDIA_DETAILS, { id, media }).then(data => data.details);