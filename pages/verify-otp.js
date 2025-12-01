import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Toast from '../components/Toast'

export default function VerifyOtp() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/register')
      else setLoading(false)
    })
  }, [])

  const handleSetPassword = async (e) => {
    e.preventDefault()
    const password = e.target.password.value
    if (!password) return alert('Enter password')

    const { error } = await supabase.auth.updateUser({ password })
    if (error) setToast({ message: error.message, type: 'error' })
    else {
      setToast({ message: 'Password set! You can login now', type: 'success' })
      setTimeout(() => router.push('/login'), 1500)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex min-h-screen items-center justify-center">
      {toast && <Toast {...toast} />}
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-96 transition-all"
        onSubmit={handleSetPassword}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Set Your Password</h2>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Set Password
        </button>
      </form>
    </div>
  )
}