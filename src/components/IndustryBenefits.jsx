import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Quote, Users as Users2, ArrowRight, Users, Target, TrendingUp } from 'lucide-react'
import { industryBenefits, testimonial } from '../data/mockData'

const IndustryBenefits = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Industry Benefits */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why industries should join
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Partner with educational institutions to build a skilled workforce 
              while contributing to community development
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {industryBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </motion.div>
              ))}
              
              {/* Additional benefits with icons */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <motion.div
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Fresh Talent Pool</p>
                </motion.div>
                
                <motion.div
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Reduced Hiring Costs</p>
                </motion.div>
                
                <motion.div
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Brand Recognition</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative">
                <Quote className="w-12 h-12 text-primary-500 mb-6 opacity-20 absolute top-4 right-4" />
                
                <div className="relative z-10">
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      R
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Partnership Callout */}
        <motion.div
          className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex p-4 bg-white/20 rounded-2xl mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users2 className="w-12 h-12 text-white" />
          </motion.div>
          
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Pilot program available for colleges & government
          </h3>
          
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Partner with us for NEP-compliant internship implementation. 
            We're offering pilot programs for early adopters to test and refine 
            the platform according to your specific needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Request Pilot Program</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.a
              href="mailto:partnerships@prashikshan.example"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Partnerships Team</span>
            </motion.a>
          </div>
          
          {/* Features highlight for institutions */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12 text-left">
            <motion.div
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-8 h-8 text-white mb-3" />
              <h4 className="font-semibold text-white mb-2">Custom Branding</h4>
              <p className="text-primary-100 text-sm">Platform can be customized with your institution's branding and requirements</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-8 h-8 text-white mb-3" />
              <h4 className="font-semibold text-white mb-2">Training & Support</h4>
              <p className="text-primary-100 text-sm">Comprehensive training for faculty and staff on platform usage</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-8 h-8 text-white mb-3" />
              <h4 className="font-semibold text-white mb-2">Data Analytics</h4>
              <p className="text-primary-100 text-sm">Detailed insights and reports on student participation and outcomes</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default IndustryBenefits