const {categorizeSkills ,categoryScores}= require("../utils/skillCategorizer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const extractSkills =
    require("../utils/skillExtractor");
const Resume = require("../models/Resume");

async function uploadResume(req, res) {
    try {

        const dataBuffer =
            fs.readFileSync(req.file.path);

        const data =
            await pdfParse(dataBuffer);
        
        const foundSkills = extractSkills(data.text);
        const categorizedSkills = categorizeSkills(foundSkills);
        const scores = categoryScores(categorizedSkills);
        await Resume.create({
            userId: req.user.userId,
            fileName: req.file.filename,
            extractedText: data.text,
            skills: foundSkills
           
        });

        res.json({
            text: data.text,
            skills: foundSkills,
            categories: categorizedSkills,
            scores: scores,
            message: "Resume saved successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

module.exports = {
    uploadResume
};