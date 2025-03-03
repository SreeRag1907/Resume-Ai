import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { GrDrag } from "react-icons/gr"; // Import the drag icon
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import SkillPreview from "./preview/SkillPreview";
import EducationPreview from "./preview/EducationPreview";

const PreviewSection = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const [draggableSections, setDraggableSections] = useState([
    "EducationPreview",
    "ExperiencePreview",
    "SkillPreview",
  ]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(draggableSections);
    const [movedSection] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedSection);

    setDraggableSections(newOrder);
  };

  const renderSection = (section) => {
    switch (section) {
      case "PersonalDetailPreview":
        return <PersonalDetailPreview resumeInfo={resumeInfo} />;
      case "SummaryPreview":
        return <SummaryPreview resumeInfo={resumeInfo} />;
      case "EducationPreview":
        return <EducationPreview resumeInfo={resumeInfo} />;
      case "ExperiencePreview":
        return <ExperiencePreview resumeInfo={resumeInfo} />;
      case "SkillPreview":
        return <SkillPreview resumeInfo={resumeInfo} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="shadow-lg h-screen p-12 border-t-[20px] custom-scrollbar"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal section */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Draggable Sections */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="draggableSections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[50px]">
              {draggableSections.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-section cursor-move relative"
                    >
                      <div className="absolute top-5 left-2 opacity-50">
                        <GrDrag />
                      </div>
                      {renderSection(section)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PreviewSection;
