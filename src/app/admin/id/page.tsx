
'use client'
import { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiTrash2, 
  FiDownload, 
  FiUpload,
  FiFilter,
  FiX,
  FiCheck,
  FiUser,
  FiUsers,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiEyeOff,
  FiKey,
  FiHome
} from 'react-icons/fi';
import Link from 'next/link';

// Configuration JSONBin  
const JSONBIN_BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID || '681573068561e97a500ca55e';
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '$2a$10$o25sIkYQjQEQ7G3J2t7xNuXfanbTAglprGj9sO.7tV5p7/.hqhXrG';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const JSONBIN_HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key': JSONBIN_API_KEY,
  'X-Bin-Versioning': 'false'
};

type UserType = 'single' | 'couple';
type Status = 'all' | 'validated' | 'pending';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  partnerName?: string;
  userType: UserType;
  date: string;
  validated: boolean;
  validationCode: string;
}

const userTypeOptions = [
  { value: 'single', label: 'Single' },
  { value: 'couple', label: 'Couple' }
];

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'validated', label: 'Validated' },
  { value: 'pending', label: 'Pending' }
];

const generateUniqueCode = (existingCodes: string[]): string => {
  let code: string;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
  } while (existingCodes.includes(code));
  return code;
};

const IDManager = () => {

  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'asc' | 'desc';
}>({ key: 'date', direction: 'desc' });

  // State
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [validationInput, setValidationInput] = useState('');
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    partnerName: '',
    userType: 'single' as UserType
  });
  const [filters, setFilters] = useState({
    userType: 'all' as UserType | 'all',
    status: 'all' as Status
  });
  // const [sortConfig, setSortConfig] = useState<{
  //   key: keyof User;
  //   direction: 'asc' | 'desc';
  // }>({ key: 'date', direction: 'desc' });
  const [showCodes, setShowCodes] = useState(false);

  // Fetch data from JSONBin
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(JSONBIN_URL, { 
        headers: JSONBIN_HEADERS 
      });
      
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const { record } = await response.json();
      setUsers(Array.isArray(record) ? record : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data from server');
    } finally {
      setIsLoading(false);
    }
  };

  // Save data to JSONBin 
  const saveUsers = async (usersToSave: User[]) => {
    try {
      setIsLoading(true);
      const response = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: JSONBIN_HEADERS,
        body: JSON.stringify(usersToSave)
      });
      
      if (!response.ok) throw new Error('Failed to save data');
      
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data to server');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Sort users
const sortedUsers = [...users].sort((a, b) => {
  const aValue = a[sortConfig.key];
  const bValue = b[sortConfig.key];

  // Handle undefined values
  if (aValue === undefined && bValue === undefined) return 0;
  if (aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
  if (bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;

  // Compare valuesg
  if (aValue < bValue) {
    return sortConfig.direction === 'asc' ? -1 : 1;
  }
  if (aValue > bValue) {
    return sortConfig.direction === 'asc' ? 1 : -1;
  }
  return 0;
});

  // Filter users
  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch = 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.userType === 'couple' && user.partnerName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.validationCode.includes(searchTerm);
    
    const matchesUserType = filters.userType === 'all' || user.userType === filters.userType;
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'validated' ? user.validated : !user.validated);
    
    return matchesSearch && matchesUserType && matchesStatus;
  });

  // Statistics
  const totalUsers = users.length;
  const validatedUsers = users.filter(user => user.validated).length;
  const pendingUsers = users.filter(user => !user.validated).length;
  const singleUsers = users.filter(user => user.userType === 'single').length;
  const coupleUsers = users.filter(user => user.userType === 'couple').length;

  // Create user
  const createUser = async () => {
    if (!newUser.firstName || !newUser.lastName) {
      alert('Please enter at least first and last name');
      return;
    }

    if (newUser.userType === 'couple' && !newUser.partnerName) {
      alert('Please enter partner name for couple');
      return;
    }

    try {
      setIsLoading(true);
      const existingCodes = users.map(u => u.validationCode);
      const validationCode = generateUniqueCode(existingCodes);

      const user: User = {
        id: Date.now().toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        partnerName: newUser.userType === 'couple' ? newUser.partnerName : undefined,
        userType: newUser.userType,
        date: new Date().toISOString(),
        validated: false,
        validationCode: validationCode
      };

      const updatedUsers = [user, ...users];
      const success = await saveUsers(updatedUsers);

      if (success) {
        setUsers(updatedUsers);
        setNewUser({ 
          firstName: '', 
          lastName: '', 
          partnerName: '',
          userType: 'single'
        });
        setIsAddModalOpen(false);
        alert(`User created successfully!\nValidation Code: ${validationCode}\nGive this code to the user for validation.`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validate user
  const validateUser = async () => {
    if (!selectedUser) return;
    
    if (validationInput !== selectedUser.validationCode) {
      alert('Invalid validation code');
      return;
    }

    try {
      setIsLoading(true);
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, validated: true } : user
      );
      
      const success = await saveUsers(updatedUsers);
      
      if (success) {
        setUsers(updatedUsers);
        setIsValidateModalOpen(false);
        setValidationInput('');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error validating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setIsLoading(true);
      const updatedUsers = users.filter(user => user.id !== id);
      const success = await saveUsers(updatedUsers);
      
      if (success) {
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Export users
  const exportUsers = () => {
    const data = JSON.stringify(users, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import users
  const importUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const fileData = await file.text();
      const importedUsers = JSON.parse(fileData);
      
      if (!Array.isArray(importedUsers)) {
        throw new Error('Invalid file format');
      }

      if (!confirm(`Import ${importedUsers.length} users? This will replace your current data.`)) {
        return;
      }

      const usersWithCodes = importedUsers.map(user => ({
        ...user,
        validationCode: user.validationCode || generateUniqueCode([]),
        userType: user.userType || 'single'
      }));

      const success = await saveUsers(usersWithCodes);
      
      if (success) {
        setUsers(usersWithCodes);
      }
    } catch (error) {
      alert('Error importing users: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
      e.target.value = '';
    }
  };

  // Request sort
  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  };

  // Toggle code visibility
  const toggleCodeVisibility = () => {
    if (!showCodes) {
      const code = prompt('Enter admin code to view validation codes:');
      if (code === 'admin123') {
        setShowCodes(true);
      } else {
        alert('Incorrect admin code');
      }
    } else {
      setShowCodes(false);
    }
  };

  // Format code for display
  const formatCode = (code: string) => {
    return showCodes ? code : '••••';
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header with stats and actions */}
      <div className="max-w-7xl mx-auto p-4 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
              <span className="text-gray-500">Total:</span>
              <span className="font-medium text-blue-600">{totalUsers}</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
              <FiUser className="text-green-500" />
              <span className="text-gray-500">Validated:</span>
              <span className="font-medium text-green-600">{validatedUsers}</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
              <FiUser className="text-yellow-500" />
              <span className="text-gray-500">Pending:</span>
              <span className="font-medium text-yellow-600">{pendingUsers}</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
              <FiUser className="text-blue-500" />
              <span className="text-gray-500">Single:</span>
              <span className="font-medium text-blue-600">{singleUsers}</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1">
              <FiUsers className="text-purple-500" />
              <span className="text-gray-500">Couples:</span>
              <span className="font-medium text-purple-600">{coupleUsers}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/dashboard" className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50">
              <FiHome size={16} /> Dashboard
            </Link>
            <button 
              onClick={toggleCodeVisibility}
              className={`bg-white px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50 ${
                showCodes ? 'text-indigo-600' : 'text-gray-500'
              }`}
              disabled={isLoading}
            >
              {showCodes ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              {showCodes ? 'Hide Codes' : 'Show Codes'}
            </button>
            <label className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50 cursor-pointer">
              <FiUpload size={16} /> Import
              <input 
                type="file" 
                accept=".json" 
                onChange={importUsers}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            <button
              onClick={exportUsers}
              className="bg-white text-gray-500 px-3 py-2 rounded-lg shadow-sm text-sm flex items-center gap-1 hover:bg-gray-50"
              disabled={isLoading}
            >
              <FiDownload size={16} /> Export
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <div className='p-1 text-sm text-gray-700 rounded-full bg-white'>

              <FiPlus size={16} />
              </div>
              
              
               Ajouter
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white md:w-8/12  p-6 rounded-xl shadow- mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, partner name or code..."
                className="w-full pl-10 pr-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                className="w-full text-sm flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                <FiFilter />
                <span>
                  {filters.userType === 'all' && filters.status === 'all' 
                    ? 'All' 
                    : filters.userType === 'couple' 
                      ? 'Couples' 
                      : filters.userType === 'single'
                        ? 'Singles'
                        : filters.status === 'validated' 
                          ? 'Validated' 
                          : 'Pending'}
                </span>
              </button>
              
              {isFilterModalOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filter by Type
                    </div>
                    <button
                      onClick={() => { setFilters({...filters, userType: 'all'}); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filters.userType === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      All Types
                    </button>
                    {userTypeOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setFilters({...filters, userType: option.value as UserType}); }}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.userType === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filter by Status
                    </div>
                    {statusOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setFilters({...filters, status: option.value as Status}); }}
                        className={`block w-full text-left px-4 py-2 text-sm ${filters.status === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('lastName')}
                  >
                    <div className="flex items-center">
                      Nom
                      {getSortIcon('lastName')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('userType')}
                  >
                    <div className="flex items-center">
                      Type
                      {getSortIcon('userType')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('validationCode')}
                  >
                    <div className="flex items-center">
                      <FiKey className="mr-1" />
                      Code de validation
                      {getSortIcon('validationCode')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('validated')}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon('validated')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-800">
                          {user.firstName} {user.lastName}
                          {user.userType === 'couple' && user.partnerName && (
                            <div className="text-sm text-gray-500">+ {user.partnerName}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.userType === 'couple' ? (
                          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            <FiUsers className="mr-1" /> Couple
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            <FiUser className="mr-1" /> Single
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {formatCode(user.validationCode)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.validated ? (
                          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Validated
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {!user.validated && (
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setIsValidateModalOpen(true);
                              }}
                              className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50"
                              title="Validate"
                              disabled={isLoading}
                            >
                              <FiCheck size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                            title="Delete"
                            disabled={isLoading}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-800">Add New User</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Type
                </label>
                <div className="flex gap-4">
                  {userTypeOptions.map(option => (
                    <label key={option.value} className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        name="userType"
                        value={option.value}
                        checked={newUser.userType === option.value}
                        onChange={() => setNewUser({...newUser, userType: option.value as UserType})}
                        disabled={isLoading}
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {newUser.userType === 'couple' && (
                <div>
                  <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    id="partnerName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.partnerName}
                    onChange={(e) => setNewUser({...newUser, partnerName: e.target.value})}
                    placeholder="First and last name"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={createUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validate User Modal */}
      {isValidateModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-800">Validate User</h2>
              <button 
                onClick={() => {
                  setIsValidateModalOpen(false);
                  setValidationInput('');
                }} 
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-700">
                  User: <span className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</span>
                  {selectedUser.userType === 'couple' && selectedUser.partnerName && (
                    <span> + {selectedUser.partnerName}</span>
                  )}
                </p>
              </div>
              <div>
                <label htmlFor="validationCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Validation Code
                </label>
                <input
                  type="text"
                  id="validationCode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 4-digit code"
                  value={validationInput}
                  onChange={(e) => setValidationInput(e.target.value)}
                  maxLength={4}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsValidateModalOpen(false);
                  setValidationInput('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={validateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                disabled={isLoading}
              >
                {isLoading ? 'Validating...' : 'Validate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDManager;
