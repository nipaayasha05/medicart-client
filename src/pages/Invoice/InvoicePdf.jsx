import React, { useState } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const InvoicePdf = ({ invoice }) => {
  // console.log(invoice);
  const [pdfUrl, setPdfUrl] = useState("");
  const { user } = useAuth();

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "px" });

    const startY = 90;
    let currentY = startY;

    const logo = new Image();
    logo.src = "/medicine.png";
    logo.onload = () => {
      doc.setFontSize(25);
      doc.text("Invoice", 60, 40);
      doc.addImage(logo, "PNG", 10, 10, 40, 40);
      doc.setFontSize(16);
      doc.text(`${user?.email}`, 50, 60);
      doc.text(`InvoiceId:${invoice._id}`, 50, 80);
      doc.text(
        `Date:${new Date(invoice.orderDate).toLocaleDateString()}`,
        50,
        100
      );

      doc.setFontSize(20);
      doc.text("Item", 50, (currentY += 40));
      doc.text("Qty", 200, currentY);
      doc.text("Price", 270, currentY);
      doc.text("Dis", 350, currentY);
      doc.text("Total", 550, currentY);

      doc.setFontSize(15);
      invoice.items.forEach((item) => {
        doc.text(item.itemName, 50, (currentY += 40));
        doc.text(item.quantity.toString(), 200, currentY);
        doc.text(item.price.toString(), 250, currentY);
        doc.text(item.discount.toString() + "%", 300, currentY);
        doc.text(item.totalPrice.toFixed(2), 350, currentY);
      });

      currentY += 30;
      doc.setFontSize(17);
      doc.text(`Transaction ID:${invoice.transaction}`, 50, (currentY += 20));
      doc.text(`Grand Total:${invoice.grandTotal}`, 50, (currentY += 20));

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
  };

  const downloadPDF = () => {
    if (!pdfUrl) {
      toast("Please generate the PDF preview first!");
      return;
    }

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "invoice.pdf";
    link.click();
  };

  return (
    <div className="text-center mt-10 px-4">
      <p className="text-gray-600 mb-4">
        First click on
        <span className="font-bold text-blue-600"> Generate PDF Preview</span>,
        then you can download the invoice.
      </p>
      <button
        onClick={generatePDF}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-3"
      >
        Generate PDF Preview
      </button>

      <button
        onClick={downloadPDF}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        disabled={!pdfUrl}
      >
        Print PDF
      </button>

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          width="100%"
          height="600"
          className="mt-6 border rounded w-full  "
        />
      )}
    </div>
  );
};

export default InvoicePdf;
