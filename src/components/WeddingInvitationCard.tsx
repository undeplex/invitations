// // 'use client'

// // import { useState } from 'react'
// // import { QRCodeSVG } from 'qrcode.react'
// // import { FiAlertTriangle } from 'react-icons/fi'
// // import { FaArrowDown } from 'react-icons/fa'

// // interface Participant {
// //   name: string
// //   number: string
// //   tableNumber?: string
// // }

// // interface QRData {
// //   id: string
// //   participants: Participant[]
// //   timestamp: number
// //   isCouple: boolean
// //   signature: string
// //   secretCode: string
// //   validated: boolean
// // }

// // const DEFAULT_TABLE_NUMBER = ''

// // const formatFrenchDate = (timestamp: number): string => {
// //   const date = new Date(timestamp)
// //   const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
// //   const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  
// //   const dayName = days[date.getDay()]
// //   const day = date.getDate()
// //   const month = months[date.getMonth()]
// //   const year = date.getFullYear()
  
// //   return `${dayName} ${day} ${month} ${year}`
// // }

// // export const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
// //   const qrContent = {
// //     participants: qrData.participants,
// //     isCouple: qrData.isCouple,
// //     tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
// //     validated: qrData.validated,
// //     timestamp: qrData.timestamp
// //   }
// //   const [clickCount, setClickCount] = useState(0)
// //   const [showQR, setShowQR] = useState(false)

// //   return (
// //     <div className="bg-pink-50 min-h-screen flex items-center justify-center ">
// //       <div className="relative max-w-lg w-full overflow-hidden bg-pink-50 text-center text-brown-700">
// //         {/* Floral Decorations */}
// //         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute w-[270px] -top-[146px] -left-[78px]" />
// //         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute w-[165px] top-[26px] -right-[190px]" />
// //         <img src="/wed-day.png" alt="Wedding Day" loading="lazy" className="absolute top-[2%] w-[112px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
// //         <img src="/bottom-left-flower.png" alt="Bottom Left Flower" loading="lazy" className="absolute w-[290px] -bottom-[149px] -left-[130px]" />
// //         <img src="/fleure-deco.png" alt="Bottom Right Flower" loading="lazy" className="absolute bottom-0 right-0 w-32" />
// //         <img src="/fleure-deco.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[550px] -left-[27px] w-[83px]" />
// //         <img src="/fleure-deco.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[530px] left-[17px] w-[43px]" />
        
// //         {/* Participant Name */}
// //         <div className="mt-16 pt-7">
// //           <h1 className="text-2xl font-bold text-brown-700">
// //             {qrData.participants[0].name}
// //           </h1>
// //           {qrData.isCouple && qrData.participants[1].name && (
// //             <h1 className="text-2xl font-bold text-brown-700">
// //               & {qrData.participants[1].name}
// //             </h1>
// //           )}
// //           <p className="text-gray-500 mt-2">
// //             Vous êtes invités
// //           </p>
// //         </div>

// //         <p className="mt-2 text-gray-600 text-xl">La réception des invités commencera dès 19h.
// //           Merci de vous présenter à la salle au minimum une heure avant l'heure prévue.</p>
// //         <p className='text-2xl serifo font-bold my-4'>CODE D'ENTREE</p>
        
// //         {/* QR Code Section */}
// //         <div className="mt-8">
// //           <div className="grid mx-auto rounded-xl my-3 p-3 border w-max place-items-center relative">
// //             <div>
// //               <QRCodeSVG
// //                 value={JSON.stringify(qrContent)}
// //                 size={230}
// //                 level="H"
// //                 includeMargin={true}
// //                 fgColor="#000000"
// //               />
// //             </div>
// //           </div>
          
