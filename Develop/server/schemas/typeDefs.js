const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Book {
    _id: ID
    author: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
}

type Query {
    books: [Book]!
    book(profileId: ID!): Book
}`;

module.exports = typeDefs;