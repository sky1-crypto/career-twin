const Resume =
require("../models/Resume");
const Interview=require("../models/Interview");
const model =
require("../config/gemini");
const GithubProfile=require("../models/GithubProfile");

function parseGeminiJson(response){
    return JSON.parse(
        response
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim()
    );
}
async function reviewResume( req,res){
    try{
        const latestResume =
        await Resume.findOne()
        .sort({
            uploadedAt: -1
        });
        if(!latestResume){
            return res.status(404)
            .json({
                message:
                "Resume not found"
            });
        }
        const prompt = `
You are an expert career coach.

Review this resume.

Give:

1. Strengths
2. Weaknesses
3. Suggestions

Resume:

${latestResume.extractedText}
`;
        const result =
        await model.generateContent(
            prompt
        );

        const review =  result.response.text();
        res.json({
            review
        });

    }
    catch(error){

        res.status(500).json({
            message:
            error.message
        });
    }
}

async function careerCoach(req,res){
    try{
        const latestResume=await Resume.findOne().sort({uploadedAt:-1});
        const githubProfile=await GithubProfile.findOne().sort({createdAt:-1});

        if(!latestResume||!githubProfile){
            return res.status(404).json({message:"Data not found"});
        }

        const userSkills=latestResume.skills;
        const githubScore=githubProfile.githubScore;

        const prompt=`You are an expert software engineering career coach.

Skills:
${userSkills.join(", ")}

Github Score:
${githubScore}

Provide:
1. Current level
2. Weaknesses
3. Skills to learn next
4. Project suggestions
5. Internship advice`;

        const result=await model.generateContent(prompt);
        const advice=result.response.text();

        res.json({advice});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

async function jobReview(req,res){
    try{
        const latestResume=await Resume.findOne()
        .sort({uploadedAt:-1});

        if(!latestResume){
             return res.status(404).json({
                message:"Resume not found"
            });
        }

        const {jobDescription}=req.body;

        if(!jobDescription){
            return res.status(400).json({
            message:"Job description required"
            });
        }

        const prompt=`
        You are an expert technical recruiter.

        Resume:
        ${latestResume.extractedText}

        Job Description:
        ${jobDescription}

        {
          "matchScore":number,
          "matchingSkills":[...],
          "missingSkills":[...],
          "suggestions":[...]
        }
        `;      
        const result=
        await model.generateContent(prompt);

        const review=
        result.response.text();
        res.json({
            review
        });

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

async function startInterview(req,res){
    try{
        
        const {role}=req.body;
        if(!role){
             return res.status(400).json({
            message:"Role is required"
         });
        }
        const latestResume=
        await Resume.findOne()
        .sort({uploadedAt:-1});

        if(!latestResume){
         return res.status(404).json({
            message:"Resume not found"
            });
        }
        const skills=latestResume.skills.join(", ");

        const prompt=`
    You are an experienced technical interviewer.

    Role:
    ${role}

    Candidate Skills:
    ${skills}

    Generate exactly 5 interview questions.

    Return ONLY valid JSON.

    {
      "questions":[
       "...",
        "...",
        "...",
        "...",
        "..."
      ]
    }
    `;
        const result=await model.generateContent(prompt);
        const response=result.response.text();
        const questions=parseGeminiJson(response);
        const savedInterview=
        await Interview.create({
        role,
        questions:questions.questions,
        answers:[],
        scores:[],
        feedback:[]
        });
        res.json({
            interviewId:savedInterview._id,
            questions:questions.questions
        });
        

        }catch(error){
            res.status(500).json({
                message:error.message
            });
        }
    }

async function evaluateAnswer(req,res){
    try{
        const {interviewId,
            question, 
            answer}=req.body;
        if(!question||!answer){
            return res.status(400).json({
            message:"Question and answer required"
        });
        }

        const prompt=`
        You are an expert technical interviewer.

        Question:
        ${question}

        Candidate Answer:
        ${answer}

        Evaluate the answer.

        Return ONLY valid JSON.

        {
            "score":0,
            "strengths":[
                ""
            ],
            "weaknesses":[
                ""
            ],
            "feedback":""
        }
        `;

        const result=
        await model.generateContent(
        prompt
        );

        const response=
        result.response.text();
        const evaluation=parseGeminiJson(response);
        
if(!interviewId){
    return res.status(400).json({
        message:"Interview id required"
    });
}
const interview=
await Interview.findById(
    interviewId
);

if(!interview){
    return res.status(404).json({
        message:"Interview not found"
    });
}
interview.answers.push(answer);

interview.scores.push(
    evaluation.score
);

interview.feedback.push(
    evaluation.feedback
);

await interview.save();

        res.json(evaluation);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

async function interviewReport(req,res){
    try{
        const { interviewId }=req.params;

        const interview=
        await Interview.findById(
            interviewId
        );

        if(!interview){
            return res.status(404).json({
                message:"Interview not found"
            });
        }

        const total=
        interview.scores.reduce(
            (a,b)=>a+b,
            0
        );

        const average=
        interview.scores.length
        ? total/interview.scores.length
        : 0;

        const prompt=`
You are an expert interviewer.

Scores:
${interview.scores.join(",")}

Feedback:
${interview.feedback.join("\n")}

Generate:

1. Overall Performance
2. Strengths
3. Weaknesses
4. Recommendations
`;

        const result=
        await model.generateContent(
            prompt
        );

        const report=
        result.response.text();

        res.json({
            averageScore:average,
            report
        });

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}


module.exports={
    reviewResume,
    careerCoach,
    jobReview,
    startInterview,
    evaluateAnswer,
    interviewReport
};

