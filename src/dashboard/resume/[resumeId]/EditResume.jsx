import { Home, User, FileText, Settings, WorkflowIcon, Download } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/sidebar/SideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../components/FormSection";
import PreviewSection from "../components/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [activeIndex, setActiveIndex] = useState(1);

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
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar>
            <SidebarItem
              icon={<Home />}
              text="Personal Info"
              active={activeIndex === 1}
              onClick={() => setActiveIndex(1)}
            />
            <SidebarItem
              icon={<User />}
              text="Summary"
              active={activeIndex === 2}
              onClick={() => setActiveIndex(2)}
            />
            <SidebarItem
              icon={<FileText />}
              text="Education"
              active={activeIndex === 3}
              onClick={() => setActiveIndex(3)}
            />
            <SidebarItem
              icon={<WorkflowIcon />}
              text="Experience"
              active={activeIndex === 4}
              onClick={() => setActiveIndex(4)}
            />
            <SidebarItem
              icon={<Settings />}
              text="Skills"
              active={activeIndex === 5}
              onClick={() => setActiveIndex(5)}
            />
            <hr className="my-4 border-gray-300" /> {/* Line break */}
            <SidebarItem
              icon={<Download />}
              text="Preview"
              active={activeIndex === 6}
              onClick={() => setActiveIndex(6)}
            />
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid sm:grid-cols-1  lg:grid-cols-2 p-10 gap-10 overflow-auto">
          {/* Form Section */}
          <FormSection activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

          {/* Preview Section */}
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
