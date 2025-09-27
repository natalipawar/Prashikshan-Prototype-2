import React, { useState } from 'react'
import { Briefcase, MapPin, Calendar, DollarSign, Filter, Search, Star, Building, Users, Clock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { studentDashboardData } from '../../data/mockData'

const InternshipBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedWorkMode, setSelectedWorkMode] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const { availableOpportunities } = studentDashboardData

  const typeFilters = [
    { key: 'all', label: 'All Types' },
    { key: 'internship', label: 'Internships' },
    { key: 'research', label: 'Research Projects' },
    { key: 'government', label: 'Government' }
  ]

  const workModeFilters = [
    { key: 'all', label: 'All Modes' },
    { key: 'remote', label: 'Remote' },
    { key: 'hybrid', label: 'Hybrid' },
    { key: 'onsite', label: 'On-site' }
  ]

  const categoryFilters = [
    { key: 'all', label: 'All Categories' },
    { key: 'Technology', label: 'Technology' },
    { key: 'Research', label: 'Research' },
    { key: 'Government', label: 'Government' },
    { key: 'Marketing', label: 'Marketing' }
  ]

  const filteredOpportunities = availableOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = selectedType === 'all' || opp.type === selectedType
    const matchesWorkMode = selectedWorkMode === 'all' || opp.workMode === selectedWorkMode
    const matchesCategory = selectedCategory === 'all' || opp.category === selectedCategory

    return matchesSearch && matchesType && matchesWorkMode && matchesCategory
  })

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-800'
      case 'research': return 'bg-purple-100 text-purple-800'
      case 'government': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getWorkModeColor = (workMode) => {
    switch (workMode) {
      case 'remote': return 'bg-emerald-100 text-emerald-800'
      case 'hybrid': return 'bg-yellow-100 text-yellow-800'
      case 'onsite': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDeadline = (dateString) => {
    const deadline = new Date(dateString)
    const now = new Date()
    const diffTime = deadline - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { text: 'Expired', color: 'text-red-600', urgent: true }
    } else if (diffDays <= 3) {
      return { text: `${diffDays} days left`, color: 'text-red-600', urgent: true }
    } else if (diffDays <= 7) {
      return { text: `${diffDays} days left`, color: 'text-yellow-600', urgent: false }
    } else {
      return { text: deadline.toLocaleDateString(), color: 'text-gray-600', urgent: false }
    }
  }

  const cardVariants = {
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
          <h2 className="text-xl font-bold text-gray-900 mb-1">Browse Opportunities</h2>
          <p className="text-sm text-gray-600">Explore internships, research projects, and government programs</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredOpportunities.length} opportunities available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search internships, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {typeFilters.map(filter => (
                    <option key={filter.key} value={filter.key}>{filter.label}</option>
                  ))}
                </select>
              </div>

              {/* Work Mode Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
                <select
                  value={selectedWorkMode}
                  onChange={(e) => setSelectedWorkMode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {workModeFilters.map(filter => (
                    <option key={filter.key} value={filter.key}>{filter.label}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categoryFilters.map(filter => (
                    <option key={filter.key} value={filter.key}>{filter.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity, index) => {
          const deadlineInfo = formatDeadline(opportunity.applicationDeadline)
          
          return (
            <motion.div
              key={opportunity.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    {opportunity.type === 'government' ? <Building size={20} className="text-primary-600" /> :
                     opportunity.type === 'research' ? <Users size={20} className="text-primary-600" /> :
                     <Briefcase size={20} className="text-primary-600" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {opportunity.title}
                    </h3>
                    <p className="text-sm text-gray-600">{opportunity.company}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity.type)}`}>
                    {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkModeColor(opportunity.workMode)}`}>
                    {opportunity.workMode.charAt(0).toUpperCase() + opportunity.workMode.slice(1)}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{opportunity.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <DollarSign size={14} className="text-green-600" />
                    <span className="font-medium text-green-600">{opportunity.stipend}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-sm font-medium">{opportunity.credits} Credits</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {opportunity.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                      {skill}
                    </span>
                  ))}
                  {opportunity.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{opportunity.skills.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Clock size={14} className={deadlineInfo.color} />
                  <span className={`text-sm font-medium ${deadlineInfo.color}`}>
                    {deadlineInfo.text}
                  </span>
                  {deadlineInfo.urgent && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>

                <button className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                  <span>Apply Now</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No opportunities found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedType('all')
              setSelectedWorkMode('all')
              setSelectedCategory('all')
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default InternshipBrowser