import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

export const generatePdfFromDom = async (
  elementId: string,
  pdfFileName = "pure-fruit-bd-order.pdf",
  margin = 10 // default 10mm margin
) => {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error("Element not found:", elementId);
    return;
  }

  try {
    // Generate PNG data URL from the DOM element
    const dataUrl = await domtoimage.toPng(node, {
      bgcolor: "#ffffff",
      quality: 1,
      width: node.scrollWidth,
      height: node.scrollHeight,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const usableWidth = pdfWidth - 2 * margin;
    const usableHeight = pdfHeight - 2 * margin;

    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const ratio = Math.min(usableWidth / imgWidth, usableHeight / imgHeight);

      const imgPdfWidth = imgWidth * ratio;
      const imgPdfHeight = imgHeight * ratio;

      const x = (pdfWidth - imgPdfWidth) / 2;
      const y = (pdfHeight - imgPdfHeight) / 2;

      pdf.addImage(dataUrl, "PNG", x, y, imgPdfWidth, imgPdfHeight);
      pdf.save(pdfFileName);
    };
  } catch (error) {
    console.error("Failed to generate PDF:", error);
  }
};
