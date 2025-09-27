import React, { useState } from 'react'
import { AlertTriangle, X, Clock, ExternalLink, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const AlertBanner = () => {
  const [dismissed, setDismissed] = useState(false)
  const { upcomingDeadlines, dailyLogbook } = studentDashboardData

  // Get the most urgent upcoming deadline
  const now = new Date()
  const urgentDeadlines = upcomingDeadlines
    .filter(deadline => new Date(deadline.dueDate) > now)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  // Check for overdue logbook entries (instead of assignments)
  const overdueLogbooks = dailyLogbook.filter(logEntry => 
    logEntry.status === 'pending'
  )

  if (dismissed) return null

  // Determine what to show - overdue takes priority
  let alertData = null
  let alertType = 'info'

  if (overdueLogbooks.length > 0) {
    const overdue = overdueLogbooks[0]
    alertData = {
      title: `Logbook Entry Pending: ${overdue.internship}`,
      message: `Please submit your daily logbook entry for ${overdue.date}.`,
      course: overdue.internship,
      action: 'Submit Now',
      icon: AlertTriangle,
      type: 'error'
    }
    alertType = 'error'
  } else if (urgentDeadlines.length > 0) {
    const upcoming = urgentDeadlines[0]
    const dueDate = new Date(upcoming.dueDate)
    const hoursUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60))
    const timeText = hoursUntilDue < 24 
      ? `${hoursUntilDue} hours` 
      : `${Math.ceil(hoursUntilDue / 24)} days`

    alertData = {
      title: `${upcoming.type === 'assignment' ? 'Assignment' : 'Exam'} Due Soon: ${upcoming.title}`,
      message: `Due in ${timeText} - ${dueDate.toLocaleDateString()} at ${dueDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
      course: upcoming.course,
      action: upcoming.type === 'assignment' ? 'View Assignment' : 'View Details',
      icon: Clock,
      type: upcoming.priority === 'high' && hoursUntilDue < 24 ? 'warning' : 'info'
    }
    
    if (upcoming.priority === 'high' && hoursUntilDue < 24) {
      alertType = 'warning'
    }
  }

  if (!alertData) return null

  const getAlertStyles = (type) => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700 text-white',
          closeButton: 'text-red-400 hover:text-red-600'
        }
      case 'warning':
        return {
          bg: 'bg-orange-50 border-orange-200',
          text: 'text-orange-800',
          icon: 'text-orange-600',
          button: 'bg-orange-600 hover:bg-orange-700 text-white',
          closeButton: 'text-orange-400 hover:text-orange-600'
        }
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          closeButton: 'text-blue-400 hover:text-blue-600'
        }
    }
  }

  const styles = getAlertStyles(alertType)
  const Icon = alertData.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        className={`relative p-4 rounded-xl border-2 ${styles.bg} mb-6 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-full opacity-5">
          <Icon size={120} className="text-current" />
        </div>

        <div className="relative flex items-start space-x-4">
          {/* Icon */}
          <div className={`flex-shrink-0 p-2 rounded-lg bg-white/50 ${styles.icon}`}>
            <Icon size={24} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-semibold ${styles.text} mb-1`}>
                  {alertData.title}
                </h3>
                <p className={`${styles.text} text-sm mb-2`}>
                  {alertData.message}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${styles.text} opacity-75 flex items-center space-x-1`}>
                    <Calendar size={12} />
                    <span>{alertData.course}</span>
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setDismissed(true)}
                className={`flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors ${styles.closeButton}`}
              >
                <X size={16} />
              </button>
            </div>

            {/* Action Button */}
            <div className="mt-3 flex items-center space-x-3">
              <button
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${styles.button}`}
              >
                <span>{alertData.action}</span>
                <ExternalLink size={14} />
              </button>
              
              {alertType === 'error' && (
                <span className="text-xs text-red-600 opacity-75">
                  Late submissions may incur penalties
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress indicator for time-sensitive items */}
        {alertType === 'warning' && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-orange-400 opacity-60"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default AlertBanner