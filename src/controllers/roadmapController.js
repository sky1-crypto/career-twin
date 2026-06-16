const Resume =
require("../models/Resume");

const roles =
require("../data/roles");

const gapAnalyzer =
require("../utils/gapAnalyzer");

const generateRoadmap =
require("../utils/roadmapGenerator");
const Roadmap =
require("../models/Roadmap");

async function getRoadmap( req,  res){
    try{
        const { role } =   req.body;
        const latestResume =
        await Resume.findOne()
        .sort({ uploadedAt: -1 });
        if(!latestResume){
            return res.status(404)
            .json({
                message:
                "Resume not found"
            });
        }
        const userSkills =  latestResume.skills;

        const requiredSkills = roles[role];

        if(!requiredSkills){
            return res.status(400)
            .json({
                message:
                "Invalid role"
            });
        }

        const gapResult =  gapAnalyzer( userSkills,   requiredSkills  );
        const roadmap = generateRoadmap( gapResult.missing  );

        const savedRoadmap = 
        await Roadmap.create({
            role,
            missingSkills:gapResult.missing,
            roadmap
        });
        console.log(savedRoadmap);
        

        res.json({
            role,
            userSkills,
            missingSkills:
            gapResult.missing,
            roadmap
        });

    }
    catch(error){

        res.status(500).json({
            message:
            error.message
        });
    }
}

async function getRoadmapHistory(   req,   res) {
    try {
        const roadmaps =
        await Roadmap.find()
        .sort({ createdAt: -1 });
        res.json(roadmaps);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getRoadmap,
    getRoadmapHistory
};