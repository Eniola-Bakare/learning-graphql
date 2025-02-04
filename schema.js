export const typeDefs = `#graphql

type Game{
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

type Review{
    id:ID!
    content: String!
    rating: String!
    author: Author!
    game: Game!
}

type Author{
    id: ID!
    name: String!
    verified: String!
    reviews: [Review!]
    gamesReviewed: [Game]
}

type Query{
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author    
}

type Mutation{
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    addAuthor(author: AddAuthor!): Author
    updateGame(id: ID!, edit: EditUpdate!): Game
}

input EditUpdate{
    title: String
    platform: [String]
}

input AddAuthor{
    name: String!
    verified: String!
}
input AddGameInput {
title: String!
platform: [String!]!
}`;
