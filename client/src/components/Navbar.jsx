import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">
        🤖 DevAssist AI
      </Link>

      <div className="flex gap-4">
        <Link
          to="/editor"
          className="text-gray-300 hover:text-white text-sm"
        >
          Editor
        </Link>
      </div>
    </nav>
  )
}