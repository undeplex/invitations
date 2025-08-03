
// // 'use client' 

// // import { useState, useEffect, useCallback } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { QRCodeSVG } from 'qrcode.react'
// // import CryptoJS from 'crypto-js'
// // import { FiUser, FiUsers, FiX, FiCheck, FiEye, FiEyeOff, FiKey, FiPhone, FiAlertTriangle } from 'react-icons/fi'
// // import { FaArrowDown } from 'react-icons/fa'
// // import { createClient } from '@supabase/supabase-js'
// // import type { Metadata } from 'next';

// // // Configuration Supabase
// // const supabaseUrl = 'https://htotfyduudyoephuixzu.supabase.co'
// // const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
// // const supabase = createClient(supabaseUrl, supabaseAnonKey)

// // const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'votre_cle_secrete_stable_123!@#'
// // const DEFAULT_TABLE_NUMBER = ''

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
// //   secretCode: string
// //   validated: boolean
// // }

// // // Fonction améliorée pour tracker les ouvertures
// // const trackLinkOpening = async (linkId: string) => {
// //   // Vérifier si on est côté client
// //   if (typeof window === 'undefined') return;

// //   try {
// //     // Vérifier si le tracking a déjà été fait pour cette session
// //     const alreadyTracked = sessionStorage.getItem(`tracked_${linkId}`);
// //     if (alreadyTracked) return;

// //     // Envoyer des infos supplémentaires
// //     const userAgent = navigator.userAgent;
// //     const referrer = document.referrer || 'direct';
    
// //     const { error } = await supabase.rpc('increment_link_opening', {
// //       link_id: linkId,
// //       user_agent: userAgent,
// //       referrer: referrer
// //     });
    
// //     if (error) {
// //       console.error('Tracking error:', error.message);
// //     } else {
// //       // Marquer comme tracé pour cette session
// //       sessionStorage.setItem(`tracked_${linkId}`, 'true');
// //     }
// //   } catch (error) {
// //     console.error('Tracking failed:', error);
// //   }
// // }
// // // 2. Métadonnées dynamiques (optionnel)
// // // app/qr-form/page.tsx

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

// // const WeddingInvitationCard = ({ qrData }: { qrData: QRData  }) => {
// //   const qrContent = {
// //     participants: qrData.participants,
// //     isCouple: qrData.isCouple,
// //     tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
// //     validated: qrData.validated,
// //     timestamp: qrData.timestamp
// //   }
// //   const [clickCount, setClickCount] = useState(0);
// //   const [showQR, setShowQR] = useState(false);

// //   return (
// //     <div className="bg-pink-50 min-h-screen flex items-center justify-center ">
// //       <div className="relative max-w-lg w-full overflow-hidden bg-pink-50 text-center text-brown-700">
// //         {/* Floral Decorations - Optimized with lazy loading */}
// //         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute w-[270px] -top-[146px] -left-[78px]" />
// //         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute w-[165px] top-[26px] -right-[190px]" />
// //         <img src="/wed-day.png" alt="Wedding Day" loading="lazy" className="absolute top-[2%] w-[112px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
// //         <img src="/bottom-left-flower.png" alt="Bottom Left Flower" loading="lazy" className="absolute w-[290px] -bottom-[149px] -left-[130px]" />
// //         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute bottom-0 right-0 w-32" />
// //         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[550px] -left-[27px] w-[83px]" />
// //         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[530px] left-[17px] w-[43px]" />
        
// //         {/* Participant Name */}
// //         <div className="mt-16 pt-7">
// //           <h1 className="text-2xl  font-bold text-brown-700">
// //             {qrData.participants[0].name}
// //           </h1>
// //           {qrData.isCouple && qrData.participants[1].name && (
// //             <h1 className="text-2xl  font-bold text-brown-700">
// //               & {qrData.participants[1].name}
// //             </h1>
// //           )}
// //           <p className="text-gray-500 mt-2">
// //             Vous êtes invités
// //           </p>
// //         </div>







// //  <p className="mt-2 text-gray-600 text-xl">La réception des invités commencera dès 19h.
// //     Merci de vous présenter à la salle au minimum une heure avant l’heure prévue.</p>
// //         <p className='text-2xl  serifo font-bold my-4'>CODE D'ENTREE</p>
        
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
// //                  <strong>Ne le partagez pas</strong>, sinon il sera invalidé.
// //                   Pour toute question, un numéro de contact est disponible dans le lien fourni.</p>

// //               </div>
// //             </div>
// //           </div></div>
        
























        
        
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
// //           Et à célébrer ce qui nous fait vibrer : l’amour.
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
// //              <p className="text-gray-600 serifo"> à 14h00</p>
            
// //           </div>
// //           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
// //           <p className="text-gray-500 text-lg">Mariage Civil ,
          
// //           Q golf maïsha,  av : mbuya référence: poid lourds (une avenue avant mubazo maman  irene)
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
// //         <p className='text-2xl hidden serifo font-bold my-4'>CODE D'ENTREE</p>
        
// //         {/* QR Code Section */}
// //         <div className="mt-8 hidden">
// //           <div className="hidden mx-auto rounded-xl my-3 p-3 border w-max place-items-center relative">
// //             <div className={showQR ? "" : "blur-md"}>
// //               <QRCodeSVG
// //                 value={JSON.stringify(qrContent)}
// //                 size={200}
// //                 level="H"
// //                 includeMargin={true}
// //                 fgColor="#000000"
// //               />
// //             </div>
// //           </div>
          
// //           <div className="text-center hidden p-2">
// //             <div className="border-2 border-red-400 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4">
// //               <div className="text-red-500 block mt-1">
// //                 <FiAlertTriangle size={24} />
// //               </div>
// //               <div>
// //                 <p className="text-red-700 text-sm">
// //                   <strong>Sécurité renforcée</strong> : Ce QR code est protégé et s’affichera automatiquement 2 jours avant la date prévue du mariage.
// //                   . Revenez simplement sur ce lien au moment venu(vous pouvez même le prendre en capture le jour j de la reception)
// //                   - Ne le partagez pas ,sinon ça sera invalide.
// //                   Pour toute question, un numero de contact a été donné dans le lien.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Signature */}
// //         <p className="text-gray-500  text-sm mt-2">
// //           {formatFrenchDate(qrData.timestamp)}
// //         </p>

// //         {/* Bouton à cliquer 3 fois */}
// //         <div className="text-center mt-4">
// //           <button 
// //             onClick={() => {
// //               setClickCount(prev => {
// //                 const newCount = prev + 1;
// //                 if (newCount >= 4) setShowQR(true);
// //                 return newCount;
// //               });
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

// // const LoadingScreen = () => (
// //   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-10">
// //     <div className="text-center">
// //       <div className="relative w-24 h-24 mx-auto mb-6">
// //         <div className="absolute inset-0 rounded-full border-4 border-pink-300 border-t-transparent animate-spin"></div>
// //         <div className="absolute inset-4 rounded-full border-4 border-blue-300 border-b-transparent animate-spin-reverse"></div>
// //         <div className="absolute inset-8 rounded-full border-4 border-pink-500 border-r-transparent animate-spin"></div>
// //       </div>
// //       <h2 className="text-2xl font-bold text-blue-600 mb-2">Chargement</h2>
// //       <p className="text-gray-600">Veuillez patienter...</p>
// //     </div>
// //   </div>
// // )

