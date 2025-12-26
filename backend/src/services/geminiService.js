const model = require('../config/gemini');
const fs = require('fs');

// Helper: Convert file to Gemini-compatible object
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType
    },
  };
}

// The "System Prompt" that forces Gemini to be a Detective
const INVESTIGATOR_PROMPT = `
  You are 'EchoTrace', a senior forensic investigator AI. 
  Your job is to analyze disparate pieces of evidence to find the TRUTH.
  
  You will receive:
  1. CCTV Video (Visual Evidence)
  2. Audio Statement (Verbal Claims)
  3. Police Report (Written Claims)
  4. ID Card (Identity Verification)

  TASK:
  1. TIMELINE: Create a second-by-second timeline of what ACTUALLY happened based on the Video.
  2. CROSS-REFERENCE: Compare the Video events to the Audio/Text claims. flagging contradictions.
  3. IDENTITY CHECK: Compare the person in the Video to the ID Card. accurately.
  
  OUTPUT FORMAT (Strict JSON):
  {
    "caseId": "CASE-AUTO-GEN",
    "integrityStatus": "VERIFIED_AUTHENTIC" or "SUSPECTED_FAKE",
    "integrityScore": 0-100,
    "timeline": [
      { "time": "MM:SS", "source": "Source Name", "type": "video|audio|text", "event": "Description", "trustScore": 0-100, "flag": "OPTIONAL_WARNING" }
    ],
    "contradictions": [
      { "id": 1, "severity": "CRITICAL|HIGH|MEDIUM", "title": "Short Title", "claim": "What was said", "evidence": "What was seen", "confidence": 0-100 }
    ],
    "blindSpots": [
      { "location": "Where", "reason": "Why it is missing" }
    ]
  }
`;

exports.analyzeCase = async ({ videoPath, audioPath, pdfPath, imagePath }) => {
  const parts = [];

  // Add the System Instruction first
  parts.push(INVESTIGATOR_PROMPT);

  // Dynamically add evidence if provided
  if (videoPath) parts.push(fileToGenerativePart(videoPath, "video/mp4"));
  if (audioPath) parts.push(fileToGenerativePart(audioPath, "audio/mp3"));
  if (pdfPath) parts.push(fileToGenerativePart(pdfPath, "application/pdf"));
  if (imagePath) parts.push(fileToGenerativePart(imagePath, "image/jpeg"));

  try {
    // Invoke Gemini 1.5 Pro
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    // Clean up the response (remove Markdown code blocks if Gemini adds them)
    const jsonString = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI Reasoning Failed");
  }
};


exports.chatWithCase = async (userMessage, caseContext) => {
  try {
    // We convert the complex JSON into a readable summary for the AI
    const contextString = JSON.stringify(caseContext);

    const chatPrompt = `
      SYSTEM: You are EchoTrace, an AI Forensic Assistant. 
      You have already analyzed a case. Here are the simplified results:
      ${contextString}

      USER QUESTION: "${userMessage}"

      INSTRUCTIONS:
      1. Answer the user's question based ONLY on the case data provided above.
      2. If they ask about timestamps, reference the specific seconds in the timeline.
      3. Be concise, professional, and objective (like a police detective).
      4. If the user asks something not in the evidence, say "That is outside the scope of the current evidence."
    `;

    const result = await model.generateContent(chatPrompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Chat Logic Failed:", error);
    return "I am currently unable to access the case context. Please try again.";
  }
};