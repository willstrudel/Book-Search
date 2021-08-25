const { Book } = require('../models');

const resolvers = {
    Query: {
        books: async () => {
            return await Book.find({}).populate({
                path: 'books',
                populate: 'author',
            });
        },

        book: async (parent, {bookId}) => {
            return await Class.find({}).populate('author');
        },
    },
};

module.exports = resolvers;