// // const ErrorScreen = ({ error, onRetry }: { error: string, onRetry: () => void }) => (
// //   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
// //     <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
// //       <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
// //         <FiX className="h-6 w-6 text-red-600" />
// //       </div>
// //       <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
// //       <p className="text-gray-600 mb-6">{error}</p>
// //       <button
// //         onClick={onRetry}
// //         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //       >
// //         Rafraîchir la page
// //       </button>
// //     </div>
// //   </div>
// // )

// // export default function QRFormPage() {
// //   const router = useRouter()
// //   const [participants, setParticipants] = useState<Participant[]>([
// //     { name: '', number: '', tableNumber: DEFAULT_TABLE_NUMBER },
// //     { name: '', number: '', tableNumber: DEFAULT_TABLE_NUMBER }
// //   ])
// //   const [secretCode, setSecretCode] = useState('')
// //   const [isCouple, setIsCouple] = useState(false)
// //   const [qrData, setQrData] = useState<QRData | null>(null)
// //   const [pageState, setPageState] = useState<'loading' | 'form' | 'invitation' | 'error'>('loading')
// //   const [error, setError] = useState('')
// //   const [showSecretCode, setShowSecretCode] = useState(false)
// //   const [validated, setValidated] = useState(false)
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // Dans votre composant principal
// // useEffect(() => {
// //   if (pageState === 'invitation' && qrData?.id) {
// //     // Utilisez requestIdleCallback pour un meilleur timing
// //     const requestId = requestIdleCallback(() => {
// //       import('../../lib/tracking').then(({ trackLinkOpening }) => {
// //         trackLinkOpening(qrData.id);
// //       });
// //     }, { timeout: 2000 }); // Timeout de 2s max

// //     return () => cancelIdleCallback(requestId);
// //   }
// // }, [pageState, qrData?.id]);
// //   const checkLinkExists = useCallback(async (id: string): Promise<boolean> => {
// //     try {
// //       const { data, error } = await supabase
// //         .from('links')
// //         .select('id')
// //         .eq('id', id)
// //         .single()

// //       if (error || !data) return false
// //       return true
// //     } catch (error) {
// //       console.error('Error checking link:', error)
// //       return false
// //     }
// //   }, [])

// //  const verifyLink = useCallback(async (id: string): Promise<boolean> => {
// //   return await checkLinkExists(id)
// // }, [checkLinkExists])

// //   const normalizeParticipantsData = useCallback((participantsData: any): Participant[] => {
// //     try {
// //       if (Array.isArray(participantsData)) {
// //         return participantsData.map(p => ({
// //           name: p.name || '',
// //           number: p.number || '',
// //           tableNumber: p.tableNumber || DEFAULT_TABLE_NUMBER
// //         }))
// //       }
      
// //       if (typeof participantsData === 'string') {
// //         const parsed = JSON.parse(participantsData)
// //         if (Array.isArray(parsed)) {
// //           return parsed.map(p => ({
// //             name: p.name || '',
// //             number: p.number || '',
// //             tableNumber: p.tableNumber || DEFAULT_TABLE_NUMBER
// //           }))
// //         }
// //       }
      
// //       return []
// //     } catch (e) {
// //       console.error('Error normalizing participants data', e)
// //       return []
// //     }
// //   }, [])

// //   const fetchDataFromSupabase = useCallback(async (id: string): Promise<QRData | null> => {
// //   try {
// //     const { data, error, status } = await supabase
// //       .from('wedding_invitations')
// //       .select('*')
// //       .eq('id', id)
// //       .single()

// //     if (error && status !== 406) {
// //       throw new Error(`Database error: ${error.message}`)
// //     }

// //     if (!data) {
// //       return null
// //     }

// //     return {
// //       id: data.id,
// //       participants: normalizeParticipantsData(data.participants),
// //       timestamp: data.timestamp,
// //       isCouple: data.is_couple,
// //       secretCode: data.secret_code,
// //       validated: data.validated
// //     }
// //   } catch (error) {
// //     console.error('Error fetching data:', error)
// //     throw error
// //   }
// // }, [normalizeParticipantsData])

// // const saveToSupabase = useCallback(async (data: QRData): Promise<boolean> => {
// //   try {
// //     const { error } = await supabase
// //       .from('wedding_invitations')
// //       .upsert({
// //         id: data.id,
// //         participants: data.participants,
// //         timestamp: data.timestamp,
// //         is_couple: data.isCouple,
// //         secret_code: data.secretCode,
// //         validated: data.validated
// //       })

// //     if (error) throw error
// //     return true
// //   } catch (error) {
// //     console.error('Error saving data:', error)
// //     throw error
// //   }
// // }, [])
// //   const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
// //     let value = e.target.value.replace(/\D/g, '')
    
// //     if (value.length > 0 && !value.startsWith('0')) {
// //       value = '0' + value
// //     }
// //     value = value.slice(0, 10)
    
// //     setParticipants(prev => {
// //       const updated = [...prev]
// //       updated[index] = { ...updated[index], number: value }
// //       return updated
// //     })
// //   }, [])

// //   const handleSecretCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
// //     const value = e.target.value.replace(/\D/g, '').slice(0, 4)
// //     setSecretCode(value)
// //   }, [])

// // useEffect(() => {
// //   const searchParams = new URLSearchParams(window.location.search)
// //   const id = searchParams.get('id')
// //   const coupleParam = searchParams.get('couple')

// //   if (!id || !coupleParam) {
// //     setError('Ce lien est invalide. Veuillez utiliser le lien original.')
// //     setPageState('error')
// //     return
// //   }

// //   const isCouple = coupleParam === 'true'
  
// //   const verifyAndLoad = async () => {
// //     try {
// //       const isValid = await verifyLink(id)
// //       if (!isValid) {
// //         setError('Ce lien est invalide. Veuillez utiliser le lien original.')
// //         setPageState('error')
// //         return
// //       }

// //       setIsCouple(isCouple)
// //       const existingData = await fetchDataFromSupabase(id)
      
// //       if (existingData) {
// //         setParticipants(existingData.participants)
// //         setSecretCode(existingData.secretCode)
// //         setValidated(existingData.validated || false)
// //         setQrData(existingData)
// //         setPageState('invitation')
// //       } else {
// //         setPageState('form')
// //       }
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des données')
// //       setPageState('error')
// //     }
// //   }

// //   verifyAndLoad()
// // }, [fetchDataFromSupabase, verifyLink])



// // const handleSubmit = useCallback(async (e: React.FormEvent) => {
// //   e.preventDefault()
// //   setIsSubmitting(true)
  
// //   try {
// //     if (!participants[0].name || participants[0].number.length !== 10 || !participants[0].number.startsWith('0')) {
// //       throw new Error('Veuillez remplir tous les champs requis avec un numéro de téléphone valide commençant par 0 (10 chiffres)')
// //     }

// //     if (isCouple && !participants[1].name) {
// //       throw new Error('Veuillez remplir tous les champs pour le participant 2')
// //     }

