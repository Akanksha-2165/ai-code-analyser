import { useEffect, useState } from 'react'
import {
  getHistory,
  getSession,
  deleteSession
} from '../services/historyService'

function HistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [selectedSession, setSelectedSession] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    try {
      const data = await getHistory()
      setHistory(data.history || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSession(id)

      setHistory(prev =>
        prev.filter(item => item.id !== id)
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function handleView(id) {
  try {
    const data = await getSession(id)

    setSelectedSession(data.session)
    setShowModal(true)

  } catch (error) {
    console.error(error)
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading history...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Analysis History
      </h1>

      {history.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-700">
          <div className="text-6xl mb-4">📂</div>

          <h2 className="text-2xl font-semibold mb-2">
            No analyses yet
          </h2>

          <p className="text-gray-400">
            Start analyzing code to build your history.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map(session => (
            <div
              key={session.id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:border-indigo-500 transition"
            >

              <div className="flex justify-between items-center mb-4">

                <div className="flex gap-3">

                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
                    {session.language}
                  </span>

                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm capitalize">
                    {session.type}
                  </span>

                </div>

                <span className="text-gray-400 text-sm">
                  {new Date(session.created_at).toLocaleString()}
                </span>

              </div>

              <pre className="bg-black rounded-lg p-4 overflow-x-auto text-sm text-green-400 max-h-44 overflow-y-auto">
{session.code}
              </pre>

              <div className="flex justify-end gap-3 mt-5">
                
                <button
                    onClick={() => handleView(session.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                >
                View
                </button>

                <button
                    onClick={() => handleDelete(session.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {showModal && selectedSession && (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-6 z-50">

        <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                    Analysis Details
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                >
                    ✕
                </button>

            </div>

            <h3 className="font-semibold mb-2">
                Original Code
            </h3>

            <pre className="bg-black rounded-lg p-4 text-green-400 overflow-auto mb-6">
                {selectedSession.code}
            </pre>

            <h3 className="font-semibold mb-2">
                Explanation
            </h3>

            <h3 className="font-semibold mb-2">
                Fixed Code
            </h3>

            <pre className="bg-black rounded-lg p-4 text-green-400 overflow-auto mb-6">
                {selectedSession.result?.fixedCode || "No fixed code available"}
            </pre>

            <p className="bg-gray-800 rounded-lg p-4 mb-6 whitespace-pre-wrap">
                {selectedSession.result?.explanation || "No explanation available"}
            </p>

            <h3 className="font-semibold mb-2">
    Bugs Found
</h3>

{!selectedSession.result?.bugsFound ||
selectedSession.result.bugsFound.length === 0 ? (

    <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-green-300">
        ✅ No bugs found.
    </div>

) : (

    <div className="space-y-3">

        {selectedSession.result.bugsFound.map((bug, index) => (

            <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500"
            >

                <p>
                    <strong>Line:</strong> {bug.line}
                </p>

                <p>
                    <strong>Severity:</strong>{" "}
                    <span
                        className={`font-semibold ${
                            bug.severity === "high"
                                ? "text-red-400"
                                : bug.severity === "medium"
                                ? "text-yellow-400"
                                : "text-green-400"
                        }`}
                    >
                        {bug.severity}
                    </span>
                </p>

                <p>
                    <strong>Issue:</strong> {bug.issue}
                </p>

            </div>

        ))}

    </div>

)}

    </div>

    </div>

    )}

    </div>
  )
}

export default HistoryPage