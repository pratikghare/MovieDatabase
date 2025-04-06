import { gql } from "apollo-server";

export const detailsSchema = gql`
    type Genre {
        id: ID!
        genre: String
    }

    enum MediaType {
        PERSON, MOVIE, TV
    }

    enum Gender {
        FEMALE, MALE 
    }

    type SearchResults {
        id: ID!
        mediaType: MediaType!
        name: String!
        character: String
        thumbnail: String
        genre: [Genre]!
        rating: Int
        gender: Gender
        department: String
        releaseDate: String
    }

    type CreditDetails {
        id: ID!
        order: Int!
        creditId: String!
        mediaType: MediaType!
        name: String!
        originalName: String
        overview: String!
        character: String
        poster: String
        thumbnail: String
        genre: [Genre]!
        rating: Int
        gender: String
        department: String
        releaseDate: String
    }

    type Rating {
        type: String!
        rating: Float!
        image: String
        votes: String
    }

    type Credit {
        mediaType: MediaType!
        department: String!
        credits: [SearchResults]!
    }

    type Details {
        id: ID!
        mediaType: MediaType!
        imdbId: String
        name: String!
        originalName: String
        overview: String!
        poster: String
        thumbnail: String
        backdrop: String
        ratings: [Rating]!
        credits: [Credit]!
        country: String
        runtime: String
        status: String
        tagline: String
        rating: Int
        releaseDate: String
        revenue: String
        awards: String
        rated: String
        boxOffice: String
        language: String

        isAdult: Boolean!
        birthday: String
        deathday: String
    }



    extend type Query {
        searchQuery(query: String!): [SearchResults]!
    }
`;