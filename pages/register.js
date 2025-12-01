import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Toast from '../components/Toast'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [error, setError] = useState(null)

  const passwordStrength = (pass) => {
    if (pass.length < 6) return 'Weak'
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.match(/[\W]/)) return 'Strong'
    return 'Medium'
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { emailRedirectTo: window.location.origin + '/verify-otp' }
    )

    if (error) setError(error.message)
    else {
      setOtpSent(true)
      setToast({ message: 'OTP email sent! Check your inbox.', type: 'success' })
    }
    setLoading(false)
  }

  const handleSocialLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) setToast({ message: error.message, type: 'error' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {toast && <Toast {...toast} />}
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-96 transition-all"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="mb-2 text-sm">Strength: {passwordStrength(password)}</p>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading || otpSent}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-2"
        >
          {loading ? 'Registering...' : otpSent ? 'OTP Sent!' : 'Register'}
        </button>

        <hr className="my-2" />
        <button
          type="button"
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 mb-2"
          onClick={() => handleSocialLogin('google')}
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-800"
          onClick={() => handleSocialLogin('github')}
        >
          Continue with GitHub
        </button>
      </form>
    </div>
  )
}