// //           <div className="text-center p-2">
// //             <div className="border-2 border-red-400 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4">
// //               <div className="text-red-500 block mt-1">
// //                 <FiAlertTriangle size={24} />
// //               </div>
// //               <div>
// //                 <p className="text-red-700 text-sm">
// //                   Veuillez capturer ce code si vous avez déjà été appelée ou notifiée.
// //                   <strong>Ne le partagez pas</strong>, sinon il sera invalidé.
// //                   Pour toute question, un numéro de contact est disponible dans le lien fourni.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Couple Photo */}
// //         <div className="my-6 relative">
// //           <div className="relative w-[260px] h-[260px] mx-auto">
// //             <svg
// //               viewBox="0 0 260 260"
// //               className="absolute top-0 left-0 w-full h-full z-10"
// //             >
// //               <defs>
// //                 <clipPath id="hexClip">
// //                   <polygon points="130,10 240,65 240,195 130,250 20,195 20,65" />
// //                 </clipPath>
// //               </defs>
// //               <image
// //                 href="/danz.png"
// //                 width="260"
// //                 height="260"
// //                 clipPath="url(#hexClip)"
// //                 preserveAspectRatio="xMidYMid slice"
// //               />
// //             </svg>

// //             <svg
// //               viewBox="0 0 260 260"
// //               className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0 pointer-events-none"
// //             >
// //               <polygon
// //                 points="130,10 240,65 240,195 130,250 20,195 20,65"
// //                 fill="none"
// //                 stroke="#f3cfc9"
// //                 strokeWidth="4"
// //               />
// //             </svg>
// //             <img src="/image-photo.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[50%] z-50 translate-y-[3%] right-[50%] translate-x-[50%] w-[195px]" />
// //           </div>
// //         </div>
        
// //         {/* Wedding Title */}
// //         <h2 className="text-sm uppercase tracking-widest text-gray-500">Save the date</h2>
        
// //         {/* Names */}
// //         <div className="mt-4 flex mx-auto flex-col w-max serifo gap-3">
// //           <h3 className="text-3xl font-semibold text-brown-700">Dan Kibale</h3>
// //           <span className="text-lg font-bold text-blue-800">💖</span>
// //           <h3 className="text-3xl font-semibold text-brown-700">Falone Nangang</h3>
// //         </div>
        
// //         {/* Invitation Message */}
// //         <p className="my-4 px-4 text-lg text-gray-800">
// //           Deux âmes, un amour infini.
// //           Nous vous invitons à partager le moment où nous unirons nos vies,
// //           Et à célébrer ce qui nous fait vibrer : l'amour.
// //           Votre présence rendra ce jour encore plus précieux.
// //         </p>
// //         <p className="my-4 px-4 text-gray-600">
// //           PROGRAMME DE MARIAGE
// //         </p>
       
// //         {/* Date and Venue */}
// //         <div className="text-center space-y-4 px-2">
// //           <p className="text-2xl font-serif text-blue-800 serifo">Vendredi 27 Juin 2025</p>
// //           <div className="flex items-center justify-center gap-2">
// //             <img src='/certificate.png' className='size-7 rotate-12' loading="lazy" />
// //             <p className="text-gray-600 serifo"> à 14h00</p>
// //           </div>
// //           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
// //           <p className="text-gray-500 text-lg">Mariage Civil ,
// //             Q golf maïsha, av : mbuya référence: poid lourds (une avenue avant mubazo maman irene)
// //           </p>

// //           <p className="text-2xl font-serif text-blue-800 serifo">Samedi 28 Juin 2025</p>
// //           <div className="flex items-center justify-center gap-2">
// //             <img src='/rings.png' className='size-8' loading="lazy" />
// //             <p className="text-gray-600 serifo"> à 14h00</p>
// //           </div>
// //           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
// //           <p className="text-gray-500 text-lg">Mariage Religieux à l'église Protestante Unilu, référence Campus Kassapa Home 10</p>

// //           <div className="flex items-center justify-center gap-2">
// //             <img src='/glass.png' className='size-8' loading="lazy" />
// //             <p className="text-gray-600 serifo">vers 20h30</p>
// //           </div>
// //           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
// //         </div>
        
// //         {/* Reception */}
// //         <div className="text-center px-2">
// //           <div className="flex items-center justify-center gap-2 mb-2">
// //             <p className="text-gray-500 text-lg">Un vin d'honneur et un dîner suivront (soirée)</p>
// //           </div>
// //           <p className="text-2xl serifo font-serif text-blue-800 mt-2">
// //             à la salle Hexagone
// //           </p>
// //           <p className="text-gray-600 px-4 text-lg">Situé au Golf Malela, référence 100m du terminus Malela Golf</p>
// //         </div>
// //         <div className="mt-8 text-center">
// //           <p className="text-gray-900 text-lg">Avec toute notre joie,</p>
// //           <p className="mt-2 text-gray-600 text-xl">La famille KIBALE et la famille MUTOMBO</p>
// //         </div>
        
