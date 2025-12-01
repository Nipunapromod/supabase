import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/login')
      else setUser(data.session.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-5">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-blue-600 text-white p-5 rounded shadow-lg">Card 1 - Analytics</div>
          <div className="bg-green-600 text-white p-5 rounded shadow-lg">Card 2 - Stats</div>
          <div className="bg-red-600 text-white p-5 rounded shadow-lg">Card 3 - Messages</div>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/login')
          }}
          className="mt-6 bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </Layout>
  )
}