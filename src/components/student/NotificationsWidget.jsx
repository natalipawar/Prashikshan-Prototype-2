import React, { useState } from 'react'
import { Bell, Clock, Briefcase, Calendar, Award, AlertTriangle, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const NotificationsWidget = () => {
  const [filter, setFilter] = useState('all')
  const { notifications } = studentDashboardData
  const [dismissedNotifications, setDismissedNotifications] = useState([])

  const activeNotifications = notifications.filter(n => !dismissedNotifications.includes(n.id))
  const unreadNotifications = activeNotifications.filter(n => n.unread)

  const filteredNotifications = activeNotifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return notification.unread
      case 'high':
        return notification.priority === 'high'
      case 'actionRequired':
        return notification.actionRequired
      default:
        return true
    }
  }).slice(0, 5) // Show only 5 most recent

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const notificationTime = new Date(timestamp)
    const diffTime = now - notificationTime
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 0) {
      return `${diffDays}d ago`
    } else if (diffHours > 0) {
      return `${diffHours}h ago`
    } else {
      return 'Just now'
    }
  }

  const formatDeadline = (deadline) => {
    if (!deadline) return null
    
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { text: 'Expired', color: 'text-red-600', urgent: true }
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-red-600', urgent: true }
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-orange-600', urgent: true }
    } else if (diffDays <= 3) {
      return { text: `${diffDays} days left`, color: 'text-orange-600', urgent: true }
    } else if (diffDays <= 7) {
      return { text: `${diffDays} days left`, color: 'text-yellow-600', urgent: false }
    } else {
      return { text: deadlineDate.toLocaleDateString(), color: 'text-gray-600', urgent: false }
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline':
        return Clock
      case 'opportunity':
        return Briefcase
      case 'interview':
        return Calendar
      case 'achievement':
        return Award
      case 'reminder':
        return Bell
      default:
        return Bell
    }
  }

  const getTypeColor = (type, priority) => {
    if (priority === 'high') {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-600'
      }
    }

    switch (type) {
      case 'deadline':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'text-orange-600'
        }
      case 'opportunity':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600'
        }
      case 'interview':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-600'
        }
      case 'achievement':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600'
        }
    }
  }

  const dismissNotification = (notificationId) => {
    setDismissedNotifications(prev => [...prev, notificationId])
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications & Deadlines</h2>
          <p className="text-sm text-gray-600">
            {unreadNotifications.length > 0 
              ? `${unreadNotifications.length} unread notification${unreadNotifications.length > 1 ? 's' : ''}`
              : 'All caught up!'
            }
          </p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All', count: activeNotifications.length },
          { key: 'unread', label: 'Unread', count: unreadNotifications.length },
          { key: 'high', label: 'Urgent', count: activeNotifications.filter(n => n.priority === 'high').length },
          { key: 'actionRequired', label: 'Action Required', count: activeNotifications.filter(n => n.actionRequired).length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
              filter === tab.key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type)
                const colors = getTypeColor(notification.type, notification.priority)
                const deadlineInfo = formatDeadline(notification.deadline)
                
                return (
                  <motion.div
                    key={notification.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`p-4 hover:bg-gray-50 transition-colors relative group
                      ${notification.unread ? `${colors.bg} border-l-4 ${colors.border.replace('border-', 'border-l-')}` : ''}
                      ${notification.priority === 'high' ? 'ring-1 ring-red-200' : ''}`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border flex-shrink-0`}>
                        <Icon size={16} className={colors.icon} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className={`text-sm font-semibold ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </p>
                              {notification.priority === 'high' && (
                                <AlertTriangle size={14} className="text-red-500" />
                              )}
                              {notification.unread && (
                                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} />
                                  <span>{formatTimeAgo(notification.timestamp)}</span>
                                </div>
                                
                                {deadlineInfo && (
                                  <div className={`flex items-center space-x-1 ${deadlineInfo.color}`}>
                                    <Calendar size={12} />
                                    <span className="font-medium">{deadlineInfo.text}</span>
                                    {deadlineInfo.urgent && (
                                      <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs">
                                        Urgent
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              {notification.actionRequired && (
                                <button className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-md hover:bg-primary-200 transition-colors">
                                  Take Action
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Dismiss Button */}
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-all ml-2"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        notification.category === 'logbook' ? 'bg-blue-500' :
                        notification.category === 'application' ? 'bg-green-500' :
                        notification.category === 'interview' ? 'bg-purple-500' :
                        notification.category === 'achievement' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            // Empty State
            <div className="p-12 text-center">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You're all caught up! New notifications will appear here."
                  : `No ${filter} notifications at the moment.`
                }
              </p>
            </div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        {filteredNotifications.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Notification Settings
              </button>
              
              <div className="flex items-center space-x-3">
                {unreadNotifications.length > 0 && (
                  <button className="text-xs text-gray-600 hover:text-gray-700">
                    Mark All Read
                  </button>
                )}
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
                  <span>View All Notifications</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {activeNotifications.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                {activeNotifications.filter(n => n.priority === 'high').length} Urgent
              </span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                {activeNotifications.filter(n => n.actionRequired).length} Action Required
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsWidget