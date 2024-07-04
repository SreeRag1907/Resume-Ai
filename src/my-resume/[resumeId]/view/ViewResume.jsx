import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import Header from "@/components/custom/Header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PreviewSection from "@/dashboard/resume/components/PreviewSection";
import DownloadConfirmationDialog from "./download/DownloadConfirmationDialog";

function ViewResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const resumeRef = useRef();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data.attributes);
        setResumeInfo(resp.data.data.attributes);
      })
      .catch((error) => {
        console.error("Error fetching resume:", error);
      });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <Header />
      <div className="py-5 px-2 md:px-10">
        <h2 className="text-center text-2xl font-medium">
          Congrats! Your AI Generated Resume is ready!
        </h2>
        <p className="text-center text-lg font-light text-gray-700">
          Now you are ready to download and share your AI Generated Resume.
        </p>
        <div className="flex justify-center my-5 gap-4">
          <DownloadConfirmationDialog resumeRef={resumeRef} />
        </div>
        <p className="text-center text-sm font-normal text-gray-700 my-5 block sm:hidden italic">
          **To Download the Resume Properly I recommend you to use the Website in
          Laptop/PC**
        </p>
        <div className="resume-container" ref={resumeRef}>
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
