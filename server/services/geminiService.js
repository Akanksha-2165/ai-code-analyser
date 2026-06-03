const axios = require('axios')

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent'

function buildPrompt(code, language, type) {
  if (type === 'debug') {
    return `
You are an expert ${language} debugger.

Analyze the following code.

Return ONLY valid JSON.

Format:
{
  "bugsFound": [
    {
      "line": number,
      "issue": "description",
      "severity": "low | medium | high"
    }
  ],
  "fixedCode": "corrected code",
  "explanation": "clear explanation"
}

Code:
${code}
`
  }

  return `
You are an expert programmer.

Explain this ${language} code.

Return ONLY valid JSON.

Format:
{
  "bugsFound": [],
  "fixedCode": "",
  "explanation": "clear explanation"
}

Code:
${code}
`
}

async function analyzeCode(code, language, type) {
  const prompt = buildPrompt(code, language, type)

  console.log('🔍 [GEMINI] Starting analysis...')
  console.log('📝 [GEMINI] Type:', type)
  console.log('💬 [GEMINI] Language:', language)
  console.log('🔑 [GEMINI] API Key exists:', !!process.env.GEMINI_API_KEY)
  console.log('🔑 [GEMINI] API Key starts with:', process.env.GEMINI_API_KEY?.slice(0, 10) + '...')

  try {
    const url = `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`
    console.log('🌐 [GEMINI] URL:', url.replace(process.env.GEMINI_API_KEY, 'HIDDEN_KEY'))

    const requestData = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }

    console.log('📤 [GEMINI] Sending request to Gemini API...')

    const response = await axios.post(url, requestData, {
      timeout: 30000
    })

    console.log('✅ [GEMINI] Got response')
    console.log('📊 [GEMINI] Status:', response.status)
    console.log('📦 [GEMINI] Response structure:', {
      hasCandidates: !!response.data.candidates,
      candidatesLength: response.data.candidates?.length,
      hasContent: !!response.data.candidates?.[0]?.content,
      hasParts: !!response.data.candidates?.[0]?.content?.parts
    })

    const text = response.data.candidates[0].content.parts[0].text

    console.log('📝 [GEMINI] Raw response text (first 500 chars):', text.slice(0, 500))

    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    console.log('🧹 [GEMINI] Cleaned text (first 500 chars):', cleaned.slice(0, 500))

    const parsed = JSON.parse(cleaned)

    console.log('✅ [GEMINI] Successfully parsed JSON')
    console.log('📊 [GEMINI] Parsed data keys:', Object.keys(parsed))

    return parsed

  } catch (error) {
    console.log('❌ [GEMINI] ERROR OCCURRED')
    console.log('═'.repeat(50))
    console.log('ERROR TYPE:', error.constructor.name)
    console.log('ERROR MESSAGE:', error.message)
    
    if (error.response) {
      console.log('🔴 API Response Error')
      console.log('STATUS:', error.response.status)
      console.log('STATUS TEXT:', error.response.statusText)
      console.log('HEADERS:', error.response.headers)
      console.log('DATA:', JSON.stringify(error.response.data, null, 2))
    } else if (error.request) {
      console.log('🔴 No Response from Server')
      console.log('REQUEST:', error.request)
    } else {
      console.log('🔴 Error during request setup')
      console.log('MESSAGE:', error.message)
    }

    console.log('═'.repeat(50))

    // Throw error so backend can catch it
    throw error
  }
}

module.exports = {
  analyzeCode
}