import React from 'react'
import { GraduationCap, TrendingUp, Award, BookOpen, Briefcase, Users, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const NEPCredits = () => {
  const { nepCredits } = studentDashboardData

  const progressPercentage = (nepCredits.totalCreditsEarned / nepCredits.totalCreditsRequired) * 100

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Internships':
        return Briefcase
      case 'Skill Certifications':
        return Award
      case 'Research Projects':
        return Users
      default:
        return BookOpen
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Internships':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          progress: 'bg-blue-500'
        }
      case 'Skill Certifications':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          progress: 'bg-purple-500'
        }
      case 'Research Projects':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          progress: 'bg-green-500'
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          progress: 'bg-gray-500'
        }
    }
  }

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
    })
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">NEP Credits Tracker</h2>
          <p className="text-sm text-gray-600">Monitor your academic credit requirements progress</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View Details</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Overall Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-6 border border-primary-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <GraduationCap size={24} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Overall NEP Credits</h3>
              <p className="text-sm text-gray-600">Academic Year 2023-24</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">
              {nepCredits.totalCreditsEarned}/{nepCredits.totalCreditsRequired}
            </div>
            <p className="text-sm text-gray-600">Credits Earned</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-white rounded-full h-4 border border-primary-200">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>{nepCredits.totalCreditsRequired} credits required</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <strong>{nepCredits.creditsRemaining} credits</strong> remaining
          </span>
          <span className="text-gray-600">
            Current semester: <strong>{nepCredits.currentSemesterCredits} credits</strong>
          </span>
        </div>
      </motion.div>

      {/* Credits Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {nepCredits.creditsBreakdown.map((category, index) => {
          const Icon = getCategoryIcon(category.category)
          const colors = getCategoryColor(category.category)
          
          return (
            <motion.div
              key={category.category}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 ${colors.bg} rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={colors.text} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{category.category}</h4>
                    <p className="text-sm text-gray-600">{category.credits}/{category.maxCredits} credits</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{category.percentage}%</div>
                </div>
              </div>

              {/* Category Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${colors.progress}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ delay: index * 0.2 + 0.7, duration: 1 }}
                  />
                </div>
              </div>

              {/* Source Details */}
              <div className="space-y-2">
                {category.details.length > 0 ? (
                  category.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          detail.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-gray-600 truncate">{detail.source}</span>
                      </div>
                      <span className="font-medium text-gray-900">{detail.credits}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-gray-500">No credits earned yet</p>
                    <p className="text-xs text-gray-400">Start earning from this category</p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Semester-wise Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <TrendingUp size={20} className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Semester-wise Progress</h3>
            <p className="text-sm text-gray-600">Track your credit earning journey</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nepCredits.semesterwise.map((semester, index) => {
            const progressPercentage = (semester.credits / semester.target) * 100
            const isCurrent = index === 1 // Assuming current semester is Sem 6
            
            return (
              <div 
                key={semester.semester}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCurrent ? 'border-primary-200 bg-primary-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <h4 className={`font-medium mb-1 ${isCurrent ? 'text-primary-700' : 'text-gray-700'}`}>
                    {semester.semester}
                    {isCurrent && (
                      <span className="ml-1 text-xs bg-primary-100 text-primary-600 px-1 py-0.5 rounded">
                        Current
                      </span>
                    )}
                  </h4>
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {semester.credits}/{semester.target}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${isCurrent ? 'bg-primary-500' : 'bg-gray-400'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round(progressPercentage)}% complete
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all text-left group">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center group-hover:bg-blue-300 transition-colors">
              <Briefcase size={16} className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Browse Internships</h4>
              <p className="text-sm text-gray-600">Earn credits through industry experience</p>
            </div>
          </div>
        </button>

        <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all text-left group">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center group-hover:bg-purple-300 transition-colors">
              <Award size={16} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Skill Certifications</h4>
              <p className="text-sm text-gray-600">Complete courses to earn skill credits</p>
            </div>
          </div>
        </button>
      </motion.div>
    </div>
  )
}

export default NEPCredits