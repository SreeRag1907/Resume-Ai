import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useContext } from "react"
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import SkillPreview from "./preview/SkillPreview";
import EducationPreview from "./preview/EducationPreview";

function PreviewSection() {

  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

  return (
    <div className="shadow-lg h-full p-12 border-t-[20px] "
    style={{
      borderColor:resumeInfo?.themeColor
    }}>
      
      {/* Personal section */}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>

    <EducationPreview resumeInfo={resumeInfo} />

      {/* Proffessional exp */}
    <ExperiencePreview resumeInfo={resumeInfo}/> 

      {/* Education */}

      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo}/> 

    </div>
  )
}

export default PreviewSection