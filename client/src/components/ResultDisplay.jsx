export default function ResultDisplay({ result }) {
  if (!result) return null

  // Handle error response
  if (result.success === false) {
    return (
      <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
        <h3 className="text-red-400 font-semibold">Error</h3>
        <p className="text-red-200">{result.message}</p>
      </div>
    )
  }

  // Separate handling for debug vs explain
  if (result.type === 'explain') {
    // Explain mode - don't show bugs, just explanation
    const explanation = result.explanation || 'No explanation available'
    const fixedCode = result.fixedCode || result.code || ''

    return (
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="text-blue-400 font-semibold mb-2">
            Code Explanation
          </h3>
          <p className="text-gray-300 whitespace-pre-wrap">{explanation}</p>
        </div>

        {fixedCode && (
          <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <h3 className="text-green-400 font-semibold mb-2">
              Reference Code
            </h3>
            <pre className="overflow-x-auto text-sm bg-gray-900 p-3 rounded">
              <code>{fixedCode}</code>
            </pre>
          </div>
        )}
      </div>
    )
  }

  // Debug mode - show bugs
  const bugs = result.bugsFound || []
  const explanation = result.explanation || 'No explanation available'
  const fixedCode = result.fixedCode || result.code || ''

  return (
    <div className="mt-6 space-y-4">

      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">
          Bugs Found: {bugs.length}
        </h3>

        {bugs.length > 0 ? (
          bugs.map((bug, index) => (
            <div key={index} className="mb-3 p-2 bg-gray-900 rounded border-l-4 border-yellow-500">
              {bug.line && <p className="text-sm text-gray-400">Line {bug.line}</p>}
              <p className="font-medium text-white">{bug.issue}</p>
              <p className="text-sm text-gray-400">
                Severity: <span className={
                  bug.severity === 'high' ? 'text-red-400' :
                  bug.severity === 'medium' ? 'text-yellow-400' :
                  'text-blue-400'
                }>
                  {bug.severity}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-green-400">✓ No bugs found!</p>
        )}
      </div>

      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h3 className="text-blue-400 font-semibold mb-2">
          Explanation
        </h3>
        <p className="text-gray-300 whitespace-pre-wrap">{explanation}</p>
      </div>

      {fixedCode && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">
            Fixed Code
          </h3>
          <pre className="overflow-x-auto text-sm bg-gray-900 p-3 rounded">
            <code>{fixedCode}</code>
          </pre>
        </div>
      )}
    </div>
  )
}