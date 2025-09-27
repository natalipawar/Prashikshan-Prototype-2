import React, { useState } from 'react'
import { FileText, Calendar, Clock, CheckCircle, AlertTriangle, Edit, Eye, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const AssignmentsList = () => {
  const [filter, setFilter] = useState('all') // all, pending, submitted, overdue
  const { assignments } = studentDashboardData

  const now = new Date()

  // Filter assignments based on selected filter
  const filteredAssignments = assignments.filter(assignment => {
    switch (filter) {
      case 'pending':
        return assignment.status === 'pending' || assignment.status === 'draft'
      case 'submitted':
        return assignment.status === 'submitted'
      case 'overdue':
        return assignment.status === 'pending' && new Date(assignment.dueDate) < now
      default:
        return true
    }
  })

  const formatDueDate = (dateString) => {
    const dueDate = new Date(dateString)
    const diffTime = dueDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))

    if (diffTime < 0) {
      return { text: 'Overdue', color: 'text-red-600', urgent: true }
    } else if (diffHours < 24) {
      return { text: `Due in ${diffHours}h`, color: 'text-orange-600', urgent: true }
    } else if (diffDays <= 3) {
      return { text: `Due in ${diffDays}d`, color: 'text-yellow-600', urgent: false }
    } else {
      return { text: dueDate.toLocaleDateString(), color: 'text-gray-600', urgent: false }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle size={16} className="text-green-600" />
      case 'pending':
        return <Clock size={16} className="text-blue-600" />
      case 'draft':
        return <Edit size={16} className="text-gray-600" />
      default:
        return <FileText size={16} className="text-gray-600" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
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

  const handleSubmitAssignment = (assignmentId) => {
    // In a real app, this would call an API
    console.log('Submitting assignment:', assignmentId)
    // Update assignment status in localStorage or state management
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Assignments</h2>
          <p className="text-sm text-gray-600">Track and manage your assignments</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All', count: assignments.length },
          { key: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending' || a.status === 'draft').length },
          { key: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'pending' && new Date(a.dueDate) < now).length },
          { key: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length }
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

      {/* Assignments Grid */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment, index) => {
          const dueInfo = formatDueDate(assignment.dueDate)
          const isOverdue = new Date(assignment.dueDate) < now && assignment.status === 'pending'
          
          return (
            <motion.div
              key={assignment.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`bg-white rounded-xl p-6 border-2 transition-all hover:shadow-lg cursor-pointer
                ${isOverdue ? 'border-red-200 bg-red-50/30' : 'border-gray-200 hover:border-primary-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    {/* Priority Indicator */}
                    <div className={`w-1 h-16 rounded-full ${getPriorityColor(assignment.priority)}`} />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {assignment.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {assignment.course}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {/* Status Badge */}
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                            {getStatusIcon(assignment.status)}
                            <span className="capitalize">{assignment.status}</span>
                          </div>
                          
                          {/* Points */}
                          <span className="text-sm font-medium text-gray-900">
                            {assignment.points} pts
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {assignment.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Due Date */}
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} className={dueInfo.color} />
                            <span className={`text-sm font-medium ${dueInfo.color}`}>
                              {dueInfo.text}
                            </span>
                            {dueInfo.urgent && <AlertTriangle size={14} className={dueInfo.color} />}
                          </div>

                          {/* Submission Type */}
                          <div className="flex items-center space-x-1">
                            <FileText size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600 capitalize">
                              {assignment.submissionType}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {assignment.status === 'submitted' && assignment.grade && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Grade:</span>
                              <span className="font-semibold text-green-600">
                                {assignment.grade}
                              </span>
                            </div>
                          )}
                          
                          {assignment.status === 'submitted' ? (
                            <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              <Eye size={16} />
                              <span className="text-sm">View</span>
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleSubmitAssignment(assignment.id)}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm
                                ${isOverdue 
                                  ? 'bg-red-600 text-white hover:bg-red-700' 
                                  : 'bg-primary-600 text-white hover:bg-primary-700'
                                }`}
                            >
                              <Edit size={16} />
                              <span>{assignment.status === 'draft' ? 'Continue' : 'Submit'}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Feedback (for submitted assignments) */}
                      {assignment.feedback && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">
                            <strong>Feedback:</strong> {assignment.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You don't have any assignments yet."
                : `No ${filter} assignments at the moment.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssignmentsList