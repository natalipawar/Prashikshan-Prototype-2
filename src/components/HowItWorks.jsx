import React from 'react'
import { motion } from 'framer-motion'
import { UserCheck, ClipboardList, Award, ArrowRight } from 'lucide-react'
import { howItWorksSteps } from '../data/mockData'

const HowItWorks = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'user-check':
        return <UserCheck className="w-8 h-8" />
      case 'clipboard-list':
        return <ClipboardList className="w-8 h-8" />
      case 'award':
        return <Award className="w-8 h-8" />
      default:
        return <UserCheck className="w-8 h-8" />
    }
  }

  const getStepColor = (index) => {
    const colors = [
      { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' }
    ]
    return colors[index % colors.length]
  }

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Simple, transparent process that benefits students, institutions, and industry partners
          </motion.p>
        </div>

        {/* Desktop Layout - Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-20 left-0 w-full h-0.5 bg-gray-200"></div>
            
            <div className="grid grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => {
                const colors = getStepColor(index)
                return (
                  <motion.div
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Step Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                      {/* Step Number */}
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} text-white rounded-full font-bold text-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {step.id}
                      </div>

                      {/* Icon */}
                      <motion.div
                        className={`inline-flex p-3 rounded-xl ${colors.light} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getIcon(step.icon)}
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    {index < howItWorksSteps.length - 1 && (
                      <motion.div
                        className="absolute top-20 -right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary-600 z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: (index * 0.2) + 0.3 }}
                        viewport={{ once: true }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical Flow */}
        <div className="lg:hidden space-y-8">
          {howItWorksSteps.map((step, index) => {
            const colors = getStepColor(index)
            return (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-6">
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} text-white rounded-full font-bold text-lg mb-4`}>
                      {step.id}
                    </div>
                    <motion.div
                      className={`inline-flex p-3 rounded-xl ${colors.light} ${colors.text}`}
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {getIcon(step.icon)}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Vertical Connector */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <motion.div
                      className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of students, faculty, and industry partners who are already 
              using Prashikshan to create meaningful internship experiences.
            </p>
            <motion.button
              className="btn-primary text-lg px-8 py-4 group"
              onClick={() => document.getElementById('role-cards')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Choose Your Role
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks