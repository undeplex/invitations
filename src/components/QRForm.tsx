// 'use client'

// import { useState, useCallback } from 'react'
// import { FiUser, FiUsers, FiX, FiCheck, FiEye, FiEyeOff, FiKey, FiPhone } from 'react-icons/fi'

// interface Participant {
//   name: string
//   number: string
//   tableNumber?: string
// }

// interface QRFormProps {
//   participants: Participant[]
//   isCouple: boolean
//   secretCode: string
//   isSubmitting: boolean
//   error: string
//   onParticipantChange: (index: number, field: keyof Participant, value: string) => void
//   onNumberChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
//   onSecretCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   onSubmit: (e: React.FormEvent) => void
//   onToggleShowSecretCode: () => void
//   showSecretCode: boolean
// }

// export const QRForm = ({
//   participants,
//   isCouple,
//   secretCode,
//   isSubmitting,
//   error,
//   onParticipantChange,
//   onNumberChange,
//   onSecretCodeChange,
//   onSubmit,
//   onToggleShowSecretCode,
//   showSecretCode
// }: QRFormProps) => {
//   return (
//     <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
//       <img src='rings.png' className='absolute z-50 top-[5%] right-[10%] translate-x-[-50%] translate-y-[-50%] w-[60px]'/>
//       <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200">
//         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute -top-20 -left-20 w-40 opacity-70" />
//         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute top-10 -right-20 w-40 opacity-70" />

//         <div className="p-6">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl serifo font-serif font-bold text-brown-700 mb-2">
//               Formulaire d'Invitation
//             </h1>
//             <p className="text-gray-600">
//               Veuillez remplir vos informations pour recevoir votre invitation
//             </p>
//           </div>

//           <form onSubmit={onSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {isCouple ? 'Votre nom complet' : 'Votre nom complet'}
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 value={participants[0].name}
//                 onChange={(e) => onParticipantChange(0, 'name', e.target.value)}
//                 required
//                 placeholder="Votre nom"
//               />
//             </div>

//             <div>
//               <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
//                 <FiPhone className="mr-2" />
//                 Numéro de téléphone
//               </label>
//               <input
//                 type="tel"
//                 className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 value={participants[0].number}
//                 onChange={(e) => onNumberChange(e, 0)}
//                 required
//                 pattern="0\d{9}"
//                 inputMode="numeric"
//                 maxLength={10}
//                 placeholder="0XXXXXXXXX"
//               />
//               {participants[0].number.length > 0 && !participants[0].number.startsWith('0') && (
//                 <p className="text-xs text-red-500 mt-1">Le numéro doit commencer par 0</p>
//               )}
//               {participants[0].number.length !== 10 && participants[0].number.length > 0 && (
//                 <p className="text-xs text-red-500 mt-1">Le numéro doit comporter 10 chiffres</p>
//               )}
//             </div>

//             {isCouple && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Nom de votre partenaire
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                   value={participants[1].name}
//                   onChange={(e) => onParticipantChange(1, 'name', e.target.value)}
//                   required={isCouple}
//                   placeholder="Nom du partenaire"
//                 />
//               </div>
//             )}

//             <div>
//               <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
//                 <FiKey className="mr-2" />
//                 Code secret (4 chiffres)
//               </label>
//               <div className="relative">
//                 <input
//                   type={showSecretCode ? "text" : "password"}
//                   className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
//                   value={secretCode}
//                   onChange={onSecretCodeChange}
//                   maxLength={4}
//                   pattern="\d{4}"
//                   inputMode="numeric"
//                   required
//                   placeholder="****"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-700"
//                   onClick={onToggleShowSecretCode}
//                 >
//                   {showSecretCode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Choisissez un code secret de 4 chiffres, Retenez le, il sera utilisé en cas de perte de votre code QR ou téléphone, etc. (Le choix vous appartient du code secret, le plus important c'est le retenir et pas le partager)</p>
//             </div>

//             {error && (
//               <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
//                 <p>{error}</p>
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   En cours...
//                 </>
//               ) : (
//                 'Obtenir mon invitation'
//               )}
//             </button>
//           </form>

//           <p className="text-xs text-gray-500 mt-4 text-center">
//             Vos informations ne seront utilisées que pour cette invitation et ne seront pas partagées.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useCallback } from 'react'
import { FiUser, FiUsers, FiX, FiCheck, FiEye, FiEyeOff, FiKey, FiPhone } from 'react-icons/fi'

interface Participant {
  name: string
  number: string
  tableNumber?: string
}

interface QRFormProps {
  participants: Participant[]
  isCouple: boolean
  secretCode: string
  isSubmitting: boolean
  error: string
  onParticipantChange: (index: number, field: keyof Participant, value: string) => void
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onSecretCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onToggleShowSecretCode: () => void
  showSecretCode: boolean
}

export const QRForm = ({
  participants,
  isCouple,
  secretCode,
  isSubmitting,
  error,
  onParticipantChange,
  onNumberChange,
  onSecretCodeChange,
  onSubmit,
  onToggleShowSecretCode,
  showSecretCode
}: QRFormProps) => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <img src='rings.png' className='absolute z-50 top-[5%] right-[10%] translate-x-[-50%] translate-y-[-50%] w-[60px]'/>
      <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200">
        <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute -top-20 -left-20 w-40 opacity-70" />
        <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute top-10 -right-20 w-40 opacity-70" />

        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl serifo font-serif font-bold text-brown-700 mb-2">
              Formulaire d'Invitation
            </h1>
            <p className="text-gray-600">
              Veuillez remplir les champs pour les deux participants
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du premier participant
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={participants[0].name}
                onChange={(e) => onParticipantChange(0, 'name', e.target.value)}
                required
                placeholder="Nom complet"
              />
            </div>

            <div>
              <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiPhone className="mr-2" />
                Numéro de téléphone (Participant 1)
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={participants[0].number}
                onChange={(e) => onNumberChange(e, 0)}
                required
                pattern="0\d{9}"
                inputMode="numeric"
                maxLength={10}
                placeholder="0XXXXXXXXX"
              />
              {participants[0].number.length > 0 && !participants[0].number.startsWith('0') && (
                <p className="text-xs text-red-500 mt-1">Le numéro doit commencer par 0</p>
              )}
              {participants[0].number.length !== 10 && participants[0].number.length > 0 && (
                <p className="text-xs text-red-500 mt-1">Le numéro doit comporter 10 chiffres</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du deuxième participant (optionnel)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={participants[1].name}
                onChange={(e) => onParticipantChange(1, 'name', e.target.value)}
                placeholder="Nom complet (optionnel)"
              />
            </div>

            <div>
              <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiKey className="mr-2" />
                Code secret (4 chiffres)
              </label>
              <div className="relative">
                <input
                  type={showSecretCode ? "text" : "password"}
                  className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
                  value={secretCode}
                  onChange={onSecretCodeChange}
                  maxLength={4}
                  pattern="\d{4}"
                  inputMode="numeric"
                  required
                  placeholder="****"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-700"
                  onClick={onToggleShowSecretCode}
                >
                  {showSecretCode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Choisissez un code secret de 4 chiffres, Retenez le, il sera utilisé en cas de perte de votre code QR ou téléphone, etc. (Le choix vous appartient du code secret, le plus important c'est le retenir et pas le partager)</p>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  En cours...
                </>
              ) : (
                'Obtenir mon invitation'
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Vos informations ne seront utilisées que pour cette invitation et ne seront pas partagées.
          </p>
        </div>
      </div>
    </div>
  )
}