// //     if (secretCode.length !== 4) {
// //       throw new Error('Le code secret doit comporter exactement 4 chiffres')
// //     }

// //     const searchParams = new URLSearchParams(window.location.search)
// //     const id = searchParams.get('id')
    
// //     if (!id) {
// //       throw new Error('Paramètre d\'invitation manquant')
// //     }

// //     const participantsToSave = isCouple 
// //       ? [
// //           { ...participants[0] },
// //           { ...participants[1], number: '' }
// //         ] 
// //       : [participants[0]]

// //     const newData: QRData = {
// //       id: id,
// //       participants: participantsToSave,
// //       timestamp: Date.now(),
// //       isCouple,
// //       secretCode,
// //       validated: false
// //     }
    
// //     const saveSuccess = await saveToSupabase(newData)
// //     if (!saveSuccess) throw new Error('Échec de l\'enregistrement des données')

// //     setQrData(newData)
// //     setPageState('invitation')
// //     setError('')
// //   } catch (err) {
// //     setError(err instanceof Error ? err.message : 'Échec de la soumission')
// //   } finally {
// //     setIsSubmitting(false)
// //   }
// // }, [isCouple, participants, secretCode, saveToSupabase])

// //   const handleParticipantChange = useCallback((index: number, field: keyof Participant, value: string) => {
// //     if (field === 'number') return
    
// //     setParticipants(prev => {
// //       const updated = [...prev]
// //       updated[index] = { ...updated[index], [field]: value }
// //       return updated
// //     })
// //   }, [])

// //   const toggleShowSecretCode = useCallback(() => {
// //     setShowSecretCode(prev => !prev)
// //   }, [])

// //   const handleRetry = useCallback(() => {
// //     setPageState('loading')
// //     setError('')
// //     window.location.reload()
// //   }, [])

// //   if (pageState === 'loading') {
// //     return <LoadingScreen />
// //   }

// //   if (pageState === 'error') {
// //     return <ErrorScreen error={error} onRetry={handleRetry} />
// //   }

// //   if (pageState === 'invitation' && qrData) {
// //     return <WeddingInvitationCard qrData={qrData} />
// //   }

// //   return (
// //     <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
// //             <img src='rings.png' className='absolute z-50 top-[5%] right-[10%] translate-x-[-50%] translate-y-[-50%] w-[60px]'/>
// //       <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200">
// //         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute -top-20 -left-20 w-40 opacity-70" />
// //         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute top-10 -right-20 w-40 opacity-70" />

// //         <div className="p-6">
// //           <div className="text-center mb-6">
// //             <h1 className="text-3xl  serifo font-serif font-bold text-brown-700 mb-2">
// //               Formulaire d'Invitation
// //             </h1>
// //             <p className="text-gray-600">
// //               Veuillez remplir vos informations pour recevoir votre invitation
// //             </p>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 {isCouple ? 'Votre nom complet' : 'Votre nom complet'}
// //               </label>
// //               <input
// //                 type="text"
// //                 className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 value={participants[0].name}
// //                 onChange={(e) => handleParticipantChange(0, 'name', e.target.value)}
// //                 required
// //                 placeholder="Votre nom"
// //               />
// //             </div>

// //             <div>
// //               <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
// //                 <FiPhone className="mr-2" />
// //                 Numéro de téléphone
// //               </label>
// //               <input
// //                 type="tel"
// //                 className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                 value={participants[0].number}
// //                 onChange={(e) => handleNumberChange(e, 0)}
// //                 required
// //                 pattern="0\d{9}"
// //                 inputMode="numeric"
// //                 maxLength={10}
// //                 placeholder="0XXXXXXXXX"
// //               />
// //               {participants[0].number.length > 0 && !participants[0].number.startsWith('0') && (
// //                 <p className="text-xs text-red-500 mt-1">Le numéro doit commencer par 0</p>
// //               )}
// //               {participants[0].number.length !== 10 && participants[0].number.length > 0 && (
// //                 <p className="text-xs text-red-500 mt-1">Le numéro doit comporter 10 chiffres</p>
// //               )}
// //             </div>

// //             {isCouple && (
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Nom de votre partenaire
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
// //                   value={participants[1].name}
// //                   onChange={(e) => handleParticipantChange(1, 'name', e.target.value)}
// //                   required={isCouple}
// //                   placeholder="Nom du partenaire"
// //                 />
// //               </div>
// //             )}

// //             <div>
// //               <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
// //                 <FiKey className="mr-2" />
// //                 Code secret (4 chiffres)
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type={showSecretCode ? "text" : "password"}
// //                   className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
// //                   value={secretCode}
// //                   onChange={handleSecretCodeChange}
// //                   maxLength={4}
// //                   pattern="\d{4}"
// //                   inputMode="numeric"
// //                   required
// //                   placeholder="****"
// //                 />
// //                 <button
// //                   type="button"
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-700"
// //                   onClick={toggleShowSecretCode}
// //                 >
// //                   {showSecretCode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
// //                 </button>
// //               </div>
// //               <p className="text-xs text-gray-500 mt-1 ">Choisissez un code secret de 4 chiffres , Retenez le ,il sera utilisé en cas de perte de votre code QR ou téléphone ,etc.( Le choix vous appartient du code secret , le plus important c'est le retenir et pas le partager )</p>
// //             </div>

// //             {error && (
// //               <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
// //                 <p>{error}</p>
// //               </div>
// //             )}

// //             <button
// //               type="submit"
// //               className="w-full bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   En cours...
// //                 </>
// //               ) : (
// //                 'Obtenir mon invitation'
// //               )}
// //             </button>
// //           </form>

// //           <p className="text-xs text-gray-500 mt-4 text-center">
// //             Vos informations ne seront utilisées que pour cette invitation et ne seront pas partagées.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client' 

// import { useState, useEffect, useCallback } from 'react'
// import { useRouter } from 'next/navigation'
// import { QRCodeSVG } from 'qrcode.react'
// import CryptoJS from 'crypto-js'
// import { FiUser, FiUsers, FiX, FiCheck, FiEye, FiEyeOff, FiKey, FiPhone, FiAlertTriangle, FiGlobe } from 'react-icons/fi'
// import { FaArrowDown } from 'react-icons/fa'
// import { createClient } from '@supabase/supabase-js'
// import type { Metadata } from 'next';

// // Configuration Supabase
// const supabaseUrl = 'https://htotfyduudyoephuixzu.supabase.co'
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
// const supabase = createClient(supabaseUrl, supabaseAnonKey)

// const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'votre_cle_secrete_stable_123!@#'
// const DEFAULT_TABLE_NUMBER = ''

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
//   secretCode: string
//   validated: boolean
// }

// const trackLinkOpening = async (linkId: string) => {
//   if (typeof window === 'undefined') return;

//   try {
//     const alreadyTracked = sessionStorage.getItem(`tracked_${linkId}`);
//     if (alreadyTracked) return;

//     const userAgent = navigator.userAgent;
//     const referrer = document.referrer || 'direct';
    
//     const { error } = await supabase.rpc('increment_link_opening', {
//       link_id: linkId,
//       user_agent: userAgent,
//       referrer: referrer
//     });
    
