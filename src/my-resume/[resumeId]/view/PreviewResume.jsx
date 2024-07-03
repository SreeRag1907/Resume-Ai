import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PreviewSection = ({ resumeInfo }) => {
  return (
    <div className="preview-section">
      <Document file={resumeInfo.resumePdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PreviewSection;