// //         {/* Signature */}
// //         <p className="text-gray-500 text-sm mt-2">
// //           {formatFrenchDate(qrData.timestamp)}
// //         </p>

// //         {/* Bouton à cliquer 3 fois */}
// //         <div className="text-center mt-4">
// //           <button 
// //             onClick={() => {
// //               setClickCount(prev => {
// //                 const newCount = prev + 1
// //                 if (newCount >= 4) setShowQR(true)
// //                 return newCount
// //               })
// //             }}
// //             className="text-xs text-gray-500 underline hover:text-gray-700 cursor-pointer"
// //             disabled={showQR}
// //           >
// //             <img src='/sign.png' className='w-[90px] mx-auto mt-4' loading="lazy" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client'

// import { useState } from 'react'
// import { QRCodeSVG } from 'qrcode.react'
// import { FiAlertTriangle } from 'react-icons/fi'
// import { FaArrowDown } from 'react-icons/fa'

// interface Participant {
//   name: string
//   number: string
//   tableNumber?: string
// }

// interface QRData {
//   id: string
//   participants: Participant[]
//   timestamp: number
//   isCouple: boolean
//   signature: string
//   secretCode: string
//   validated: boolean
// }

// const DEFAULT_TABLE_NUMBER = ''

// const formatFrenchDate = (timestamp: number): string => {
//   const date = new Date(timestamp)
//   const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
//   const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  
//   const dayName = days[date.getDay()]
//   const day = date.getDate()
//   const month = months[date.getMonth()]
//   const year = date.getFullYear()
  
//   return `${dayName} ${day} ${month} ${year}`
// }

// export const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
//   const qrContent = {
//     participants: qrData.participants,
//     isCouple: qrData.isCouple,
//     tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
//     validated: qrData.validated,
//     timestamp: qrData.timestamp
//   }
//   const [clickCount, setClickCount] = useState(0)
//   const [showQR, setShowQR] = useState(false)

//   return (
//     <div className="bg-pink-50 min-h-screen flex items-center justify-center ">
//       <div className="relative max-w-lg w-full overflow-hidden bg-pink-50 text-center text-brown-700">
//         {/* Floral Decorations */}
//         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute w-[270px] -top-[146px] -left-[78px]" />
//         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute w-[165px] top-[26px] -right-[190px]" />
//         <img src="/wed-day.png" alt="Wedding Day" loading="lazy" className="absolute top-[2%] w-[112px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
//         <img src="/bottom-left-flower.png" alt="Bottom Left Flower" loading="lazy" className="absolute w-[290px] -bottom-[149px] -left-[130px]" />
//         <img src="/fleure-deco.png" alt="Bottom Right Flower" loading="lazy" className="absolute bottom-0 right-0 w-32" />
//         <img src="/fleure-deco.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[550px] -left-[27px] w-[83px]" />
//         <img src="/fleure-deco.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[530px] left-[17px] w-[43px]" />
        






//  <div className="my-6 relative">
//           <div className="relative w-[260px] h-[260px] mx-auto">
//              <svg
//               viewBox="0 0 260 260"
//               className="absolute top-0 left-0 w-full h-full z-10"
//             >
//               <defs>
//                 <clipPath id="hexClip">
//                   <polygon points="130,10 240,65 240,195 130,250 20,195 20,65" />
//                 </clipPath>
//               </defs>
//               <image
//                 href="https://i.ibb.co/5WqS64p9/couple-picture-3.webp"
//                 width="260"
//                 height="260"
//                 clipPath="url(#hexClip)"
//                 preserveAspectRatio="xMidYMid slice"
//               />
//             </svg>