//     if (!error) {
//       sessionStorage.setItem(`tracked_${linkId}`, 'true');
//     }
//   } catch (error) {
//     console.error('Tracking failed:', error);
//   }
// }

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

// const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
//   const [language, setLanguage] = useState<'fr' | 'en'>('fr')
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
//     <div className="bg-pink-50 min-h-screen flex items-center justify-center">
//       <div className="relative max-w-lg w-full overflow-hidden bg-pink-50 text-center text-brown-700">
//         {/* Bouton de langue */}
//         <button 
//           onClick={() => setLanguage(lang => lang === 'fr' ? 'en' : 'fr')}
//           className="absolute top-4 right-4 z-50 bg-pink-100 hover:bg-pink-200 text-pink-800 px-3 py-1 rounded-full flex items-center text-sm transition-colors"
//         >
//           <FiGlobe className="mr-2" />
//           {language === 'fr' ? 'English' : 'Français'}
//         </button>

//         {/* Floral Decorations */}
//         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute w-[270px] -top-[146px] -left-[78px]" />
//         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute w-[165px] top-[26px] -right-[190px]" />
//         <img src="/wed-day.png" alt="Wedding Day" loading="lazy" className="absolute top-[2%] w-[112px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
//         <img src="/bottom-left-flower.png" alt="Bottom Left Flower" loading="lazy" className="absolute w-[290px] -bottom-[149px] -left-[130px]" />
//         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute bottom-0 right-0 w-32" />
//         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[550px] -left-[27px] w-[83px]" />
//         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[530px] left-[17px] w-[43px]" />
        
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
//             {language === 'fr' ? 'Vous êtes invités' : 'You are invited'}
//           </p>
//         </div>

//         <p className="mt-2 text-gray-600 text-xl">
//           {language === 'fr' 
//             ? 'La réception des invités commencera dès 19h. Merci de vous présenter à la salle au minimum une heure avant l\'heure prévue.' 
//             : 'Guest reception will start at 7pm. Please arrive at the venue at least one hour before the scheduled time.'}
//         </p>
        
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
//                   {language === 'fr' 
//                     ? 'Veuillez capturer ce code si vous avez déjà été appelée ou notifiée. Ne le partagez pas, sinon il sera invalidé. Pour toute question, un numéro de contact est disponible dans le lien fourni.' 
//                     : 'Please capture this code if you have already been called or notified. Do not share it, otherwise it will be invalidated. For any questions, a contact number is available in the provided link.'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Couple Photo */}
//         <div className="my-6 relative">
//           <div className="relative w-[260px] h-[260px] mx-auto">
//             <svg
//               viewBox="0 0 260 260"
//               className="absolute top-0 left-0 w-full h-full z-10"
//             >
//               <defs>
//                 <clipPath id="hexClip">
//                   <polygon points="130,10 240,65 240,195 130,250 20,195 20,65" />
//                 </clipPath>
//               </defs>
//               <image
//                 href="/danz.png"
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
//             <img src="/image-photo.png" alt="Couple" loading="lazy" className="absolute top-[50%] z-50 translate-y-[3%] right-[50%] translate-x-[50%] w-[195px]" />
//           </div>
//         </div>
        
//         {/* Wedding Title */}
//         <h2 className="text-sm uppercase tracking-widest text-gray-500">Save the date</h2>
        
//         {/* Names */}
//         <div className="mt-4 flex mx-auto flex-col w-max serifo gap-3">
//           <h3 className="text-3xl font-semibold text-brown-700">Christelle</h3>
//           <span className="text-lg font-bold text-blue-800">💖</span>
//           <h3 className="text-3xl font-semibold text-brown-700">Vusi</h3>
//         </div>
        
//         {/* Invitation Message */}
//         <p className="my-4 px-4 text-lg text-gray-800">
//           {language === 'fr' ? (
//             <>
//               C'est avec une immense joie que nous vous convions à partager le plus beau jour de notre vie, alors que nous unissons nos familles.
//               <br /><br />
//               La célébration se poursuivra autour d'un repas; Préparez vos sourires, votre joie, et surtout vos pas de danse...
//               car l'amour sera célébré en musique, jusqu'au bout de la nuit, sous les couleurs vert olive blanc et argenté.
//               <br /><br />
//               <strong>Si vous souhaitez nous honorer, les cadeaux en espèces seront les bienvenus, comme tel est notre souhait.</strong>
//             </>
//           ) : (
//             <>
//               It is with great joy that we invite you to share the most beautiful day of our lives as we unite our families.
//               <br /><br />
//               The celebration will continue around a meal; Prepare your smiles, your joy, and especially your dance steps...
//               because love will be celebrated in music, until the end of the night, under the colors olive green, white and silver.
//               <br /><br />
//               <strong>If you wish to honor us, cash gifts will be welcome, as such is our wish.</strong>
//             </>
//           )}
//         </p>
//         <p className="my-4 px-4 text-gray-600">
//           {language === 'fr' ? 'PROGRAMME DE MARIAGE' : 'WEDDING PROGRAM'}
//         </p>
       
//         {/* Date and Venue */}
//         <div className="text-center space-y-4 px-2">
//           <p className="text-2xl font-serif text-blue-800 serifo">
//             {language === 'fr' ? 'Vendredi 29 Août 2025' : 'Friday August 29, 2025'}
//           </p>
//           <div className="flex items-center justify-center gap-2">
//             <img src='/certificate.png' className='size-7 rotate-12' loading="lazy" />
//              <p className="text-gray-600 serifo">
//                {language === 'fr' ? 'à 9h30' : 'at 9:30 AM'}
//              </p>
//           </div>
//           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
//           <p className="text-gray-500 text-lg">
//             {language === 'fr' 
//               ? 'Mariage Civil au Chapiteau Royal, Avenue des Chutes coin Kambove Réf: Ministère du travail Haut-Katanga' 
//               : 'Civil Wedding at Royal Marquee, Avenue des Chutes corner Kambove Ref: Ministry of Labor Haut-Katanga'}
//           </p>

//           <p className="text-2xl font-serif text-blue-800 serifo">
//             {language === 'fr' ? 'Samedi 30 Août 2025' : 'Saturday August 30, 2025'}
//           </p>
//           <div className="flex items-center justify-center gap-2">
//             <img src='/rings.png' className='size-8' loading="lazy" />
//             <p className="text-gray-600 serifo">
//               {language === 'fr' ? 'à 14h00' : 'at 2:00 PM'}
//             </p>
//           </div>
//           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
//           <p className="text-gray-500 text-lg">
//             {language === 'fr' 
//               ? 'Mariage Religieux au Chapiteau Royal, Avenue des Chutes coin Kambove Réf: Ministère du travail Haut-Katanga' 
//               : 'Religious Wedding at Royal Marquee, Avenue des Chutes corner Kambove Ref: Ministry of Labor Haut-Katanga'}
//           </p>

//           <div className="flex items-center justify-center gap-2">
//             <img src='/glass.png' className='size-8' loading="lazy" />
//             <p className="text-gray-600 serifo">
//               {language === 'fr' ? 'vers 20h00' : 'around 8:00 PM'}
//             </p>
//           </div>
//           <FaArrowDown size={12} className='block mx-auto animate-bounce' />
//         </div>
        
