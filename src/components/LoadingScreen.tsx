// 'use client'

// export const LoadingScreen = () => (
//   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-10">
//     <div className="text-center">
//       <div className="relative w-24 h-24 mx-auto mb-6">
//         <div className="absolute inset-0 rounded-full border-4 border-pink-300 border-t-transparent animate-spin"></div>
//         <div className="absolute inset-4 rounded-full border-4 border-blue-300 border-b-transparent animate-spin-reverse"></div>
//         <div className="absolute inset-8 rounded-full border-4 border-pink-500 border-r-transparent animate-spin"></div>
//       </div>
//       <h2 className="text-2xl font-bold text-blue-600 mb-2">Chargement</h2>
//       <p className="text-gray-600">Veuillez patienter...</p>
//     </div>
//   </div>
// )

"use client";

import Image from "next/image";
import { Heart, Loader2 } from "lucide-react";

export default function WeddingLoader() {
  return (
    <div className="relative w-full h-screen bg-stone-50 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Fleur en coin bas-gauche */}
      <Image
        src="/assets/fl.png"
        alt="fleur eucalyptus"
        width={348}
        height={340}
        className="absolute  rotate-[33deg] top-[62%] left-[48%] translate-x-[-50%] translate-y-[-50%] pointer-events-none"
      />

      {/* Fleur en coin haut-droit (mirroir) */}
     
     

      <Loader2 className="animate-spin text-green-700 w-6 h-6" />
    </div>
  );
}
