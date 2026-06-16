const axios = require("axios");

const GithubProfile =
require("../models/GithubProfile");

async function analyzeGithub(req, res) {

    try {

        const { username } = req.body;

        const userResponse =
            await axios.get(
                `https://api.github.com/users/${username}`
            );

        const user = userResponse.data;

        const repoResponse =
            await axios.get(
                `https://api.github.com/users/${username}/repos`
            );

        const repos =repoResponse.data;

        const languages = new Set();

        repos.forEach(repo => {
            console.log(
                repo.name,
                repo.language,
                repo.stargazers_count
            );
            if(repo.language){
                languages.add(repo.language);
            }
        });

        function calculateRepoScore(repo){
            let score = 0;
            if(repo.description)   score += 5;
            if(repo.language)    score += 5;
            score += repo.stargazers_count * 2;
            return score;
        }       

        const projectAnalysis =
        repos.map(repo => ({
            name: repo.name,
            language:   repo.language,
            stars:   repo.stargazers_count,
            score:  calculateRepoScore(repo)
        }));

        const languageArray = Array.from(languages);

        let githubScore = 0;
        githubScore += user.public_repos * 2;
        githubScore += user.followers;
        githubScore += languageArray.length * 5;

        await GithubProfile.create({
            username,
            followers:user.followers,
            following:user.following,
            publicRepos:user.public_repos,
            languages:languageArray,
            githubScore,
            projectAnalysis
        });

        res.json({
            username,
            followers:user.followers,
            following:user.following,
            publicRepos:user.public_repos,
            languages:languageArray,
            githubScore,
            projectAnalysis
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    analyzeGithub
};