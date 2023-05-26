const express = require('express');
const app = express();
const cv = require('opencv4nodejs');

// Define a route to handle image uploads
app.post('/upload', async (req, res) => {
  try {
    // Get the image data from the request body
    const imageData = req.body.image;

    // Read the image using OpenCV
    const image = cv.imdecode(imageData);

    // Detect faces in the image using OpenCV
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const faces = classifier.detectMultiScale(image);

    // Draw rectangles around the detected faces
    faces.forEach(face => {
      image.drawRectangle(
        new cv.Point(face.x, face.y),
        new cv.Point(face.x + face.width, face.y + face.height),
        new cv.Vec(0, 255, 0),
        2
      );
    });

    // Convert the annotated image to base64 and return it as a JSON response
    const annotatedImageData = cv.imencode('.jpg', image).toString('base64');
    res.json({ annotatedImage: annotatedImageData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
