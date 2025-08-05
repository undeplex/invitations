

// // 'use client'
// // import * as XLSX from 'xlsx'
// // import { v4 as uuidv4 } from 'uuid'
// // import { useState, useEffect } from 'react'
// // import Link from 'next/link'
// // import { saveAs } from 'file-saver'
// // import { useRouter } from 'next/navigation'
// // import ProtectedRoute from '@/components/ProtectedRoute'
// // import { 
// //   FiEdit, FiDownload, FiChevronLeft, 
// //   FiChevronRight, FiFilter, FiUser, FiUsers, 
// //   FiX, FiHome,FiUpload, FiSearch, FiCheck, FiShare2,
// //   FiExternalLink
// // } from 'react-icons/fi'
// // import { createClient } from '@supabase/supabase-js'

// // // Configuration Supabase
// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// // const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

// // // Liste des tables
// // const TABLE_NAMES = [
// //   "Al'basha", "Bodeguita", "Big five", "Casa italiano", 
// //   "Côte ouest", "Fabusness", "Galito's", "Hyper psaro",
// //   "Hypnose", "Holly boom", "Istanbul", "Karavia",
// //   "Latté", "La plazza", "La fourchette", "La brioche",
// //   "Le fleuve", "Mulykap", "Mycose", "Mahir",
// //   "Novotel", "Roco mama", "River city", "River side",
// //   "Steak house", "Two seance", "TikTok", "The one",
// //   "The garden"
// // ]

// // type FilterType = 'all' | 'no-table' | 'single' | 'couple' | 'validated' | 'not-validated' | 'all-tables' | string

// // export default function AdminDashboard() {
// //   const [allRegistrations, setAllRegistrations] = useState<QRData[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState('')
// //   const [searchTerm, setSearchTerm] = useState('')
// //   const [editingId, setEditingId] = useState<string | null>(null)
// //   const [editForm, setEditForm] = useState<QRData | null>(null)
// //   const [currentPage, setCurrentPage] = useState(1)
// //   const [filter, setFilter] = useState<FilterType>('all')
// //   const [showFilterMenu, setShowFilterMenu] = useState(false)
// //   const [copiedId, setCopiedId] = useState<string | null>(null)
// //   const [selectedUsers, setSelectedUsers] = useState<string[]>([])
// //   const [selectedTable, setSelectedTable] = useState('')
// //   const router = useRouter()

// //   const ITEMS_PER_PAGE = 10

// //   // Normalise les données des participants
// //   const normalizeParticipants = (participantsData: any): Participant[] => {
// //     try {
// //       if (Array.isArray(participantsData)) {
// //         return participantsData.map(p => ({
// //           name: p.name || '',
// //           number: p.number || '',
// //           tableNumber: p.tableNumber || ''
// //         }))
// //       }

// //       if (typeof participantsData === 'string') {
// //         try {
// //           const parsed = JSON.parse(participantsData.replace(/\\"/g, '"'))
// //           if (Array.isArray(parsed)) return parsed
// //           if (typeof parsed === 'object') return [parsed]
// //         } catch {
// //           const nameMatch = participantsData.match(/"name"\s*:\s*"([^"]*)"/)
// //           const numberMatch = participantsData.match(/"number"\s*:\s*"([^"]*)"/)
// //           const tableMatch = participantsData.match(/"tableNumber"\s*:\s*"([^"]*)"/)
          
// //           if (nameMatch || numberMatch) {
// //             return [{
// //               name: nameMatch ? nameMatch[1] : '',
// //               number: numberMatch ? numberMatch[1] : '',
// //               tableNumber: tableMatch ? tableMatch[1] : ''
// //             }]
// //           }
// //         }
// //       }

// //       if (typeof participantsData === 'object' && participantsData !== null) {
// //         return [{
// //           name: participantsData.name || '',
// //           number: participantsData.number || '',
// //           tableNumber: participantsData.tableNumber || ''
// //         }]
// //       }

// //       return []
// //     } catch (error) {
// //       console.error('Error normalizing participants:', error)
// //       return []
// //     }
// //   }

// //   // Récupère toutes les données
// //   const fetchAllData = async (): Promise<QRData[]> => {
// //     try {
// //       const { data, error } = await supabase
// //         .from('wedding_invitations')
// //         .select('*')
// //         .order('timestamp', { ascending: false })

// //       if (error) throw error

// //       return data.map(item => ({
// //         id: item.id,
// //         participants: normalizeParticipants(item.participants),
// //         timestamp: item.timestamp,
// //         isCouple: item.is_couple,
// //         signature: item.signature,
// //         secretCode: item.secret_code,
// //         validated: item.validated
// //       }))
// //     } catch (error) {
// //       console.error('Error fetching data:', error)
// //       setError('Failed to load data')
// //       return []
// //     }
// //   }

// //   // Sauvegarde une inscription
// //   const saveRegistration = async (registration: QRData): Promise<boolean> => {
// //     try {
// //       const { error } = await supabase
// //         .from('wedding_invitations')
// //         .upsert({
// //           id: registration.id,
// //           participants: registration.participants,
// //           timestamp: registration.timestamp,
// //           is_couple: registration.isCouple,
// //           signature: registration.signature,
// //           secret_code: registration.secretCode,
// //           validated: registration.validated
// //         })

// //       if (error) throw error
// //       return true
// //     } catch (error) {
// //       console.error('Error saving data:', error)
// //       setError('Failed to save data')
// //       return false
// //     }
// //   }

// //   // Charge les données au montage et configure l'écoute en temps réel
// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const data = await fetchAllData()
// //         setAllRegistrations(data)
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : 'An error occurred')
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     loadData()

// //     // Configuration de l'écoute en temps réel
// //     const subscription = supabase
// //       .channel('wedding_invitations_changes')
// //       .on(
// //         'postgres_changes',
// //         {
// //           event: '*',
// //           schema: 'public',
// //           table: 'wedding_invitations'
// //         },
// //         (payload) => {
// //           console.log('Change received!', payload)
// //           // Mise à jour en temps réel lorsque des changements sont détectés
// //           if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
// //             const updatedData = {
// //               id: payload.new.id,
// //               participants: normalizeParticipants(payload.new.participants),
// //               timestamp: payload.new.timestamp,
// //               isCouple: payload.new.is_couple,
// //               signature: payload.new.signature,
// //               secretCode: payload.new.secret_code,
// //               validated: payload.new.validated
// //             }
            
// //             setAllRegistrations(prev => {
// //               const exists = prev.some(reg => reg.id === updatedData.id)
// //               if (exists) {
// //                 return prev.map(reg => 
// //                   reg.id === updatedData.id ? updatedData : reg
// //                 )
// //               } else {
// //                 return [updatedData, ...prev] // Ajoute les nouveaux en haut
// //               }
// //             })
// //           } else if (payload.eventType === 'DELETE') {
// //             setAllRegistrations(prev => 
// //               prev.filter(reg => reg.id !== payload.old.id)
// //             )
// //           }
// //         }
// //       )
// //       .subscribe()

// //     return () => {
// //       supabase.removeChannel(subscription)
// //     }
// //   }, [])

// //   // Gestion de l'édition
// //   const startEditing = (registration: QRData) => {
// //     setEditingId(registration.id)
// //     setEditForm(JSON.parse(JSON.stringify(registration)))
// //   }

// //   const cancelEditing = () => {
// //     setEditingId(null)
// //     setEditForm(null)
// //   }

// //   const saveEdit = async () => {
// //     if (!editForm) return

// //     try {
// //       setIsLoading(true)
// //       const success = await saveRegistration(editForm)

