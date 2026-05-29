import axios from 'axios'

export async function analyzeCode(code, language) {
  const response = await axios.post(
    'http://localhost:5000/analyze',
    {
      code,
      language,
    }
  )

  return response.data
}