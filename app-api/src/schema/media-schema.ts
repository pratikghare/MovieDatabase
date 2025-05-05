import { gql } from "apollo-server-express";

const MediaFields = `
    id: ID!
    mediaType: String!
    name: String!
    overview: String
    poster: String
    thumbnail: String
    backdrop: String
    popularity: Float
    voteAverage: Float
    voteCount: Int
    credits: Credits
    images: ImageData!
    subtext: [String!]!
`

const mediaSchema = gql`
    interface Media {
        ${MediaFields}
    }

    type Movie implements Media {
        ${MediaFields}
        rating: Int
        year: String
        tagline: String
        videos: [Video!]!
        genres: [Genre!]
        similar: [CompactMedia!]!
        recommendations: [CompactMedia!]!
        watchProviders: WatchProviders!
        reviews: ReviewResults!

        released: String
        runtime: String
        budget: String
        revenue: String

        productionCompanies: [ProductionCompany!]
        productionCountries: [String!]
        spokenLanguages: [SpokenLanguage!]

        # Merged OMDB details directly
        rated: String
        awards: String
        boxOffice: String
        production: String
        website: String
        ratings: [Ratings!]
        dvd: String
    }
    type TvShow implements Media {
        ${MediaFields}
        rating: Int
        year: String
        tagline: String
        videos: [Video!]!
        genres: [Genre!]
        similar: [CompactMedia!]!
        recommendations: [CompactMedia!]!
        watchProviders: WatchProviders!
        reviews: ReviewResults!

        released: String
        firstAirDate: String
        lastAirDate: String
        numberOfEpisodes: Int
        numberOfSeasons: Int

        productionCompanies: [ProductionCompany!]
        productionCountries: [String!]
        spokenLanguages: [SpokenLanguage!]

        # Merged OMDB details directly
        rated: String
        awards: String
        boxOffice: String
        production: String
        website: String
        ratings: [Ratings!]
        dvd: String
        lastAirEpisode: CompactEpisode
        nextAirEpisode: CompactEpisode
        seasons: [Season!]!
    }

    type Person implements Media {
        ${MediaFields}

        birthday: String
        deathday: String
        placeOfBirth: String
        knownForDepartment: String
        alsoKnownAs: [String!]!
    }

    type Genre {
        id: ID!
        name: String!
    }

    type ProductionCompany {
        id: ID!
        name: String!
        country: String!
        path: String
    }

    type Season {
        id: String!
        seasonNumber: Int!
        name: String!
        overview: String
        airDate: String
        year: String
        episodeCount: Int
        poster: String
        thumbnail: String
        voteAverage: Float
        rating: Int
        episodes: [CompactEpisode!]!
        credits: Credits
    }

    type CompactEpisode {
        id: ID!
        name: String!
        overview: String!
        poster: String
        runtime: String
        airDate: String!
        rating: Int
        voteAverage: Float
        voteCount: Int
        seasonNumber: Int
        episodeNumber: Int
        episodeType: String
    }

    type SpokenLanguage {
        id: String!
        englishName: String!
        name: String!
    }

    type Image {
        path: String!
        thumbnail: String!
        width: Int!
        height: Int!
        aspectRatio: Float!
    }

    type ImageData {
        backdrops: [Image!]!
        list: [Image!]!
    }

    type Video {
        url: String!
        site: String!
        type: String
        name: String
        embedUrl: String!
        thumbnail: String!
    }

    type Credits {
        directors: [CompactMedia!]!
        writers: [CompactMedia!]!
        cast: [CompactMedia!]!
        crew: [CompactMedia!]!
    }

    type Author {
        name: String!
        username: String!
        image: String
        rating: Float
    }

    type Review {
        id: ID!
        author: Author
        content: String
        created: String
        updated: String
    }

    type ReviewResults {
        list: [Review!]!
        total: Int
        page: Int
        totalPages: Int
    }

    type CompactMedia {
        id: ID!
        mediaType: String!
        name: String!
        overview: String
        thumbnail: String
        backdrop: String
        voteAverage: Float
        voteCount: Int
        subtext: [String!]!
        rating: Int
        character: String
        department: String
        year: String
        order: Int
        releaseDate: String
    }

    type CompactMediaResults {
        page: Int!
        totalPages: Int!
        totalResults: Int!
        list: [CompactMedia!]!
    }

    type Ratings {
        source: String!
        rating: Float!
        scale: Int!
        showStars: Boolean!
        type: String!
        label: String
        logo: String
    }

    type WatchProviders {
        subscription: [WatchProvider!]!
        rent: [WatchProvider!]!
        buy: [WatchProvider!]!
    }

    type WatchProvider {
        id: ID!
        path: String!
        name: String!
        displayPriority: Int
    }

    extend type Query {
        details(id: ID!, media: String!): Media
        searchQuery(query: String!): CompactMediaResults
        seasonDetails (id: ID!, media: String!, seasonNumber: Int!): Season
    }
    
`

export default mediaSchema;