// //       if (success) {
// //         setAllRegistrations(allRegistrations.map(reg => 
// //           reg.id === editForm.id ? editForm : reg
// //         ))
// //         setEditingId(null)
// //         setEditForm(null)
// //         setError('')
// //       }
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Update failed')
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const handleEditChange = (index: number, field: keyof Participant, value: string) => {
// //     if (!editForm) return

// //     const updatedParticipants = [...editForm.participants]
// //     updatedParticipants[index] = { ...updatedParticipants[index], [field]: value }

// //     if (editForm.isCouple && field === 'tableNumber') {
// //       for (let i = 0; i < updatedParticipants.length; i++) {
// //         updatedParticipants[i] = { ...updatedParticipants[i], [field]: value }
// //       }
// //     }

// //     setEditForm({
// //       ...editForm,
// //       participants: updatedParticipants
// //     })
// //   }

// //   const importRegistrations = async (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0]
// //     if (!file) return

// //     try {
// //       setIsLoading(true)
// //       const fileData = await file.text()
// //       const parsedData = JSON.parse(fileData)
      
// //       if (!Array.isArray(parsedData)) {
// //         throw new Error('Invalid file format - expected array of registrations')
// //       }

// //       // Préparer les données pour Supabase
// //       const registrationsToImport = parsedData.map(item => {
// //         // S'assurer que les participants sont normalisés
// //         const participants = normalizeParticipants(item.participants)
        
// //         return {
// //           id: item.id || uuidv4(),
// //           participants: participants,
// //           timestamp: item.timestamp || Date.now(),
// //           is_couple: item.isCouple || (participants.length > 1), // Déduire si c'est un couple
// //           signature: item.signature || '',
// //           secret_code: item.secretCode || '',
// //           validated: item.validated || false
// //         }
// //       })

// //       // Vérifier qu'il y a des données à importer
// //       if (registrationsToImport.length === 0) {
// //         throw new Error('No valid registration data found in file')
// //       }

// //       // Sauvegarde en base de données
// //       const { error } = await supabase
// //         .from('wedding_invitations')
// //         .upsert(registrationsToImport)

// //       if (error) throw error
      
// //       // Afficher un message de succès
// //       setError('')
// //       alert(`Successfully imported ${registrationsToImport.length} registrations`)
// //     } catch (err) {
// //       console.error('Import error:', err)
// //       setError(err instanceof Error ? err.message : 'Failed to import data')
// //       alert('Import failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
// //     } finally {
// //       setIsLoading(false)
// //       event.target.value = '' // Reset l'input file
// //     }
// //   }

// //   const exportToJSON = () => {
// //     try {
// //       const data = allRegistrations.map(reg => ({
// //         id: reg.id,
// //         participants: reg.participants.map(p => ({
// //           name: p.name,
// //           number: p.number,
// //           tableNumber: p.tableNumber
// //         })),
// //         timestamp: reg.timestamp,
// //         isCouple: reg.isCouple,
// //         signature: reg.signature,
// //         secretCode: reg.secretCode,
// //         validated: reg.validated,
// //         createdAt: reg.timestamp ? new Date(reg.timestamp).toISOString() : null
// //       }))

// //       const blob = new Blob([JSON.stringify(data, null, 2)], { 
// //         type: 'application/json;charset=utf-8' 
// //       })
// //       saveAs(blob, `wedding_registrations_${new Date().toISOString().slice(0, 10)}.json`)
// //       setError('')
// //     } catch (err) {
// //       console.error('Export error:', err)
// //       setError(err instanceof Error ? err.message : 'Failed to export data')
// //     }
// //   }

// //   // Basculer le statut de validation
// //   const toggleValidationStatus = async (id: string) => {
// //     try {
// //       setIsLoading(true)
// //       const registration = allRegistrations.find(reg => reg.id === id)
// //       if (!registration) return

// //       const updatedRegistration = { 
// //         ...registration, 
// //         validated: !registration.validated 
// //       }

// //       const success = await saveRegistration(updatedRegistration)

// //       if (success) {
// //         // La mise à jour sera gérée par l'écoute en temps réel
// //         setError('')
// //       }
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Update failed')
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   // Copier le lien de partage
// //   const copyShareLink = (id: string, isCouple: boolean, signature: string) => {
// //     const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
// //     navigator.clipboard.writeText(link)
// //     setCopiedId(id)
// //     setTimeout(() => setCopiedId(null), 2000)
// //   }

// //   const exportToExcel = () => {
// //     try {
// //       // Préparer les données pour Excel
// //       const excelData = allRegistrations.flatMap(registration => {
// //         const baseData = {
// //           'Type': registration.isCouple ? 'Couple' : 'Single',
// //           'Validé': registration.validated ? 'Oui' : 'Non',
// //           'Date': registration.timestamp ? new Date(registration.timestamp).toLocaleString('fr-FR') : 'N/A',
// //           'Table': registration.participants[0]?.tableNumber || '',
// //         }

// //         // Pour les participants individuels
// //         if (!registration.isCouple) {
// //           return [{
// //             ...baseData,
// //             'Nom': registration.participants[0]?.name || '',
// //             'Téléphone': registration.participants[0]?.number || ''
// //           }]
// //         }

// //         // Pour les couples
// //         return [
// //           {
// //             ...baseData,
// //             'Nom': registration.participants[0]?.name || '',
// //             'Téléphone': registration.participants[0]?.number || '',
// //             'Rôle': 'Principal'
// //           },
// //           {
// //             ...baseData,
// //             'Nom': registration.participants[1]?.name || '',
// //             'Téléphone': registration.participants[1]?.number || 'Pas de Numero',
// //             'Rôle': 'Secondaire'
// //           }
// //         ]
// //       })

// //       // Créer un nouveau classeur
// //       const wb = XLSX.utils.book_new()
// //       const ws = XLSX.utils.json_to_sheet(excelData)
      
// //       // Ajouter la feuille au classeur
// //       XLSX.utils.book_append_sheet(wb, ws, 'Invités')
      
// //       // Générer le fichier Excel
// //       const date = new Date().toISOString().slice(0, 10)
// //       XLSX.writeFile(wb, `invites_mariage_${date}.xlsx`)
      
// //       setError('')
// //     } catch (err) {
// //       console.error('Erreur lors de l\'export Excel:', err)
// //       setError('Échec de l\'export Excel')
// //     }
// //   }

// //   // Partager le lien
// //   const shareLink = (id: string, isCouple: boolean, signature: string) => {
// //     const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
// //     if (navigator.share) {
// //       navigator.share({
// //         title: 'Invitation',
// //         text: 'Partager ce lien d\'invitation',
// //         url: link,
// //       }).catch(() => {
// //         copyShareLink(id, isCouple, signature)
// //       })
// //     } else {
// //       copyShareLink(id, isCouple, signature)
// //     }
// //   }

// //   // Ouvrir le lien
// //   const openLink = (id: string, isCouple: boolean, signature: string) => {
// //     const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
// //     window.open(link, '_blank', 'noopener,noreferrer')
// //   }

// //   // Exporter en CSV simplifié
// //   const exportToSimpleCSV = () => {
// //     const headers = ['Name', 'Phone Number', 'Table Number']
    
// //     const csvContent = [
// //       headers.join(','),
// //       ...allRegistrations.map(reg => {
// //         const name1 = reg.participants[0]?.name || ''
// //         const name2 = reg.isCouple ? reg.participants[1]?.name || '' : ''
// //         const phone = reg.participants[0]?.number || ''
// //         const table = reg.participants[0]?.tableNumber || ''
        
// //         return [
// //           `"${name1}${reg.isCouple && name2 ? ' & ' + name2 : ''}"`,
// //           phone,
// //           table
// //         ].join(',')
// //       })
// //     ].join('\n')

// //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
// //     saveAs(blob, 'wedding_guests.csv')
// //   }

// //   // Gestion des sélections
// //   const toggleUserSelection = (id: string) => {
// //     setSelectedUsers(prev => 
// //       prev.includes(id) 
// //         ? prev.filter(userId => userId !== id) 
// //         : [...prev, id]
// //     )
// //   }

// //   // Assigner une table aux sélectionnés
// //   const assignTableToSelected = async () => {
// //     if (!selectedTable || selectedUsers.length === 0) return

// //     try {
// //       setIsLoading(true)
      
// //       const updatedRegistrations = allRegistrations.map(reg => {
// //         if (selectedUsers.includes(reg.id)) {
// //           const updatedParticipants = reg.participants.map(participant => ({
// //             ...participant,
// //             tableNumber: selectedTable
// //           }))
// //           return { ...reg, participants: updatedParticipants }
// //         }
// //         return reg
// //       })

// //       setAllRegistrations(updatedRegistrations)

// //       const updates = selectedUsers.map(async id => {
// //         const registration = updatedRegistrations.find(reg => reg.id === id)
// //         if (!registration) return
        
// //         await saveRegistration(registration)
// //       })

// //       await Promise.all(updates)
      
// //       setSelectedUsers([])
// //       setError('')
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Failed to assign table')
// //       const data = await fetchAllData()
// //       setAllRegistrations(data)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const clearSelection = () => {
// //     setSelectedUsers([])
// //   }

// //   // Formater la date avec heure
// //   const formatDateTime = (timestamp: number): string => {
// //     if (!timestamp) return 'N/A'
// //     const date = new Date(timestamp)
// //     return date.toLocaleString('fr-FR', {
// //       day: '2-digit',
// //       month: '2-digit',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     })
// //   }

// //   // Filtrage des inscriptions
// //   const filteredRegistrations = allRegistrations.filter(registration => {
// //     if (searchTerm) {
// //       const term = searchTerm.toLowerCase()
// //       const safeId = registration.id?.toLowerCase() || ''
// //       const safeParticipants = registration.participants || []

// //       const matchesSearch = (
// //         safeId.includes(term) ||
// //         safeParticipants.some(participant => {
// //           const safeName = participant.name?.toLowerCase() || ''
// //           const safeNumber = participant.number?.toString() || ''
// //           return safeName.includes(term) || safeNumber.includes(term)
// //         }))
      
// //       if (!matchesSearch) return false 
// //     }

// //     switch (filter) {
// //       case 'no-table':
// //         return registration.participants.some(p => !p.tableNumber)
// //       case 'single':
// //         return !registration.isCouple
// //       case 'couple':
// //         return registration.isCouple
// //       case 'validated':
// //         return registration.validated
// //       case 'not-validated':
// //         return !registration.validated
// //       case 'all-tables':
// //         return registration.participants.some(p => p.tableNumber && TABLE_NAMES.includes(p.tableNumber))
// //       default:
// //         if (filter !== 'all') {
// //           return registration.participants.some(p => p.tableNumber === filter)
// //         }
// //         return true
// //     }
// //   })

// //   // Pagination
// //   const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE)
// //   const paginatedRegistrations = filteredRegistrations.slice(
// //     (currentPage - 1) * ITEMS_PER_PAGE,
// //     currentPage * ITEMS_PER_PAGE
// //   )

// //   // Statistiques
// //   const totalGuests = allRegistrations.reduce((sum, reg) => sum + (reg.isCouple ? 2 : 1), 0)
// //   const totalCouples = allRegistrations.filter(reg => reg.isCouple).length
// //   const totalSingles = allRegistrations.filter(reg => !reg.isCouple).length
// //   const noTableAssigned = allRegistrations.filter(reg => 
// //     reg.participants.some(p => !p.tableNumber)
// //   ).length
// //   const totalValidated = allRegistrations.filter(reg => reg.validated).length

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <ProtectedRoute>
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
// //         {error && (
// //           <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded-lg shadow-lg z-50 flex items-center gap-2">
// //             {error}
// //           </div>
// //         )}

// //         <div className="max-w-7xl mx-auto p-4 pt-6">
// //           {/* En-tête avec statistiques et actions */}
// //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// //             {/* Statistiques */}
// //             <div className="flex flex-wrap items-center gap-2">
// //               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
// //                 <span className="text-gray-500">Total:</span>
// //                 <span className="font-medium text-blue-600">{totalGuests}</span>
// //               </div>
// //               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
// //                 <FiUsers className="text-green-500" />
// //                 <span className="text-gray-500">Couples:</span>
// //                 <span className="font-medium text-green-600">{totalCouples}</span>
// //               </div>
// //               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
// //                 <FiUser className="text-blue-500" />
// //                 <span className="text-gray-500">Singles:</span>
// //                 <span className="font-medium text-blue-600">{totalSingles}</span>
// //               </div>
// //               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
// //                 <span className="text-gray-500">No Table:</span>
// //                 <span className="font-medium text-orange-600">{noTableAssigned}</span>
// //               </div>
// //               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
// //                 <FiCheck className="text-purple-500" />
// //                 <span className="text-gray-500">Validated:</span>
// //                 <span className="font-medium text-purple-600">{totalValidated}</span>
// //               </div>
// //             </div>

// //             {/* Actions */}
// //             <div className="flex flex-wrap items-center gap-2">
// //               <Link href="/admin/dashboard" className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50">
// //                 <FiHome size={16} /> Dashboard
// //               </Link>
// //               <div className="flex flex-wrap items-center gap-2">
// //                 <button
// //                   onClick={exportToJSON}
// //                   className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
// //                 >
// //                   <FiDownload size={16} /> Export
// //                 </button>
// //               </div>

// //               <button
// //                 onClick={exportToExcel}
// //                 className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
// //               >
// //                 Excel
// //               </button>

// //               <label className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50 cursor-pointer">
// //                 <FiUpload size={16} /> Import
// //                 <input 
// //                   type="file" 
// //                   accept=".json" 
// //                   onChange={importRegistrations}
// //                   className="hidden"
// //                   disabled={isLoading}
// //                 />
// //               </label>
// //               <button
// //                 onClick={() => router.push('/admin')}
// //                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
// //               >
// //                 Generate New Link
// //               </button>
// //             </div>
// //           </div>

// //           <div className='block md:flex gap-3 mx-auto'>
// //             {/* Actions groupées */}
// //             {selectedUsers.length > 0 && (
// //               <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
// //                 <h2 className="text-lg font-semibold mb-4 text-blue-800">Bulk Actions ({selectedUsers.length} selected)</h2>
// //                 <div className="flex flex-col md:flex-row gap-4">
// //                   <div className="flex-grow">
// //                     <select
// //                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       value={selectedTable}
// //                       onChange={(e) => setSelectedTable(e.target.value)}
// //                     >
// //                       <option value="">Select a table</option>
// //                       {TABLE_NAMES.map(table => (
// //                         <option key={table} value={table}>{table}</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <button
// //                     onClick={assignTableToSelected}
// //                     disabled={!selectedTable || isLoading}
// //                     className={`px-4 py-2 text-sm rounded-lg ${!selectedTable || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
// //                   >
// //                     Assign
// //                   </button>
// //                   <button
// //                     onClick={clearSelection}
// //                     className="bg-gray-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700"
// //                   >
// //                     Clear
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Recherche et filtres */}
// //             <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
// //               <h2 className="text-lg font-semibold mb-4 text-blue-800">Search and Filter</h2>

