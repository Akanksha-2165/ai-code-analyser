import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-white font-bold text-xl"
      >
        🤖 DevAssist AI
      </Link>

      <div className="flex items-center gap-5">

        {user && (
          <>
            <Link
              to="/editor"
              className="text-gray-300 hover:text-white"
            >
              Editor
            </Link>

            <Link
              to="/history"
              className="text-gray-300 hover:text-white"
            >
              History
            </Link>
          </>
        )}

        {!user ? (
          <Link
            to="/login"
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}