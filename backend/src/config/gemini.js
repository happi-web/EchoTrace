const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// We use 'gemini-2.5-flash' for maximum reasoning capability on video
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json", // Forces Gemini to return pure JSON
  }
});

module.exports = model;