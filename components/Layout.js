import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.className = dark
      ? 'bg-gray-900 text-white transition-colors duration-500'
      : 'bg-gray-100 text-black transition-colors duration-500'
  }, [dark])

  return (
    <div>
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-5 right-5 p-2 rounded bg-blue-600 text-white shadow-md"
      >
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
      {children}
    </div>
  )
}