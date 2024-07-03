import React from "react";

function EducationPreview({ resumeInfo }) {
  const hasEducation = resumeInfo?.education && resumeInfo.education.length > 0;

  return (
    <div className="my-4 p-2">
      {hasEducation && (
        <>
          <h2
            className="text-center font-bold text-lg md:text-xl mb-2"
            style={{ color: resumeInfo?.themeColor || "#000000" }}
          >
            Education
          </h2>
          <hr
            className="border-[1px] md:border-[2px] my-2"
            style={{ borderColor: resumeInfo?.themeColor }}
          />

          {resumeInfo.education.map((education, index) => (
            <div key={index} className="my-3 md:my-5">
              <h2
                className="text-sm md:text-md font-bold"
                style={{ color: resumeInfo?.themeColor || "#000000" }}
              >
                {education.universityName}
              </h2>
              <h2 className="text-xs md:text-sm flex justify-between items-center">
                <span>
                  {education.degree} in {education.subject}
                </span>
                <span className="italic">
                  {education?.startDate} To {education.endDate}
                </span>
              </h2>
              <p className="text-xs md:text-sm my-2">
                {education.description}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default EducationPreview;
