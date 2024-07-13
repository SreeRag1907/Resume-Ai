import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import Header from "@/components/custom/Header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import PreviewSection from "./preview/Preview";

function ViewResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        setResumeInfo(resp.data.data.attributes);
      })
      .catch((error) => {
        console.error("Error fetching resume:", error);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="no-print">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-center no-print">
          <Link to={`/dashboard/resume/${resumeId}/edit`} className="mb-4">
            <Button>Edit Resume</Button>
          </Link>
        </div>
        <div className="text-center mt-5 no-print">
          <h2 className="text-3xl font-semibold mb-2">
            Congrats! Your AI Generated Resume is ready!
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Now you are ready to download and share your AI Generated Resume.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={handlePrint}
              
            >
              Download Resume
            </Button>
            
          </div>
        </div>

        <div className="print-content">
          <div id="print-section"  ref={resumeRef}>
            <PreviewSection />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;