import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PageDownload() {
    const handleDownload = () => {
      const input = document.getElementById('pdf-content');
  
      html2canvas(input as HTMLElement)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('download.pdf');
        })
        .catch((error) => {
          console.error('Error creating PDF:', error);
        });
    };
  
    return (
      <svg
              className="w-6 h-6 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleDownload}
              fill="none"
              viewBox="0 0 24 24"
              style={{ cursor: 'pointer' }}
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
              />
            </svg>
    );
  }
  