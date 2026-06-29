const axios = require("axios");

const GEMINI_URL =
'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

function buildPrompt(code, language, type) {
  if (type === "debug") {
    return `
You are a professional software engineer.

Analyze the following ${language} code.

You MUST respond ONLY with a valid JSON object.

Do NOT write markdown.
Do NOT use \`\`\`.
Do NOT write any explanation outside the JSON.
Do NOT say "Hello".
Do NOT say "Sure".

Return EXACTLY this JSON format:

{
  "bugsFound": [
    {
      "line": 1,
      "issue": "Description of the issue",
      "severity": "low"
    }
  ],
  "fixedCode": "Corrected code here",
  "explanation": "Explain what was wrong and how it was fixed."
}

If there are no bugs, return:

{
  "bugsFound": [],
  "fixedCode": "<original code>",
  "explanation": "No bugs found."
}

Code:

${code}
`;
  }

  return `
You are a professional software engineer.

Explain the following ${language} code.

Return ONLY valid JSON.

{
  "bugsFound": [],
  "fixedCode": "",
  "explanation": "Detailed explanation"
}

Code:

${code}
`;
}

async function analyzeCode(code, language, type) {
  console.log("API KEY:", process.env.GEMINI_API_KEY);
  const prompt = buildPrompt(code, language, type);

  console.log("========== PROMPT ==========");
  console.log(prompt);
  console.log("============================");

  console.log("🔍 Starting Gemini analysis...");
  console.log("Language:", language);
  console.log("Type:", type);

  const requestData = {
  contents: [
    {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ],
  generationConfig: {
    responseMimeType: "application/json",
  },
};

  try {
    let response;

for (let i = 0; i < 3; i++) {
  try {
    response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      requestData,
      { timeout: 60000 }
    );
    break;
  } catch (err) {
    if (err.response?.status !== 503 || i === 2) {
      throw err;
    }

    console.log(`Retry ${i + 1}/3...`);

    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("========== RAW RESPONSE ==========");
    console.log(text);
    console.log("==================================");

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    console.log("========== GEMINI ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else {
      console.log(error.message);
    }

    console.log("==================================");

    if (error.code === "ECONNABORTED") {
      throw new Error(
        "Gemini request timed out. Please try again."
      );
    }

    if (error.response?.status === 429) {
      throw new Error(
        "Gemini rate limit reached. Please wait a minute and try again."
      );
    }

    if (error.response?.status === 503) {
      throw new Error(
        "Gemini is currently busy. Please try again shortly."
      );
    }

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Gemini request failed."
    );
  }
}

module.exports = {
  analyzeCode,
};