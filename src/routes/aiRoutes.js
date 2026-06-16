const express =
require("express");

const router =
express.Router();

const {
    reviewResume,
    careerCoach,
    jobReview,
    startInterview,
    evaluateAnswer,
    interviewReport
} = require(
    "../controllers/aiController"
);


router.get(
    "/review",
    reviewResume
);
router.get("/career-coach",careerCoach);

router.post(
    "/job-review",
    jobReview
);
router.post(
    "/interview/start",
    startInterview
);

router.post(
    "/interview/evaluate",
    evaluateAnswer
);
router.get(
    "/interview/report/:interviewId",
    interviewReport
);
module.exports = router;