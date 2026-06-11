const skills = [
    "c++",
    "java",
    "python",
    "javascript",
    "typescript",
    "node.js",
    "express",
    "react",
    "next.js",
    "mongodb",
    "mysql",
    "postgresql",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "git",
    "github",
    "dsa",
    "html",
    "css"
];

function extractSkills(text) {

    const lowerText = text.toLowerCase();

    const foundSkills = skills.filter(skill =>
        lowerText.includes(skill.toLowerCase())
    );

    return foundSkills;
}

module.exports = extractSkills;