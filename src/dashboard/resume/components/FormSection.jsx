import { Button } from "@/components/ui/button";
import PersonalForm from "./form/PersonalForm";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { useState } from "react";
import SummaryForm from "./form/SummaryForm";
import ExperienceForm from "./form/ExperienceForm";
import EducationForm from "./form/EducationForm";
import SkillForm from "./form/SkillForm";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className="flex gap-4">
          {activeIndex > 1 && (
            <Button
              className="flex gap-2"
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              <ArrowLeft />
              Prev
            </Button>
          )}
          <Button
            className="flex gap-2"
            onClick={() => {
              if (activeIndex === 5) {
                // Handle transition to ViewSection
                setActiveIndex(6);
              } else {
                setActiveIndex(activeIndex + 1);
              }
            }}
            disabled={activeIndex < 5 && !enableNext}
          >
            {activeIndex === 5 ? "View" : "Next"} <ArrowRight size={20} />
          </Button>
        </div>
      </div>
      {/* Personal section */}
      {activeIndex === 1 && (
        <PersonalForm enableNext={(v) => setEnableNext(v)} />
      )}
      {/* Summary */}
      {activeIndex === 2 && (
        <SummaryForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Education */}
      {activeIndex === 3 && (
        <EducationForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Professional exp */}
      {activeIndex === 4 && (
        <ExperienceForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Skills */}
      {activeIndex === 5 && <SkillForm enableNext={(v) => setEnableNext(v)} />}

      {/* View Section */}
      {activeIndex === 6 && (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      )}
    </div>
  );
}

export default FormSection;
