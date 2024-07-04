import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AIChatSession } from "./../../../../../service/AiModel";

function EducationForm({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const initialEducationalList = resumeInfo?.education?.length
    ? resumeInfo.education
    : [{
        universityName: "",
        degree: "",
        subject: "",
        startDate: "",
        endDate: "",
        description: "",
      }];

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [educationalList, setEducationalList] = useState(initialEducationalList);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newList = [...educationalList];
    newList[index] = { ...newList[index], [name]: value };
    setEducationalList(newList);
  };

  const addNewExp = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        subject: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeList = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    }
  };

  const isValidEducation = (edu) => {
    return edu.universityName && edu.degree && edu.subject && edu.startDate && edu.endDate;
  };

  const onSave = async (e) => {
    e.preventDefault();
    if (!params?.resumeId) {
      toast.error("Resume ID is missing. Cannot save details.");
      return;
    }
  
    if (!educationalList.every(isValidEducation)) {
      toast.error("Please fill all required fields for each education entry.");
      return;
    }
  
    setLoadingSave(true);
  
    const data = {
      data: {
        education: educationalList,
      },
    };
  
    try {
      const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      toast.success("Education details updated successfully");
      console.log("Education details saved", response);
      
      // Update the context
      setResumeInfo((prev) => ({
        ...prev,
        education: educationalList,
      }));
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleApiError = (error) => {
    console.error("Error saving education details:", error);
      
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      toast.error(`Error: ${error.response.data.error?.message || 'Failed to update details'}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from server. Please try again.");
    } else {
      console.error("Error setting up request:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      education: educationalList,
    }));
  }, [educationalList]);

  const GenerateSummaryFromAI = async (index) => {
    const currentEducation = educationalList[index];
    setLoadingGenerate(true);
  
    try {
      // Construct the prompt with actual degree, subject, and university name
      const prompt = `Generate a concise description (50 words) for an educational background that includes a ${currentEducation.degree} in ${currentEducation.subject} from ${currentEducation.universityName}. Highlight key skills and knowledge acquired, emphasizing practical applications.`;
  
      // Send prompt to AI for generating summary
      const result = await AIChatSession.sendMessage(prompt);
      let generatedSummary = result.response.text();
  
      // Remove any JSON formatting if present
      generatedSummary = generatedSummary.replace(/^\s*{\s*"description"\s*:\s*"|"\s*}\s*$/g, '').trim();
  
      // Update the description with generated summary
      const newList = [...educationalList];
      newList[index] = { ...newList[index], description: generatedSummary };
  
      setEducationalList(newList);
  
      toast.success("AI summary generated successfully");
    } catch (error) {
      console.error("Error generating AI summary:", error);
      toast.error("Failed to generate AI summary. Please try again.");
    } finally {
      setLoadingGenerate(false);
      enableNext(true);
    }
  };
  

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details here.</p>

      <div>
        {educationalList.map((formData, index) => (
          <div
            key={index}
            className="grid grid-cols-2 mt-5 gap-3 border-2 p-4 rounded-lg shadow-md"
          >
            <div className="col-span-2">
              <label className="text-sm">University Name</label>
              <Input
                name="universityName"
                value={formData.universityName}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </div>
            <div>
              <label className="text-sm">Degree</label>
              <Input
                name="degree"
                value={formData.degree}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </div>
            <div>
              <label className="text-sm">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between items-center my-4">
                <label className="text-sm">Description</label>
                <Button
                  variant="outline"
                  onClick={() => GenerateSummaryFromAI(index)}
                  type="button"
                  size="sm"
                  className="flex gap-3 items-center justify-center px-4 py-2 border-2 cursor-pointer hover:scale-105 hover:shadow-lg transition-all border-black rounded-md gradient-text"
                  disabled={loadingGenerate}
                >
                  {loadingGenerate ? <LoaderCircle className="animate-spin" /> : <Brain className="h-4 w-4" />} Generate from AI
                </Button>
              </div>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
      <div className="flex flex-col md:flex-row gap-4">
          <Button variant="outline" onClick={addNewExp}>
            + Add More Education
          </Button>
          <Button onClick={removeList} disabled={educationalList.length <= 1 || loadingGenerate}>
            - Remove
          </Button>
        </div>
        <Button type="submit" onClick={onSave} disabled={loadingSave || loadingGenerate}>
          {loadingSave ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default EducationForm;