// //               <div className="flex flex-col md:flex-row gap-4">
// //                 <div className="flex-grow relative">
// //                   <FiSearch className="absolute left-3 top-3 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by name, number..."
// //                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     value={searchTerm}
// //                     onChange={(e) => {
// //                       setSearchTerm(e.target.value)
// //                       setCurrentPage(1)
// //                     }}
// //                   />
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm('')}
// //                       className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
// //                     >
// //                       <FiX size={18} />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 <div className="relative">
// //                   <button
// //                     onClick={() => setShowFilterMenu(!showFilterMenu)}
// //                     className="w-full text-sm flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
// //                   >
// //                     <FiFilter />
// //                     <span>
// //                       {filter === 'all' ? 'All' : 
// //                       filter === 'single' ? 'Single Only' : 
// //                       filter === 'couple' ? 'Couple Only' : 
// //                       filter === 'no-table' ? 'No Table' :
// //                       filter === 'validated' ? 'Validated' : 
// //                       filter === 'not-validated' ? 'Not Validated' : 
// //                       filter === 'all-tables' ? 'All Tables' :
// //                       filter}
// //                     </span>
// //                   </button>
                  
// //                   {showFilterMenu && (
// //                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-96 overflow-y-auto">
// //                       <div className="py-1">
// //                         <button
// //                           onClick={() => { setFilter('all'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           Show All
// //                         </button>
// //                         <button
// //                           onClick={() => { setFilter('no-table'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'no-table' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           No Table Assigned
// //                         </button>
// //                         <button
// //                           onClick={() => { setFilter('all-tables'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all-tables' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           All Tables
// //                         </button>
// //                         <button
// //                           onClick={() => { setFilter('single'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'single' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           Single Guests
// //                         </button>
// //                         <button
// //                           onClick={() => { setFilter('couple'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'couple' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           Couples
// //                         </button>
// //                         <button
// //                           onClick={() => { setFilter('validated'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'validated' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           Validated
// //                         </button>
// //                         <button
// //                           onClick={() => { setFilter('not-validated'); setShowFilterMenu(false); setCurrentPage(1) }}
// //                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'not-validated' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                         >
// //                           Not Validated
// //                         </button>
// //                         <div className="border-t border-gray-200 my-1"></div>
// //                         <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">By Table</div>
// //                         {TABLE_NAMES.map(table => (
// //                           <button
// //                             key={table}
// //                             onClick={() => { setFilter(table); setShowFilterMenu(false); setCurrentPage(1) }}
// //                             className={`block w-full text-left px-4 py-2 text-sm ${filter === table ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
// //                           >
// //                             {table}
// //                           </button>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Tableau des inscriptions */}
// //           <div className="bg-white p-6 rounded-xl shadow-sm">
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
// //                       <input 
// //                         type="checkbox" 
// //                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                         checked={selectedUsers.length > 0 && selectedUsers.length === paginatedRegistrations.length}
// //                         onChange={(e) => {
// //                           if (e.target.checked) {
// //                             setSelectedUsers(paginatedRegistrations.map(reg => reg.id))
// //                           } else {
// //                             setSelectedUsers([])
// //                           }
// //                         }}
// //                       />
// //                     </th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">Participants</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {paginatedRegistrations.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
// //                         {searchTerm ? 'No matching registrations found' : 'No registrations yet'}
// //                       </td>
// //                     </tr>
// //                   ) : (
// //                     paginatedRegistrations.map((registration) => (
// //                       <tr key={registration.id} className="hover:bg-gray-50">
// //                         <td className="px-6 py-4">
// //                           <input 
// //                             type="checkbox" 
// //                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                             checked={selectedUsers.includes(registration.id)}
// //                             onChange={()=> toggleUserSelection(registration.id)}
// //                           />
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="mb-2">
// //                             <div className="font-medium text-gray-800">{registration.participants[0]?.name || 'N/A'}</div>
// //                             <div className="text-sm text-gray-500">{registration.participants[0]?.number || 'No number'}</div>
// //                           </div>
// //                           {registration.isCouple && registration.participants[1]?.name && (
// //                             <div>
// //                               <div className="font-medium text-gray-800">{registration.participants[1].name}</div>
// //                             </div>
// //                           )}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-700">
// //                             {registration.participants[0]?.tableNumber || '-'}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           {registration.isCouple ? (
// //                             <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
// //                               <FiUsers className="mr-1" /> Couple
// //                             </span>
// //                           ) : (
// //                             <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
// //                               <FiUser className="mr-1" /> Single
// //                             </span>
// //                           )}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <button
// //                             onClick={() => toggleValidationStatus(registration.id)}
// //                             className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
// //                               registration.validated 
// //                                 ? 'bg-green-100 text-green-800 hover:bg-green-200' 
// //                                 : 'bg-red-100 text-red-600 hover:bg-gray-200'
// //                             }`}
// //                           >
// //                             <FiCheck className="mr-1" />
// //                             {registration.validated ? 'Validated' : 'Not Validated'}
// //                           </button>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                           {formatDateTime(registration.timestamp)}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="flex items-center gap-2">
// //                             <button
// //                               onClick={() => openLink(registration.id, registration.isCouple, registration.signature)}
// //                               className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
// //                               title="Open link"
// //                             >
// //                               <FiExternalLink size={18} />
// //                             </button>
// //                             <button
// //                               onClick={() => copyShareLink(registration.id, registration.isCouple, registration.signature)}
// //                               className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50"
// //                               title={copiedId === registration.id ? "Copied!" : "Copy share link"}
// //                             >
// //                               {copiedId === registration.id ? <FiCheck size={18} /> : <FiShare2 size={18} />}
// //                             </button>
// //                             {editingId === registration.id ? (
// //                               <>
// //                                 <button
// //                                   onClick={saveEdit}
// //                                   className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50"
// //                                 >
// //                                   Save
// //                                 </button>
// //                                 <button
// //                                   onClick={cancelEditing}
// //                                   className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50"
// //                                 >
// //                                   Cancel
// //                                 </button>
// //                               </>
// //                             ) : (
// //                               <button
// //                                 onClick={() => startEditing(registration)}
// //                                 className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
// //                                 title="Edit"
// //                               >
// //                                 <FiEdit size={18} />
// //                               </button>
// //                             )}
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* Pagination */}
// //             {totalPages > 1 && (
// //               <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-gray-50 p-4 rounded-lg">
// //                 <div className="text-sm text-gray-700 mb-2 sm:mb-0">
// //                   Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
// //                   <span className="font-medium">
// //                     {Math.min(currentPage * ITEMS_PER_PAGE, filteredRegistrations.length)}
// //                   </span>{' '}
// //                   of <span className="font-medium">{filteredRegistrations.length}</span> results
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// //                     disabled={currentPage === 1 || isLoading}
// //                     className={`p-2 rounded-lg border ${currentPage === 1 || isLoading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
// //                   >
// //                     <FiChevronLeft size={18} />
// //                   </button>
// //                   <span className="text-sm text-gray-700">
// //                     Page {currentPage} of {totalPages}
// //                   </span>
// //                   <button
// //                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// //                     disabled={currentPage === totalPages || isLoading}
// //                     className={`p-2 rounded-lg border ${currentPage === totalPages || isLoading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
// //                   >
// //                     <FiChevronRight size={18} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Modal d'édition */}
// //         {editingId && editForm && (
// //           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
// //             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
// //               <div className="flex justify-between items-center mb-4">
// //                 <h2 className="text-xl font-bold text-blue-800">Edit Registration</h2>
// //                 <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
// //                   <FiX size={20} />
// //                 </button>
// //               </div>

// //               {(editForm.participants || []).map((participant, index) => (
// //                 <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
// //                   <h3 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
// //                     {editForm.isCouple ? (
// //                       <>
// //                         <FiUsers /> {index === 0 ? 'Primary Participant' : 'Secondary Participant'}
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FiUser /> Participant
// //                       </>
// //                     )}
// //                   </h3>
// //                   <div className="space-y-3">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
// //                       <input
// //                         type="text"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
// //                         value={participant.name || ''}
// //                         onChange={(e) => handleEditChange(index, 'name', e.target.value)}
// //                       />
// //                     </div>
// //                     {index === 0 && (
// //                       <>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (10 digits)</label>
// //                           <input
// //                             type="tel"
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
// //                             value={participant.number || ''}
// //                             onChange={(e) => handleEditChange(index, 'number', e.target.value.replace(/\D/g, '').slice(0, 10))}
// //                             maxLength={10}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
// //                           <select
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
// //                             value={participant.tableNumber || ''}
// //                             onChange={(e) => handleEditChange(index, 'tableNumber', e.target.value)}
// //                           >
// //                             <option value="">Select a table</option>
// //                             {TABLE_NAMES.map(table => (
// //                               <option key={table} value={table}>{table}</option>
// //                             ))}
// //                           </select>
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}

