import React, { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Menu,
  X,
  GraduationCap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const StudentSidebar = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { logout, user } = useAuth()

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('student_sidebar_collapsed')
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('student_sidebar_collapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    // Redirect will be handled by the route protection
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleNavigation = (sectionId) => {
    onSectionChange(sectionId)
    // Close mobile menu after navigation
    if (isMobileOpen) {
      setIsMobileOpen(false)
    }
  }

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '4rem' }
  }

  const textVariants = {
    expanded: { opacity: 1, display: 'block' },
    collapsed: { opacity: 0, display: 'none' }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobile}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl z-40 flex flex-col
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <motion.div 
            variants={textVariants}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Prashikshan</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </motion.div>
          
          {/* Desktop Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <motion.span
                  variants={textVariants}
                  animate={isCollapsed ? 'collapsed' : 'expanded'}
                  className="font-medium text-left"
                >
                  {item.label}
                </motion.span>
              </motion.button>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0) || 'S'}
              </span>
            </div>
            <motion.div
              variants={textVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              className="flex-1"
            >
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Student'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'student@example.com'}
              </p>
            </motion.div>
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <motion.span
              variants={textVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              className="font-medium"
            >
              Logout
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

export default StudentSidebar