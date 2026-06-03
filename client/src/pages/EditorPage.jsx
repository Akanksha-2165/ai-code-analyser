import { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import ResultDisplay from '../components/ResultDisplay'
import { analyzeCode } from '../services/analysisService'

const DEFAULT_CODE = `function factorial(n) {
  if (n == 0)
    return 1;
  return n * factorial(n);
}`

export default function EditorPage() {

  const [code, setCode] = useState(DEFAULT_CODE)

  const [language, setLanguage] = useState('javascript')

  const [type, setType] = useState('debug')

  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  async function handleAnalyze() {
  try {
    setLoading(true)
    setError(null)  // Add this

    const data = await analyzeCode(
      code,
      language,
      type
    )

    setResult(data)

  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Analysis failed'
    setError(errorMsg)  // Show to user
    setResult(null)
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        AI Code Debugger
      </h1>

      <CodeEditor
        code={code}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
      />

      <div className="flex items-center gap-4 mt-4">

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
        >
          <option value="debug">Debug</option>
          <option value="explain">Explain</option>
        </select>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium"
        >
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>

      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
)}

      <ResultDisplay result={result} />

    </div>
  )
}