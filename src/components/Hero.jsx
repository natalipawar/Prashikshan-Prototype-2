import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Laptop, MapPin, Zap, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { smoothScrollTo } from '../utils/helpers'

const Hero = () => {
  const handleGetStarted = () => {
    smoothScrollTo('features')
  }

  const floatingIcons = [
    { Icon: Laptop, delay: 0, position: 'top-20 right-20' },
    { Icon: Users, delay: 0.5, position: 'top-40 left-20' },
    { Icon: CheckCircle, delay: 1, position: 'bottom-40 right-10' },
    { Icon: MapPin, delay: 1.5, position: 'bottom-20 left-10' },
    { Icon: Zap, delay: 2, position: 'top-32 right-32' },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30 pt-20">
      {/* Background floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute hidden lg:block ${position} text-primary-200/40`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.6, 0.3],
              y: [20, -10, 5, -5, 0],
            }}
            transition={{
              delay,
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Icon size={32} />
          </motion.div>
        ))}
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">Prashikshan</span>
                <span className="block text-primary-600">
                  internships that connect
                </span>
                <span className="block">learning with real work</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover, apply, track and validate internships — designed for students, 
                colleges and industry.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={handleGetStarted}
                className="btn-primary text-lg px-8 py-4 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/guide" 
                  className="btn-secondary text-lg px-8 py-4 group"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Internship Guide
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium">Verified Employers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium">NEP Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium">Rural Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Main illustration container */}
              <motion.div
                className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 lg:p-12"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Students collaborating illustration placeholder */}
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-12 h-12 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-lg"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Laptop className="w-6 h-6 text-primary-600 mb-2" />
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl p-4 shadow-lg"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MapPin className="w-6 h-6 text-red-500 mb-2" />
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements around the main illustration */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-green-400 rounded-full shadow-lg flex items-center justify-center"
                animate={{ 
                  y: [0, 5, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => smoothScrollTo('role-cards')}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero