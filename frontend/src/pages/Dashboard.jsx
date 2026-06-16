import { Link } from "react-router-dom";

function Dashboard(){
    return(
        <div>
            <h1>Career Twin</h1>

            <div>
                <Link to="/resume">
                    <button>Resume Analysis</button>
                </Link>

                <Link to="/github">
                    <button>GitHub Analysis</button>
                </Link>

                <Link to="/roadmap">
                    <button>Roadmap</button>
                </Link>

                <Link to="/jobmatch">
                    <button>Job Match</button>
                </Link>

                <Link to="/interview">
                    <button>AI Interview</button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;