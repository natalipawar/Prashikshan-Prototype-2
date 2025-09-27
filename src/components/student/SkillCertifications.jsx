import React, { useState } from 'react'
import { Award, Play, User, Calendar, ChevronRight, CheckCircle, Circle, Clock, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const SkillCertifications = () => {
  const [selectedCertification, setSelectedCertification] = useState(null)
  const { skillCertifications } = studentDashboardData

  const formatDuration = (duration) => {
    return duration
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 bg-green-500'
    if (progress >= 60) return 'text-blue-600 bg-blue-500'
    if (progress >= 40) return 'text-yellow-600 bg-yellow-500'
    return 'text-red-600 bg-red-500'
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technology': return 'bg-blue-100 text-blue-800'
      case 'data science': return 'bg-purple-100 text-purple-800'
      case 'marketing': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
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
    }),
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Skill Certifications</h2>
          <p className="text-sm text-gray-600">Build industry-relevant skills and earn NEP credits</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>Browse All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCertifications.map((cert, index) => {
          const progressColor = getProgressColor(cert.progress)
          const completedModules = cert.modules.filter(m => m.completed).length
          const totalModules = cert.modules.length
          
          return (
            <motion.div
              key={cert.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => setSelectedCertification(cert)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer group"
            >
              {/* Certification Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-colors">
                    <Award size={24} className="text-primary-600" />
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${progressColor.replace('bg-', 'bg-').replace('text-', 'text-white bg-')}`}>
                      {cert.progress}%
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(cert.difficulty)}`}>
                      {cert.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(cert.category)}`}>
                    {cert.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{cert.provider}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{completedModules}/{totalModules} modules</span>
                    <span>{cert.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={progressColor.split(' ')[1]}
                      initial={{ width: 0 }}
                      animate={{ width: `${cert.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      style={{ height: '8px', borderRadius: '9999px' }}
                    />
                  </div>
                </div>

                {/* Duration & Credits */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{cert.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-xs font-medium text-gray-600">{cert.creditsOffered} Credits</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-50 hover:bg-primary-100 text-primary-600 py-2.5 rounded-lg transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <Play size={16} />
                  <span className="font-medium">
                    {cert.status === 'in-progress' ? 'Continue Learning' : 'Start Course'}
                  </span>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Add New Certification Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <div className="bg-gradient-to-r from-gray-50 to-primary-50 rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-primary-300 transition-colors cursor-pointer group">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-md transition-shadow">
              <Award size={24} className="text-gray-400 group-hover:text-primary-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Explore More Certifications</h3>
            <p className="text-sm text-gray-600 mb-4">Discover industry-relevant skills and earn more NEP credits</p>
            <button className="btn-secondary text-sm px-4 py-2">
              Browse Catalog
            </button>
          </div>
        </div>
      </motion.div>

      {/* Certification Detail Modal */}
      <AnimatePresence>
        {selectedCertification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Award size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedCertification.title}</h3>
                      <p className="text-sm text-gray-600">{selectedCertification.provider}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCertification(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Progress</h4>
                    <span className="text-lg font-bold text-primary-600">{selectedCertification.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={getProgressColor(selectedCertification.progress).split(' ')[1]}
                      style={{ width: `${selectedCertification.progress}%`, height: '8px', borderRadius: '9999px' }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>{selectedCertification.creditsOffered} NEP Credits</strong> available upon completion
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Course Modules</h4>
                  <div className="space-y-2">
                    {selectedCertification.modules.map((module) => (
                      <div key={module.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        {module.completed ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Circle size={16} className="text-gray-300" />
                        )}
                        <div className="flex-1">
                          <span className={`text-sm ${module.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {module.title}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star size={12} className="text-yellow-500" />
                            <span className="text-xs text-gray-500">{module.credits} credits</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedCertification(null)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue Learning
                  </button>
                  <button 
                    onClick={() => setSelectedCertification(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SkillCertifications