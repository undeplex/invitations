'use client'

import { FiX } from 'react-icons/fi'

interface ErrorScreenProps {
  error: string
  onRetry: () => void
}

export const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <FiX className="h-6 w-6 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Rafraîchir la page
      </button>
    </div>
  </div>
)