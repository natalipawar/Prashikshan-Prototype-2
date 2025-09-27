import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Users, Building2, ArrowRight } from 'lucide-react'
import { roleCardsData } from '../data/mockData'
import LoginModal from './LoginModal'

const RoleCards = () => {
  const [loginModal, setLoginModal] = useState({ isOpen: false, role: 'student' })

  const openLoginModal = (role) => {
    setLoginModal({ isOpen: true, role })
  }

  const closeLoginModal = () => {
    setLoginModal({ isOpen: false, role: 'student' })
  }

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'graduation-cap':
        return <GraduationCap className="w-8 h-8" />
      case 'users':
        return <Users className="w-8 h-8" />
      case 'building-2':
        return <Building2 className="w-8 h-8" />
      default:
        return <GraduationCap className="w-8 h-8" />
    }
  }

  const getGradientColors = (id) => {
    switch (id) {
      case 'student':
        return 'from-blue-500 to-primary-600'
      case 'faculty':
        return 'from-green-500 to-emerald-600'
      case 'industry':
        return 'from-purple-500 to-indigo-600'
      default:
        return 'from-primary-500 to-primary-600'
    }
  }

  return (
    <>
      <section id="role-cards" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Choose your role
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get started with the platform based on your role and requirements
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {roleCardsData.map((role, index) => (
              <motion.div
                key={role.id}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 card-hover group-hover:shadow-2xl group-hover:border-primary-200 transition-all duration-300">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(role.id)} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${getGradientColors(role.id)} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {getIcon(role.icon)}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                      {role.title}
                    </h3>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8">
                      {role.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.2) + (idx * 0.1) }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => openLoginModal(role.loginType)}
                      className={`w-full bg-gradient-to-r ${getGradientColors(role.id)} text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group/btn`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{role.title} Login</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColors(role.id)} rounded-full`}></div>
                  </div>
                  
                  <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div className={`w-20 h-20 bg-gradient-to-br ${getGradientColors(role.id)} rounded-full`}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional info */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm">
              Don't have an account? Contact your institution or 
              <a href="mailto:team@prashikshan.example" className="text-primary-600 hover:text-primary-700 ml-1 underline">
                reach out to us
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={closeLoginModal}
        defaultRole={loginModal.role}
      />
    </>
  )
}

export default RoleCards