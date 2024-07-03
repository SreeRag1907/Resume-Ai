import React from "react";

function SummaryPreview({ resumeInfo }) {
  return <p className="text-sm">{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
