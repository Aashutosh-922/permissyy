const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/verify', (req, res) => {
  const { applicationStatus, grantorName, grantorId, namePngFile } = req.body;
  const  newPath = '${namePngFile}' ;

  // Generate barcode content
  const barcodeContent = `${applicationStatus}-${grantorName}-${grantorId}`;

  // Generate hash of the barcode content
  const hash = crypto.createHash('sha256').update(barcodeContent).digest('hex');

  // Generate barcode PNG file name
  const barcodeFileName = `${hash}.png`;

  // Replace the barcode generation logic with your own implementation
  // This example uses a placeholder command to simulate barcode generation
  const barcodeGenerationCommand = `echo ${barcodeContent} > ${barcodeFileName}`;

  // Execute the barcode generation command
  const generateBarcode = spawn('sh', ['-c', barcodeGenerationCommand]);

  generateBarcode.on('close', (code) => {
    if (code === 0) {
      // Barcode generation successful
      // Rename the barcode file to the specified name-png-file
      fs.rename(barcodeFileName, newPath, (err) => {
        if (err) {
          console.error('Failed to rename the barcode file:', err);
          res.sendStatus(500);
        } else {
          console.log('Barcode generation and file rename successful');
          res.sendStatus(200);
        }
      });
    } else {
      console.error('Barcode generation failed');
      res.sendStatus(500);
    }
  });
});

// GET request to access the saved barcode image
app.get('/barcode/fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `${fileName}.png`;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Failed to read the barcode file:', err);
      res.sendStatus(404);
    } else {
      res.setHeader('Content-Type', 'image/png');
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});





// const express = require('express');
// const fs = require('fs');
// const crypto = require('crypto');
// const { spawn } = require('child_process');
// const { isString } = require('class-validator');

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post('/verify', (req, res) => {
//   const { applicationStatus, grantorName, grantorId, namePngFile} = req.body;
//   const  newPath = '${namePngFile}' ;
// //   let namePngFile = isString;
// //   namePngFile = req.body;

//   // Generate barcode content
//   const barcodeContent = `${applicationStatus}-${grantorName}-${grantorId}`;

//   // Generate hash of the barcode content
//   const hash = crypto.createHash('sha256').update(barcodeContent).digest('hex');

//   // Generate barcode PNG file name
//   const barcodeFileName = `${hash}.png`;

//   // Replace the barcode generation logic with your own implementation
//   // This example uses a placeholder command to simulate barcode generation
//   const barcodeGenerationCommand = `echo ${barcodeContent} > ${barcodeFileName}`;

//   // Execute the barcode generation command
//   const generateBarcode = spawn('sh', ['-c', barcodeGenerationCommand]);

//   generateBarcode.on('close', (code) => {
//     if (code === 0) {
//       // Barcode generation successful
//       // Rename the barcode file to the specified name-png-file
//       fs.rename(barcodeFileName, newPath, (err) => {
//         if (err) {
//           console.error('Failed to rename the barcode file:', err);
//           res.sendStatus(500);
//         } else {
//           console.log('Barcode generation and file rename successful');
//           res.sendStatus(200);
//         }
//       });
//     } else {
//       console.error('Barcode generation failed');
//       res.sendStatus(500);
//     }
//   });
// });

// //GET request to access the saved barcode image
// app.get('/barcode/:fileName', (req, res) => {
//   const fileName = req.params.fileName;
//   const filePath = `${fileName}.png`;

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.error('Failed to read the barcode file:', err);
//       res.sendStatus(404);
//     } else {
//       res.setHeader('Content-Type', 'image/png');
//       res.send(data);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });




// const express = require('express');
// const fs = require('fs');
// const crypto = require('crypto');
// const { spawn } = require('child_process');

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post('/verify', (req, res) => {
//   const { applicationStatus, grantorName, grantorId, namePngFile } = req.body;

//   // Generate barcode content
//   const barcodeContent = `${applicationStatus}-${grantorName}-${grantorId}`;

//   // Generate hash of the barcode content
//   const hash = crypto.createHash('sha256').update(barcodeContent).digest('hex');

//   // Generate barcode PNG file name
//   const barcodeFileName = `${hash}.png`;

//   // Replace the barcode generation logic with your own implementation
//   // This example uses a placeholder command to simulate barcode generation
//   const barcodeGenerationCommand = `echo ${barcodeContent} > ${barcodeFileName}`;

//   // Execute the barcode generation command
//   const generateBarcode = spawn('sh', ['-c', barcodeGenerationCommand]);

//   generateBarcode.on('close', (code) => {
//     if (code === 0) {
//       // Barcode generation successful
//       // Rename the barcode file to the specified name-png-file
//       fs.rename(barcodeFileName, namePngFile, (err) => {
//         if (err) {
//           console.error('Failed to rename the barcode file:', err);
//           res.sendStatus(500);
//         } else {
//           console.log('Barcode generation and file rename successful');
//           res.sendStatus(200);
//         }
//       });
//     } else {
//       console.error('Barcode generation failed');
//       res.sendStatus(500);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });




// const express = require('express');
// const app = express();
// const Barcode = require('barcode');

// app.use(express.json());

// app.post('/generateBarcode', (req, res) => {
//   const { applicationStatus, grantorName, grantorId, namePNGFile } = req.body;

//   // Validate the input parameters
//   if (!applicationStatus || !grantorName || !grantorId || !namePNGFile) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   // Generate the barcode
//   const barcode = Barcode('code128', {
//     data: JSON.stringify({
//       applicationStatus,
//       grantorName,
//       grantorId,
//     }),
//     width: 400,
//     height: 100,
//   });

//   // Save the barcode as a PNG file
//   barcode.saveImage(namePNGFile, (err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to generate barcode' });
//     }

//     res.json({ barcodePath: namePNGFile });
//   });
// });

// app.listen(3000, () => {
//   console.log('API server is running on port 3000');
// });
