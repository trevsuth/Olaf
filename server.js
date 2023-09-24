// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use('/node_modules', express.static('node_modules'));  // Serve node_modules

// List files
app.get('/files', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'abc-files'));
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get specific file
app.get('/files/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const content = await fs.readFile(path.join(__dirname, 'abc-files', filename), 'utf-8');
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
