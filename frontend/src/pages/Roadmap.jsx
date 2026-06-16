import {useState} from "react";
import api from "../services/api";

function Roadmap(){

    const [role,setRole]=useState("");
    const [data,setData]=useState(null);

    async function generateRoadmap(){
        try{
            const response=
            await api.post(
                "/roadmap/generate",
                {role}
            );

            setData(response.data);

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>

            <h1>Roadmap Generator</h1>

            <input
                type="text"
                placeholder="Enter Role"
                value={role}
                onChange={(e)=>
                    setRole(e.target.value)
                }
            />

            <button onClick={generateRoadmap}>
                Generate Roadmap
            </button>

            {data && (
                <div>

                    <h2>Target Role</h2>
                    <p>{data.role}</p>

                    <h2>Missing Skills</h2>

                    <ul>
                        {data.missingSkills.map((skill,index)=>(
                            <li key={index}>
                                {skill}
                            </li>
                        ))}
                    </ul>

                    <h2>Roadmap</h2>

                    {data.roadmap.map((item,index)=>(
                        <div key={index}>

                            <h3>{item.skill}</h3>

                            <ul>
                                {item.plan.map((step,i)=>(
                                    <li key={i}>
                                        {step}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Roadmap;