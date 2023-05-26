const express = require('express');
const { jsPDF } = require("jspdf");
//const jsPDF = require('jspdf');
const app = express();

app.use(express.json());

// Define an array to store the converted PDFs
const pdfs = [];

app.post('/convert', (req, res) => {
  // Get the text from the request body
  const text = req.body.text;

  // Validate the input
  if (!text) {
	res.status(400).json({ error: 'Text is required' });
	return;
  }

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add the text to the PDF
  doc.text(text, 10, 10);

  // Add the PDF to the array
  pdfs.push(doc.output());

  // Send a JSON response with the PDF ID
  const pdfId = pdfs.length - 1;
  res.json({ id: pdfId });
});

app.get('/download/:id', (req, res) => {
  // Get the PDF ID from the URL parameter
  const pdfId = req.params.id;

  // Check if the PDF exists
  if (!pdfs[pdfId]) {
	res.status(404).send('PDF not found');
	return;
  }

  // Set the response headers to trigger a download
  res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
  res.setHeader('Content-Type', 'application/pdf');

  // Send the PDF as a response
  res.send(pdfs[pdfId]);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});




// const express = require('express');
// const { jsPDF } = require("jspdf");
// //const jsPDF = require('jspdf');
// const app = express();

// app.use(express.json());

// // Define an array to store the converted PDFs
// const pdfs = [];

// app.post('/convert', (req, res) => {
//   // Get the text from the request body
//   const text = req.body.text;

//   // Create a new jsPDF instance
//   const doc = new jsPDF();

//   // Add the text to the PDF
//   doc.text(text, 10, 10);

//   // Add the PDF to the array
//   pdfs.push(doc.output());

//   // Send a JSON response with the PDF ID
//   const pdfId = pdfs.length - 1;
//   res.json({ id: pdfId });
// });

// app.get('/download/:id', (req, res) => {
//   // Get the PDF ID from the URL parameter
//   const pdfId = req.params.id;

//   // Check if the PDF exists
//   if (!pdfs[pdfId]) {
//     res.status(404).send('PDF not found');
//     return;
//   }

//   // Set the response headers to trigger a download
//   res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
//   res.setHeader('Content-Type', 'application/pdf');

//   // Send the PDF as a response
//   res.send(pdfs[pdfId]);
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });



// const express = require('express');
// //const jsPDF = require('jspdf');
// const { jsPDF } = require("jspdf");
// const app = express();

// app.use(express.json());

// app.post('/convert', (req, res) => {
//   // Get the text from the request body
//   const text = req.body.text;

//   // Create a new jsPDF instance
//   const doc = new jsPDF();

//   // Add the text to the PDF
//   doc.text(text, 10, 10);

//   // Convert the PDF to a base64 string
//   //const pdfBase64 = doc.output('datauristring');

//   // Send the PDF as a response
//   //res.send({ pdf: pdfBase64 });

//   //Set the response headers to trigger a download
//   res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
//   res.setHeader('Content-Type', 'application/pdf');

//   // Send the PDF as a response
//   res.send(doc.output());
// });


// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });
