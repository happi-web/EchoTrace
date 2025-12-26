const express = require('express');
const multer = require('multer');
const router = express.Router();
const geminiService = require('../services/geminiService');
const fs = require('fs');
const crypto = require('crypto');
const db = require('../config/firebase'); // 🆕 Import Firestore

// Configure Multer to store files temporarily in 'uploads/'
const upload = multer({ dest: 'uploads/' });

// Define the fields we expect from the Frontend
const uploadFields = upload.fields([
  { name: 'video', maxCount: 1 },      // The Theft Footage
  { name: 'audio', maxCount: 1 },      // The Witness Statement
  { name: 'document', maxCount: 1 },   // The Police Report
  { name: 'image', maxCount: 1 }       // The ID Card (for Verification)
]);

// Helper to generate a SHA-256 hash from a file path
const generateHash = (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  } catch (err) {
    return "HASH_ERROR";
  }
};

// --- MAIN ANALYSIS ROUTE ---
router.post('/', uploadFields, async (req, res) => {
  const filesToDelete = []; // Track files to cleanup later

  try {
    console.log('📦 Receiving Evidence Package...');
    
    // 1. Setup Chain of Custody & File Paths
    const custodyLog = [];
    const timestamp = new Date().toISOString();
    
    // Log Case Creation
    custodyLog.push({
      timestamp: timestamp,
      action: "CASE_FILE_CREATED",
      file: "System",
      hash: "N/A",
      status: "INITIALIZED"
    });

    const filesForAI = {
      videoPath: null,
      audioPath: null,
      pdfPath: null,
      imagePath: null
    };

    // 2. Process Files: Hash them & Prepare for AI
    if (req.files.video) {
      const f = req.files.video[0];
      filesForAI.videoPath = f.path;
      filesToDelete.push(f.path);
      custodyLog.push({
        timestamp: new Date().toISOString(),
        action: "EVIDENCE_INGEST_VIDEO",
        file: f.originalname,
        hash: generateHash(f.path),
        status: "SECURE"
      });
    }

    if (req.files.audio) {
      const f = req.files.audio[0];
      filesForAI.audioPath = f.path;
      filesToDelete.push(f.path);
      custodyLog.push({
        timestamp: new Date().toISOString(),
        action: "EVIDENCE_INGEST_AUDIO",
        file: f.originalname,
        hash: generateHash(f.path),
        status: "SECURE"
      });
    }

    if (req.files.document) {
      const f = req.files.document[0];
      filesForAI.pdfPath = f.path;
      filesToDelete.push(f.path);
      custodyLog.push({
        timestamp: new Date().toISOString(),
        action: "EVIDENCE_INGEST_DOC",
        file: f.originalname,
        hash: generateHash(f.path),
        status: "SECURE"
      });
    }

    if (req.files.image) {
      const f = req.files.image[0];
      filesForAI.imagePath = f.path;
      filesToDelete.push(f.path);
      custodyLog.push({
        timestamp: new Date().toISOString(),
        action: "ID_VERIFICATION_SOURCE",
        file: f.originalname,
        hash: generateHash(f.path),
        status: "SECURE"
      });
    }

    // Check if we actually have files
    if (filesToDelete.length === 0) {
      return res.status(400).json({ error: 'No evidence files provided.' });
    }

    console.log('🕵️‍♀️ Sending to Gemini 2.5 for analysis...');

    // 3. Run AI Analysis
    const analysisResult = await geminiService.analyzeCase(filesForAI);

    // 4. Log Completion in Chain of Custody
    custodyLog.push({
      timestamp: new Date().toISOString(),
      action: "AI_FORENSIC_ANALYSIS",
      file: "EchoTrace_Engine_v1.0",
      hash: crypto.createHash('sha256').update(JSON.stringify(analysisResult)).digest('hex'),
      status: "COMPLETED"
    });

    console.log('✅ AI Analysis Complete.');

    // 5. Prepare Final Data Object
    const finalCaseData = {
      ...analysisResult,
      chainOfCustody: custodyLog,
      createdAt: new Date().toISOString(),
      status: 'OPEN',
      caseTitle: `Case #${Math.floor(Math.random() * 10000)}` // Simple auto-title
    };

    // 6. 🆕 SAVE TO FIREBASE (With Logs)
    try {
      console.log("💾 Attempting to save case to Firebase Firestore...");
      
      const caseRef = await db.collection('cases').add(finalCaseData);
      
      console.log(`🎉 SUCCESS! Case saved to Firebase.`);
      console.log(`🆔 Firestore Document ID: ${caseRef.id}`);
      
      // Add the ID to the response so Frontend knows it
      finalCaseData.firebaseId = caseRef.id;

    } catch (dbError) {
      console.error("⚠️ FIREBASE SAVE FAILED:");
      console.error(dbError); 
      // We do NOT stop the app here. We continue so the user still sees the result locally.
    }

    // 7. Clean up temp files (Critical for server health)
    filesToDelete.forEach(path => {
      try { fs.unlinkSync(path); } catch(e) { console.error("Error deleting file:", e); }
    });

    // 8. Return Data to Frontend
    res.json(finalCaseData);

  } catch (error) {
    console.error('❌ Investigation Failed:', error);
    // Cleanup on error
    filesToDelete.forEach(path => {
      try { fs.unlinkSync(path); } catch(e) {}
    });
    res.status(500).json({ error: 'Internal Server Error during analysis.' });
  }
});

// --- CHAT ENDPOINT ---
router.post('/chat', async (req, res) => {
  try {
    const { message, caseContext } = req.body;
    
    if (!message || !caseContext) {
      return res.status(400).json({ error: "Missing message or case context" });
    }

    const reply = await geminiService.chatWithCase(message, caseContext);
    res.json({ reply });

  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Chat failed' });
  }
});

module.exports = router;