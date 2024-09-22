const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST Endpoint for '/bfhl'
app.post('/bfhl', (req, res) => {
  const { data, file_b64, email, roll_number } = req.body;

  // Extract numbers and alphabets
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  // Get highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
  const highestLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

  // File validation logic
  let file_valid = false;
  let file_mime_type = '';
  let file_size_kb = 0;
  if (file_b64) {
    const buffer = Buffer.from(file_b64, 'base64');
    file_size_kb = buffer.length / 1024;
    file_mime_type = 'image/png';
    file_valid = true;
  }

  // Send response
  res.status(200).json({
    is_success: true,
    user_id: 'srinivas_sobhit_kintali_22082003',
    email:'srinivassobhitkintali@gmail.com',
    roll_number:'RA2111031010041',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid,
    file_mime_type,
    file_size_kb:file_size_kb.toString()
  });
});

// GET Endpoint for '/bfhl'
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
