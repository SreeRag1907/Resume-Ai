import React, { useContext, useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const INITIAL_SKILL = {
  name: "",
  rating: 0,
};

function SkillForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState(resumeInfo.skills || []);

  const handleChange = useCallback((index, name, value) => {
    setSkillsList((prevSkillsList) =>
      prevSkillsList.map((skill, i) =>
        i === index ? { ...skill, [name]: value } : skill
      )
    );
  }, []);

  const addNewSkill = useCallback(() => {
    setSkillsList((prevSkillsList) => [...prevSkillsList, INITIAL_SKILL]);
  }, []);

  const removeSkill = useCallback(() => {
    if (skillsList.length > 1) {
      setSkillsList((prevSkillsList) =>
        prevSkillsList.slice(0, prevSkillsList.length - 1)
      );
    }
  }, [skillsList]);

  const onSave = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      const data = {
        data: {
          skills: skillsList,
        },
      };

      GlobalApi.UpdateResumeDetail(resumeId, data)
        .then((resp) => {
          console.log(resp);
          toast.success("Skills updated successfully");
          enableNext(true);
        })
        .catch((error) => {
          console.error("Error saving skills:", error);
          toast.error(error.message || "Failed to update skills");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [resumeId, skillsList, enableNext]
  );

  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return;
        const items = Array.from(skillsList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSkillsList(items);
      }}
    >
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your top skills here!</p>
        <Droppable droppableId="skillsList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {skillsList.map((formData, index) => (
                <Draggable key={index} draggableId={`skill-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={index}
                      className="flex justify-between mt-3 gap-3 border-2 p-4 rounded-lg shadow-md"
                    >
                      <div>
                        <label className="text-sm">Skill Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleChange(index, "name", e.target.value)}
                        />
                      </div>
                      <Rating
                        style={{ maxWidth: 150 }}
                        value={formData.rating}
                        onChange={(v) => handleChange(index, "rating", v)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Button variant="outline" onClick={addNewSkill}>
              + Add More Skill
            </Button>
            <Button onClick={removeSkill} disabled={skillsList.length <= 1}>
              - Remove
            </Button>
          </div>
          <Button type="submit" onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default SkillForm;
