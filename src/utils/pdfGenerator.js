import html2pdf from 'html2pdf.js';

export const generatePDF = (elementId, filename) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }
  
  const opt = {
    margin: 10,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save();
};