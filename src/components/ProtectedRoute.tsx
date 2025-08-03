// 'use client' 

// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, loading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push('/login')
//     }
//   }, [isAuthenticated, loading, router])

//   if (loading || !isAuthenticated) {
//     return <div>Chargement...</div>
//   }

//   return <>{children}</>
// }
'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your session</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}