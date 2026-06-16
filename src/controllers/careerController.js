const roles =
    require("../data/roles");

const gapAnalyzer =
    require("../utils/gapAnalyzer");

const Resume =
    require("../models/Resume");

const GithubProfile =
require("../models/GithubProfile");

async function analyzeGap(
    req,
    res
) {

    try {

        const { role } =
            req.body;

        const latestResume =
            await Resume.findOne()
            .sort({ uploadedAt: -1 });

        const userSkills =
            latestResume.skills;

        const requiredSkills =
            roles[role];

        if (!requiredSkills) {
             return res.status(400).json({
            message: "Invalid role"
            });
        }

        console.log(latestResume);
        console.log(userSkills);

        const result =
            gapAnalyzer(
                userSkills,
                requiredSkills
            );

        
        const score =
        (
            result.have.length /
            requiredSkills.length
        ) * 100;

        res.json({
            score,
            have: result.have,
            missing : result.missing
        }
        )
        
        

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}


async function careerReadiness( req, res) {
    try {
        const resume =
        await Resume.findOne()
        .sort({ uploadedAt: -1 });

        const github =
        await GithubProfile.findOne()
        .sort({ analyzedAt: -1 });

        if(!resume || !github){
            return res.status(404)
            .json({
                message: "Resume or Github data missing"
            }); 
        }
        const skillScore =  resume.skills.length * 10;
        const githubScore =  github.githubScore;
        const readinessScore = ( skillScore +  githubScore) / 2;

        res.json({
            skillScore,
            githubScore,
            readinessScore
        });

    } catch(error){

        res.status(500).json({
            message:error.message
        });
    }
}

module.exports = {
    careerReadiness,
    analyzeGap
};

