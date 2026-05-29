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

  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  async function handleAnalyze() {
    try {
      setLoading(true)

      const data = await analyzeCode(code, language)

      setResult(data)
    } catch (err) {
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

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium"
      >
        {loading ? 'Analyzing...' : 'Analyze Code'}
      </button>

      <ResultDisplay result={result} />
    </div>
  )
}