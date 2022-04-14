import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from "../../../assets/REPORT.pdf"

const Pdf = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1)
    }

    return (
    <div>
        <Document file={"http://a69e-49-36-215-68.ngrok.io/static/uploads/SIhPPtPdf.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} className="pdf" height={100} width={220}/>
        </Document>
        <p>
            Page {pageNumber} of {numPages}
        </p>
    </div>
    )
}

export default Pdf