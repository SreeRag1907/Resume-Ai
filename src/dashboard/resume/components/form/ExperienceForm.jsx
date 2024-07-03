import React, { useContext, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AIChatSession } from "../../../../../service/AiModel";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";

const INITIAL_FORM_FIELD = {
  jobTitle: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const AI_PROMPT =
  'For the position title: {positionTitle}, give me 5-7 bullet points for my experience in resume. Return the result as a JSON object with "position_title" and "experience" fields. The "experience" field should be an array of strings, each representing a bullet point.';

function ExperienceForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [experienceList, setExperienceList] = useState(
    resumeInfo.experience?.length > 0
      ? resumeInfo.experience
      : [INITIAL_FORM_FIELD]
  );
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((event, index) => {
    const { name, value } = event.target;
    setExperienceList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  }, []);

  const handleRichTextChange = useCallback((value, index) => {
    setExperienceList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, workSummary: value } : item
      )
    );
  }, []);

  const addNewExp = useCallback(() => {
    setExperienceList((prevList) => [...prevList, INITIAL_FORM_FIELD]);
  }, []);

  const removeExp = useCallback(() => {
    setExperienceList((prevList) =>
      prevList.length > 1 ? prevList.slice(0, -1) : prevList
    );
  }, []);

  const isValidExperience = useCallback((experience) => {
    return Object.values(experience).every((value) => {
      return typeof value === "string" && value.trim() !== "";
    });
  }, []);

  const GenerateSummaryFromAI = useCallback(
    async (index) => {
      enableNext(false);
      setLoading(true);

      const positionTitle = experienceList[index]?.jobTitle;
      if (!positionTitle) {
        toast.error("Please add a position title");
        setLoading(false);
        return;
      }

      try {
        const prompt = AI_PROMPT.replace("{positionTitle}", positionTitle);
        const result = await AIChatSession.sendMessage(prompt);
        const responseText = await result.response.text();
        const parsedResponse = JSON.parse(responseText);

        const formattedResponse = `<ul>${parsedResponse.experience
          .map((point) => `<li>${point.trim()}</li>`)
          .filter((point) => point !== "<li></li>")
          .join("")}</ul>`;

        setExperienceList((prevList) =>
          prevList.map((item, i) =>
            i === index ? { ...item, workSummary: formattedResponse } : item
          )
        );
      } catch (error) {
        console.error("Error generating summary:", error);
        toast.error("Failed to generate summary from AI");
      } finally {
        setLoading(false);
        enableNext(true);
      }
    },
    [experienceList, enableNext]
  );

  const onSave = useCallback(
    async (e) => {
      e.preventDefault();
      if (!params?.resumeId) {
        toast.error("Resume ID is missing. Cannot save details.");
        return;
      }

      setLoading(true);

      try {
        const response = await GlobalApi.UpdateResumeDetail(params.resumeId, {
          data: { experience: experienceList },
        });
        toast.success("Experience details updated successfully");
        console.log("Experience details saved", response);
      } catch (error) {
        console.error("Error saving experience details:", error);
        toast.error(
          error.response?.data?.error?.message || "Failed to update details"
        );
      } finally {
        setLoading(false);
      }
    },
    [params.resumeId, experienceList]
  );

  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your job experience here..</p>
      {experienceList.map((formData, index) => (
        <div
          key={index}
          className="mt-5 gap-3 border-2 p-4 rounded-lg shadow-md"
        >
          <h3 className="font-bold text-md mb-2">Experience {index + 1}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Position Title"
              required
            />
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Company Name"
              required
            />
            <Input
              name="city"
              value={formData.city}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="City"
              required
            />
            <Input
              name="state"
              value={formData.state}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="State"
              required
            />
            <Input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(event) => handleInputChange(event, index)}
              required
            />
            <Input
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={(event) => handleInputChange(event, index)}
              required
            />
            <div className="col-span-2">
              <div className="flex justify-between items-center mt-4">
                <label className="text-sm">Work Summary</label>
                <Button
                  variant="outline"
                  onClick={() => GenerateSummaryFromAI(index)}
                  disabled={loading}
                  className="flex gap-3 items-center justify-center px-4 py-2 border-2 cursor-pointer hover:scale-105 hover:shadow-lg transition-all border-black rounded-md gradient-text"
                >
                  <Brain />
                  {loading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    "Generate from AI"
                  )}
                </Button>
              </div>
              <ReactQuill
                className="mt-2"
                value={formData.workSummary}
                onChange={(value) => handleRichTextChange(value, index)}
                modules={{
                  toolbar: [
                    [{ font: [] }],
                    ["bold", "italic", "underline"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                ]}
                placeholder="Write your work summary..."
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Button variant="outline" onClick={addNewExp}>
            + Add More Experience
          </Button>
          <Button onClick={removeExp} disabled={experienceList.length <= 1}>
            - Remove
          </Button>
        </div>
        <Button type="submit" onClick={onSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default ExperienceForm;
