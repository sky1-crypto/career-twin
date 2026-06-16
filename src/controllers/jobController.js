const Resume =
require("../models/Resume");

const roles =
require("../data/roles");

const jobMatcher =
require("../utils/jobMatcher");

async function matchJob(req,res
){
    try{
        const { role } =
        req.body;
        const latestResume =
        await Resume.findOne()
        .sort({ uploadedAt:-1 });

        const userSkills =latestResume.skills;
        const requiredSkills =roles[role];

        const result =
        jobMatcher(
            userSkills,
            requiredSkills
        );

        res.json(result);

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

module.exports = {
    matchJob
};