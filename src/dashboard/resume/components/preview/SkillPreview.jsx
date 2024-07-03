import React from "react";
import { Rating } from "@smastrom/react-rating"; // Import Rating component
import "@smastrom/react-rating/style.css";

function SkillPreview({ resumeInfo }) {
  return (
    <div className="my-4 p-2">
      <h2
        className="text-center font-bold text-lg md:text-xl mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr
        className="border-[1px] md:border-[2px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <h2 className="text-sm md:text-base">{skill.name}</h2>
            <div className="flex items-center">
              <Rating
                style={{ marginRight: 8, maxWidth: 80 }}
                value={skill.rating}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
