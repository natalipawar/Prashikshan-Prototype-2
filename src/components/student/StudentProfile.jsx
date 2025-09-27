import React from 'react'
import { User, Award, BookOpen, Target, MapPin, Mail, Calendar, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const StudentProfile = () => {
  const { studentProfile } = studentDashboardData

  const profileStats = [
    {
      id: 'internships',
      label: 'Internships Completed',
      value: studentProfile.internshipsCompleted,
      icon: Award,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      id: 'skills',
      label: 'Skills Learned',
      value: studentProfile.skillsLearned.length,
      icon: Target,
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      id: 'credits',
      label: 'NEP Credits Earned',
      value: `${studentProfile.creditsEarned}/${studentProfile.totalCreditsRequired}`,
      icon: GraduationCap,
      color: 'text-purple-600 bg-purple-50 border-purple-200'
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
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-8 border border-primary-200"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                {studentProfile.name.charAt(0)}
              </span>
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">{studentProfile.name}</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail size={14} />
              <span className="text-sm">{studentProfile.email}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>{studentProfile.institution}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{studentProfile.year} • {studentProfile.branch}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                ID: {studentProfile.studentId}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {profileStats.map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`bg-white rounded-lg p-4 border-2 ${stat.color} min-w-[140px] hover:shadow-md transition-all duration-200 cursor-pointer group`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon size={20} className={stat.color.split(' ')[0]} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6 pt-6 border-t border-primary-200">
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen size={16} className="text-primary-600" />
          <h3 className="font-semibold text-gray-900">Recent Skills Learned</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {studentProfile.skillsLearned.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Progress Bar for Credits */}
      <div className="mt-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>NEP Credits Progress</span>
          <span>{studentProfile.creditsEarned}/{studentProfile.totalCreditsRequired} Credits</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${(studentProfile.creditsEarned / studentProfile.totalCreditsRequired) * 100}%` }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {studentProfile.totalCreditsRequired - studentProfile.creditsEarned} credits remaining to complete requirements
        </p>
      </div>
    </motion.div>
  )
}

export default StudentProfile