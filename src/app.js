const express=require("express");
const cors=require("cors");

const authRoutes=require("./routes/authRoutes");
const authMiddleware=require("./middleware/authMiddleware");
const resumeRoutes=require("./routes/resumeRoutes");
const careerRoutes=require("./routes/careerRoutes");
const githubRoutes=require("./routes/githubRoutes");
const roadmapRoutes=require("./routes/roadmapRoutes");
const jobRoutes=require("./routes/jobRoutes");
const aiRoutes=require("./routes/aiRoutes");

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/api/career",careerRoutes);
app.use("/api/github",githubRoutes);
app.use("/api/roadmap",roadmapRoutes);
app.use("/api/job",jobRoutes);
app.use("/api/ai",aiRoutes);

app.get("/profile",authMiddleware,(req,res)=>{
    res.json({
        message:"Protected route",
        user:req.user
    });
});

module.exports=app;