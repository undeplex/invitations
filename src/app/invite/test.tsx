'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import CryptoJS from 'crypto-js'
import { FiUser, FiUsers, FiX, FiCheck, FiEye, FiEyeOff, FiKey, FiPhone, FiAlertTriangle } from 'react-icons/fi'
import { FaArrowDown } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'votre_cle_secrete_stable_123!@#'
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
  signature: string
  secretCode: string
  validated: boolean
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

function WeddingInvitationCard({ qrData }: { qrData: QRData }) {
  const qrContent = {
    participants: qrData.participants,
    isCouple: qrData.isCouple,
    tableNumber: qrData.participants[0]?.tableNumber || DEFAULT_TABLE_NUMBER,
    validated: qrData.validated,
    timestamp: qrData.timestamp
  }

  return (
    <div className="bg-pink-50 relative min-h-screen flex overflow-hidden items-center justify-center">
      {/* ... (le reste de votre composant WeddingInvitationCard reste inchangé) ... */}
     <div className="relative max-w-lg w-full overflow-hidden bg-pink-50 text-center text-brown-700">
            {/* Floral Decorations */}
            <img src="/top-left-flower.png" alt="Top Left Flower" className="absolute w-[270px] -top-[146px] -left-[78px]" />
            <img src="/top-right-flower.png" alt="Top Right Flower" className="absolute w-[275px] top-[26px] -right-[145px]" />
            <img src="/wed-day.png" alt="Top Right Flower" className="absolute top-[2%] w-[112px] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
            <img src="/bottom-left-flower.png" alt="Bottom Left Flower" className="absolute w-[290px] -bottom-[149px]  -left-[130px]" />
            <img src="/bottom-right-flower.png" alt="Bottom Right Flower" className="absolute bottom-0 right-0 w-32" />
            <img src="/bottom-right-flower.png" alt="Bottom Right Flower" className="absolute top-[690px] -left-[27px] w-[83px]" />
            <img src="/bottom-right-flower.png" alt="Bottom Right Flower" className="absolute top-[670px] left-[17px] w-[43px]" />
    
            {/* Participant Name */}
            <div className="mt-16">
              <h1 className="text-2xl serifo  font-bold text-brown-700">
                {qrData.participants[0].name}
              </h1>
              {qrData.isCouple && qrData.participants[1].name && (
                <h1 className="text-2xl serifo font-bold text-brown-700">
                  & {qrData.participants[1].name}
                </h1>
              )}
              <p className="text- text-gray-500 mt-2">
                Vous etes invités
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
                    href="/couple-picture-3.png"
                    width="260"
                    height="260"
                    clipPath="url(#hexClip)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
    
                <svg
                  viewBox="0 0 260 260"
                  className="absolute size-[110%] translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%]  z0 pointer-events-none"
                >
                  <polygon
                    points="130,10 240,65 240,195 130,250 20,195 20,65"
                    fill="none"
                    stroke="#f3cfc9"
                    strokeWidth="4"
                  />
                </svg>
                <img src="/image-photo.png" alt="Bottom Right Flower" className="absolute top-[50%] z-50 translate-y-[3%] right-[50%] translate-x-[50%] w-[195px]" />
              </div>
            </div>
    
            {/* Wedding Title */}
            <h2 className="text-sm uppercase tracking-widest text-gray-500">Save the date</h2>
    
            {/* Names */}
            <div className="mt-4 flex mx-auto w-max serifo gap-3">
              <h3 className="text-4xl font-semibold text-brown-700">Dan</h3>
              <span className="text-2xl font-bold text-blue-800">et</span>
              <h3 className="text-4xl font-semibold text-brown-700">Falone</h3>
            </div>
    
            {/* Invitation Message */}
            <p className="my-4 px-4 text-gray-600">
              PROGRAMME DE MARIAGE
            </p>
    
            {/* Date and Venue */}
            <div className="text-center space-y-4">
              <p className="text-2xl font-serif text-blue-800 serifo">Vendredi 27 Juin 2025</p>
              <div className="flex items-center justify-center gap-2">
                <img src='/certificate.png' className='size-7 rotate-12'/>
                <p className="text-gray-500">Mariage Civil au Golf Faustin</p>
              </div>
              <p className="text-2xl font-serif text-blue-800 serifo">Samedi 28 Juin 2025</p>
              <div className="flex items-center justify-center gap-2">
                <img src='/rings.png' className='size-8'/>
                <p className="text-gray-600 serifo">à 9 heures</p>
              </div>
              <FaArrowDown size={12} className='block mxa mx-auto animate-bounce'/>
              <p className="text-gray-500 text-lg">Mariage Religieux à l'église Protestante Unilu, référence Campus Kassapa</p>
    
              <div className="flex items-center justify-center gap-2">
                <img src='/glass.png' className='size-8'/>
                <p className="text-gray-600 serifo">à 16 heures</p>
              </div>
              <FaArrowDown size={12} className='block mxa mx-auto animate-bounce'/>
            </div>
            
            {/* Reception */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-gray-500 text-lg">Un vin d'honneur et un dîner suivront</p>
              </div>
              <p className="text-2xl serifo font-serif text-blue-800 mt-2">
                à la salle Hexagone
              </p>
              <p className="text-gray-600 px-4 text-lg">Situé au Golf Malela, référence terminus Malela Golf</p>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-900 text-lg">Avec toute notre joie,</p>
              <p className="mt-2 text-gray-600 text-lg">La famille KIBALE et ...</p>
            </div>
            <p className='text-2xl second font-bold my-4'>CODE D'ENTREE</p>
            {/* QR Code Section */}
            <div className="mt-8">
              <div className="grid mx-auto rounded-xl my-3 p-3 border w-max place-items-center">
                <QRCodeSVG
                  value={JSON.stringify(qrContent)}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                />
              </div>
              <div className="text-center p-2">
                <div className="border-2 border-red-400 bg-red-50 p-4 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="text-red-500 block mt-1">
                    <FiAlertTriangle size={24} />
                  </div>
                  <div>
                    <p className="text-red-700 text-sm">
                      Ce code est unique, ne le partagez avec personne. Il sera valide une semaine avant la date de réception. Ne l'enregistrez pas ou ne le capturez pas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Signature */}
            <p className="text- text-gray-500 mt-2">
              {formatFrenchDate(qrData.timestamp)}
            </p>
            <img src='/sign.png' className='w-[90px] mx-auto mt-4'/>
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

  const verifySignature = async (id: string, isCouple: boolean, signature: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from('links')
        .select('disable_verification')
        .eq('id', id)
        .single()

      if (data?.disable_verification) {
        return true
      }

      const dataToSign = `${id}:${isCouple}`
      const expectedSignature = CryptoJS.HmacSHA256(dataToSign, SECRET_KEY).toString(CryptoJS.enc.Hex)
      return expectedSignature === signature
    } catch (error) {
      console.error('Error verifying signature:', error)
      return false
    }
  }

  const normalizeParticipantsData = (participantsData: any): Participant[] => {
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
  }

  const fetchDataFromSupabase = async (id: string): Promise<QRData | null> => {
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
        signature: data.signature,
        secretCode: data.secret_code,
        validated: data.validated
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  const saveToSupabase = async (data: QRData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('wedding_invitations')
        .upsert({
          id: data.id,
          participants: data.participants,
          timestamp: data.timestamp,
          is_couple: data.isCouple,
          signature: data.signature,
          secret_code: data.secretCode,
          validated: data.validated
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error saving data:', error)
      throw error
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value.length > 0 && !value.startsWith('0')) {
      value = '0' + value
    }
    value = value.slice(0, 10)
    
    const updatedParticipants = [...participants]
    updatedParticipants[index] = { ...updatedParticipants[index], number: value }
    setParticipants(updatedParticipants)
  }

  const handleSecretCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setSecretCode(value)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const coupleParam = searchParams.get('couple')
    const signature = searchParams.get('sig')

    if (!id || !signature || !coupleParam) {
      setError('Ce lien a été modifié ou est invalide. Veuillez utiliser le lien original.')
      setPageState('error')
      return
    }

    const isCouple = coupleParam === 'true'
    
    const verifyAndLoad = async () => {
      try {
        const isValid = await verifySignature(id, isCouple, signature)
        if (!isValid) {
          setError('Ce lien a été modifié ou est invalide. Veuillez utiliser le lien original.')
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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
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
      const signature = searchParams.get('sig')
      
      if (!id || !signature) {
        throw new Error('Paramètres d\'invitation manquants')
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
        signature,
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
  }

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    if (field === 'number') return
    
    const updatedParticipants = [...participants]
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value }
    setParticipants(updatedParticipants)
  }

  const toggleShowSecretCode = () => {
    setShowSecretCode(!showSecretCode)
  }

  const handleRetry = () => {
    setPageState('loading')
    setError('')
    window.location.reload()
  }

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
     <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200">
        <img src="/top-left-flower.png" alt="Top Left Flower" className="absolute -top-20 -left-20 w-40 opacity-70" />
        <img src="/top-right-flower.png" alt="Top Right Flower" className="absolute top-10 -right-20 w-40 opacity-70" />

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
              <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
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
                  Nom complet de votre partenaire
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
              <label className="bloc text-sm font-medium text-gray-700 mb-1 flex items-center">
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
                  placeholder="1234"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-700"
                  onClick={toggleShowSecretCode}
                >
                  {showSecretCode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Choisissez un code secret de 4 chiffres que vous pourrez retenir</p>
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
                'Générer mon invitation'
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