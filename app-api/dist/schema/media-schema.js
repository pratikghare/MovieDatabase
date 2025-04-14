"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
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
`;
const mediaSchema = (0, apollo_server_1.gql) `
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
    }

    type Credits {
        directors: [CompactMedia!]!
        writers: [CompactMedia!]!
        cast: [CompactMedia!]!
        crew: [CompactMedia!]!
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
    }

    type CompactMediaResults {
        page: Int!
        totalPages: Int!
        totalResults: Int!
        list: [CompactMedia!]!
    }

    type Ratings {
        source: String!
        label: String!
        rating: String!
        scale: String!
        logo: String
    }

    extend type Query {
        details(id: ID!, media: String!): Media
        searchQuery(query: String!): CompactMediaResults
    }
`;
exports.default = mediaSchema;
