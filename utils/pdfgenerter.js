const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePdf(billing, package, filePath) {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  // Add the required information to the PDF
  doc.fontSize(14).text(`Full Name: ${billing.fullName}`);
  doc.moveDown();
  doc.text(`Package Name: ${package.packageName}`);
  doc.moveDown();
  doc.text(`Address: ${billing.street}, ${billing.city}, ${billing.state}, ${billing.country}, ${billing.postcode}`);
  doc.moveDown();
  doc.text(`Phone Number: ${billing.phone}`);
  doc.moveDown();
  doc.text(`Package Period: ${package.period}`);
  doc.moveDown();
  doc.text(`Domain Name: ${package.domainName}`);
  doc.moveDown();
  doc.text(`Package Price: ${package.packagePrice}`);

  // Add the permanent information on the right side of the PDF
  doc.fontSize(12).text('HBL Number: 121212121212121', { align: 'right' });
  doc.moveDown();
  doc.text('EasyPaisa: 082187837283', { align: 'right' });

  doc.end();
}

module.exports = generatePdf;