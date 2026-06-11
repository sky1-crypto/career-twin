const express = require("express");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const resumeRoutes =
    require("./routes/resumeRoutes");

const careerRoutes =
require("./routes/careerRoutes");

app.use("/api/resume", resumeRoutes);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/career",careerRoutes);
app.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      message: "Protected route",
      user: req.user
    });

});

module.exports = app;