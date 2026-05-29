export default function ResultDisplay({ result }) {
  if (!result) return null

  return (
    <div className="mt-6 space-y-4">

      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h3 className="text-yellow-400 font-semibold mb-2">
          Bugs Found
        </h3>

        {result.bugsFound.map((bug, index) => (
          <div key={index} className="mb-2">
            <p>
              Line {bug.line}: {bug.issue}
            </p>

            <p className="text-sm text-gray-400">
              Severity: {bug.severity}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h3 className="text-blue-400 font-semibold mb-2">
          Explanation
        </h3>

        <p>{result.explanation}</p>
      </div>

      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h3 className="text-green-400 font-semibold mb-2">
          Fixed Code
        </h3>

        <pre className="overflow-x-auto text-sm">
          {result.fixedCode}
        </pre>
      </div>
    </div>
  )
}