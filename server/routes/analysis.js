const express = require("express");
const router = express.Router();

const { analyzeCode } = require("../services/geminiService");
const { saveAnalysis } = require("../services/historyService");

router.post("/analyze", async (req, res) => {
  try {
    const { code, language, type, userId } = req.body;

    if (!code || !language || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Ask Gemini
    const result = await analyzeCode(code, language, type);

    // Save to history if logged in
    if (userId) {
      try {
        await saveAnalysis(
          userId,
          code,
          language,
          type,
          result
        );

        console.log("✅ Analysis saved");
      } catch (saveError) {
        console.error("Failed to save history:", saveError.message);
      }
    }

    return res.json({
      success: true,
      type,
      ...result,
    });

  } catch (error) {
    console.error("Gemini Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Analysis failed",
    });
  }
});

module.exports = router;