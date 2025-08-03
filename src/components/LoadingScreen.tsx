'use client'

export const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-10">
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-pink-300 border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-4 border-blue-300 border-b-transparent animate-spin-reverse"></div>
        <div className="absolute inset-8 rounded-full border-4 border-pink-500 border-r-transparent animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-blue-600 mb-2">Chargement</h2>
      <p className="text-gray-600">Veuillez patienter...</p>
    </div>
  </div>
)