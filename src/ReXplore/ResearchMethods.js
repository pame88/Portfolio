
import {ResearchMethodData} from "./ReXploreData"
import ResearchMethod from "../ProjectPage/ResearchMethod"

export default function ResearchMethods (){ /* research methods section for ReXplore */
    return (
        <div className="profile-section">
            <div className="section-title">Research Methods</div>
            {ResearchMethodData.map(p => (
            <ResearchMethod {...p} /> /* load research methods from Rexploredata  */
            ))
            }
        </div>

      );
}