// //               <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
// //                 <h3 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
// //                   <FiCheck /> Validation Status
// //                 </h3>
// //                 <div className="flex items-center gap-2">
// //                   <input
// //                     type="checkbox"
// //                     id="validated"
// //                     checked={editForm.validated || false}
// //                     onChange={(e) => setEditForm({ ...editForm, validated: e.target.checked })}
// //                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                   />
// //                   <label htmlFor="validated" className="text-sm text-gray-700">
// //                     Mark as validated
// //                   </label>
// //                 </div>
// //               </div>

// //               <div className="flex justify-end gap-3 mt-6">
// //                 <button
// //                   onClick={cancelEditing}
// //                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={saveEdit}
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
// //                 >
// //                   Save Changes
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </ProtectedRoute>
// //   )
// // }



// 'use client'
// import * as XLSX from 'xlsx'
// import { v4 as uuidv4 } from 'uuid'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { saveAs } from 'file-saver'
// import { useRouter } from 'next/navigation'
// import ProtectedRoute from '@/components/ProtectedRoute'
// import { 
//   FiEdit, FiDownload, FiChevronLeft, 
//   FiChevronRight, FiFilter, FiUser, FiUsers, 
//   FiX, FiHome,FiUpload, FiSearch, FiCheck, FiShare2,
//   FiExternalLink
// } from 'react-icons/fi'

// // Configuration JSONBin
// const JSONBIN_BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID || '684b3d4f8960c979a5a8d468'
// const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '$2a$10$zwRLZs1/lR5eWDWOFHFZC.JHMFPGPhA7FcCm200U9NzENeT4QCQ5G'
// const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`

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

// // Liste des tables
// const TABLE_NAMES = [
//   "Al'basha", "Bodeguita", "Big five", "Casa italiano", 
//   "Côte ouest", "Fabusness", "Galito's", "Hyper psaro",
//   "Hypnose", "Holly boom", "Istanbul", "Karavia",
//   "Latté", "La plazza", "La fourchette", "La brioche",
//   "Le fleuve", "Mulykap", "Mycose", "Mahir",
//   "Novotel", "Roco mama", "River city", "River side",
//   "Steak house", "Two seance", "TikTok", "The one",
//   "The garden"
// ]

// type FilterType = 'all' | 'no-table' | 'single' | 'couple' | 'validated' | 'not-validated' | 'all-tables' | string

// export default function AdminDashboard() {
//   const [allRegistrations, setAllRegistrations] = useState<QRData[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [editingId, setEditingId] = useState<string | null>(null)
//   const [editForm, setEditForm] = useState<QRData | null>(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [filter, setFilter] = useState<FilterType>('all')
//   const [showFilterMenu, setShowFilterMenu] = useState(false)
//   const [copiedId, setCopiedId] = useState<string | null>(null)
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([])
//   const [selectedTable, setSelectedTable] = useState('')
//   const router = useRouter()

//   const ITEMS_PER_PAGE = 10

//   // Normalise les données des participants
//   const normalizeParticipants = (participantsData: any): Participant[] => {
//     try {
//       if (Array.isArray(participantsData)) {
//         return participantsData.map(p => ({
//           name: p.name || '',
//           number: p.number || '',
//           tableNumber: p.tableNumber || ''
//         }))
//       }

//       if (typeof participantsData === 'string') {
//         try {
//           const parsed = JSON.parse(participantsData.replace(/\\"/g, '"'))
//           if (Array.isArray(parsed)) return parsed
//           if (typeof parsed === 'object') return [parsed]
//         } catch {
//           const nameMatch = participantsData.match(/"name"\s*:\s*"([^"]*)"/)
//           const numberMatch = participantsData.match(/"number"\s*:\s*"([^"]*)"/)
//           const tableMatch = participantsData.match(/"tableNumber"\s*:\s*"([^"]*)"/)
          
//           if (nameMatch || numberMatch) {
//             return [{
//               name: nameMatch ? nameMatch[1] : '',
//               number: numberMatch ? numberMatch[1] : '',
//               tableNumber: tableMatch ? tableMatch[1] : ''
//             }]
//           }
//         }
//       }

//       if (typeof participantsData === 'object' && participantsData !== null) {
//         return [{
//           name: participantsData.name || '',
//           number: participantsData.number || '',
//           tableNumber: participantsData.tableNumber || ''
//         }]
//       }

//       return []
//     } catch (error) {
//       console.error('Error normalizing participants:', error)
//       return []
//     }
//   }

//   // Récupère toutes les données depuis JSONBin
//   // const fetchAllData = async (): Promise<QRData[]> => {
//   //   try {
//   //     const response = await fetch(JSONBIN_URL, {
//   //       headers: {
//   //         'X-Master-Key': JSONBIN_API_KEY
//   //       }
//   //     })

//   //     if (!response.ok) throw new Error('Failed to fetch data')

//   //     const { record } = await response.json()

//   //     return record.map((item: any) => ({
//   //       id: item.id,
//   //       participants: normalizeParticipants(item.participants),
//   //       timestamp: item.timestamp,
//   //       isCouple: item.isCouple,
//   //       signature: item.signature,
//   //       secretCode: item.secretCode,
//   //       validated: item.validated
//   //     }))
//   //   } catch (error) {
//   //     console.error('Error fetching data:', error)
//   //     setError('Failed to load data')
//   //     return []
//   //   }
//   // }



// //   const fetchAllData = async (): Promise<QRData[]> => {
// //   try {
// //     const response = await fetch(JSONBIN_URL, {
// //       headers: {
// //         'X-Master-Key': JSONBIN_API_KEY
// //       }
// //     })

// //     if (!response.ok) throw new Error('Failed to fetch data')

// //     const { record } = await response.json()
    
// //     // Ensure record is an array
// //     if (!Array.isArray(record)) {
// //       // If record is not an array, return empty array or handle accordingly
// //       console.error('Expected array but got:', record)
// //       return []
// //     }

// //     return record.map(item => ({
// //       id: item.id,
// //       participants: normalizeParticipants(item.participants),
// //       timestamp: item.timestamp,
// //       isCouple: item.isCouple,  // Changed from is_couple to isCouple
// //       signature: item.signature,
// //       secretCode: item.secretCode,  // Changed from secret_code to secretCode
// //       validated: item.validated
// //     }))
// //   } catch (error) {
// //     console.error('Error fetching data:', error)
// //     setError('Failed to load data')
// //     return []
// //   }
// // }
// const fetchAllData = async (): Promise<QRData[]> => {
//   try {
//     const response = await fetch(JSONBIN_URL, {
//       headers: {
//         'X-Master-Key': JSONBIN_API_KEY
//       }
//     })

//     if (!response.ok) throw new Error('Failed to fetch data')

//     const { record } = await response.json()
    
//     // Gestion des cas où record n'est pas un tableau
//     if (!record) {
//       console.error('No data received from JSONBin')
//       return []
//     }

//     // Si record est un objet vide, retourner un tableau vide
//     if (typeof record === 'object' && !Array.isArray(record) && Object.keys(record).length === 0) {
//       return []
//     }

//     // Si record n'est pas un tableau mais contient des données, le convertir en tableau
//     if (!Array.isArray(record)) {
//       return [{
//         id: record.id || uuidv4(),
//         participants: normalizeParticipants(record.participants),
//         timestamp: record.timestamp || Date.now(),
//         isCouple: record.isCouple || false,
//         signature: record.signature || '',
//         secretCode: record.secretCode || '',
//         validated: record.validated || false
//       }]
//     }

//     // Cas normal où record est déjà un tableau
//     return record.map(item => ({
//       id: item.id,
//       participants: normalizeParticipants(item.participants),
//       timestamp: item.timestamp,
//       isCouple: item.isCouple,
//       signature: item.signature,
//       secretCode: item.secretCode,
//       validated: item.validated
//     }))
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     setError('Failed to load data')
//     return []
//   }
// }
//   // Sauvegarde toutes les données dans JSONBin
//   const saveAllData = async (data: QRData[]): Promise<boolean> => {
//     try {
//       const response = await fetch(JSONBIN_URL, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Master-Key': JSONBIN_API_KEY
//         },
//         body: JSON.stringify(data)
//       })

//       if (!response.ok) throw new Error('Failed to save data')
//       return true
//     } catch (error) {
//       console.error('Error saving data:', error)
//       setError('Failed to save data')
//       return false
//     }
//   }

//   // Charge les données au montage
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchAllData()
//         setAllRegistrations(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     loadData()
//   }, [])

//   // Gestion de l'édition
//   const startEditing = (registration: QRData) => {
//     setEditingId(registration.id)
//     setEditForm(JSON.parse(JSON.stringify(registration)))
//   }

//   const cancelEditing = () => {
//     setEditingId(null)
//     setEditForm(null)
//   }

//   const saveEdit = async () => {
//     if (!editForm) return

//     try {
//       setIsLoading(true)
      
//       // Mettre à jour les données localement
//       const updatedRegistrations = allRegistrations.map(reg => 
//         reg.id === editForm.id ? editForm : reg
//       )
      
//       // Sauvegarder toutes les données
//       const success = await saveAllData(updatedRegistrations)

//       if (success) {
//         setAllRegistrations(updatedRegistrations)
//         setEditingId(null)
//         setEditForm(null)
//         setError('')
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Update failed')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEditChange = (index: number, field: keyof Participant, value: string) => {
//     if (!editForm) return

//     const updatedParticipants = [...editForm.participants]
//     updatedParticipants[index] = { ...updatedParticipants[index], [field]: value }

//     if (editForm.isCouple && field === 'tableNumber') {
//       for (let i = 0; i < updatedParticipants.length; i++) {
//         updatedParticipants[i] = { ...updatedParticipants[i], [field]: value }
//       }
//     }

//     setEditForm({
//       ...editForm,
//       participants: updatedParticipants
//     })
//   }

//   const importRegistrations = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     try {
//       setIsLoading(true)
//       const fileData = await file.text()
//       const parsedData = JSON.parse(fileData)
      
