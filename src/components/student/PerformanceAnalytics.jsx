import React from 'react'
import { BarChart3, TrendingUp, Award, Target, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const PerformanceAnalytics = () => {
  const { performance } = studentDashboardData

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

  // Calculate grade distribution percentages
  const totalGrades = Object.values(performance.gradeDistribution).reduce((sum, count) => sum + count, 0)
  const gradePercentages = Object.entries(performance.gradeDistribution).map(([grade, count]) => ({
    grade,
    count,
    percentage: totalGrades > 0 ? (count / totalGrades) * 100 : 0
  }))

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'bg-green-500'
      case 'B+': return 'bg-blue-500'
      case 'B': return 'bg-indigo-500'
      case 'C+': return 'bg-yellow-500'
      case 'C': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Performance & Analytics</h2>
          <p className="text-sm text-gray-600">Track your academic progress and achievements</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
          <span>Detailed Report</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPA Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Award size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Overall GPA</h3>
                <p className="text-sm text-gray-600">Current semester</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{performance.overallGPA}</div>
              <div className="text-xs text-green-600 flex items-center space-x-1">
                <TrendingUp size={12} />
                <span>+0.2 from last semester</span>
              </div>
            </div>
          </div>

          {/* GPA Scale */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full"
                style={{ width: `${(performance.overallGPA / 4) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0.0</span>
              <span>4.0</span>
            </div>
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Grade Distribution</h3>
              <p className="text-sm text-gray-600">{totalGrades} assignments graded</p>
            </div>
          </div>

          <div className="space-y-3">
            {gradePercentages.map(({ grade, count, percentage }) => (
              <div key={grade} className="flex items-center space-x-3">
                <div className="w-8 text-sm font-medium text-gray-700">{grade}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getGradeColor(grade)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 w-8">{count}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Trend */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Progress Trend</h3>
              <p className="text-sm text-gray-600">Last 5 months</p>
            </div>
          </div>

          {/* Simple Progress Chart */}
          <div className="space-y-3">
            {performance.progressTrend.map((month, index) => (
              <div key={month.month} className="flex items-center space-x-3">
                <div className="w-8 text-sm font-medium text-gray-700">{month.month}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${month.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 w-8">{month.progress}%</div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-green-600 font-medium">
              📈 Steady improvement over time!
            </p>
          </div>
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Skills Development</h3>
              <p className="text-sm text-gray-600">Current skill levels</p>
            </div>
          </div>

          <div className="space-y-4">
            {performance.skillsProgress.map((skill, index) => (
              <div key={skill.skill}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{skill.skill}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        custom={4}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Keep up the great work! 🎉</h3>
            <p className="text-sm text-gray-600">
              You're performing well across all subjects. Focus on improving your Machine Learning and Digital Marketing skills.
            </p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
            View Recommendations
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default PerformanceAnalytics