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

exports.analyzeCase = async ({ videoPath, audioPath, pdfPath, imagePath }) => {
  const parts = [];
  
  // --- THE UPDATED SYSTEM PROMPT ---
  const INVESTIGATOR_PROMPT = `
    You are 'EchoTrace', a senior forensic investigator AI. 
    Your job is to analyze disparate pieces of evidence to find the TRUTH.
    
    You will receive:
    1. CCTV Video (Visual Evidence)
    2. Audio Statement (Verbal Claims)
    3. Police Report (Written Claims)
    4. ID Card (Identity Verification)

    TASK:
    1. TIMELINE: Create a granular, second-by-second timeline of what ACTUALLY happened based on the Video.
    2. CROSS-REFERENCE (CRITICAL): 
       - Exhaustively compare EVERY specific claim in the Audio and Police Report against the Video.
       - Do NOT stop at the first contradiction. List ALL discrepancies found.
       - Check for: Time mismatches, Clothing mismatches, Action mismatches, and Location mismatches.
    3. BLIND SPOTS: Identify moments where the subject leaves the frame or vision is obscured.
    4. INTEGRITY CHECK: Analyze the video for deepfake artifacts (unnatural blinking, lighting shadows, pixel blurring).

    OUTPUT FORMAT (Strict JSON Only - No Markdown):
    {
      "caseId": "CASE-AUTO-GEN",
      
      "integrityStatus": "VERIFIED_AUTHENTIC" or "SUSPECTED_FAKE",
      "integrityScore": 0-100, 
      "integrityReasoning": "Briefly explain WHY. e.g. 'Consistent lighting shadows and natural biological movement detected.' or 'Detected pixel blurring around jawline typical of deepfakes.'",

      "timeline": [
        { "time": "MM:SS", "source": "CCTV", "type": "video", "event": "Brief description of action", "flag": "OPTIONAL_WARNING" }
      ],

      "blindSpots": [
         { 
           "location": "e.g. Back Alley Exit", 
           "start": "MM:SS",
           "end": "MM:SS",
           "reason": "Camera blocked by object or subject moved out of frame." 
         }
      ],

      "contradictions": [
        // ⚠️ INSTRUCTION: Return as many items as necessary. Do not summarize.
        { 
          "id": 1, 
          "severity": "CRITICAL", 
          "title": "Short Title (e.g. Alibi Mismatch)", 
          "claim": "Quote the specific lie (from Audio/Doc)", 
          "evidence": "Describe the objective truth (from Video)", 
          "confidence": 95,
          "status": "DETECTED" 
        },
        {
           "id": 2,
           "severity": "MEDIUM",
           "title": "Clothing Discrepancy",
           "claim": "Suspect said 'I was wearing red'",
           "evidence": "Subject in video is wearing blue",
           "confidence": 90,
           "status": "DETECTED"
        }
      ]
    }
  `;

  // Add the prompt first
  parts.push(INVESTIGATOR_PROMPT);

  // Dynamically add evidence if provided
  if (videoPath) parts.push(fileToGenerativePart(videoPath, "video/mp4"));
  if (audioPath) parts.push(fileToGenerativePart(audioPath, "audio/mp3"));
  if (pdfPath) parts.push(fileToGenerativePart(pdfPath, "application/pdf"));
  if (imagePath) parts.push(fileToGenerativePart(imagePath, "image/jpeg"));

  try {
    // Invoke Gemini
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    // Clean up the response (remove Markdown code blocks if Gemini adds them)
    const jsonString = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a fallback structure so the frontend doesn't crash
    return {
        integrityStatus: "ERROR",
        integrityScore: 0,
        integrityReasoning: "AI Service Failed to Analyze. Please retry.",
        timeline: [],
        blindSpots: [], // 🛡️ Prevent crash
        contradictions: []
    };
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