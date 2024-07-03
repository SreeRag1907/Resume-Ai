import React from "react";

function SummaryPreview({ resumeInfo }) {
  return <p className="text-sm md:text-sm p-2">{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
