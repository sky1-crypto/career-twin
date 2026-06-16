const roadmaps = require("../data/roadmaps");

function generateRoadmap( missingSkills){
    let roadmap = [];
    missingSkills.forEach(skill => {
        if(roadmaps[skill]){
            roadmap.push({
                skill,
                plan : roadmaps[skill]
            });
        }
    });
    return roadmap;
}
module.exports = generateRoadmap;