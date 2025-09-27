import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Eye,
  Filter
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { logbookStorage, formatDate } from '../utils/helpers'
import { mockLogbookEntries } from '../data/mockData'

const FacultyDemo = () => {
  const [logbookEntries, setLogbookEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected
  const { user } = useAuth()

  useEffect(() => {
    // Load mock data initially
    const existingEntries = logbookStorage.getEntries()
    if (existingEntries.length === 0) {
      // Add mock entries for demo
      mockLogbookEntries.forEach(entry => {
        logbookStorage.addEntry({
          ...entry,
          studentId: entry.studentName.toLowerCase().replace(' ', '-'),
        })
      })
    }
    loadEntries()
  }, [])

  const loadEntries = () => {
    const entries = logbookStorage.getEntries()
    setLogbookEntries(entries)
  }

  const handleApproveEntry = (entryId) => {
    logbookStorage.updateEntryStatus(entryId, 'approved')
    loadEntries()
    setSelectedEntry(null)
  }

  const handleRejectEntry = (entryId) => {
    logbookStorage.updateEntryStatus(entryId, 'rejected')
    loadEntries()
    setSelectedEntry(null)
  }

  const getFilteredEntries = () => {
    if (filter === 'all') return logbookEntries
    return logbookEntries.filter(entry => entry.status === filter)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100'
      case 'rejected':
        return 'text-red-600 bg-red-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (!user || user.role !== 'faculty') {
    return (
      <div className="FacultyDemo">
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Restricted
            </h1>
            <p className="text-gray-600 mb-8">
              Please log in as faculty to access this dashboard.
            </p>
            <Link to="/" className="btn-primary">
              Go to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="FacultyDemo">
      <Navbar />
      
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Faculty Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Review and approve student internship logbook entries
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Welcome back,</p>
                    <p className="font-semibold text-gray-900">{user.email}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <div className="container-custom">
            <motion.div
              className="grid sm:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Entries</p>
                    <p className="text-2xl font-bold text-gray-900">{logbookEntries.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {logbookEntries.filter(e => e.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Approved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {logbookEntries.filter(e => e.status === 'approved').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">
                      {logbookEntries.filter(e => e.status === 'rejected').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Entries */}
        <section className="pb-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Filter Tabs */}
              <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="flex items-center space-x-1 p-2">
                  <Filter className="w-5 h-5 text-gray-400 ml-4" />
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'all' 
                        ? 'bg-primary-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All Entries
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'pending' 
                        ? 'bg-yellow-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilter('approved')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'approved' 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setFilter('rejected')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'rejected' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Rejected
                  </button>
                </div>
              </div>

              {/* Entries List */}
              <div className="space-y-4">
                {getFilteredEntries().map((entry) => (
                  <motion.div
                    key={entry.id}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary-600">
                              {entry.studentName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {entry.studentName}
                            </h3>
                            <p className="text-sm text-gray-600">{entry.company}</p>
                          </div>
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entry.status)}`}>
                            {getStatusIcon(entry.status)}
                            <span className="capitalize">{entry.status}</span>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(entry.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{entry.hours} hours</span>
                          </div>
                          {entry.location && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>Location verified</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {entry.description}
                        </p>

                        {entry.skills && entry.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {entry.skills.map((skill, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <button
                          onClick={() => setSelectedEntry(entry)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        {entry.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveEntry(entry.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRejectEntry(entry.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {getFilteredEntries().length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No entries found
                    </h3>
                    <p className="text-gray-600">
                      {filter === 'all' 
                        ? 'No logbook entries have been submitted yet.' 
                        : `No ${filter} entries found.`}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Entry Detail Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Logbook Entry Details
                  </h2>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                      <p className="text-gray-900">{selectedEntry.studentName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <p className="text-gray-900">{selectedEntry.company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <p className="text-gray-900">{formatDate(selectedEntry.date)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                      <p className="text-gray-900">{selectedEntry.hours} hours</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-gray-900 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {selectedEntry.description}
                    </p>
                  </div>

                  {selectedEntry.skills && selectedEntry.skills.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills Used</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className={`inline-flex items-center space-x-1 px-3 py-2 rounded-lg ${getStatusColor(selectedEntry.status)}`}>
                      {getStatusIcon(selectedEntry.status)}
                      <span className="font-medium capitalize">{selectedEntry.status}</span>
                    </div>
                    {selectedEntry.verified && (
                      <div className="inline-flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Location Verified</span>
                      </div>
                    )}
                  </div>

                  {selectedEntry.status === 'pending' && (
                    <div className="flex space-x-3 pt-4 border-t">
                      <button
                        onClick={() => handleApproveEntry(selectedEntry.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Approve Entry</span>
                      </button>
                      <button
                        onClick={() => handleRejectEntry(selectedEntry.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Reject Entry</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default FacultyDemo