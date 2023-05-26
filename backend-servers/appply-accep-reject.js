const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to revert an application
app.put('/applications/:applicationId/revert', (req, res) => {
  const applicationId = req.params.applicationId;
  // Logic to revert the application
  // ...

  res.sendStatus(200); // Sending a success status code
});

// Endpoint to reject an application
app.put('/applications/:applicationId/reject', (req, res) => {
  const applicationId = req.params.applicationId;
  const rejectionDetails = req.body; // Optional payload with rejection details

  // Logic to reject the application
  // ...

  res.sendStatus(200); // Sending a success status code
});

// Endpoint to accept an application
app.put('/applications/:applicationId/accept', (req, res) => {
  const applicationId = req.params.applicationId;
  const acceptanceDetails = req.body; // Optional payload with acceptance details

  // Logic to accept the application
  // ...

  res.sendStatus(200); // Sending a success status code
});

// Start the server
app.listen(3000, () => {
  console.log('API server is running on port 3000');
});
