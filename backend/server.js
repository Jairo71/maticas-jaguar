const serverless = require('serverless-http');
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');

// --- Smart Credential Loading ---
let serviceAccount;
// Check if running in Netlify environment and the variable is set
if (process.env.GOOGLE_CREDENTIALS_JSON) {
  try {
    // Parse the credentials from the environment variable
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
  } catch (e) {
    console.error('Error parsing GOOGLE_CREDENTIALS_JSON:', e);
    // Exit if credentials can't be parsed in production
    process.exit(1);
  }
} else {
  // Fallback to local credentials file for local development
  try {
    const credentialsPath = './credentials.json';
    serviceAccount = require(credentialsPath);
  } catch (e) {
    console.error('Could not load local credentials.json. Make sure the file exists in the /backend directory.');
    // Exit if credentials can't be loaded locally
    process.exit(1);
  }
}

const app = express();

// --- Firebase Admin SDK Initialization ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'maticas-jaguar-app.appspot.com' // Replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

// --- Multer Configuration ---
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as buffers
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Endpoints de Google Sheets ---
const SPREADSHEET_ID = '1majtC72_kwtFzAbye8hUMtDEj0ZyQtGjPpdjVpHYX_Y';

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount, // Use the credentials object directly
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

app.post('/submit-results', async (req, res) => {
  try {
    const { group, studentName, activity, score, total } = req.body;

    if (!group || !studentName || !activity || score === undefined || total === undefined) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const googleSheets = await getGoogleSheetsClient();
    const dataToAppend = [
      [group, studentName, new Date().toISOString(), activity, `${score}/${total}`]
    ];

    await googleSheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: dataToAppend,
      },
    });

    res.status(200).send({ message: 'Results submitted successfully!' });
  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    res.status(500).send({ message: 'Failed to write to Google Sheet.', error: error.message });
  }
});

// --- File Upload Endpoint ---
app.post('/upload', upload.single('archivo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error('Error uploading to Firebase Storage:', err);
      res.status(500).send({ message: 'Failed to upload file to Firebase Storage.', error: err.message });
    });

    blobStream.on('finish', async () => {
      // Make the file public
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      res.status(200).send({ fileUrl: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error in /upload:', error);
    res.status(500).send({ message: 'Server error during file upload.', error: error.message });
  }
});


// --- Export the handler for Netlify ---
module.exports.handler = serverless(app);
