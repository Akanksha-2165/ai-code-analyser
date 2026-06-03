import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

export async function analyzeCode(code, language, type) {
  const response = await axios.post(
    `${API_BASE_URL}/api/analyze`,
    {
      code,
      language,
      type
    }
  )

  return response.data
}