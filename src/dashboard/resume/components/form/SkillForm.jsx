import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function SkillForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState(resumeInfo.skills || []);

  // Function to handle skill name or rating change
  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  // Function to add a new skill entry
  const addNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  // Function to remove the last skill entry
  const removeSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, skillsList.length - 1));
    }
  };

  // Function to save skills to backend
  const onSave = (e) => {
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
  };

  // Effect to sync skillsList with resumeInfo.skills on mount
  // useEffect(() => {
  //   setSkillsList(resumeInfo.skills || []);
  // }, [resumeInfo.skills]);

  // Effect to update resumeInfo with the latest skillsList
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your top skills here!</p>
        <div>
          {skillsList.map((formData, index) => (
            <div
              key={index}
              className="flex justify-between mt-3 gap-3 border-2 p-4 rounded-lg shadow-md"
            >
              <div>
                <label className="text-sm">Skill Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                />
              </div>
              <Rating
                style={{ maxWidth: 150 }}
                value={formData.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
        </div>

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
    </div>
  );
}

export default SkillForm;
