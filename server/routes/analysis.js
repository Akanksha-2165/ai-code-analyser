 const express = require('express')
const router = express.Router()

const { analyzeCode } = require('../services/geminiService')

router.post('/analyze', async (req, res) => {
  try {
    const { code, language, type } = req.body

    if (!code || !language || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
    }

    const result = await analyzeCode(
      code,
      language,
      type
    )

    res.json({
      success: true,
      type: type,  // ADD THIS LINE
      ...result
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Analysis failed'
    })
  }
})

module.exports = router