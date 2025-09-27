import React from 'react'
import { MessageCircle, User, Mail, ChevronRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const MessagesWidget = () => {
  const { messages } = studentDashboardData
  const unreadMessages = messages.filter(message => message.unread)
  const recentMessages = messages.slice(0, 3) // Show only 3 most recent

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffTime = now - messageTime
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

  const getRoleColor = (role) => {
    switch (role) {
      case 'instructor':
        return 'bg-primary-500'
      case 'admin':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'instructor':
        return User
      case 'admin':
        return Mail
      default:
        return User
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Messages</h2>
          <p className="text-sm text-gray-600">
            {unreadMessages.length > 0 
              ? `${unreadMessages.length} unread message${unreadMessages.length > 1 ? 's' : ''}`
              : 'All caught up!'
            }
          </p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {recentMessages.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentMessages.map((message, index) => {
              const RoleIcon = getRoleIcon(message.sender.role)
              
              return (
                <motion.div
                  key={message.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer group relative
                    ${message.unread ? 'bg-blue-50/30 border-l-4 border-l-primary-400' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-10 h-10 ${getRoleColor(message.sender.role)} rounded-full flex items-center justify-center`}>
                        <RoleIcon size={16} className="text-white" />
                      </div>
                      {message.unread && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium truncate ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.sender.name}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{formatTimeAgo(message.timestamp)}</span>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-1 ${message.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                        {message.subject}
                      </p>
                      
                      <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                        {message.preview}
                      </p>

                      {/* Course Badge (if applicable) */}
                      {message.course && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {message.course}
                        </span>
                      )}
                    </div>

                    {/* Action indicator */}
                    <div className={`transition-opacity ${message.unread ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          // Empty State
          <div className="p-12 text-center">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-600">
              Messages from your instructors and administrators will appear here.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        {recentMessages.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Compose Message
              </button>
              
              <div className="flex items-center space-x-3">
                {unreadMessages.length > 0 && (
                  <button className="text-xs text-gray-600 hover:text-gray-700">
                    Mark All Read
                  </button>
                )}
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
                  <span>View Inbox</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {recentMessages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                {unreadMessages.length} Unread
              </span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                {messages.length} Total
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesWidget