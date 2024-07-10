import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GlobalApi from '../../../../service/GlobalApi';
import Header from '@/components/custom/Header';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PreviewSection from '@/dashboard/resume/components/PreviewSection';
import DownloadConfirmationDialog from './download/DownloadConfirmationDialog';
import { Button } from '@/components/ui/button';

function ViewResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const resumeRef = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    getResumeInfo();
  }, []);

  useEffect(() => {
    if (resumeRef.current) {
      const container = resumeRef.current;
      const content = container.firstChild;
      const scaleX = container.clientWidth / content.offsetWidth;
      const scaleY = container.clientHeight / content.offsetHeight;
      setScale(Math.min(scaleX, scaleY));
    }
  }, [resumeInfo]);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data.attributes);
        setResumeInfo(resp.data.data.attributes);
      })
      .catch((error) => {
        console.error('Error fetching resume:', error);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <Header />
      <Link to={`/dashboard/resume/${resumeId}/edit`} className="m-4">
        <Button className="mt-4">Edit Resume</Button>
      </Link>
      <div className="py-5 px-2 md:px-10">
        <h2 className="text-center text-2xl font-medium">
          Congrats! Your AI Generated Resume is ready!
        </h2>
        <p className="text-center text-lg font-light text-gray-700">
          Now you are ready to download and share your AI Generated Resume.
        </p>
        <div className="flex justify-center my-5 gap-4">
          <DownloadConfirmationDialog resumeRef={resumeRef} />
          <Button onClick={handlePrint}>Print Resume</Button>
        </div>
        <div className="resume-container" ref={resumeRef}>
            <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;