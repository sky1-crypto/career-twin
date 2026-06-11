const categories = {

    programming: [
        "c++",
        "java",
        "python",
        "javascript",
        "typescript"
    ],

    frontend: [
        "html",
        "css",
        "react",
        "next.js"
    ],

    backend: [
        "node.js",
        "express"
    ],

    database: [
        "mongodb",
        "mysql",
        "postgresql"
    ],

    devops: [
        "docker",
        "kubernetes",
        "aws"
    ],

    tools: [
        "git",
        "github"
    ]
};

function categorizeSkills(skills) {

    const result = {};

    for (const category in categories) {

        result[category] = skills.filter(skill =>
            categories[category].includes(skill)
        );
    }

    return result;
}
function categoryScores(categorizedSkills){
    const scores = {};
    for (const category in categorizedSkills){
        scores[category] = categorizedSkills[category].length;
    }
    return scores;
}

module.exports = {
    categorizeSkills ,
    categoryScores
};