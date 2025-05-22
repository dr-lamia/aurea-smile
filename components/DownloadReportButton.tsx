import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DSDParams } from "../utils/dsd";

/**
 * Generates a styled PDF report with overlays and measurement table.
 * Includes a reference to the uploaded image (image1).
 */
const DownloadReportButton = ({
  image,
  dsdParams,
  landmarks,
  imageNumber,
}: {
  image: string;
  dsdParams: DSDParams;
  landmarks: number[][];
  imageNumber: number;
}) => {
  const handleDownload = async () => {
    // Capture canvas as image
    const canvasEl = document.querySelector("canvas");
    if (!canvasEl) return;
    const overlayImg = await html2canvas(canvasEl as HTMLCanvasElement);
    const overlayDataUrl = overlayImg.toDataURL();

    // Create PDF
    const pdf = new jsPDF();
    pdf.text("Aurea Smile Digital Smile Design Report", 10, 10);
    pdf.text(`Reference Image: image${imageNumber}`, 10, 18);
    pdf.addImage(overlayDataUrl, "PNG", 10, 22, 180, 240);

    // Add measurements table
    pdf.text("Measurements:", 10, 270);
    let y = 280;
    Object.entries(dsdParams).forEach(([key, value]) => {
      pdf.text(`${key}: ${JSON.stringify(value)}`, 10, y);
      y += 10;
    });

    pdf.save("smile_report.pdf");
  };

  return (
    <button
      className="mt-4 px-6 py-2 bg-gold text-ivory rounded-lg shadow font-semibold"
      onClick={handleDownload}
    >
      Download Report (PDF)
    </button>
  );
};

export default DownloadReportButton;