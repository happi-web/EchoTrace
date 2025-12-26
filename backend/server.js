require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeController = require('./src/controllers/analyzeController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json());

// Routes
// This is the main vein: It accepts the files and triggers the AI
app.use('/api/analyze', analyzeController);

// Health Check (For Judges to see if server is alive)
app.get('/', (req, res) => {
  res.send('EchoTrace Multimodal Reasoning Engine: ONLINE');
});

app.listen(PORT, () => {
  console.log(`\n🚀 EchoTrace Backend running on http://localhost:${PORT}`);
  console.log(`🧠 Ready to process Audio, Video, and Text evidence.\n`);
});