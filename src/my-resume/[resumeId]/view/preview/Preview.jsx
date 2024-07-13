import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PersonalDetailPreview from "../../../../dashboard/resume/components/preview/PersonalDetailPreview";
import SummaryPreview from "../../../../dashboard/resume/components/preview/SummaryPreview";
import ExperiencePreview from "../../../../dashboard/resume/components/preview/ExperiencePreview";
import SkillPreview from "../../../../dashboard/resume/components/preview/SkillPreview";
import EducationPreview from "../../../../dashboard/resume/components/preview/EducationPreview";

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
    const components = {
      PersonalDetailPreview,
      SummaryPreview,
      EducationPreview,
      ExperiencePreview,
      SkillPreview,
    };
    const Component = components[section];
    return Component ? <Component resumeInfo={resumeInfo} /> : null;
  };

  return (
    <div
      className="shadow-lg p-4 border-t-[10px] text-sm"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="draggableSections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {draggableSections.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-section cursor-move"
                    >
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