//       if (!Array.isArray(parsedData)) {
//         throw new Error('Invalid file format - expected array of registrations')
//       }

//       // Préparer les données pour l'import
//       const registrationsToImport = parsedData.map(item => {
//         const participants = normalizeParticipants(item.participants)
        
//         return {
//           id: item.id || uuidv4(),
//           participants: participants,
//           timestamp: item.timestamp || Date.now(),
//           isCouple: item.isCouple || (participants.length > 1),
//           signature: item.signature || '',
//           secretCode: item.secretCode || '',
//           validated: item.validated || false
//         }
//       })

//       if (registrationsToImport.length === 0) {
//         throw new Error('No valid registration data found in file')
//       }

//       // Fusionner avec les données existantes
//       const existingRegistrations = await fetchAllData()
//       const mergedRegistrations = [...existingRegistrations, ...registrationsToImport]

//       // Sauvegarder
//       const success = await saveAllData(mergedRegistrations)

//       if (success) {
//         setAllRegistrations(mergedRegistrations)
//         setError('')
//         alert(`Successfully imported ${registrationsToImport.length} registrations`)
//       }
//     } catch (err) {
//       console.error('Import error:', err)
//       setError(err instanceof Error ? err.message : 'Failed to import data')
//       alert('Import failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
//     } finally {
//       setIsLoading(false)
//       event.target.value = '' // Reset l'input file
//     }
//   }

//   const exportToJSON = () => {
//     try {
//       const data = allRegistrations.map(reg => ({
//         id: reg.id,
//         participants: reg.participants.map(p => ({
//           name: p.name,
//           number: p.number,
//           tableNumber: p.tableNumber
//         })),
//         timestamp: reg.timestamp,
//         isCouple: reg.isCouple,
//         signature: reg.signature,
//         secretCode: reg.secretCode,
//         validated: reg.validated,
//         createdAt: reg.timestamp ? new Date(reg.timestamp).toISOString() : null
//       }))

//       const blob = new Blob([JSON.stringify(data, null, 2)], { 
//         type: 'application/json;charset=utf-8' 
//       })
//       saveAs(blob, `wedding_registrations_${new Date().toISOString().slice(0, 10)}.json`)
//       setError('')
//     } catch (err) {
//       console.error('Export error:', err)
//       setError(err instanceof Error ? err.message : 'Failed to export data')
//     }
//   }

//   // Basculer le statut de validation
//   const toggleValidationStatus = async (id: string) => {
//     try {
//       setIsLoading(true)
//       const registration = allRegistrations.find(reg => reg.id === id)
//       if (!registration) return

//       const updatedRegistration = { 
//         ...registration, 
//         validated: !registration.validated 
//       }

//       const updatedRegistrations = allRegistrations.map(reg => 
//         reg.id === id ? updatedRegistration : reg
//       )

//       const success = await saveAllData(updatedRegistrations)

//       if (success) {
//         setAllRegistrations(updatedRegistrations)
//         setError('')
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Update failed')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Copier le lien de partage
//   const copyShareLink = (id: string, isCouple: boolean, signature: string) => {
//     const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
//     navigator.clipboard.writeText(link)
//     setCopiedId(id)
//     setTimeout(() => setCopiedId(null), 2000)
//   }

//   const exportToExcel = () => {
//     try {
//       // Préparer les données pour Excel
//       const excelData = allRegistrations.flatMap(registration => {
//         const baseData = {
//           'Type': registration.isCouple ? 'Couple' : 'Single',
//           'Validé': registration.validated ? 'Oui' : 'Non',
//           'Date': registration.timestamp ? new Date(registration.timestamp).toLocaleString('fr-FR') : 'N/A',
//           'Table': registration.participants[0]?.tableNumber || '',
//         }

//         // Pour les participants individuels
//         if (!registration.isCouple) {
//           return [{
//             ...baseData,
//             'Nom': registration.participants[0]?.name || '',
//             'Téléphone': registration.participants[0]?.number || ''
//           }]
//         }

//         // Pour les couples
//         return [
//           {
//             ...baseData,
//             'Nom': registration.participants[0]?.name || '',
//             'Téléphone': registration.participants[0]?.number || '',
//             'Rôle': 'Principal'
//           },
//           {
//             ...baseData,
//             'Nom': registration.participants[1]?.name || '',
//             'Téléphone': registration.participants[1]?.number || 'Pas de Numero',
//             'Rôle': 'Secondaire'
//           }
//         ]
//       })

//       // Créer un nouveau classeur
//       const wb = XLSX.utils.book_new()
//       const ws = XLSX.utils.json_to_sheet(excelData)
      
//       // Ajouter la feuille au classeur
//       XLSX.utils.book_append_sheet(wb, ws, 'Invités')
      
//       // Générer le fichier Excel
//       const date = new Date().toISOString().slice(0, 10)
//       XLSX.writeFile(wb, `invites_mariage_${date}.xlsx`)
      
//       setError('')
//     } catch (err) {
//       console.error('Erreur lors de l\'export Excel:', err)
//       setError('Échec de l\'export Excel')
//     }
//   }

//   // Partager le lien
//   const shareLink = (id: string, isCouple: boolean, signature: string) => {
//     const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
//     if (navigator.share) {
//       navigator.share({
//         title: 'Invitation',
//         text: 'Partager ce lien d\'invitation',
//         url: link,
//       }).catch(() => {
//         copyShareLink(id, isCouple, signature)
//       })
//     } else {
//       copyShareLink(id, isCouple, signature)
//     }
//   }

//   // Ouvrir le lien
//   const openLink = (id: string, isCouple: boolean, signature: string) => {
//     const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
//     window.open(link, '_blank', 'noopener,noreferrer')
//   }

//   // Exporter en CSV simplifié
//   const exportToSimpleCSV = () => {
//     const headers = ['Name', 'Phone Number', 'Table Number']
    
//     const csvContent = [
//       headers.join(','),
//       ...allRegistrations.map(reg => {
//         const name1 = reg.participants[0]?.name || ''
//         const name2 = reg.isCouple ? reg.participants[1]?.name || '' : ''
//         const phone = reg.participants[0]?.number || ''
//         const table = reg.participants[0]?.tableNumber || ''
        
//         return [
//           `"${name1}${reg.isCouple && name2 ? ' & ' + name2 : ''}"`,
//           phone,
//           table
//         ].join(',')
//       })
//     ].join('\n')

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
//     saveAs(blob, 'wedding_guests.csv')
//   }

//   // Gestion des sélections
//   const toggleUserSelection = (id: string) => {
//     setSelectedUsers(prev => 
//       prev.includes(id) 
//         ? prev.filter(userId => userId !== id) 
//         : [...prev, id]
//     )
//   }

//   // Assigner une table aux sélectionnés
//   const assignTableToSelected = async () => {
//     if (!selectedTable || selectedUsers.length === 0) return

//     try {
//       setIsLoading(true)
      
//       const updatedRegistrations = allRegistrations.map(reg => {
//         if (selectedUsers.includes(reg.id)) {
//           const updatedParticipants = reg.participants.map(participant => ({
//             ...participant,
//             tableNumber: selectedTable
//           }))
//           return { ...reg, participants: updatedParticipants }
//         }
//         return reg
//       })

//       const success = await saveAllData(updatedRegistrations)

//       if (success) {
//         setAllRegistrations(updatedRegistrations)
//         setSelectedUsers([])
//         setError('')
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to assign table')
//       const data = await fetchAllData()
//       setAllRegistrations(data)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const clearSelection = () => {
//     setSelectedUsers([])
//   }

//   // Formater la date avec heure
//   const formatDateTime = (timestamp: number): string => {
//     if (!timestamp) return 'N/A'
//     const date = new Date(timestamp)
//     return date.toLocaleString('fr-FR', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }

//   // Filtrage des inscriptions
//   const filteredRegistrations = allRegistrations.filter(registration => {
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       const safeId = registration.id?.toLowerCase() || ''
//       const safeParticipants = registration.participants || []

//       const matchesSearch = (
//         safeId.includes(term) ||
//         safeParticipants.some(participant => {
//           const safeName = participant.name?.toLowerCase() || ''
//           const safeNumber = participant.number?.toString() || ''
//           return safeName.includes(term) || safeNumber.includes(term)
//         }))
      
//       if (!matchesSearch) return false 
//     }

//     switch (filter) {
//       case 'no-table':
//         return registration.participants.some(p => !p.tableNumber)
//       case 'single':
//         return !registration.isCouple
//       case 'couple':
//         return registration.isCouple
//       case 'validated':
//         return registration.validated
//       case 'not-validated':
//         return !registration.validated
//       case 'all-tables':
//         return registration.participants.some(p => p.tableNumber && TABLE_NAMES.includes(p.tableNumber))
//       default:
//         if (filter !== 'all') {
//           return registration.participants.some(p => p.tableNumber === filter)
//         }
//         return true
//     }
//   })

//   // Pagination
//   const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE)
//   const paginatedRegistrations = filteredRegistrations.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   )

//   // Statistiques
//   const totalGuests = allRegistrations.reduce((sum, reg) => sum + (reg.isCouple ? 2 : 1), 0)
//   const totalCouples = allRegistrations.filter(reg => reg.isCouple).length
//   const totalSingles = allRegistrations.filter(reg => !reg.isCouple).length
//   const noTableAssigned = allRegistrations.filter(reg => 
//     reg.participants.some(p => !p.tableNumber)
//   ).length
//   const totalValidated = allRegistrations.filter(reg => reg.validated).length

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     )
//   }

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//         {error && (
//           <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded-lg shadow-lg z-50 flex items-center gap-2">
//             {error}
//           </div>
//         )}

