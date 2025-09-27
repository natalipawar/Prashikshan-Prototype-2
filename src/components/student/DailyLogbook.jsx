import React, { useState } from 'react'
import { Calendar, Clock, CheckCircle, AlertTriangle, Edit, Eye, ChevronRight, MapPin, User, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const DailyLogbook = () => {
  const [filter, setFilter] = useState('all') // all, pending, submitted, approved
  const { dailyLogbook } = studentDashboardData

  const now = new Date()

  // Filter logbook entries based on selected filter
  const filteredEntries = dailyLogbook.filter(entry => {
    switch (filter) {
      case 'pending':
        return entry.status === 'pending'
      case 'submitted':
        return entry.status === 'submitted'
      case 'approved':
        return entry.status === 'approved'
      default:
        return true
    }
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />
      case 'submitted':
        return <Clock size={16} className="text-blue-600" />
      case 'pending':
        return <AlertTriangle size={16} className="text-orange-600" />
      default:
        return <Edit size={16} className="text-gray-600" />
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const handleSubmitLogbook = (entryId) => {
    // In a real app, this would call an API
    console.log('Submitting logbook entry:', entryId)
    // Update logbook status in localStorage or state management
  }

  const calculateProgress = (tasksCompleted, tasksAssigned) => {
    if (tasksAssigned.length === 0) return 0
    return Math.round((tasksCompleted.length / tasksAssigned.length) * 100)
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Daily Logbook</h2>
          <p className="text-sm text-gray-600">Track your daily work progress and submit time logs</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All Entries', count: dailyLogbook.length },
          { key: 'pending', label: 'Pending', count: dailyLogbook.filter(e => e.status === 'pending').length },
          { key: 'submitted', label: 'Submitted', count: dailyLogbook.filter(e => e.status === 'submitted').length },
          { key: 'approved', label: 'Approved', count: dailyLogbook.filter(e => e.status === 'approved').length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filter === tab.key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Logbook Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry, index) => {
          const progress = calculateProgress(entry.tasksCompleted, entry.tasksAssigned)
          const isPending = entry.status === 'pending'
          const isToday = new Date(entry.date).toDateString() === now.toDateString()
          
          return (
            <motion.div
              key={entry.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`bg-white rounded-xl p-6 border-2 transition-all hover:shadow-lg cursor-pointer
                ${isPending ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200 hover:border-primary-200'}
                ${isToday ? 'ring-2 ring-primary-100 border-primary-300' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Date Badge */}
                    <div className={`p-3 rounded-lg ${isToday ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}>
                      <Calendar size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {formatDate(entry.date)}
                            {isToday && (
                              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                Today
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User size={14} />
                              <span>{entry.internship}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{entry.hoursWorked} hours worked</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(entry.status)}`}>
                          {getStatusIcon(entry.status)}
                          <span className="capitalize">{entry.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tasks Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">Task Progress</h4>
                      <span className="text-sm font-medium text-gray-600">{progress}% Complete</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          progress === 100 ? 'bg-green-500' : 
                          progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Tasks Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Completed Tasks */}
                      {entry.tasksCompleted.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-green-700 mb-2 flex items-center space-x-1">
                            <CheckCircle size={14} />
                            <span>Completed ({entry.tasksCompleted.length})</span>
                          </h5>
                          <div className="space-y-1">
                            {entry.tasksCompleted.map((task, idx) => (
                              <div key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span>{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pending Tasks */}
                      {entry.tasksPending.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-orange-700 mb-2 flex items-center space-x-1">
                            <AlertTriangle size={14} />
                            <span>Pending ({entry.tasksPending.length})</span>
                          </h5>
                          <div className="space-y-1">
                            {entry.tasksPending.map((task, idx) => (
                              <div key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                                <span>{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {entry.description && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Work Description</h5>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                    </div>
                  )}

                  {/* Skills Used */}
                  {entry.skills.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Skills Applied</h5>
                      <div className="flex flex-wrap gap-1">
                        {entry.skills.map((skill, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mentor Feedback */}
                  {entry.mentorFeedback && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="text-sm font-medium text-blue-800 mb-1 flex items-center space-x-1">
                        <BookOpen size={14} />
                        <span>Mentor Feedback</span>
                      </h5>
                      <p className="text-sm text-blue-700">{entry.mentorFeedback}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {entry.location && (
                        <>
                          <MapPin size={12} />
                          <span>Geo-verified</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {entry.status === 'approved' && (
                        <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <Eye size={14} />
                          <span>View</span>
                        </button>
                      )}
                      
                      {entry.status === 'pending' && (
                        <button 
                          onClick={() => handleSubmitLogbook(entry.id)}
                          className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          <Edit size={14} />
                          <span>Submit Entry</span>
                        </button>
                      )}

                      {entry.status === 'submitted' && (
                        <div className="text-sm text-blue-600 font-medium">
                          ⏳ Awaiting Approval
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No logbook entries found
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "Start by creating your first daily logbook entry."
                : `No ${filter} entries at the moment.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Add Entry Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <button className="w-full bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-primary-300 hover:border-primary-400 transition-colors text-center group">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <Edit size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add Today's Entry</h3>
              <p className="text-sm text-gray-600">Log your daily work progress and tasks</p>
            </div>
          </div>
        </button>
      </motion.div>
    </div>
  )
}

export default DailyLogbook