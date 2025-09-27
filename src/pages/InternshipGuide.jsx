import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckCircle, Users, Building, GraduationCap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const InternshipGuide = () => {
  const guideSteps = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Create your profile and complete verification process',
      icon: Users,
      details: [
        'Register with your college email',
        'Complete profile with skills and interests',
        'Upload required documents for verification',
        'Get faculty approval for internship participation'
      ]
    },
    {
      id: 2,
      title: 'Finding Internships',
      description: 'Browse and apply for verified opportunities',
      icon: Building,
      details: [
        'Use filters to find relevant internships',
        'Check company verification status',
        'Read internship requirements carefully',
        'Apply with a personalized cover letter'
      ]
    },
    {
      id: 3,
      title: 'During the Internship',
      description: 'Maintain logs and track your progress',
      icon: BookOpen,
      details: [
        'Fill daily logbook entries',
        'Add geo-tagged location data',
        'Upload work samples and certificates',
        'Communicate regularly with faculty mentor'
      ]
    },
    {
      id: 4,
      title: 'Completion & Credits',
      description: 'Get your work approved and earn credits',
      icon: GraduationCap,
      details: [
        'Submit final project and report',
        'Get faculty approval for completed work',
        'Receive internship completion certificate',
        'Credits are automatically added to academic record'
      ]
    }
  ]

  return (
    <div className="InternshipGuide">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  to="/" 
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Home</span>
                </Link>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-primary-600 rounded-xl">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                      Internship Guide
                    </h1>
                    <p className="text-xl text-gray-600 mt-2">
                      Everything you need to know about internships on Prashikshan
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Welcome to Your Internship Journey
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Prashikshan is designed to make internships meaningful, transparent, and beneficial 
                  for everyone involved. This guide will walk you through the entire process, from 
                  creating your profile to earning academic credits for your work.
                </p>
                
                <div className="bg-primary-50 rounded-2xl p-8 mb-12">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Key Benefits of Using Prashikshan
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-800">Verified employers and genuine opportunities</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-800">Digital logbooks with automatic report generation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-800">Faculty mentorship and credit mapping</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-primary-800">NEP 2020 compliant certification</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step-by-step Guide */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Step-by-Step Process
              </motion.h2>

              <div className="space-y-12">
                {guideSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={step.id}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {step.id}
                          </div>
                          <div className="mt-4 p-3 bg-primary-100 rounded-xl inline-flex">
                            <Icon className="w-6 h-6 text-primary-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-6">
                            {step.description}
                          </p>
                          
                          <div className="space-y-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Frequently Asked Questions
              </motion.h2>

              <div className="space-y-6">
                <motion.div
                  className="bg-gray-50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-gray-900 mb-3">
                    How do I know if an internship is genuine?
                  </h3>
                  <p className="text-gray-600">
                    All companies on our platform undergo KYC verification, and their internship 
                    offerings are validated by our team. Look for the "Verified" badge on listings.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Can I work on internships from rural areas?
                  </h3>
                  <p className="text-gray-600">
                    Yes! Our platform is designed with rural accessibility in mind, featuring 
                    offline-capable mobile interfaces and low-bandwidth options.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-gray-900 mb-3">
                    How are credits calculated and assigned?
                  </h3>
                  <p className="text-gray-600">
                    Credits are calculated based on hours worked, skills gained, and project complexity. 
                    Your faculty mentor reviews and approves the credit assignment based on NEP 2020 guidelines.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600">
          <div className="container-custom">
            <div className="max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Start Your Internship Journey?
                </h2>
                <p className="text-xl text-primary-100 mb-8">
                  Join thousands of students who are already building their careers through meaningful internships.
                </p>
                <Link 
                  to="/"
                  className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg inline-block"
                >
                  Get Started Now
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default InternshipGuide