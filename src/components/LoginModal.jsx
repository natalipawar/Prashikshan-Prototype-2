import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Building, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { validateForm } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({ isOpen, onClose, defaultRole = 'student' }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: defaultRole,
    institution: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()

  useEffect(() => {
    setFormData(prev => ({ ...prev, role: defaultRole }))
  }, [defaultRole])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const requiredFields = ['email', 'password']
    if (formData.role !== 'student') {
      requiredFields.push('institution')
    }

    const validation = validateForm(formData, requiredFields)

    if (!validation.isValid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const result = login(formData)
      
      if (result.success) {
        // Show success message
        console.log('Login successful:', result.user)
        onClose()

        // Navigate based on role
        if (formData.role === 'faculty') {
          navigate('/faculty')
        }
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          role: defaultRole,
          institution: ''
        })
        setErrors({})
        
        // Show success toast (could be implemented with a toast library)
        alert(`Welcome! You have successfully logged in as ${formData.role}.`)
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student': return <User className="w-5 h-5" />
      case 'faculty': return <User className="w-5 h-5" />
      case 'industry': return <Building className="w-5 h-5" />
      default: return <User className="w-5 h-5" />
    }
  }

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'student': return 'Student'
      case 'faculty': return 'Faculty/Admin'
      case 'industry': return 'Industry/Hirer'
      default: return 'User'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        className="modal-overlay" 
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getRoleIcon(formData.role)}
                <h2 id="login-modal-title" className="text-2xl font-semibold text-gray-900">
                  {getRoleDisplayName(formData.role)} Login
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close login modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty/Admin</option>
                  <option value="industry">Industry/Hirer</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {(formData.role === 'faculty' || formData.role === 'industry') && (
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.role === 'faculty' ? 'Institution Name' : 'Company Name'}
                  </label>
                  <div className="relative">
                    <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.institution ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={`Enter your ${formData.role === 'faculty' ? 'institution' : 'company'} name`}
                      required
                    />
                  </div>
                  {errors.institution && (
                    <p className="mt-1 text-sm text-red-600">{errors.institution}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
                
                <p className="text-sm text-gray-600 text-center">
                  Don't have an account? 
                  <button type="button" className="text-primary-600 hover:text-primary-700 ml-1 underline">
                    Contact your institution
                  </button>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LoginModal