//         {/* Reception */}
//         <div className="text-center px-2">
//           <p className="text-2xl serifo font-serif text-blue-800 mt-2">
//             {language === 'fr' ? 'Soirée dansante' : 'Dance party'}
//           </p>
//           <p className="text-gray-600 px-4 text-lg">
//             {language === 'fr' 
//               ? 'Chapiteau Royal, Avenue des Chutes coin Kambove' 
//               : 'Royal Marquee, Avenue des Chutes corner Kambove'}
//           </p>
//         </div>
//         <div className="mt-8 text-center">
//           <p className="text-gray-900 text-lg">
//             {language === 'fr' ? 'Avec toute notre joie,' : 'With all our joy,'}
//           </p>
//           <p className="mt-2 text-gray-600 text-xl">
//             {language === 'fr' 
//               ? 'La famille de Christelle et la famille de Vusi' 
//               : 'Christelle\'s family and Vusi\'s family'}
//           </p>
//         </div>
        
//         {/* Signature */}
//         <p className="text-gray-500 text-sm mt-2 pb-6">
//           {formatFrenchDate(qrData.timestamp)}
//         </p>
//       </div>
//     </div>
//   )
// }

// const LoadingScreen = () => (
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

// const ErrorScreen = ({ error, onRetry }: { error: string, onRetry: () => void }) => (
//   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
//     <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
//       <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//         <FiX className="h-6 w-6 text-red-600" />
//       </div>
//       <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
//       <p className="text-gray-600 mb-6">{error}</p>
//       <button
//         onClick={onRetry}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//       >
//         Rafraîchir la page
//       </button>
//     </div>
//   </div>
// )

// export default function QRFormPage() {
//   const router = useRouter()
//   const [participants, setParticipants] = useState<Participant[]>([
//     { name: '', number: '', tableNumber: DEFAULT_TABLE_NUMBER },
//     { name: '', number: '', tableNumber: DEFAULT_TABLE_NUMBER }
//   ])
//   const [secretCode, setSecretCode] = useState('')
//   const [isCouple, setIsCouple] = useState(false)
//   const [qrData, setQrData] = useState<QRData | null>(null)
//   const [pageState, setPageState] = useState<'loading' | 'form' | 'invitation' | 'error'>('loading')
//   const [error, setError] = useState('')
//   const [showSecretCode, setShowSecretCode] = useState(false)
//   const [validated, setValidated] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   useEffect(() => {
//     if (pageState === 'invitation' && qrData?.id) {
//       const requestId = requestIdleCallback(() => {
//         trackLinkOpening(qrData.id);
//       }, { timeout: 2000 });

//       return () => cancelIdleCallback(requestId);
//     }
//   }, [pageState, qrData?.id]);

//   const checkLinkExists = useCallback(async (id: string): Promise<boolean> => {
//     try {
//       const { data, error } = await supabase
//         .from('links')
//         .select('id')
//         .eq('id', id)
//         .single()

//       if (error || !data) return false
//       return true
//     } catch (error) {
//       console.error('Error checking link:', error)
//       return false
//     }
//   }, [])

//   const verifyLink = useCallback(async (id: string): Promise<boolean> => {
//     return await checkLinkExists(id)
//   }, [checkLinkExists])

//   const normalizeParticipantsData = useCallback((participantsData: any): Participant[] => {
//     try {
//       if (Array.isArray(participantsData)) {
//         return participantsData.map(p => ({
//           name: p.name || '',
//           number: p.number || '',
//           tableNumber: p.tableNumber || DEFAULT_TABLE_NUMBER
//         }))
//       }
      
//       if (typeof participantsData === 'string') {
//         const parsed = JSON.parse(participantsData)
//         if (Array.isArray(parsed)) {
//           return parsed.map(p => ({
//             name: p.name || '',
//             number: p.number || '',
//             tableNumber: p.tableNumber || DEFAULT_TABLE_NUMBER
//           }))
//         }
//       }
      
//       return []
//     } catch (e) {
//       console.error('Error normalizing participants data', e)
//       return []
//     }
//   }, [])

//   const fetchDataFromSupabase = useCallback(async (id: string): Promise<QRData | null> => {
//     try {
//       const { data, error, status } = await supabase
//         .from('wedding_invitations')
//         .select('*')
//         .eq('id', id)
//         .single()

//       if (error && status !== 406) {
//         throw new Error(`Database error: ${error.message}`)
//       }

//       if (!data) {
//         return null
//       }

//       return {
//         id: data.id,
//         participants: normalizeParticipantsData(data.participants),
//         timestamp: data.timestamp,
//         isCouple: data.is_couple,
//         secretCode: data.secret_code,
//         validated: data.validated
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error)
//       throw error
//     }
//   }, [normalizeParticipantsData])

//   const saveToSupabase = useCallback(async (data: QRData): Promise<boolean> => {
//     try {
//       const { error } = await supabase
//         .from('wedding_invitations')
//         .upsert({
//           id: data.id,
//           participants: data.participants,
//           timestamp: data.timestamp,
//           is_couple: data.isCouple,
//           secret_code: data.secretCode,
//           validated: data.validated
//         })

//       if (error) throw error
//       return true
//     } catch (error) {
//       console.error('Error saving data:', error)
//       throw error
//     }
//   }, [])

//   const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     let value = e.target.value.replace(/\D/g, '')
    
//     if (value.length > 0 && !value.startsWith('0')) {
//       value = '0' + value
//     }
//     value = value.slice(0, 10)
    
//     setParticipants(prev => {
//       const updated = [...prev]
//       updated[index] = { ...updated[index], number: value }
//       return updated
//     })
//   }, [])

//   const handleSecretCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 4)
//     setSecretCode(value)
//   }, [])

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search)
//     const id = searchParams.get('id')
//     const coupleParam = searchParams.get('couple')

//     if (!id || !coupleParam) {
//       setError('Ce lien est invalide. Veuillez utiliser le lien original.')
//       setPageState('error')
//       return
//     }

//     const isCouple = coupleParam === 'true'
    
//     const verifyAndLoad = async () => {
//       try {
//         const isValid = await verifyLink(id)
//         if (!isValid) {
//           setError('Ce lien est invalide. Veuillez utiliser le lien original.')
//           setPageState('error')
//           return
//         }

//         setIsCouple(isCouple)
//         const existingData = await fetchDataFromSupabase(id)
        
//         if (existingData) {
//           setParticipants(existingData.participants)
//           setSecretCode(existingData.secretCode)
//           setValidated(existingData.validated || false)
//           setQrData(existingData)
//           setPageState('invitation')
//         } else {
//           setPageState('form')
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des données')
//         setPageState('error')
//       }
//     }

//     verifyAndLoad()
//   }, [fetchDataFromSupabase, verifyLink])

//   const handleSubmit = useCallback(async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     try {
//       if (!participants[0].name || participants[0].number.length !== 10 || !participants[0].number.startsWith('0')) {
//         throw new Error('Veuillez remplir tous les champs requis avec un numéro de téléphone valide commençant par 0 (10 chiffres)')
//       }

