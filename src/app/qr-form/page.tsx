'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import CryptoJS from 'crypto-js'
import { createClient } from '@supabase/supabase-js'
import { WeddingInvitationCard } from '@/components/WeddingInvitationCard'
import { QRForm } from '@/components/QRForm'
import WeddingLoader from '@/components/weddingLoader'
import { ErrorScreen } from '@/components/ErrorScreen'

// Configuration Supabase
const supabaseUrl = 'https://htotfyduudyoephuixzu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
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
        signature: data.signature,
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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (!participants[0].name || participants[0].number.length !== 10 || !participants[0].number.startsWith('0')) {
        throw new Error('Veuillez remplir tous les champs requis avec un numéro de téléphone valide commençant par 0 (10 chiffres)')
      }
  
      // if (isCouple && !participants[1].name) {
      //   throw new Error('Veuillez remplir tous les champs pour le participant 2')
      // }
  
      if (secretCode.length !== 4) {
        throw new Error('Le code secret doit comporter exactement 4 chiffres')
      }
  
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get('id')
      const signature = searchParams.get('sig')
      
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
        signature: signature || '',
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
    
    const loadData = async () => {
      try {
        const linkExists = await checkLinkExists(id)
        if (!linkExists) {
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

    loadData()
  }, [fetchDataFromSupabase, checkLinkExists])

  if (pageState === 'loading') {
    return <WeddingLoader />
  }

  if (pageState === 'error') {
    return <ErrorScreen error={error} onRetry={handleRetry} />
  }

  if (pageState === 'invitation' && qrData) {
    return <WeddingInvitationCard qrData={qrData} />
  }

  return (
    <QRForm
      participants={participants}
      isCouple={isCouple}
      secretCode={secretCode}
      isSubmitting={isSubmitting}
      error={error}
      onParticipantChange={handleParticipantChange}
      onNumberChange={handleNumberChange}
      onSecretCodeChange={handleSecretCodeChange}
      onSubmit={handleSubmit}
      onToggleShowSecretCode={toggleShowSecretCode}
      showSecretCode={showSecretCode}
    />
  )
}