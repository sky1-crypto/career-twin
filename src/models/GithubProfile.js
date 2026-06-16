const mongoose = require("mongoose");

const githubProfileSchema =
new mongoose.Schema({

    username: String,

    followers: Number,

    following: Number,

    publicRepos: Number,

    languages: [String],

    githubScore: Number,

    analyzedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports =
mongoose.model(
    "GithubProfile",
    githubProfileSchema
);