//             <svg
//               viewBox="0 0 260 260"
//               className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0 pointer-events-none"
//             >
//               <polygon
//                 points="130,10 240,65 240,195 130,250 20,195 20,65"
//                 fill="none"
//                 stroke="#f3cfc9"
//                 strokeWidth="4"
//               />
//             </svg>
//             <img src="/image-photo.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[50%] z-50 translate-y-[3%] right-[50%] translate-x-[50%] w-[195px]" />
//           </div>
//         </div>
        






        
//         {/* Participant Name */}
//         <div className="mt-16 pt-7">
//           <h1 className="text-2xl font-bold text-brown-700">
//             {qrData.participants[0].name}
//           </h1>
//           {qrData.isCouple && qrData.participants[1].name && (
//             <h1 className="text-2xl font-bold text-brown-700">
//               & {qrData.participants[1].name}
//             </h1>
//           )}
//           <p className="text-gray-500 mt-2">
//             Vous êtes invités
//           </p>
//         </div>

//         {/* Invitation Message */}
//         <div className="my-4 px-4 text-lg text-gray-800">
//           <p className="mb-4">C'est avec une immense joie que nous vous convions à partager le plus beau jour de notre vie, alors que nous unissons nos familles.</p>
          
//           <div className="mt-4 flex mx-auto flex-col w-max serifo gap-3">
//             <h3 className="text-3xl font-semibold text-brown-700">Christelle</h3>
//             <span className="text-lg font-bold text-blue-800">💖</span>
//             <h3 className="text-3xl font-semibold text-brown-700">Vusi</h3>
//           </div>
          
//           <p className="mt-4">La célébration se poursuivra autour d'un repas; Préparez vos sourires, votre joie, et surtout vos pas de danse...</p>
//           <p className="mt-2">car l'amour sera célébré en musique, jusqu'au bout de la nuit, sous les couleurs vert olive blanc et argenté.</p>
//           <p className="mt-4">Si vous souhaitez nous honorer, les cadeaux en espèces seront les bienvenus, comme tel est notre souhait.</p>
//         </div>

//         <p className="my-4 px-4 text-gray-600">
//           PROGRAMME DE MARIAGE
//         </p>
       
//         {/* Date and Venue */}
//         <div className="text-center space-y-4 px-2">
//           <p className="text-2xl font-serif text-blue-800 serifo">Vendredi 29 Août 2025</p>
//           <div className="flex items-center justify-center gap-2">
//             <img src='/certificate.png' className='size-7 rotate-12' loading="lazy" />
//             <p className="text-gray-600 serifo"> à 9h30</p>
//           </div>
//           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
//           <p className="text-gray-500 text-lg">Mariage Civil</p>

//           <p className="text-2xl font-serif text-blue-800 serifo">Samedi 30 Août 2025</p>
//           <div className="flex items-center justify-center gap-2">
//             <img src='/rings.png' className='size-8' loading="lazy" />
//             <p className="text-gray-600 serifo"> à 14h00</p>
//           </div>
//           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
//           <p className="text-gray-500 text-lg">Mariage Religieux</p>

//           <div className="flex items-center justify-center gap-2">
//             <img src='/glass.png' className='size-8' loading="lazy" />
//             <p className="text-gray-600 serifo">à 20h00</p>
//           </div>
//           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
//           <p className="text-gray-500 text-lg">Soirée dansante</p>
//         </div>
        
//         {/* Location */}
//         <div className="text-center px-2 mt-4">
//           <p className="text-2xl serifo font-serif text-blue-800">
//             Lieu des cérémonies
//           </p>
//           <p className="text-gray-600 px-4 text-lg mt-2">Chapiteau Royal</p>
//           <p className="text-gray-500 text-lg">Avenue des Chutes coin Kambove</p>
//           <p className="text-gray-500 text-lg">Référence: Ministère du travail Haut-Katanga</p>
//         </div>

//         {/* English Version */}
//         <div className="my-8 px-4 text-lg text-gray-800 border-t pt-6">
//           <p className="mb-4">It is with great joy that we invite you to share the most beautiful day of our lives. As we unite families</p>
          
//           <div className="mt-4 flex mx-auto flex-col w-max serifo gap-3">
//             <h3 className="text-3xl font-semibold text-brown-700">Christelle</h3>
//             <span className="text-lg font-bold text-blue-800">💖</span>
//             <h3 className="text-3xl font-semibold text-brown-700">Vusi</h3>
//           </div>
          
//           <p className="mt-4">The celebration will continue around a meal; Prepare your smiles, your joy, and especially your dance steps...</p>
//           <p className="mt-2">Because love will be celebrated in music, until the end of the night, under the colors olive green white and silver.</p>
//           <p className="mt-4">If you wish to honor us, cash gifts will be welcome, as such is our wish.</p>
//         </div>