//       if (isCouple && !participants[1].name) {
//         throw new Error('Veuillez remplir tous les champs pour le participant 2')
//       }

//       if (secretCode.length !== 4) {
//         throw new Error('Le code secret doit comporter exactement 4 chiffres')
//       }

//       const searchParams = new URLSearchParams(window.location.search)
//       const id = searchParams.get('id')
      
//       if (!id) {
//         throw new Error('Paramètre d\'invitation manquant')
//       }

//       const participantsToSave = isCouple 
//         ? [
//             { ...participants[0] },
//             { ...participants[1], number: '' }
//           ] 
//         : [participants[0]]

//       const newData: QRData = {
//         id: id,
//         participants: participantsToSave,
//         timestamp: Date.now(),
//         isCouple,
//         secretCode,
//         validated: false
//       }
      
//       const saveSuccess = await saveToSupabase(newData)
//       if (!saveSuccess) throw new Error('Échec de l\'enregistrement des données')

//       setQrData(newData)
//       setPageState('invitation')
//       setError('')
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Échec de la soumission')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }, [isCouple, participants, secretCode, saveToSupabase])

//   const handleParticipantChange = useCallback((index: number, field: keyof Participant, value: string) => {
//     if (field === 'number') return
    
//     setParticipants(prev => {
//       const updated = [...prev]
//       updated[index] = { ...updated[index], [field]: value }
//       return updated
//     })
//   }, [])

//   const toggleShowSecretCode = useCallback(() => {
//     setShowSecretCode(prev => !prev)
//   }, [])

//   const handleRetry = useCallback(() => {
//     setPageState('loading')
//     setError('')
//     window.location.reload()
//   }, [])

//   if (pageState === 'loading') {
//     return <LoadingScreen />
//   }

//   if (pageState === 'error') {
//     return <ErrorScreen error={error} onRetry={handleRetry} />
//   }

//   if (pageState === 'invitation' && qrData) {
//     return <WeddingInvitationCard qrData={qrData} />
//   }

//   return (
//     <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
//       <img src='rings.png' className='absolute z-50 top-[5%] right-[10%] translate-x-[-50%] translate-y-[-50%] w-[60px]'/>
//       <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200">
//         <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute -top-20 -left-20 w-40 opacity-70" />
//         <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute top-10 -right-20 w-40 opacity-70" />

//         <div className="p-6">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-serif font-bold text-brown-700 mb-2">
//               Formulaire d'Invitation
//             </h1>
//             <p className="text-gray-600">
//               Veuillez remplir vos informations pour recevoir votre invitation
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {isCouple ? 'Votre nom complet' : 'Votre nom complet'}
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 value={participants[0].name}
//                 onChange={(e) => handleParticipantChange(0, 'name', e.target.value)}
//                 required
//                 placeholder="Votre nom"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                 <FiPhone className="mr-2" />
//                 Numéro de téléphone
//               </label>
//               <input
//                 type="tel"
//                 className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 value={participants[0].number}
//                 onChange={(e) => handleNumberChange(e, 0)}
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
//                   onChange={(e) => handleParticipantChange(1, 'name', e.target.value)}
//                   required={isCouple}
//                   placeholder="Nom du partenaire"
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                 <FiKey className="mr-2" />
//                 Code secret (4 chiffres)
//               </label>
//               <div className="relative">
//                 <input
//                   type={showSecretCode ? "text" : "password"}
//                   className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
//                   value={secretCode}
//                   onChange={handleSecretCodeChange}
//                   maxLength={4}
//                   pattern="\d{4}"
//                   inputMode="numeric"
//                   required
//                   placeholder="****"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-700"
//                   onClick={toggleShowSecretCode}
//                 >
//                   {showSecretCode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Choisissez un code secret de 4 chiffres, Retenez le, il sera utilisé en cas de perte de votre code QR ou téléphone, etc.
//               </p>
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

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { FiUser, FiUsers, FiX, FiCheck, FiEye, FiEyeOff, FiKey, FiPhone, FiAlertTriangle, FiGlobe } from 'react-icons/fi'
import { FaArrowDown } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = 'https://htotfyduudyoephuixzu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const DEFAULT_TABLE_NUMBER = ''

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
  secretCode: string
  validated: boolean
}

