import Editor from '@monaco-editor/react'

const EXAMPLES = {
  javascript: `function factorial(n) {
  if (n == 0)
    return 1;
  return n * factorial(n);
}`,

  python: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n)`,

  java: `public int factorial(int n) {
    if (n == 0)
        return 1;
    return n * factorial(n);
}`,
}

export default function CodeEditor({
  code,
  language,
  onChange,
  onLanguageChange,
}) {
  return (
    <div>
      <select
        value={language}
        onChange={(e) => {
          const lang = e.target.value
          onLanguageChange(lang)
          onChange(EXAMPLES[lang] || '')
        }}
        className="mb-3 bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <Editor
        height="500px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={onChange}
        options={{
          fontSize: 14,
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  )
}