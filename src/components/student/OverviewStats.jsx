import React from 'react'
import { BookOpen, FileText, TrendingUp, MessageCircle, AlertTriangle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const OverviewStats = () => {
  const { overview, dailyLogbook, notifications } = studentDashboardData

  // Calculate overdue logbooks
  const now = new Date()
  const overdueLogbooks = dailyLogbook.filter(entry => 
    entry.status === 'pending'
  ).length
  
  // Calculate urgent notifications
  const urgentNotifications = notifications.filter(n => n.priority === 'high' && n.unread).length

  const stats = [
    {
      id: 'internships',
      title: 'Active Internships',
      value: overview.internshipsActive,
      icon: BookOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: `${overview.internshipsCompleted} completed`
    },
    {
      id: 'logbooks',
      title: 'Logbooks Pending',
      value: overview.logbooksPending,
      icon: FileText,
      color: overdueLogbooks > 0 ? 'bg-red-500' : 'bg-orange-500',
      bgColor: overdueLogbooks > 0 ? 'bg-red-50' : 'bg-orange-50',
      textColor: overdueLogbooks > 0 ? 'text-red-600' : 'text-orange-600',
      description: overdueLogbooks > 0 ? `${overdueLogbooks} overdue` : 'Submit soon',
      urgent: overdueLogbooks > 0
    },
    {
      id: 'credits',
      title: 'NEP Credits',
      value: `${overview.creditsEarned}/24`,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Credits earned',
      progress: (overview.creditsEarned / 24) * 100
    },
    {
      id: 'notifications',
      title: 'Urgent Notifications',
      value: urgentNotifications,
      icon: AlertTriangle,
      color: urgentNotifications > 0 ? 'bg-red-500' : 'bg-gray-500',
      bgColor: urgentNotifications > 0 ? 'bg-red-50' : 'bg-gray-50',
      textColor: urgentNotifications > 0 ? 'text-red-600' : 'text-gray-600',
      description: urgentNotifications > 0 ? 'Action required' : 'All clear',
      urgent: urgentNotifications > 0
    }
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <motion.div
            key={stat.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={`relative p-6 rounded-xl shadow-sm border border-gray-200 bg-white overflow-hidden cursor-pointer group
              ${stat.urgent ? 'ring-2 ring-red-200 border-red-300' : ''}`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
              <Icon size={80} className="text-gray-400" />
            </div>

            {/* Urgent Indicator */}
            {stat.urgent && (
              <div className="absolute top-4 right-4">
                <AlertTriangle size={16} className="text-red-500" />
              </div>
            )}

            <div className="relative">
              {/* Icon */}
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon size={24} className={stat.textColor} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </h3>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>

                <p className={`text-xs mt-1 ${stat.urgent ? 'text-red-600' : 'text-gray-500'}`}>
                  {stat.description}
                </p>

                {/* Progress Bar for Progress Card */}
                {stat.progress && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default OverviewStats