//         <div className="max-w-7xl mx-auto p-4 pt-6">
//           {/* En-tête avec statistiques et actions */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             {/* Statistiques */}
//             <div className="flex flex-wrap items-center gap-2">
//               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
//                 <span className="text-gray-500">Total:</span>
//                 <span className="font-medium text-blue-600">{totalGuests}</span>
//               </div>
//               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
//                 <FiUsers className="text-green-500" />
//                 <span className="text-gray-500">Couples:</span>
//                 <span className="font-medium text-green-600">{totalCouples}</span>
//               </div>
//               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
//                 <FiUser className="text-blue-500" />
//                 <span className="text-gray-500">Singles:</span>
//                 <span className="font-medium text-blue-600">{totalSingles}</span>
//               </div>
//               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
//                 <span className="text-gray-500">No Table:</span>
//                 <span className="font-medium text-orange-600">{noTableAssigned}</span>
//               </div>
//               <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
//                 <FiCheck className="text-purple-500" />
//                 <span className="text-gray-500">Validated:</span>
//                 <span className="font-medium text-purple-600">{totalValidated}</span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-wrap items-center gap-2">
//               <Link href="/admin/dashboard" className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50">
//                 <FiHome size={16} /> Dashboard
//               </Link>
//               <div className="flex flex-wrap items-center gap-2">
//                 <button
//                   onClick={exportToJSON}
//                   className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
//                 >
//                   <FiDownload size={16} /> Export
//                 </button>
//               </div>

//               <button
//                 onClick={exportToExcel}
//                 className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
//               >
//                 Excel
//               </button>

//               <label className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50 cursor-pointer">
//                 <FiUpload size={16} /> Import
//                 <input 
//                   type="file" 
//                   accept=".json" 
//                   onChange={importRegistrations}
//                   className="hidden"
//                   disabled={isLoading}
//                 />
//               </label>
//               <button
//                 onClick={() => router.push('/admin')}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
//               >
//                 Generate New Link
//               </button>
//             </div>
//           </div>

//           <div className='block md:flex gap-3 mx-auto'>
//             {/* Actions groupées */}
//             {selectedUsers.length > 0 && (
//               <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//                 <h2 className="text-lg font-semibold mb-4 text-blue-800">Bulk Actions ({selectedUsers.length} selected)</h2>
//                 <div className="flex flex-col md:flex-row gap-4">
//                   <div className="flex-grow">
//                     <select
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       value={selectedTable}
//                       onChange={(e) => setSelectedTable(e.target.value)}
//                     >
//                       <option value="">Select a table</option>
//                       {TABLE_NAMES.map(table => (
//                         <option key={table} value={table}>{table}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <button
//                     onClick={assignTableToSelected}
//                     disabled={!selectedTable || isLoading}
//                     className={`px-4 py-2 text-sm rounded-lg ${!selectedTable || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
//                   >
//                     Assign
//                   </button>
//                   <button
//                     onClick={clearSelection}
//                     className="bg-gray-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//                   >
//                     Clear
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Recherche et filtres */}
//             <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//               <h2 className="text-lg font-semibold mb-4 text-blue-800">Search and Filter</h2>

//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-grow relative">
//                   <FiSearch className="absolute left-3 top-3 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by name, number..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value)
//                       setCurrentPage(1)
//                     }}
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm('')}
//                       className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//                     >
//                       <FiX size={18} />
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowFilterMenu(!showFilterMenu)}
//                     className="w-full text-sm flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
//                   >
//                     <FiFilter />
//                     <span>
//                       {filter === 'all' ? 'All' : 
//                       filter === 'single' ? 'Single Only' : 
//                       filter === 'couple' ? 'Couple Only' : 
//                       filter === 'no-table' ? 'No Table' :
//                       filter === 'validated' ? 'Validated' : 
//                       filter === 'not-validated' ? 'Not Validated' : 
//                       filter === 'all-tables' ? 'All Tables' :
//                       filter}
//                     </span>
//                   </button>
                  
//                   {showFilterMenu && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-96 overflow-y-auto">
//                       <div className="py-1">
//                         <button
//                           onClick={() => { setFilter('all'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           Show All
//                         </button>
//                         <button
//                           onClick={() => { setFilter('no-table'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'no-table' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           No Table Assigned
//                         </button>
//                         <button
//                           onClick={() => { setFilter('all-tables'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all-tables' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           All Tables
//                         </button>
//                         <button
//                           onClick={() => { setFilter('single'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'single' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           Single Guests
//                         </button>
//                         <button
//                           onClick={() => { setFilter('couple'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'couple' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           Couples
//                         </button>
//                         <button
//                           onClick={() => { setFilter('validated'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'validated' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           Validated
//                         </button>
//                         <button
//                           onClick={() => { setFilter('not-validated'); setShowFilterMenu(false); setCurrentPage(1) }}
//                           className={`block w-full text-left px-4 py-2 text-sm ${filter === 'not-validated' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                         >
//                           Not Validated
//                         </button>
//                         <div className="border-t border-gray-200 my-1"></div>
//                         <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">By Table</div>
//                         {TABLE_NAMES.map(table => (
//                           <button
//                             key={table}
//                             onClick={() => { setFilter(table); setShowFilterMenu(false); setCurrentPage(1) }}
//                             className={`block w-full text-left px-4 py-2 text-sm ${filter === table ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
//                           >
//                             {table}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tableau des inscriptions */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
//                       <input 
//                         type="checkbox" 
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         checked={selectedUsers.length > 0 && selectedUsers.length === paginatedRegistrations.length}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             setSelectedUsers(paginatedRegistrations.map(reg => reg.id))
//                           } else {
//                             setSelectedUsers([])
//                           }
//                         }}
//                       />
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">Participants</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedRegistrations.length === 0 ? (
//                     <tr>
//                       <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
//                         {searchTerm ? 'No matching registrations found' : 'No registrations yet'}
//                       </td>
//                     </tr>
//                   ) : (
//                     paginatedRegistrations.map((registration) => (
//                       <tr key={registration.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4">
//                           <input 
//                             type="checkbox" 
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             checked={selectedUsers.includes(registration.id)}
//                             onChange={()=> toggleUserSelection(registration.id)}
//                           />
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="mb-2">
//                             <div className="font-medium text-gray-800">{registration.participants[0]?.name || 'N/A'}</div>
//                             <div className="text-sm text-gray-500">{registration.participants[0]?.number || 'No number'}</div>
//                           </div>
//                           {registration.isCouple && registration.participants[1]?.name && (
//                             <div>
//                               <div className="font-medium text-gray-800">{registration.participants[1].name}</div>
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-700">
//                             {registration.participants[0]?.tableNumber || '-'}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {registration.isCouple ? (
//                             <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                               <FiUsers className="mr-1" /> Couple
//                             </span>
//                           ) : (
//                             <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                               <FiUser className="mr-1" /> Single
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <button
//                             onClick={() => toggleValidationStatus(registration.id)}
//                             className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
//                               registration.validated 
//                                 ? 'bg-green-100 text-green-800 hover:bg-green-200' 
//                                 : 'bg-red-100 text-red-600 hover:bg-gray-200'
//                             }`}
//                           >
//                             <FiCheck className="mr-1" />
//                             {registration.validated ? 'Validated' : 'Not Validated'}
//                           </button>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {formatDateTime(registration.timestamp)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => openLink(registration.id, registration.isCouple, registration.signature)}
//                               className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
//                               title="Open link"
//                             >
//                               <FiExternalLink size={18} />
//                             </button>
//                             <button
//                               onClick={() => copyShareLink(registration.id, registration.isCouple, registration.signature)}
//                               className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50"
//                               title={copiedId === registration.id ? "Copied!" : "Copy share link"}
//                             >
//                               {copiedId === registration.id ? <FiCheck size={18} /> : <FiShare2 size={18} />}
//                             </button>
//                             {editingId === registration.id ? (
//                               <>
//                                 <button
//                                   onClick={saveEdit}
//                                   className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50"
//                                 >
//                                   Save
//                                 </button>
//                                 <button
//                                   onClick={cancelEditing}
//                                   className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50"
//                                 >
//                                   Cancel
//                                 </button>
//                               </>
//                             ) : (
//                               <button
//                                 onClick={() => startEditing(registration)}
//                                 className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
//                                 title="Edit"
//                               >
//                                 <FiEdit size={18} />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-gray-50 p-4 rounded-lg">
//                 <div className="text-sm text-gray-700 mb-2 sm:mb-0">
//                   Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
//                   <span className="font-medium">
//                     {Math.min(currentPage * ITEMS_PER_PAGE, filteredRegistrations.length)}
//                   </span>{' '}
//                   of <span className="font-medium">{filteredRegistrations.length}</span> results
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1 || isLoading}
//                     className={`p-2 rounded-lg border ${currentPage === 1 || isLoading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//                   >
//                     <FiChevronLeft size={18} />
//                   </button>
//                   <span className="text-sm text-gray-700">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages || isLoading}
//                     className={`p-2 rounded-lg border ${currentPage === totalPages || isLoading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//                   >
//                     <FiChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Modal d'édition */}
//         {editingId && editForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-blue-800">Edit Registration</h2>
//                 <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
//                   <FiX size={20} />
//                 </button>
//               </div>

//               {(editForm.participants || []).map((participant, index) => (
//                 <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                   <h3 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
//                     {editForm.isCouple ? (
//                       <>
//                         <FiUsers /> {index === 0 ? 'Primary Participant' : 'Secondary Participant'}
//                       </>
//                     ) : (
//                       <>
//                         <FiUser /> Participant
//                       </>
//                     )}
//                   </h3>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                       <input
//                         type="text"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         value={participant.name || ''}
//                         onChange={(e) => handleEditChange(index, 'name', e.target.value)}
//                       />
//                     </div>
//                     {index === 0 && (
//                       <>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (10 digits)</label>
//                           <input
//                             type="tel"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                             value={participant.number || ''}
//                             onChange={(e) => handleEditChange(index, 'number', e.target.value.replace(/\D/g, '').slice(0, 10))}
//                             maxLength={10}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
//                           <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                             value={participant.tableNumber || ''}
//                             onChange={(e) => handleEditChange(index, 'tableNumber', e.target.value)}
//                           >
//                             <option value="">Select a table</option>
//                             {TABLE_NAMES.map(table => (
//                               <option key={table} value={table}>{table}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                 <h3 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
//                   <FiCheck /> Validation Status
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     id="validated"
//                     checked={editForm.validated || false}
//                     onChange={(e) => setEditForm({ ...editForm, validated: e.target.checked })}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="validated" className="text-sm text-gray-700">
//                     Mark as validated
//                   </label>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 mt-6">
//                 <button
//                   onClick={cancelEditing}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={saveEdit}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   )
// }


'use client'
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { saveAs } from 'file-saver'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  FiEdit, FiDownload, FiChevronLeft, 
  FiChevronRight, FiFilter, FiUser, FiUsers, 
  FiX, FiHome,FiUpload, FiSearch, FiCheck, FiShare2,
  FiExternalLink
} from 'react-icons/fi'
import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = 'https://htotfyduudyoephuixzu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
const supabase = createClient(supabaseUrl, supabaseAnonKey)
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

