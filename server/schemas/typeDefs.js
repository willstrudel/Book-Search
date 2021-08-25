const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Book {
    _id: ID!
    description: String
    authors: [String]
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
}

input bookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String     
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: bookInput!): User
    removeBook(bookId: ID!): User
}

type: Auth {
    token: ID!
    user: User
}`

module.exports = typeDefs;