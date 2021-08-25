const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

type Auth {
    token: ID!
    user: User
}

input bookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String     
}



type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: bookInput!): User
    removeBook(bookId: ID!): User
}`;

module.exports = typeDefs;

// type Query {
//     me: User
// }