// Liste des tables
const TABLE_NAMES = [
  "Table-1", "Table-2", "Table-3", "Table-4", "Table-5",
  "Table-6", "Table-7", "Table-8", "Table-9", "Table-10",
  "Table-11", "Table-12", "Table-13", "Table-14", "Table-15",
  "Table-16", "Table-17", "Table-18", "Table-19", "Table-20",
  "Table-21", "Table-22", "Table-23", "Table-24", "Table-25",
  "Table-Enfant"  // Optionnel : Si vous voulez exactement 25 tables, retirez cette ligne.
]

type FilterType = 'all' | 'no-table' | 'single' | 'couple' | 'validated' | 'not-validated' | 'all-tables' | string

export default function AdminDashboard() {
  const [allRegistrations, setAllRegistrations] = useState<QRData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<QRData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<FilterType>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState('')
  const router = useRouter()

  const ITEMS_PER_PAGE = 10

  // Normalise les données des participants
  const normalizeParticipants = (participantsData: any): Participant[] => {
    try {
      if (Array.isArray(participantsData)) {
        return participantsData.map(p => ({
          name: p.name || '',
          number: p.number || '',
          tableNumber: p.tableNumber || ''
        }))
      }

      if (typeof participantsData === 'string') {
        try {
          const parsed = JSON.parse(participantsData.replace(/\\"/g, '"'))
          if (Array.isArray(parsed)) return parsed
          if (typeof parsed === 'object') return [parsed]
        } catch {
          const nameMatch = participantsData.match(/"name"\s*:\s*"([^"]*)"/)
          const numberMatch = participantsData.match(/"number"\s*:\s*"([^"]*)"/)
          const tableMatch = participantsData.match(/"tableNumber"\s*:\s*"([^"]*)"/)
          
          if (nameMatch || numberMatch) {
            return [{
              name: nameMatch ? nameMatch[1] : '',
              number: numberMatch ? numberMatch[1] : '',
              tableNumber: tableMatch ? tableMatch[1] : ''
            }]
          }
        }
      }

      if (typeof participantsData === 'object' && participantsData !== null) {
        return [{
          name: participantsData.name || '',
          number: participantsData.number || '',
          tableNumber: participantsData.tableNumber || ''
        }]
      }

      return []
    } catch (error) {
      console.error('Error normalizing participants:', error)
      return []
    }
  }

  // Récupère toutes les données
  const fetchAllData = async (): Promise<QRData[]> => {
    try {
      const { data, error } = await supabase
        .from('wedding_invitations')
        .select('*')
        .order('timestamp', { ascending: false })

      if (error) throw error

      return data.map(item => ({
        id: item.id,
        participants: normalizeParticipants(item.participants),
        timestamp: item.timestamp,
        isCouple: item.is_couple,
        signature: item.signature,
        secretCode: item.secret_code,
        validated: item.validated
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to load data')
      return []
    }
  }

  // Sauvegarde une inscription
  const saveRegistration = async (registration: QRData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('wedding_invitations')
        .upsert({
          id: registration.id,
          participants: registration.participants,
          timestamp: registration.timestamp,
          is_couple: registration.isCouple,
          signature: registration.signature,
          secret_code: registration.secretCode,
          validated: registration.validated
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error saving data:', error)
      setError('Failed to save data')
      return false
    }
  }

  // Charge les données au montage et configure l'écoute en temps réel
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllData()
        setAllRegistrations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Configuration de l'écoute en temps réel
    const subscription = supabase
      .channel('wedding_invitations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wedding_invitations'
        },
        (payload) => {
          console.log('Change received!', payload)
          // Mise à jour en temps réel lorsque des changements sont détectés
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const updatedData = {
              id: payload.new.id,
              participants: normalizeParticipants(payload.new.participants),
              timestamp: payload.new.timestamp,
              isCouple: payload.new.is_couple,
              signature: payload.new.signature,
              secretCode: payload.new.secret_code,
              validated: payload.new.validated
            }
            
            setAllRegistrations(prev => {
              const exists = prev.some(reg => reg.id === updatedData.id)
              if (exists) {
                return prev.map(reg => 
                  reg.id === updatedData.id ? updatedData : reg
                )
              } else {
                return [updatedData, ...prev] // Ajoute les nouveaux en haut
              }
            })
          } else if (payload.eventType === 'DELETE') {
            setAllRegistrations(prev => 
              prev.filter(reg => reg.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  // Gestion de l'édition
  const startEditing = (registration: QRData) => {
    setEditingId(registration.id)
    setEditForm(JSON.parse(JSON.stringify(registration)))
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const saveEdit = async () => {
    if (!editForm) return

    try {
      setIsLoading(true)
      const success = await saveRegistration(editForm)

      if (success) {
        setAllRegistrations(allRegistrations.map(reg => 
          reg.id === editForm.id ? editForm : reg
        ))
        setEditingId(null)
        setEditForm(null)
        setError('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditChange = (index: number, field: keyof Participant, value: string) => {
    if (!editForm) return

    const updatedParticipants = [...editForm.participants]
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value }

    if (editForm.isCouple && field === 'tableNumber') {
      for (let i = 0; i < updatedParticipants.length; i++) {
        updatedParticipants[i] = { ...updatedParticipants[i], [field]: value }
      }
    }

    setEditForm({
      ...editForm,
      participants: updatedParticipants
    })
  }

  const importRegistrations = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      const fileData = await file.text()
      const parsedData = JSON.parse(fileData)
      
      if (!Array.isArray(parsedData)) {
        throw new Error('Invalid file format - expected array of registrations')
      }

      // Préparer les données pour Supabase
      const registrationsToImport = parsedData.map(item => {
        // S'assurer que les participants sont normalisés
        const participants = normalizeParticipants(item.participants)
        
        return {
          id: item.id || uuidv4(),
          participants: participants,
          timestamp: item.timestamp || Date.now(),
          is_couple: item.isCouple || (participants.length > 1), // Déduire si c'est un couple
          signature: item.signature || '',
          secret_code: item.secretCode || '',
          validated: item.validated || false
        }
      })

      // Vérifier qu'il y a des données à importer
      if (registrationsToImport.length === 0) {
        throw new Error('No valid registration data found in file')
      }

      // Sauvegarde en base de données
      const { error } = await supabase
        .from('wedding_invitations')
        .upsert(registrationsToImport)

      if (error) throw error
      
      // Afficher un message de succès
      setError('')
      alert(`Successfully imported ${registrationsToImport.length} registrations`)
    } catch (err) {
      console.error('Import error:', err)
      setError(err instanceof Error ? err.message : 'Failed to import data')
      alert('Import failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setIsLoading(false)
      event.target.value = '' // Reset l'input file
    }
  }

  const exportToJSON = () => {
    try {
      const data = allRegistrations.map(reg => ({
        id: reg.id,
        participants: reg.participants.map(p => ({
          name: p.name,
          number: p.number,
          tableNumber: p.tableNumber
        })),
        timestamp: reg.timestamp,
        isCouple: reg.isCouple,
        signature: reg.signature,
        secretCode: reg.secretCode,
        validated: reg.validated,
        createdAt: reg.timestamp ? new Date(reg.timestamp).toISOString() : null
      }))

      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json;charset=utf-8' 
      })
      saveAs(blob, `wedding_registrations_${new Date().toISOString().slice(0, 10)}.json`)
      setError('')
    } catch (err) {
      console.error('Export error:', err)
      setError(err instanceof Error ? err.message : 'Failed to export data')
    }
  }

  // Basculer le statut de validation
  const toggleValidationStatus = async (id: string) => {
    try {
      setIsLoading(true)
      const registration = allRegistrations.find(reg => reg.id === id)
      if (!registration) return

      const updatedRegistration = { 
        ...registration, 
        validated: !registration.validated 
      }

      const success = await saveRegistration(updatedRegistration)

      if (success) {
        // La mise à jour sera gérée par l'écoute en temps réel
        setError('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Copier le lien de partage
  const copyShareLink = (id: string, isCouple: boolean, signature: string) => {
    const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
    navigator.clipboard.writeText(link)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportToExcel = () => {
    try {
      // Préparer les données pour Excel
      const excelData = allRegistrations.flatMap(registration => {
        const baseData = {
          'Type': registration.isCouple ? 'Couple' : 'Single',
          'Validé': registration.validated ? 'Oui' : 'Non',
          'Date': registration.timestamp ? new Date(registration.timestamp).toLocaleString('fr-FR') : 'N/A',
          'Table': registration.participants[0]?.tableNumber || '',
        }

        // Pour les participants individuels
        if (!registration.isCouple) {
          return [{
            ...baseData,
            'Nom': registration.participants[0]?.name || '',
            'Téléphone': registration.participants[0]?.number || ''
          }]
        }

        // Pour les couples
        return [
          {
            ...baseData,
            'Nom': registration.participants[0]?.name || '',
            'Téléphone': registration.participants[0]?.number || '',
            'Rôle': 'Principal'
          },
          {
            ...baseData,
            'Nom': registration.participants[1]?.name || '',
            'Téléphone': registration.participants[1]?.number || 'Pas de Numero',
            'Rôle': 'Secondaire'
          }
        ]
      })

      // Créer un nouveau classeur
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(excelData)
      
      // Ajouter la feuille au classeur
      XLSX.utils.book_append_sheet(wb, ws, 'Invités')
      
      // Générer le fichier Excel
      const date = new Date().toISOString().slice(0, 10)
      XLSX.writeFile(wb, `invites_mariage_${date}.xlsx`)
      
      setError('')
    } catch (err) {
      console.error('Erreur lors de l\'export Excel:', err)
      setError('Échec de l\'export Excel')
    }
  }

  // Partager le lien
  const shareLink = (id: string, isCouple: boolean, signature: string) => {
    const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
    if (navigator.share) {
      navigator.share({
        title: 'Invitation',
        text: 'Partager ce lien d\'invitation',
        url: link,
      }).catch(() => {
        copyShareLink(id, isCouple, signature)
      })
    } else {
      copyShareLink(id, isCouple, signature)
    }
  }

  // Ouvrir le lien
  const openLink = (id: string, isCouple: boolean, signature: string) => {
    const link = `${window.location.origin}/qr-form?id=${id}&couple=${isCouple}&sig=${signature}`
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  // Exporter en CSV simplifié
  const exportToSimpleCSV = () => {
    const headers = ['Name', 'Phone Number', 'Table Number']
    
    const csvContent = [
      headers.join(','),
      ...allRegistrations.map(reg => {
        const name1 = reg.participants[0]?.name || ''
        const name2 = reg.isCouple ? reg.participants[1]?.name || '' : ''
        const phone = reg.participants[0]?.number || ''
        const table = reg.participants[0]?.tableNumber || ''
        
        return [
          `"${name1}${reg.isCouple && name2 ? ' & ' + name2 : ''}"`,
          phone,
          table
        ].join(',')
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'wedding_guests.csv')
  }

  // Gestion des sélections
  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id) 
        : [...prev, id]
    )
  }

  // Assigner une table aux sélectionnés
  const assignTableToSelected = async () => {
    if (!selectedTable || selectedUsers.length === 0) return

    try {
      setIsLoading(true)
      
      const updatedRegistrations = allRegistrations.map(reg => {
        if (selectedUsers.includes(reg.id)) {
          const updatedParticipants = reg.participants.map(participant => ({
            ...participant,
            tableNumber: selectedTable
          }))
          return { ...reg, participants: updatedParticipants }
        }
        return reg
      })

      setAllRegistrations(updatedRegistrations)

      const updates = selectedUsers.map(async id => {
        const registration = updatedRegistrations.find(reg => reg.id === id)
        if (!registration) return
        
        await saveRegistration(registration)
      })

      await Promise.all(updates)
      
      setSelectedUsers([])
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign table')
      const data = await fetchAllData()
      setAllRegistrations(data)
    } finally {
      setIsLoading(false)
    }
  }

  const clearSelection = () => {
    setSelectedUsers([])
  }

  // Formater la date avec heure
  const formatDateTime = (timestamp: number): string => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filtrage des inscriptions
  const filteredRegistrations = allRegistrations.filter(registration => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const safeId = registration.id?.toLowerCase() || ''
      const safeParticipants = registration.participants || []

      const matchesSearch = (
        safeId.includes(term) ||
        safeParticipants.some(participant => {
          const safeName = participant.name?.toLowerCase() || ''
          const safeNumber = participant.number?.toString() || ''
          return safeName.includes(term) || safeNumber.includes(term)
        }))
      
      if (!matchesSearch) return false 
    }

    switch (filter) {
      case 'no-table':
        return registration.participants.some(p => !p.tableNumber)
      case 'single':
        return !registration.isCouple
      case 'couple':
        return registration.isCouple
      case 'validated':
        return registration.validated
      case 'not-validated':
        return !registration.validated
      case 'all-tables':
        return registration.participants.some(p => p.tableNumber && TABLE_NAMES.includes(p.tableNumber))
      default:
        if (filter !== 'all') {
          return registration.participants.some(p => p.tableNumber === filter)
        }
        return true
    }
  })

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE)
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Statistiques
  const totalGuests = allRegistrations.reduce((sum, reg) => sum + (reg.isCouple ? 2 : 1), 0)
  const totalCouples = allRegistrations.filter(reg => reg.isCouple).length
  const totalSingles = allRegistrations.filter(reg => !reg.isCouple).length
  const noTableAssigned = allRegistrations.filter(reg => 
    reg.participants.some(p => !p.tableNumber)
  ).length
  const totalValidated = allRegistrations.filter(reg => reg.validated).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded-lg shadow-lg z-50 flex items-center gap-2">
            {error}
          </div>
        )}

        <div className="max-w-7xl mx-auto p-4 pt-6">
          {/* En-tête avec statistiques et actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            {/* Statistiques */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium text-blue-600">{totalGuests}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <FiUsers className="text-green-500" />
                <span className="text-gray-500">Couples:</span>
                <span className="font-medium text-green-600">{totalCouples}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <FiUser className="text-blue-500" />
                <span className="text-gray-500">Singles:</span>
                <span className="font-medium text-blue-600">{totalSingles}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <span className="text-gray-500">No Table:</span>
                <span className="font-medium text-orange-600">{noTableAssigned}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <FiCheck className="text-purple-500" />
                <span className="text-gray-500">Validated:</span>
                <span className="font-medium text-purple-600">{totalValidated}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/dashboard" className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50">
                <FiHome size={16} /> Dashboard
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={exportToJSON}
                  className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
                >
                  <FiDownload size={16} /> Export
                </button>
              </div>

              <button
                onClick={exportToExcel}
                className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
              >
                Excel
              </button>

              <label className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50 cursor-pointer">
                <FiUpload size={16} /> Import
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={importRegistrations}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
              <button
                onClick={() => router.push('/admin')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                Generate New Link
              </button>
            </div>
          </div>

          <div className='block md:flex gap-3 mx-auto'>
            {/* Actions groupées */}
            {selectedUsers.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-4 text-blue-800">Bulk Actions ({selectedUsers.length} selected)</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                    >
                      <option value="">Select a table</option>
                      {TABLE_NAMES.map(table => (
                        <option key={table} value={table}>{table}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={assignTableToSelected}
                    disabled={!selectedTable || isLoading}
                    className={`px-4 py-2 text-sm rounded-lg ${!selectedTable || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Assign
                  </button>
                  <button
                    onClick={clearSelection}
                    className="bg-gray-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Recherche et filtres */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4 text-blue-800">Search and Filter</h2>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, number..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="w-full text-sm flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <FiFilter />
                    <span>
                      {filter === 'all' ? 'All' : 
                      filter === 'single' ? 'Single Only' : 
                      filter === 'couple' ? 'Couple Only' : 
                      filter === 'no-table' ? 'No Table' :
                      filter === 'validated' ? 'Validated' : 
                      filter === 'not-validated' ? 'Not Validated' : 
                      filter === 'all-tables' ? 'All Tables' :
                      filter}
                    </span>
                  </button>
                  
                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-96 overflow-y-auto">
                      <div className="py-1">
                        <button
                          onClick={() => { setFilter('all'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          Show All
                        </button>
                        <button
                          onClick={() => { setFilter('no-table'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'no-table' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          No Table Assigned
                        </button>
                        <button
                          onClick={() => { setFilter('all-tables'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all-tables' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          All Tables
                        </button>
                        <button
                          onClick={() => { setFilter('single'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'single' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          Single Guests
                        </button>
                        <button
                          onClick={() => { setFilter('couple'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'couple' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          Couples
                        </button>
                        <button
                          onClick={() => { setFilter('validated'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'validated' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          Validated
                        </button>
                        <button
                          onClick={() => { setFilter('not-validated'); setShowFilterMenu(false); setCurrentPage(1) }}
                          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'not-validated' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          Not Validated
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">By Table</div>
                        {TABLE_NAMES.map(table => (
                          <button
                            key={table}
                            onClick={() => { setFilter(table); setShowFilterMenu(false); setCurrentPage(1) }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filter === table ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            {table}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des inscriptions */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedUsers.length > 0 && selectedUsers.length === paginatedRegistrations.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(paginatedRegistrations.map(reg => reg.id))
                          } else {
                            setSelectedUsers([])
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        {searchTerm ? 'No matching registrations found' : 'No registrations yet'}
                      </td>
                    </tr>
                  ) : (
                    paginatedRegistrations.map((registration) => (
                      <tr key={registration.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedUsers.includes(registration.id)}
                            onChange={()=> toggleUserSelection(registration.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2">
                            <div className="font-medium text-gray-800">{registration.participants[0]?.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{registration.participants[0]?.number || 'No number'}</div>
                          </div>
                          {registration.isCouple && registration.participants[1]?.name && (
                            <div>
                              <div className="font-medium text-gray-800">{registration.participants[1].name}</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {registration.participants[0]?.tableNumber || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {registration.isCouple ? (
                            <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <FiUsers className="mr-1" /> Couple
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              <FiUser className="mr-1" /> Single
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleValidationStatus(registration.id)}
                            className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                              registration.validated 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-red-100 text-red-600 hover:bg-gray-200'
                            }`}
                          >
                            <FiCheck className="mr-1" />
                            {registration.validated ? 'Validated' : 'Not Validated'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(registration.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openLink(registration.id, registration.isCouple, registration.signature)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
                              title="Open link"
                            >
                              <FiExternalLink size={18} />
                            </button>
                            <button
                              onClick={() => copyShareLink(registration.id, registration.isCouple, registration.signature)}
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50"
                              title={copiedId === registration.id ? "Copied!" : "Copy share link"}
                            >
                              {copiedId === registration.id ? <FiCheck size={18} /> : <FiShare2 size={18} />}
                            </button>
                            {editingId === registration.id ? (
                              <>
                                <button
                                  onClick={saveEdit}
                                  className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => startEditing(registration)}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
                                title="Edit"
                              >
                                <FiEdit size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                  Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredRegistrations.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredRegistrations.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                    className={`p-2 rounded-lg border ${currentPage === 1 || isLoading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || isLoading}
                    className={`p-2 rounded-lg border ${currentPage === totalPages || isLoading ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal d'édition */}
        {editingId && editForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-800">Edit Registration</h2>
                <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
                  <FiX size={20} />
                </button>
              </div>

              {(editForm.participants || []).map((participant, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
                    {editForm.isCouple ? (
                      <>
                        <FiUsers /> {index === 0 ? 'Primary Participant' : 'Secondary Participant'}
                      </>
                    ) : (
                      <>
                        <FiUser /> Participant
                      </>
                    )}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={participant.name || ''}
                        onChange={(e) => handleEditChange(index, 'name', e.target.value)}
                      />
                    </div>
                    {index === 0 && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (10 digits)</label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={participant.number || ''}
                            onChange={(e) => handleEditChange(index, 'number', e.target.value.replace(/\D/g, '').slice(0, 10))}
                            maxLength={10}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={participant.tableNumber || ''}
                            onChange={(e) => handleEditChange(index, 'tableNumber', e.target.value)}
                          >
                            <option value="">Select a table</option>
                            {TABLE_NAMES.map(table => (
                              <option key={table} value={table}>{table}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
                  <FiCheck /> Validation Status
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="validated"
                    checked={editForm.validated || false}
                    onChange={(e) => setEditForm({ ...editForm, validated: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="validated" className="text-sm text-gray-700">
                    Mark as validated
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
