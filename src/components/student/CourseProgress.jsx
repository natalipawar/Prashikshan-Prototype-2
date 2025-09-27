import React, { useState } from 'react'
import { BookOpen, Play, User, Calendar, ChevronRight, CheckCircle, Circle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const CourseProgress = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { courses } = studentDashboardData

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 bg-green-500'
    if (progress >= 60) return 'text-blue-600 bg-blue-500'
    if (progress >= 40) return 'text-yellow-600 bg-yellow-500'
    return 'text-red-600 bg-red-500'
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
          <h2 className="text-xl font-bold text-gray-900 mb-1">Course Progress</h2>
          <p className="text-sm text-gray-600">Continue your learning journey</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const progressColor = getProgressColor(course.progress)
          const completedModules = course.modules.filter(m => m.completed).length
          const totalModules = course.modules.length
          
          return (
            <motion.div
              key={course.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer group"
            >
              {/* Course Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <BookOpen size={24} className="text-primary-600" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${progressColor.replace('bg-', 'bg-').replace('text-', 'text-white bg-')}`}>
                    {course.progress}%
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{course.subject}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{completedModules}/{totalModules} modules</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={progressColor.split(' ')[1]}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      style={{ height: '8px', borderRadius: '9999px' }}
                    />
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center space-x-2 mb-3">
                  <User size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-600">{course.instructor}</span>
                </div>

                {/* Next Class */}
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-600">
                    Next: {formatDate(course.nextClass)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-50 hover:bg-primary-100 text-primary-600 py-2.5 rounded-lg transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <Play size={16} />
                  <span className="font-medium">Continue Learning</span>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
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
                      <BookOpen size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedCourse.title}</h3>
                      <p className="text-sm text-gray-600">{selectedCourse.subject}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
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
                    <h4 className="font-medium text-gray-900">Course Progress</h4>
                    <span className="text-lg font-bold text-primary-600">{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={getProgressColor(selectedCourse.progress).split(' ')[1]}
                      style={{ width: `${selectedCourse.progress}%`, height: '8px', borderRadius: '9999px' }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Course Modules</h4>
                  <div className="space-y-2">
                    {selectedCourse.modules.map((module) => (
                      <div key={module.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        {module.completed ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Circle size={16} className="text-gray-300" />
                        )}
                        <span className={`text-sm ${module.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {module.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue Learning
                  </button>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    View Course Details
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

export default CourseProgress