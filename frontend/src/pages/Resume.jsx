import { useState } from "react";
import api from "../services/api";

function Resume(){

    const [review,setReview]=useState("");

    async function getReview(){

        try{

            const response=
            await api.get(
                "/ai/review"
            );

            setReview(
                response.data.review
            );

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>

            <h1>Resume Analysis</h1>

            <button
                onClick={getReview}
            >
                Analyze Resume
            </button>

            <pre>
                {review}
            </pre>

        </div>
    );
}

export default Resume;