//         {/* QR Code Section */}
//         <div className="mt-8">
//           <div className="grid mx-auto rounded-xl my-3 p-3 border w-max place-items-center relative">
//             <div>
//               <QRCodeSVG
//                 value={JSON.stringify(qrContent)}
//                 size={230}
//                 level="H"
//                 includeMargin={true}
//                 fgColor="#000000"
//               />
//             </div>
//           </div>
          
//           <div className="text-center p-2">
//             <div className="border-2 border-red-400 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4">
//               <div className="text-red-500 block mt-1">
//                 <FiAlertTriangle size={24} />
//               </div>
//               <div>
//                 <p className="text-red-700 text-sm">
//                   Veuillez capturer ce code si vous avez déjà été appelée ou notifiée.
//                   <strong>Ne le partagez pas</strong>, sinon il sera invalidé.
//                   Pour toute question, un numéro de contact est disponible dans le lien fourni.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 text-center">
//           <p className="text-gray-900 text-lg">Avec toute notre joie,</p>
//           <p className="mt-2 text-gray-600 text-xl">La famille</p>
//         </div>
        
//         {/* Signature */}
//         <p className="text-gray-500 text-sm mt-2">
//           {formatFrenchDate(qrData.timestamp)}
//         </p>

//         {/* Bouton à cliquer 3 fois */}
//         <div className="text-center mt-4">
//           <button 
//             onClick={() => {
//               setClickCount(prev => {
//                 const newCount = prev + 1
//                 if (newCount >= 4) setShowQR(true)
//                 return newCount
//               })
//             }}
//             className="text-xs text-gray-500 underline hover:text-gray-700 cursor-pointer"
//             disabled={showQR}
//           >
//             <img src='/sign.png' className='w-[90px] mx-auto mt-4' loading="lazy" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FiAlertTriangle } from 'react-icons/fi'
import { FaArrowDown, FaLanguage } from 'react-icons/fa'
import { Heart } from 'lucide-react'
import Head from 'next/head'

interface Participant {
  name: string
  number: string
  tableNumber?: string
}

interface QRData {
  id: string
  participants: Participant[]
  timestamp: number
  isCouple: boolean
  signature: string
  secretCode: string
  validated: boolean
}

const DEFAULT_TABLE_NUMBER = ''

const formatFrenchDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  
  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  return `${dayName} ${day} ${month} ${year}`
}

const formatEnglishDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const dayName = days[date.getDay()]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  return `${dayName}, ${month} ${day}, ${year}`
}

