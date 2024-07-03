import Header from "@/components/custom/Header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PreviewSection from "@/dashboard/resume/components/PreviewSection";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import DownloadConfirmationDialog from "./download/DownloadConfirmationDialog";
import ShareButton from "./share/ShareButton";
import ShareDialog from "./share/ShareButton";

function ViewResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const resumeRef = useRef();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data.attributes);
      setResumeInfo(resp.data.data.attributes);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <Header />
      <div className="py-10 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-medium">
          Congrats! Your AI Generated Resume is ready!
        </h2>
        <p className="text-center text-xl font-light text-gray-700">
          Now you are ready to download and share your AI Generated Resume.
        </p>
        <div className="flex justify-center my-5 gap-4">
          <DownloadConfirmationDialog resumeRef={resumeRef} />
          <ShareDialog />
        </div>
        <div className="resume-container" ref={resumeRef}>
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
