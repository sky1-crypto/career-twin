const express =
    require("express");

const router =
    express.Router();

const {
    careerReadiness
} = require("../controllers/careerController");

router.get(
    "/readiness",
    careerReadiness
);

const {
    analyzeGap
} = require(
    "../controllers/careerController"
);

router.post(
    "/gap-analysis",
    analyzeGap
);

module.exports =   router;