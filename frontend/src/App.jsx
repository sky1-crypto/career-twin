import {BrowserRouter,Routes,Route}
from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Github from "./pages/Github";
import Roadmap from "./pages/Roadmap";
import JobMatch from "./pages/JobMatch";
import Interview from "./pages/Interview";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/resume" element={<Resume/>}/>
                <Route path="/github" element={<Github/>}/>
                <Route path="/roadmap" element={<Roadmap/>}/>
                <Route path="/jobmatch" element={<JobMatch/>}/>
                <Route path="/interview" element={<Interview/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;