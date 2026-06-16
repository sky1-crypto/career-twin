const express =require("express");
const router =express.Router();

const {
    getRoadmap , 
    getRoadmapHistory
} = require(
    "../controllers/roadmapController"
);
router.post(
    "/generate",
    getRoadmap
);

router.get(
    "/history",
    getRoadmapHistory
);
module.exports =router;