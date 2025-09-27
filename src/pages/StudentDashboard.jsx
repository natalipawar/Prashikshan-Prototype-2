import React, { useState } from 'react'
import { motion } from 'framer-motion'
import StudentSidebar from '../components/student/StudentSidebar'
import StudentHeader from '../components/student/StudentHeader'
import OverviewStats from '../components/student/OverviewStats'
import AlertBanner from '../components/student/AlertBanner'
import CourseProgress from '../components/student/CourseProgress'
import AssignmentsList from '../components/student/AssignmentsList'
import ActivityFeed from '../components/student/ActivityFeed'
import MessagesWidget from '../components/student/MessagesWidget'
import PerformanceAnalytics from '../components/student/PerformanceAnalytics'

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'courses':
        return (
          <div className="space-y-8">
            <CourseProgress />
            <PerformanceAnalytics />
          </div>
        )
      case 'assignments':
        return <AssignmentsList />
      case 'progress':
        return <PerformanceAnalytics />
      case 'messages':
        return <MessagesWidget />
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings page will be implemented here.</p>
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            <OverviewStats />
            <AlertBanner />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <CourseProgress />
                <AssignmentsList />
              </div>
              <div className="space-y-8">
                <ActivityFeed />
                <MessagesWidget />
              </div>
            </div>
          </div>
        )
    }
  }

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'courses':
        return 'My Courses'
      case 'assignments':
        return 'Assignments'
      case 'progress':
        return 'Progress & Analytics'
      case 'messages':
        return 'Messages'
      case 'settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <StudentHeader 
          title={getSectionTitle()}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={activeSection} // This ensures animation triggers on section change
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="p-6 max-w-7xl mx-auto"
          >
            {renderDashboardContent()}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              © 2024 Prashikshan. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-primary-600 transition-colors">Help</button>
              <button className="hover:text-primary-600 transition-colors">Support</button>
              <button className="hover:text-primary-600 transition-colors">Privacy</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default StudentDashboard