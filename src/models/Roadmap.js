const mongoose = require("mongoose");
const roadmapSchema =
new mongoose.Schema({
    role: String,
    missingSkills: [String],
    roadmap: [{
        skill: String,
        plan: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports =
mongoose.model(
    "Roadmap",
    roadmapSchema
);