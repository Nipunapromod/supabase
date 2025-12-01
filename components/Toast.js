import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success' }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const bg = type === 'success' ? 'bg-green-500' : 'bg-red-500'

  return (
    <div className={`${bg} text-white p-3 rounded fixed top-20 right-5 shadow-md transition-all`}>
      {message}
    </div>
  )
}