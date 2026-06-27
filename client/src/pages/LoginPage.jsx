import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()

  const { signIn, signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')

      let result

      if (isSignup) {
        result = await signUp(email, password)
        alert('Account created. Please login.')
        setIsSignup(false)
        return
      }

      result = await signIn(email, password)

      if (result.error) {
        setError(result.error.message)
        return
      }

      navigate('/editor')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6">
          {isSignup ? 'Sign Up' : 'Login'}
        </h1>

        {error && (
          <div className="mb-4 text-red-400">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 p-3 rounded"
        >
          {isSignup ? 'Create Account' : 'Login'}
        </button>

        <button
          type="button"
          className="mt-4 text-blue-400"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? 'Already have an account? Login'
            : 'Need an account? Sign Up'}
        </button>
      </form>
    </div>
  )
}