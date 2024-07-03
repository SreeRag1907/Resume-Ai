import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-4 p-2'>
      <h2 className='text-center font-bold text-lg md:text-xl mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >Professional Experience</h2>
      <hr className='border-[1px] md:border-[2px] my-2' style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-3 md:my-5'>
          <h2 className='text-sm md:text-base font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >{experience?.jobTitle}</h2>
          <h2 className='text-xs md:text-sm flex flex-col md:flex-row justify-between'>
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>{experience?.startDate} To {experience.endDate}</span>
          </h2>
          <div className='text-xs md:text-sm my-2 work-summary-content'
            dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
