import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, GraduationCap } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { navItems } from '../data/mockData'
import { smoothScrollTo } from '../utils/helpers'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loginModal, setLoginModal] = useState({ isOpen: false, role: 'student' })
  const { user, logout, isLoggedIn } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const elementId = href.substring(1)
      smoothScrollTo(elementId)
    }
    setIsMobileMenuOpen(false)
  }

  const openLoginModal = (role) => {
    setLoginModal({ isOpen: true, role })
    setIsMobileMenuOpen(false)
  }

  const closeLoginModal = () => {
    setLoginModal({ isOpen: false, role: 'student' })
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-primary-600 rounded-xl group-hover:bg-primary-700 transition-colors">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-900">
                Prashikshan
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : item.href.startsWith('mailto:') ? (
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Login Buttons / User Menu */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn() ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.role}!
                  </span>
                  {user.role === 'faculty' && (
                    <Link
                      to="/faculty-demo"
                      className="btn-secondary text-sm px-4 py-2"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openLoginModal('student')}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={() => openLoginModal('faculty')}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Faculty Login
                  </button>
                  <button
                    onClick={() => openLoginModal('industry')}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Industry Login
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/20'
          }`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="container-custom py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-left w-full"
                    >
                      {item.name}
                    </button>
                  ) : item.href.startsWith('mailto:') ? (
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-primary-600 font-medium transition-colors block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Login Buttons / User Menu */}
              <div className="pt-4 border-t border-gray-200">
                {isLoggedIn() ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Welcome, {user.role}!
                    </p>
                    {user.role === 'faculty' && (
                      <Link
                        to="/faculty-demo"
                        className="btn-secondary text-sm px-4 py-2 w-full text-center block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => openLoginModal('student')}
                      className="btn-secondary text-sm px-4 py-2 w-full"
                    >
                      Student Login
                    </button>
                    <button
                      onClick={() => openLoginModal('faculty')}
                      className="btn-secondary text-sm px-4 py-2 w-full"
                    >
                      Faculty Login
                    </button>
                    <button
                      onClick={() => openLoginModal('industry')}
                      className="btn-primary text-sm px-4 py-2 w-full"
                    >
                      Industry Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={closeLoginModal}
        defaultRole={loginModal.role}
      />
    </>
  )
}

export default Navbar