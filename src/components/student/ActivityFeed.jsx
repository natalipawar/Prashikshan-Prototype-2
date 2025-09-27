import React from 'react'
import { CheckCircle, Award, BookOpen, Mail, Clock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const ActivityFeed = () => {
  const { recentActivity } = studentDashboardData

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment_submitted':
        return CheckCircle
      case 'grade_received':
        return Award
      case 'module_completed':
        return BookOpen
      case 'message_received':
        return Mail
      default:
        return Clock
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'assignment_submitted':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          border: 'border-green-200'
        }
      case 'grade_received':
        return {
          bg: 'bg-yellow-50',
          icon: 'text-yellow-600',
          border: 'border-yellow-200'
        }
      case 'module_completed':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          border: 'border-blue-200'
        }
      case 'message_received':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          border: 'border-purple-200'
        }
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          border: 'border-gray-200'
        }
    }
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffTime = now - activityTime
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
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
    })
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Activity</h2>
          <p className="text-sm text-gray-600">Keep track of your latest achievements</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Activity Items */}
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type)
              const colors = getActivityColor(activity.type)
              
              return (
                <motion.div
                  key={activity.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 ${colors.bg} ${colors.border} border-2 rounded-full flex items-center justify-center transform -translate-x-1/2 group-hover:scale-110 transition-transform`}>
                    <div className={`w-2 h-2 ${colors.icon.replace('text-', 'bg-')} rounded-full`}></div>
                  </div>

                  {/* Content */}
                  <div className="ml-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 ${colors.bg} rounded-lg ${colors.border} border group-hover:scale-105 transition-transform`}>
                            <Icon size={16} className={colors.icon} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {activity.course}
                            </p>
                          </div>
                        </div>

                        {/* Additional Info for Grade */}
                        {activity.grade && (
                          <div className="ml-11 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.icon} border ${colors.border}`}>
                              Grade: {activity.grade}
                            </span>
                          </div>
                        )}

                        <div className="ml-11 text-xs text-gray-500 flex items-center space-x-2">
                          <Clock size={12} />
                          <span>{formatTimeAgo(activity.timestamp)}</span>
                        </div>
                      </div>

                      {/* Action indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* View More Button */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2 rounded-lg hover:bg-white transition-all">
            Load More Activities
          </button>
        </div>
      </div>

      {/* Empty State (if no activities) */}
      {recentActivity.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Clock size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recent activity
          </h3>
          <p className="text-gray-600">
            Your recent activities will appear here as you engage with courses and assignments.
          </p>
        </div>
      )}
    </div>
  )
}

export default ActivityFeed