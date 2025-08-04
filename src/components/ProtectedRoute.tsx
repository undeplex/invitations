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
import WeddingLoader from './weddingLoader'

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
      <WeddingLoader/>
    )
  }

  return <>{children}</>
}