const trackLinkOpening = async (linkId: string) => {
  if (typeof window === 'undefined') return;

  try {
    const alreadyTracked = sessionStorage.getItem(`tracked_${linkId}`);
    if (alreadyTracked) return;

    const userAgent = navigator.userAgent;
    const referrer = document.referrer || 'direct';
    
    const { error } = await supabase.rpc('increment_link_opening', {
      link_id: linkId,
      user_agent: userAgent,
      referrer: referrer
    });
    
    if (!error) {
      sessionStorage.setItem(`tracked_${linkId}`, 'true');
    }
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}

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

const WeddingInvitationCard = ({ qrData }: { qrData: QRData }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const [showQR, setShowQR] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const qrContent = {
    participants: qrData.participants,
    isCouple: qrData.isCouple,
    tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
    validated: qrData.validated,
    timestamp: qrData.timestamp
  }

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    if (newCount >= 3) {
      setShowQR(true)
    }
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="relative max-w-lg w-full overflow-hidden bg-pink-50 text-center text-brown-700">
        {/* Bouton de langue */}
        <button 
          onClick={() => setLanguage(lang => lang === 'fr' ? 'en' : 'fr')}
          className="absolute top-4 right-4 z-50 bg-pink-100 hover:bg-pink-200 text-pink-800 px-3 py-1 rounded-full flex items-center text-sm transition-colors"
        >
          <FiGlobe className="mr-2" />
          {language === 'fr' ? 'English' : 'Français'}
        </button>

        {/* Floral Decorations */}
        <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute w-[270px] -top-[146px] -left-[78px]" />
        <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute w-[165px] top-[26px] -right-[190px]" />
        <img src="/wed-day.png" alt="Wedding Day" loading="lazy" className="absolute top-[2%] w-[112px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
           <img src="/bottom-left-flower.png" alt="Bottom Left Flower" loading="lazy" className="absolute w-[290px] -bottom-[149px] -left-[130px]" />
         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute bottom-0 right-0 w-32" />
         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[550px] -left-[27px] w-[83px]" />
         <img src="/bottom-right-flower.png" alt="Bottom Right Flower" loading="lazy" className="absolute top-[530px] left-[17px] w-[43px]" />
        
        
        {/* Participant Name */}
        <div className="mt-16 pt-7">
          <h1 className="text-2xl font-bold text-brown-700">
            {qrData.participants[0].name}
          </h1>
          {qrData.isCouple && qrData.participants[1].name && (
            <h1 className="text-2xl font-bold text-brown-700">
              & {qrData.participants[1].name}
            </h1>
          )}
          <p className="text-gray-500 mt-2">
            {language === 'fr' ? 'Vous êtes invités' : 'You are invited'}
          </p>
        </div>

        {/* Couple Photo */}
        <div className="my-6 relative">
          <div className="relative w-[260px] h-[260px] mx-auto">
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
                href="https://i.ibb.co/5WqS64p9/couple-picture-3.webp"
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
                stroke="#f3cfc9"
                strokeWidth="4"
              />
            </svg>
            <img src="/image-photo.png" alt="Couple" loading="lazy" className="absolute top-[66%] z-50 translate-y-[3%] right-[50%] translate-x-[50%] w-[135px]" />
          </div>
        </div>
        
        {/* Wedding Title */}
        <h2 className="text-sm uppercase tracking-widest text-gray-500">Save the date</h2>
        
        {/* Names */}
        <div className="mt-4 flex mx-auto flex-col w-max serifo gap-3">
          <h3 className="text-3xl font-semibold text-brown-700">Christelle</h3>
          <span className="text-lg font-bold text-blue-800">💖</span>
          <h3 className="text-3xl font-semibold text-brown-700">Vusi</h3>
        </div>
        
        {/* Invitation Message */}
        <div className="my-4 px-4 text-lg text-gray-800">
          {language === 'fr' ? (
            <>
              C'est avec une immense joie que nous vous convions à partager le plus beau jour de notre vie, alors que nous unissons nos familles.
              <br /><br />
              La célébration se poursuivra autour d'un repas; Préparez vos sourires, votre joie, et surtout vos pas de danse...
              car l'amour sera célébré en musique, jusqu'au bout de la nuit, sous les couleurs vert olive blanc et argenté.
              <br /><br />
              <strong>Si vous souhaitez nous honorer, les cadeaux en espèces seront les bienvenus, comme tel est notre souhait.</strong>
            </>
          ) : (
            <>
              It is with great joy that we invite you to share the most beautiful day of our lives as we unite our families.
              <br /><br />
              The celebration will continue around a meal; Prepare your smiles, your joy, and especially your dance steps...
              because love will be celebrated in music, until the end of the night, under the colors olive green, white and silver.
              <br /><br />
              <strong>If you wish to honor us, cash gifts will be welcome, as such is our wish.</strong>
            </>
          )}
        </div>

        <p className="my-4 px-4 text-gray-600">
          {language === 'fr' ? 'PROGRAMME DE MARIAGE' : 'WEDDING PROGRAM'}
        </p>
       
        {/* Date and Venue */}
        <div className="text-center space-y-4 px-2">
          <p className="text-2xl font-serif text-blue-800 serifo">
            {language === 'fr' ? 'Vendredi 29 Août 2025' : 'Friday August 29, 2025'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <img src='/certificate.png' className='size-7 rotate-12' loading="lazy" />
            <p className="text-gray-600 serifo">
              {language === 'fr' ? 'à 9h30' : 'at 9:30 AM'}
            </p>
          </div>
          <FaArrowDown size={12} className='block mx-auto animate-bounce' />
          <p className="text-gray-500 text-lg">
            {language === 'fr' 
              ? 'Mariage Civil au Chapiteau Royal, Avenue des Chutes coin Kambove Réf: Ministère du travail Haut-Katanga' 
              : 'Civil Wedding at Royal Marquee, Avenue des Chutes corner Kambove Ref: Ministry of Labor Haut-Katanga'}
          </p>

          <p className="text-2xl font-serif text-blue-800 serifo">
            {language === 'fr' ? 'Samedi 30 Août 2025' : 'Saturday August 30, 2025'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <img src='/rings.png' className='size-8' loading="lazy" />
            <p className="text-gray-600 serifo">
              {language === 'fr' ? 'à 14h00' : 'at 2:00 PM'}
            </p>
          </div>
          <FaArrowDown size={12} className='block mx-auto animate-bounce' />
          <p className="text-gray-500 text-lg">
            {language === 'fr' 
              ? 'Mariage Religieux au Chapiteau Royal, Avenue des Chutes coin Kambove Réf: Ministère du travail Haut-Katanga' 
              : 'Religious Wedding at Royal Marquee, Avenue des Chutes corner Kambove Ref: Ministry of Labor Haut-Katanga'}
          </p>

          <div className="flex items-center justify-center gap-2">
            <img src='/glass.png' className='size-8' loading="lazy" />
            <p className="text-gray-600 serifo">
              {language === 'fr' ? 'vers 20h00' : 'around 8:00 PM'}
            </p>
          </div>
          <FaArrowDown size={12} className='block mx-auto animate-bounce' />
        </div>
        
        {/* Reception */}
        <div className="text-center px-2">
          <p className="text-2xl serifo font-serif text-blue-800 mt-2">
            {language === 'fr' ? 'Soirée dansante' : 'Dance party'}
          </p>
          <p className="text-gray-600 px-4 text-lg">
            {language === 'fr' 
              ? 'Chapiteau Royal, Avenue des Chutes coin Kambove' 
              : 'Royal Marquee, Avenue des Chutes corner Kambove'}
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-900 text-lg">
            {language === 'fr' ? 'Avec toute notre joie,' : 'With all our joy,'}
          </p>
          <p className="mt-2 text-gray-600 text-xl">
            {language === 'fr' 
              ? 'La famille de Christelle et la famille de Vusi' 
              : 'Christelle\'s family and Vusi\'s family'}
          </p>
        </div>
        
        {/* Signature */}
        <p className="text-gray-500 text-sm mt-2">
          {formatFrenchDate(qrData.timestamp)}
        </p>

        {/* QR Code Section - Moved to bottom */}
        <div className="mt-10 mb-6 px-4">
          <div className="border-2 border-red-400 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4 mb-4">
            <div className="text-red-500 block mt-1">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <p className="text-red-700 text-sm">
                {language === 'fr' 
                  ? 'Veuillez capturer ce code si vous avez déjà été appelée ou notifiée. Ne le partagez pas, sinon il sera invalidé.' 
                  : 'Please capture this code if you have already been called or notified. Do not share it, otherwise it will be invalidated.'}
              </p>
            </div>
          </div>

          <div className="grid mx-auto rounded-xl p-3 border w-max place-items-center relative">
            <div className={showQR ? "" : "blur-lg"}>
              <QRCodeSVG
                value={JSON.stringify(qrContent)}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#000000"
              />
            </div>
          </div>

          <button 
            onClick={handleClick}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
            disabled={showQR}
          >
            {language === 'fr' 
              ? (showQR ? 'QR Code visible' : 'Cliquez 3 fois pour afficher') 
              : (showQR ? 'QR Code visible' : 'Click 3 times to show')}
          </button>
        </div>
      </div>
    </div>
  )
}

const LoadingScreen = () => (
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

const ErrorScreen = ({ error, onRetry }: { error: string, onRetry: () => void }) => (
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

export default function QRFormPage() {
  const router = useRouter()
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', number: '', tableNumber: DEFAULT_TABLE_NUMBER },
    { name: '', number: '', tableNumber: DEFAULT_TABLE_NUMBER }
  ])
  const [secretCode, setSecretCode] = useState('')
  const [isCouple, setIsCouple] = useState(false)
  const [qrData, setQrData] = useState<QRData | null>(null)
  const [pageState, setPageState] = useState<'loading' | 'form' | 'invitation' | 'error'>('loading')
  const [error, setError] = useState('')
  const [showSecretCode, setShowSecretCode] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (pageState === 'invitation' && qrData?.id) {
      const requestId = requestIdleCallback(() => {
        trackLinkOpening(qrData.id);
      }, { timeout: 2000 });

      return () => cancelIdleCallback(requestId);
    }
  }, [pageState, qrData?.id]);

  const checkLinkExists = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('id')
        .eq('id', id)
        .single()

      if (error || !data) return false
      return true
    } catch (error) {
      console.error('Error checking link:', error)
      return false
    }
  }, [])

  const verifyLink = useCallback(async (id: string): Promise<boolean> => {
    return await checkLinkExists(id)
  }, [checkLinkExists])

  const normalizeParticipantsData = useCallback((participantsData: any): Participant[] => {
    try {
      if (Array.isArray(participantsData)) {
        return participantsData.map(p => ({
          name: p.name || '',
          number: p.number || '',
          tableNumber: p.tableNumber || DEFAULT_TABLE_NUMBER
        }))
      }
      
      if (typeof participantsData === 'string') {
        const parsed = JSON.parse(participantsData)
        if (Array.isArray(parsed)) {
          return parsed.map(p => ({
            name: p.name || '',
            number: p.number || '',
            tableNumber: p.tableNumber || DEFAULT_TABLE_NUMBER
          }))
        }
      }
      
      return []
    } catch (e) {
      console.error('Error normalizing participants data', e)
      return []
    }
  }, [])

  const fetchDataFromSupabase = useCallback(async (id: string): Promise<QRData | null> => {
    try {
      const { data, error, status } = await supabase
        .from('wedding_invitations')
        .select('*')
        .eq('id', id)
        .single()

      if (error && status !== 406) {
        throw new Error(`Database error: ${error.message}`)
      }

      if (!data) {
        return null
      }

      return {
        id: data.id,
        participants: normalizeParticipantsData(data.participants),
        timestamp: data.timestamp,
        isCouple: data.is_couple,
        secretCode: data.secret_code,
        validated: data.validated
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }, [normalizeParticipantsData])

  const saveToSupabase = useCallback(async (data: QRData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('wedding_invitations')
        .upsert({
          id: data.id,
          participants: data.participants,
          timestamp: data.timestamp,
          is_couple: data.isCouple,
          secret_code: data.secretCode,
          validated: data.validated
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error saving data:', error)
      throw error
    }
  }, [])

  const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value.length > 0 && !value.startsWith('0')) {
      value = '0' + value
    }
    value = value.slice(0, 10)
    
    setParticipants(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], number: value }
      return updated
    })
  }, [])

  const handleSecretCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setSecretCode(value)
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const coupleParam = searchParams.get('couple')

    if (!id || !coupleParam) {
      setError('Ce lien est invalide. Veuillez utiliser le lien original.')
      setPageState('error')
      return
    }

    const isCouple = coupleParam === 'true'
    
    const verifyAndLoad = async () => {
      try {
        const isValid = await verifyLink(id)
        if (!isValid) {
          setError('Ce lien est invalide. Veuillez utiliser le lien original.')
          setPageState('error')
          return
        }

        setIsCouple(isCouple)
        const existingData = await fetchDataFromSupabase(id)
        
        if (existingData) {
          setParticipants(existingData.participants)
          setSecretCode(existingData.secretCode)
          setValidated(existingData.validated || false)
          setQrData(existingData)
          setPageState('invitation')
        } else {
          setPageState('form')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des données')
        setPageState('error')
      }
    }

    verifyAndLoad()
  }, [fetchDataFromSupabase, verifyLink])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (!participants[0].name || participants[0].number.length !== 10 || !participants[0].number.startsWith('0')) {
        throw new Error('Veuillez remplir tous les champs requis avec un numéro de téléphone valide commençant par 0 (10 chiffres)')
      }

      if (isCouple && !participants[1].name) {
        throw new Error('Veuillez remplir tous les champs pour le participant 2')
      }

      if (secretCode.length !== 4) {
        throw new Error('Le code secret doit comporter exactement 4 chiffres')
      }

      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get('id')
      
      if (!id) {
        throw new Error('Paramètre d\'invitation manquant')
      }

      const participantsToSave = isCouple 
        ? [
            { ...participants[0] },
            { ...participants[1], number: '' }
          ] 
        : [participants[0]]

      const newData: QRData = {
        id: id,
        participants: participantsToSave,
        timestamp: Date.now(),
        isCouple,
        secretCode,
        validated: false
      }
      
      const saveSuccess = await saveToSupabase(newData)
      if (!saveSuccess) throw new Error('Échec de l\'enregistrement des données')

      setQrData(newData)
      setPageState('invitation')
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la soumission')
    } finally {
      setIsSubmitting(false)
    }
  }, [isCouple, participants, secretCode, saveToSupabase])

  const handleParticipantChange = useCallback((index: number, field: keyof Participant, value: string) => {
    if (field === 'number') return
    
    setParticipants(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [])

  const toggleShowSecretCode = useCallback(() => {
    setShowSecretCode(prev => !prev)
  }, [])

  const handleRetry = useCallback(() => {
    setPageState('loading')
    setError('')
    window.location.reload()
  }, [])

  if (pageState === 'loading') {
    return <LoadingScreen />
  }

  if (pageState === 'error') {
    return <ErrorScreen error={error} onRetry={handleRetry} />
  }

  if (pageState === 'invitation' && qrData) {
    return <WeddingInvitationCard qrData={qrData} />
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <img src='rings.png' className='absolute z-50 top-[5%] right-[10%] translate-x-[-50%] translate-y-[-50%] w-[60px]'/>
      <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200">
        <img src="/top-left-flower.png" alt="Top Left Flower" loading="lazy" className="absolute -top-20 -left-20 w-40 opacity-70" />
        <img src="/top-right-flower.png" alt="Top Right Flower" loading="lazy" className="absolute top-10 -right-20 w-40 opacity-70" />

        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-serif font-bold text-brown-700 mb-2">
              Formulaire d'Invitation
            </h1>
            <p className="text-gray-600">
              Veuillez remplir vos informations pour recevoir votre invitation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isCouple ? 'Votre nom complet' : 'Votre nom complet'}
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={participants[0].name}
                onChange={(e) => handleParticipantChange(0, 'name', e.target.value)}
                required
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiPhone className="mr-2" />
                Numéro de téléphone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={participants[0].number}
                onChange={(e) => handleNumberChange(e, 0)}
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

            {isCouple && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de votre partenaire
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={participants[1].name}
                  onChange={(e) => handleParticipantChange(1, 'name', e.target.value)}
                  required={isCouple}
                  placeholder="Nom du partenaire"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiKey className="mr-2" />
                Code secret (4 chiffres)
              </label>
              <div className="relative">
                <input
                  type={showSecretCode ? "text" : "password"}
                  className="w-full px-4 py-3 text-gray-700 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12"
                  value={secretCode}
                  onChange={handleSecretCodeChange}
                  maxLength={4}
                  pattern="\d{4}"
                  inputMode="numeric"
                  required
                  placeholder="****"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-700"
                  onClick={toggleShowSecretCode}
                >
                  {showSecretCode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Choisissez un code secret de 4 chiffres, Retenez le, il sera utilisé en cas de perte de votre code QR ou téléphone, etc.
              </p>
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