export const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
  const qrContent = {
    participants: qrData.participants,
    isCouple: qrData.isCouple,
    tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
    validated: qrData.validated,
    timestamp: qrData.timestamp
  }
  const [clickCount, setClickCount] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr')
  }

  // Contenu en français
  const frenchContent = {
    title: "Vous êtes invités",
    invitationText: [
      "C'est avec une immense joie que nous vous convions à partager le plus beau jour de notre vie, alors que nous unissons nos familles.",
      "La célébration se poursuivra autour d'un repas; Préparez vos sourires, votre joie, et surtout vos pas de danse...",
      "car l'amour sera célébré en musique, jusqu'au bout de la nuit, sous les couleurs vert olive blanc et argenté.",
      "Si vous souhaitez nous honorer, les cadeaux en espèces seront les bienvenus, comme tel est notre souhait."
    ],
    programTitle: "PROGRAMME DE MARIAGE",
    dates: [
      { day: "Vendredi 29 Août 2025", time: "à 11h00", event: "Mariage Civil", icon: "/certificate.png" },
      { day: "Samedi 30 Août 2025", time: "à 14h00", event: "Mariage Religieux", icon: "/rings.png" },
      { day: "", time: "à 20h00", event: "Soirée dansante", icon: "/glass.png" }
    ],
    locationTitle: "Lieu des cérémonies",
    location: "Chapiteau Royal",
    address: "Avenue des Chutes coin Kambove",
    reference: "Référence: Ministère du travail Haut-Katanga",
    closing: "Avec toute notre joie,",
    families: "La famille"
  }

  // Contenu en anglais
  const englishContent = {
    title: "You are invited",
    invitationText: [
      "It is with great joy that we invite you to share the most beautiful day of our lives. As we unite families.",
      "The celebration will continue around a meal; Prepare your smiles, your joy, and especially your dance steps...",
      "Because love will be celebrated in music, until the end of the night, under the colors olive green white and silver.",
      "If you wish to honor us, cash gifts will be welcome, as such is our wish."
    ],
    programTitle: "WEDDING PROGRAM",
    dates: [
      { day: "Friday August 29, 2025", time: "at 11:00 am", event: "Civil Wedding", icon: "/certificate.png" },
      { day: "Saturday August 30, 2025", time: "at 2:00 pm", event: "Religious Wedding", icon: "/rings.png" },
      { day: "", time: "at 8:00 pm", event: "Dance Party", icon: "/glass.png" }
    ],
    locationTitle: "Ceremony Location",
    location: "Royal Marquee (Chapitau Royal)",
    address: "Avenue des Chutes coin Kambove",
    reference: "Reference: Ministry of Labor Haut-Katanga",
    closing: "With all our joy,",
    families: "The family"
  }

  const content = language === 'fr' ? frenchContent : englishContent

  return (
    
    <div className="min-h-screen  h flex items-center justify-center" style={{ backgroundColor: '#f0f8ff' }}>
     
      <div className="relative max-w-lg w-full overflow-hidden text-center text-gray-800" style={{ backgroundColor: '#fff' }}>
        {/* Bouton de changement de langue */}
        <button 
          onClick={toggleLanguage}
          className="absolute top-4 right-4 z-50 flex items-center gap-1 border-green-700 border bg-gree-600/20 px-2 py-1 rounded-full shadow-sm hover:bg-white transition-all"
        >
          <FaLanguage className="text-green-700" />
          <span className="text-sm  text-green-800">{language === 'fr' ? 'ENGLISH' : 'FRANCAIS'}</span>
        </button>

        {/* Floral Decorations */}
        <img src="/fleure.webp" alt="Top Left Flower" loading="lazy" className="absolute w-[270px] -top-[155px] rotate-[-8deg] left-[-138px]" />
        <img src="/top.webp" alt="Top Right Flower" loading="lazy" className="absolute w-[165px] top-[26px] -right-[190px]" />
        <img src="/wed-day.webp" alt="Wedding Day" loading="lazy" className="absolute top-[2%] w-[102px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
        <img src="/ecal.webp" alt="Bottom Left Flower" loading="lazy" className="absolute w-[280px] -bottom-[83px] -left-[120px]" />
        <img src="/deco.webp" alt="Bottom Right Flower" loading="lazy" className="absolute bottom-0 right-0 w-32" />
        <img src="/fleure-deco.webp" alt="Bottom Right Flower" loading="lazy" className="absolute top-[145px] -right-[17px] w-[83px]" />
        <img src="/deco.webp" alt="Bottom Right Flower" loading="lazy" className="absolute top-[130px] right-[17px] w-[53px]" />
        
        {/* Participant Name */}
        <div className="mt-16 pt-7">
          {qrData.isCouple && (
            <h1 className="text-sm font- text-gray-700">
            - Couple -
            </h1>
          )}
          {!qrData.isCouple && (
            <h1 className="text-sm font- text-gray-700">
             {language === 'fr' 
                    ? "-Singleton-" :"-Single-"}
            </h1>
          )}
          <h1 className="text-2xl font-bold text-gray-800">
            {qrData.participants[0].name}
          </h1>
          {qrData.isCouple && qrData.participants[1].name && (
            <h1 className="text-2xl font-bold text-gray-800">
              & {qrData.participants[1].name}
            </h1>
          )}
          <p className="text-gray-600 mt-2">
            {content.title}
          </p>
        </div>

        {/* Couple Photo - Version originale */}
        <div className="my-6 relative">
          <div className="relative w-[290px] h-[290px] mx-auto">
            <svg
              viewBox="0 0 260 260"
              className="absolute top-0 left-0 w-full h-full z-10"
            >
              <defs>
                <clipPath id="hexClip">
                  <polygon points="130,10 240,65 240,195 130,250 20,195 20,65" />
                </clipPath>
              </defs>
              <image
                // href="https://i.ibb.co/5WqS64p9/couple-picture-3.webp"
                href="/couple-picture-3.webp"
                width="260"
                height="260"
                clipPath="url(#hexClip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>

            <svg
              viewBox="0 0 260 260"
              className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-0 pointer-events-none"
            >
              <polygon
                points="130,10 240,65 240,195 130,250 20,195 20,65"
                fill="none"
                stroke="#A4B9A4"
                strokeWidth="4"
              />
            </svg>
            <img src="/fleure.webp" alt="Decoration" loading="lazy" className="absolute top-[50%] rotate-[31deg] z-50 translate-y-[-23%] right-[50%] translate-x-[50%] w-[305px]" />
          </div>
        </div>

        {/* Invitation Message */}
        <div className="mt-[90px] px-4 text-lg text-gray-700">
          <p className="mb-4">{content.invitationText[0]}</p>
          
          <div className="mt-4 flex mx-auto flex-col w-max font-bold ">
            <h3 className="text-3xl font-semibold text-gray-800">Christelle</h3>
            <span className="text-lg font-bold h-[23px] my-1 grid justify-center text-blue-600">
              
        <Heart className="text-green-700 spain inline-block"/>
        <Heart className="text-green-500 translate-x-[14px] inline-block translate-y-[-23px] rotate-6"/>
      

            </span>
            <h3 className="text-3xl font-semibold text-gray-800">Vusi</h3>
          </div>
          
          <p className="mt-4">{content.invitationText[1]}</p>
          <p className="mt-2">{content.invitationText[2]}</p>
          <p className="mt-4">{content.invitationText[3]}</p>
        </div>

        <p className="my-4 px-4 font-bold text-gray-600">
          {content.programTitle}
        </p>
       
        {/* Date and Venue */}
        <div className="text-center space-y-4 px-2">
          {content.dates.map((date, index) => (
            <div key={index}>
              {date.day && <p className="text-2xl  text-green-800 font-bold ubuntu ">{date.day}</p>}
              <div className="flex items-center justify-center gap-2">
                <img src={date.icon} className='size-7 rotate-2' loading="lazy" />
                <p className="text-gray-600 serif text-xl my-2"> {date.time}</p>
              </div>
              <FaArrowDown size={12} className='block c mx-auto animate-bounce text-blue-400' />
              <p className="text-gray-600 text-xl">{date.event}</p>
            </div>
          ))}
        </div>
        
        {/* Location */}
        <div className="text-center px-2 mt-4">
          <p className="text-2xl  text-green-800 font-bold">
            {content.locationTitle}
          </p>
          <p className="px-4 text-3xl my-2 font-bold text-animated-color">{content.location}</p>
          <p className="text-gray-600 text-xl">{content.address}</p>
          <p className="text-gray-600 text-xl">{content.reference}</p>
        </div>

        {/* QR Code Section */}
        <div className="mt-8">
         
          
          <div className="text-center p-2">
            <div className="border-2 border-red-300 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="text-red-500 block mt-1">
                <FiAlertTriangle size={24} />
              </div>
              <div>
                <p className="text-red-700 text-sm">
                  {language === 'fr' 
                    ? "Un QR code s'affichera 24h avant la cérémonie. Présentez-le à la réception. En cas de souci (téléphone perdu ou lien perdu), une assistance sera disponible à l'entrée. "
                    : "A QR code will appear 24h before the ceremony. Show it at the reception. If your phone or code is lost, assistance will be available at the entrance."}
                </p>
              </div>
            </div> 
          </div>
           <div className="grid blur-lg mx-auto rounded-xl my-3 p-3 border border-blue-200 w-max place-items-center relative" style={{ backgroundColor: '#f8fbff' }}>
            <div>
              <QRCodeSVG
                value={JSON.stringify(qrContent)}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#000"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-800 text-lg">{content.closing}</p>
          <p className="mt-2 text-gray-700 text-xl">{content.families}</p>
        </div>
        
        {/* Signature */}
        <p className="text-gray-600 text-sm mt-2 mb-8">
          {language === 'fr' 
            ? formatFrenchDate(qrData.timestamp)
            : formatEnglishDate(qrData.timestamp)}
        </p>
      </div>
    </div>
  )
}