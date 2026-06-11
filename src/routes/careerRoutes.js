const express =
    require("express");

const router =
    express.Router();

const {
    analyzeGap
} = require(
    "../controllers/careerController"
);

router.post(
    "/gap-analysis",
    analyzeGap
);

module.exports =
    router;