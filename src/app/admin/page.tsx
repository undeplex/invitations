

'use client'
import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'
import { saveAs } from 'file-saver'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { createClient } from '@supabase/supabase-js'
import { 
  FiCopy, 
  FiShare2, 
  FiTrash2, 
  FiExternalLink, 
  FiFilter, 
  FiDownload, 
  FiUpload, 
  FiPlus, 
  FiSearch, 
  FiHome, 
  FiChevronLeft, 
  FiChevronRight,
  FiUser,
  FiUsers,
  FiCheck
} from 'react-icons/fi'

interface GeneratedLink {
  id: string
  name: string
  isCouple: boolean
  url: string
  createdAt: Date | string
  isRegistered: boolean
}

// Configuration Supabase
const supabaseUrl = 'https://htotfyduudyoephuixzu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'votre_cle_secrete_stable_123!@#'
const ITEMS_PER_PAGE = 10

export default function AdminLinkGenerator() {
  const [links, setLinks] = useState<GeneratedLink[]>([])
  const [isCouple, setIsCouple] = useState(false)
  const [name, setName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'createdAt'; direction: 'asc' | 'desc' }>({ 
    key: 'createdAt', 
    direction: 'desc' 
  })
  const [filterType, setFilterType] = useState<'all' | 'single' | 'couple' | 'registered' | 'not-registered'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Safe date parser
  const parseDate = (date: any): Date => {
    if (date instanceof Date) return date
    if (typeof date === 'string') {
      const parsed = new Date(date)
      return isNaN(parsed.getTime()) ? new Date() : parsed
    }
    return new Date()
  }

  const generateSignature = useCallback((id: string, isCouple: boolean): string => {
    const data = `${id}:${isCouple}`
    return CryptoJS.HmacSHA256(data, SECRET_KEY).toString(CryptoJS.enc.Hex)
  }, [])

  const checkRegistrationStatus = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('wedding_invitations')
        .select('id')
        .eq('id', id)  // Changé de 'link_id' à 'id' pour correspondre au premier code qui fonctionne
        .single()

      return !!data
    } catch (error) {
      console.error('Error checking registration:', error)
      return false
    }
  }, [])

  const fetchLinks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Check registration status for each link
     const processedLinks = await Promise.all(
  (data || []).map(async (link: any) => {
    const isRegistered = await checkRegistrationStatus(link.id)
    return {
      id: link.id,
      name: link.name,
      isCouple: link.is_couple,
      url: link.url,
      createdAt: parseDate(link.created_at),
      isRegistered
    }
  })
)
      
      setLinks(processedLinks)
    } catch (error) {
      console.error('Error loading links:', error)
      showNotification('Failed to load links', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [checkRegistrationStatus])

  useEffect(() => {
    fetchLinks()

    // Setup realtime subscription
    const channel = supabase
      .channel('links_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'links'
      }, () => fetchLinks())
      .subscribe()

    // Setup realtime subscription for registrations
    const registrationsChannel = supabase
      .channel('registrations_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'wedding_invitations'
      }, () => fetchLinks())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
      supabase.removeChannel(registrationsChannel)
    }
  }, [fetchLinks])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000)
  }

  const generateLink = async () => {
  if (!name.trim()) {
    showNotification('Please enter a name for the link', 'error')
    return
  }

  try {
    setIsLoading(true)
    // Générer un ID simple avec un nombre aléatoire
    const id = `invitation${Math.floor(1000 + Math.random() * 9000)}`
    
    const newLink = {
      id,
      name: name.trim(),
      is_couple: isCouple,
      url: `${window.location.origin}/invite?id=${id}&couple=${isCouple}`,
      created_at: new Date().toISOString()
    }

    // Insert into database
    const { error } = await supabase
      .from('links')
      .insert(newLink)

    if (error) throw error

    // Then update state with the new link including registration status
    const isRegistered = await checkRegistrationStatus(newLink.id)
    
    setLinks(prevLinks => [{
      id: newLink.id,
      name: newLink.name,
      isCouple: newLink.is_couple,
      url: newLink.url,
      createdAt: parseDate(newLink.created_at),
      isRegistered
    }, ...prevLinks])
    
    setName('')
    setIsCouple(false)
    showNotification('Link generated successfully!', 'success')
    setCurrentPage(1)
  } catch (error) {
    console.error('Error generating link:', error)
    showNotification('Error generating link', 'error')
  } finally {
    setIsLoading(false)
  }
}

  const deleteLink = async (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      try {
        setIsLoading(true)
        const { error } = await supabase
          .from('links')
          .delete()
          .eq('id', id)

        if (error) throw error
        
        showNotification('Link deleted', 'success')
      } catch (error) {
        console.error('Error deleting link:', error)
        showNotification('Failed to delete link', 'error')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => showNotification('Link copied to clipboard!', 'success'))
      .catch(() => showNotification('Failed to copy link', 'error'))
  }

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareLink = (url: string, name: string) => {
    const SUPPORT_PHONE = "+243990664406";
    if (navigator.share) {
      navigator.share({
        title: `Bonjour ${name}`,
        text: `${name} Veuillez cliquer sur le lien si dessous pour obtenir votre invitation au mariage de Christelle & Vusi. \n\nQuestions ? Contactez-nous au : ${SUPPORT_PHONE} \n\n Lien :`,
        url: url,
      }).catch(() => {
        copyLink(url);
      });
    } else {
      copyLink(url);
    }
  };

  const exportLinks = () => {
    try {
      const dataStr = JSON.stringify(links.map(link => ({
        id: link.id,
        name: link.name,
        is_couple: link.isCouple,
        url: link.url,
      
        created_at: parseDate(link.createdAt).toISOString(),
        is_registered: link.isRegistered
      })), null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      saveAs(blob, `links_export_${new Date().toISOString().slice(0, 10)}.json`)
      showNotification('Links exported successfully', 'success')
    } catch (error) {
      console.error('Error exporting links:', error)
      showNotification('Failed to export links', 'error')
    }
  }

  const importLinks = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      const fileData = await file.text()
      const parsedLinks = JSON.parse(fileData)
      
      if (!Array.isArray(parsedLinks)) {
        throw new Error('Invalid file format')
      }

      const linksToImport = parsedLinks.map((link: any) => ({
        id: link.id || uuidv4(),
        name: link.name,
        is_couple: link.isCouple || link.is_couple || false,
        url: link.url,
        signature: link.signature || generateSignature(link.id || uuidv4(), link.isCouple || link.is_couple || false),
        created_at: parseDate(link.createdAt || link.created_at).toISOString()
      }))

      const { error } = await supabase
        .from('links')
        .upsert(linksToImport)

      if (error) throw error
      
      showNotification('Links imported successfully', 'success')
      setCurrentPage(1)
    } catch (error) {
      console.error('Error importing links:', error)
      showNotification('Failed to import links - invalid file', 'error')
    } finally {
      setIsLoading(false)
      event.target.value = ''
    }
  }

  const requestSort = (key: 'name' | 'createdAt') => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getFilteredAndSortedLinks = useCallback(() => {
    let filteredLinks = links.filter(link => {
      if (filterType === 'all') return true
      if (filterType === 'single') return !link.isCouple
      if (filterType === 'couple') return link.isCouple
      if (filterType === 'registered') return link.isRegistered
      if (filterType === 'not-registered') return !link.isRegistered
      return true
    }).filter(link => 
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return [...filteredLinks].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (sortConfig.key === 'createdAt') {
        const aDate = parseDate(aValue).getTime()
        const bDate = parseDate(bValue).getTime()
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [links, filterType, searchTerm, sortConfig])

  const formatDate = (date: Date | string) => {
    const parsedDate = parseDate(date)
    if (isNaN(parsedDate.getTime())) return 'Invalid date'
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(parsedDate)
  }

  if (isLoading && links.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const filteredAndSortedLinks = getFilteredAndSortedLinks()
  const totalPages = Math.ceil(filteredAndSortedLinks.length / ITEMS_PER_PAGE)
  const paginatedLinks = filteredAndSortedLinks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Statistics
  const totalLinks = links.length
  const totalCouples = links.filter(link => link.isCouple).length
  const totalSingles = links.filter(link => !link.isCouple).length
  const totalRegistered = links.filter(link => link.isRegistered).length
  const totalNotRegistered = links.filter(link => !link.isRegistered).length

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center gap-2`}>
            {notification.message}
          </div>
        )}

        <div className="max-w-7xl mx-auto p-4 pt-6">
          {/* Header with stats and actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium text-blue-600">{totalLinks}</span>
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
                <FiCheck className="text-purple-500" />
                <span className="text-gray-500">Registered:</span>
                <span className="font-medium text-purple-600">{totalRegistered}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
                <span className="text-gray-500">Not Registered:</span>
                <span className="font-medium text-orange-600">{totalNotRegistered}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/dashboard" className="text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50">
                <FiHome size={16} /> Dashboard
              </Link>
              <button 
                onClick={exportLinks}
                className="text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
                disabled={isLoading}
              >
                <FiDownload size={16} /> Exporter
              </button>
              <label className="text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50 cursor-pointer">
                <FiUpload size={16} /> Importer
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={importLinks}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          {/* Search and Generate Section */}
          <div className="bg-white p-6 lg:w-10/12 rounded-xl shadow-sm mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-1 relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Recherche par nom..."
                  className="w-full text-gray-700 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  disabled={isLoading}
                />
              </div>
              
              {/* Filter */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <button
                    onClick={() => setFilterType(prev => {
                      const newFilter = 
                        prev === 'all' ? 'single' : 
                        prev === 'single' ? 'couple' : 
                        prev === 'couple' ? 'registered' :
                        prev === 'registered' ? 'not-registered' : 'all'
                      setCurrentPage(1)
                      return newFilter
                    })}
                    className="w-full text-sm flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <FiFilter />
                    <span>
                      {filterType === 'all' ? 'All' : 
                       filterType === 'single' ? 'Single Only' : 
                       filterType === 'couple' ? 'Couple Only' :
                       filterType === 'registered' ? 'Registered Only' :
                       'Not Registered'}
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Couple Checkbox */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="coupleCheckbox"
                    checked={isCouple}
                    onChange={(e) => setIsCouple(e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <label htmlFor="coupleCheckbox" className="ml-2 text-sm text-gray-700 whitespace-nowrap">
                    Couple
                  </label>
                </div>
              </div>
              
              {/* Name Input */}
              <div className="lg:col-span-1">
                <input
                  type="text"
                  placeholder="Nom ou identifiant"
                  className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {/* Generate Button */}
              <div className="lg:col-span-1">
                <button
                  onClick={generateLink}
                  disabled={isLoading || !name.trim()}
                  className={`w-full ${
                    isLoading || !name.trim() ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  } text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      En cours...
                    </>
                  ) : (
                    <>
                      <FiPlus size={18} />
                      Generer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Links Table */}
          {links.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-blue-800">
                  Lien Générés ({filteredAndSortedLinks.length}/{links.length})
                </h2>
                <button
                  onClick={() => {
                    if (confirm('Clear all links? This cannot be undone.')) {
                      supabase
                        .from('links')
                        .delete()
                        .neq('id', '')
                        .then(() => {
                          setLinks([])
                          showNotification('All links cleared', 'success')
                        })
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                  disabled={isLoading}
                >
                  <FiTrash2 /> Effacer tous
                </button>
              </div>
              
              {filteredAndSortedLinks.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">Aucun utilisateurs ne correspond à ce filtre</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('name')}>
                            <div className="flex items-center">
                              Nom
                              <span className={`ml-1 ${sortConfig.key === 'name' ? 'text-blue-500' : 'text-gray-400'}`}>
                                {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                              </span>
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('createdAt')}>
                            <div className="flex items-center">
                              Creation
                              <span className={`ml-1 ${sortConfig.key === 'createdAt' ? 'text-blue-500' : 'text-gray-400'}`}>
                                {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                              </span>
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedLinks.map((link) => (
                          <tr key={link.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-800">{link.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              {link.isCouple ? (
                                <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  <FiUsers className="mr-1" /> Couple
                                </span>
                              ) : (
                                <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  <FiUser className="mr-1" /> Single
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {link.isRegistered ? (
                                <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                  <FiCheck className="mr-1" /> Ok
                                </span>
                              ) : (
                                <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-700">
                                  NotOk
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(link.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openLink(link.url)}
                                  className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50"
                                  title="Open link"
                                  disabled={isLoading}
                                >
                                  <FiExternalLink size={18} />
                                </button>
                                <button
                                  onClick={() => copyLink(link.url)}
                                  className="text-gray-600 hover:text-green-600 p-2 rounded-full hover:bg-green-50"
                                  title="Copy link"
                                  disabled={isLoading}
                                >
                                  <FiCopy size={18} />
                                </button>
                                <button
                                  onClick={() => shareLink(link.url, link.name)}
                                  className="text-gray-600 hover:text-purple-600 p-2 rounded-full hover:bg-purple-50"
                                  title="Share link"
                                  disabled={isLoading}
                                >
                                  <FiShare2 size={18} />
                                </button>
                                                                <button
                                  onClick={() => deleteLink(link.id)}
                                  className="text-gray-600 ml-6 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                                  title="Delete link"
                                  disabled={isLoading}
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedLinks.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredAndSortedLinks.length}</span> results
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
