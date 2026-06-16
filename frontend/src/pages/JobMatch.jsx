import {useState} from "react";
import api from "../services/api";

function JobMatch(){

    const [jobDescription,setJobDescription]=useState("");
    const [result,setResult]=useState("");

    async function analyzeJob(){

        try{

            const response=
            await api.post(
                "/ai/job-review",
                {
                    jobDescription
                }
            );

            setResult(
                response.data.review
            );

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>

            <h1>Job Match Analyzer</h1>

            <textarea
                rows="12"
                cols="80"
                value={jobDescription}
                onChange={(e)=>
                    setJobDescription(
                        e.target.value
                    )
                }
                placeholder="Paste Job Description"
            />

            <br/>

            <button
                onClick={analyzeJob}
            >
                Analyze
            </button>

            <pre>
                {result}
            </pre>

        </div>
    );
}

export default JobMatch;