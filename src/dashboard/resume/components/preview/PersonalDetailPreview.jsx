function PersonalDetailPreview({ resumeInfo }) {
    return (
      <div className="p-2">
        <h2
          className="font-bold text-2xl md:text-4xl text-center"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        <h2 className="text-center text-lg md:text-xl font-medium">
          {resumeInfo?.jobTitle1}
        </h2>
        <h2
          className="text-center font-normal text-sm md:text-base"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.address}
        </h2>
  
        <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
          <h2
            className="font-normal text-base md:text-lg"
            style={{ color: resumeInfo?.themeColor }}
          >
            {resumeInfo?.phone}
          </h2>
          <h2
            className="font-normal text-base md:text-lg"
            style={{ color: resumeInfo?.themeColor }}
          >
            {resumeInfo?.email}
          </h2>
        </div>
        <hr
          className="border-[1px] md:border-[2px] my-2"
          style={{ borderColor: resumeInfo?.themeColor }}
        />
      </div>
    );
  }
  
  export default PersonalDetailPreview;
  