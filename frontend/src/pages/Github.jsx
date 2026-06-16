import {useState} from "react";
import api from "../services/api";

function Github(){

    const [username,setUsername]=useState("");
    const [data,setData]=useState(null);

    async function analyzeGithub(){

        try{

            const response=
            await api.post(
                "/github/analyze",
                {username}
            );

            setData(response.data);

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>

            <h1>GitHub Analysis</h1>

            <input
                type="text"
                placeholder="Github Username"
                value={username}
                onChange={(e)=>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <button
                onClick={analyzeGithub}
            >
                Analyze
            </button>

            {data && (
                <div>

                    <h3>
                        {data.username}
                    </h3>

                    <p>
                        Followers:
                        {data.followers}
                    </p>

                    <p>
                        Public Repos:
                        {data.publicRepos}
                    </p>

                    <p>
                        Github Score:
                        {data.githubScore}
                    </p>

                </div>
            )}

        </div>
    );
}

export default Github;