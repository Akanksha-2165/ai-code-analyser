import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4">
        🤖 DevAssist AI
      </h1>

      <p className="text-gray-400 text-lg mb-8 max-w-md">
        AI-powered debugging and code explanation platform.
      </p>

      <Link
        to="/editor"
        className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-medium text-lg"
      >
        Open Editor →
      </Link>
    </div>
  )
}