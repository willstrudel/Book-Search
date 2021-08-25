const {User} = require('../models');
const {AuthenticationError} = require ('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        },

        Mutation: {
            login: async (parent, {
                username,
                email,
                password
            }) => {
                const user = await User.findOne({
                    $or: [{
                        username: username
                    }, {
                        email: email
                    }],
                });

                if (!user) {
                    throw new AuthenticationError(
                        "No user found with this username or email address"
                    );
                }

                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new AuthenticationError("Password incorrect");
                }

                const token = signToken(user);

                return {
                    token,
                    user
                };
            },
            addUser: async (parent, {
                username,
                email,
                password
            }) => {
                const user = await User.create({
                    username,
                    email,
                    password
                });
                const token = signToken(user);
                return {
                    token,
                    user
                };
            },
            saveBook: async (
                parent, {
                    authors,
                    description,
                    bookId,
                    image,
                    link,
                    title
                },
                context
            ) => {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate({
                        _id: context.user._id
                    }, {
                        $addToSet: {
                            savedBooks: {
                                authors,
                                description,
                                bookId,
                                image,
                                link,
                                title
                            },
                        },
                    }, {
                        new: true,
                        runValidators: true
                    });

                    return updatedUser;
                }
                throw new AuthenticationError("Must be logged in to view this page.");
            },
            removeBook: async (parent, {
                bookId
            }, context) => {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate({
                        _id: context.user._id
                    }, {
                        $pull: {
                            savedBooks: {
                                bookId: bookId
                            }
                        }
                    }, {
                        new: true
                    });

                    return updatedUser;
                }
                throw new AuthenticationError("Must be logged in to view this page.");
            },
        },

    };


module.exports = resolvers;