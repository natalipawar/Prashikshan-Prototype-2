import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Laptop, MapPin, Zap, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { smoothScrollTo } from '../utils/helpers'

const Hero = () => {
  const handleGetStarted = () => {
    smoothScrollTo('role-cards')
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[600px]">
          {/* Left Content */}
          <motion.div
            className="space-y-10 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block font-extrabold">Prashikshan</span>
                <span className="block text-primary-600 mt-2 font-bold">
                  internships that connect
                </span>
                <span className="block mt-2 font-bold">learning with real work</span>
              </motion.h1>
              
              <motion.div
                className="space-y-4 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                  <span className="font-semibold">Discover, apply, track and validate internships</span>
                </p>
                <p className="text-base lg:text-lg text-gray-500 leading-relaxed">
                  Designed for students, colleges and industry.
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={handleGetStarted}
                className="btn-primary text-base px-8 py-4 group shadow-lg"
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
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-base group shadow-lg"
                >
                  <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Internship Guide
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium">Verified Employers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium">NEP Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium">Rural Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative max-w-lg w-full">
              {/* Main illustration container */}
              <motion.div
                className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-10 lg:p-12 shadow-xl"
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
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-10 h-10 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-white rounded-xl p-5 shadow-lg"
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
                      className="bg-white rounded-xl p-5 shadow-lg"
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
                      className="bg-white rounded-xl p-5 shadow-lg"
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
                      className="bg-white rounded-xl p-5 shadow-lg"
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
                className="absolute -top-6 -left-6 w-14 h-14 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center"
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
                <Zap className="w-7 h-7 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -right-8 w-18 h-18 bg-green-400 rounded-full shadow-lg flex items-center justify-center"
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
                <CheckCircle className="w-9 h-9 text-white" />
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