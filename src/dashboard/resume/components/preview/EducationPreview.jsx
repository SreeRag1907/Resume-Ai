import React from "react";

function EducationPreview({ resumeInfo }) {
  // Check if education data exists
  const hasEducation = resumeInfo?.education && resumeInfo.education.length > 0;

  return (
    <div className="my-6">
      {hasEducation && (
        <>
          <h2
            className="text-center font-bold text-xl mb-2"
            style={{
              color: resumeInfo?.themeColor || "#000000",
            }}
          >
            Education
          </h2>
          <hr
            className="border-[2px] my-2"
            style={{
              borderColor: resumeInfo?.themeColor ,
            }}
          />

          {resumeInfo.education.map((education, index) => (
            <div key={index} className="my-5">
              <h2
                className="text-md font-bold"
                style={{
                  color: resumeInfo?.themeColor || "#000000",
                }}
              >
                {education.universityName}
              </h2>
              <h2 className="text-sm flex justify-between items-center">
                <span>
                  {education.degree} in {education.subject}
                </span>
                <span className="italic">{education?.startDate} To { education.endDate} </span>

              </h2>
              <p className="text-sm my-2">{education.description}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// Helper function to format dates
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default EducationPreview;