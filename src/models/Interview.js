const mongoose=require("mongoose");

const interviewSchema=
new mongoose.Schema({
    role:String,
    questions:[String],
    answers:[String],
    scores:[Number],
    feedback:[String],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=
mongoose.model(
    "Interview",
    interviewSchema
);