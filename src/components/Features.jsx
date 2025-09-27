import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  LayoutDashboard, 
  MapPin, 
  BarChart3 
} from 'lucide-react'
import { featuresData } from '../data/mockData'

const Features = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'shield-check':
        return <ShieldCheck className="w-8 h-8" />
      case 'book-open':
        return <BookOpen className="w-8 h-8" />
      case 'graduation-cap':
        return <GraduationCap className="w-8 h-8" />
      case 'layout-dashboard':
        return <LayoutDashboard className="w-8 h-8" />
      case 'map-pin':
        return <MapPin className="w-8 h-8" />
      case 'bar-chart-3':
        return <BarChart3 className="w-8 h-8" />
      default:
        return <ShieldCheck className="w-8 h-8" />
    }
  }

  const getIconColor = (index) => {
    const colors = [
      'text-emerald-600 bg-emerald-100',
      'text-blue-600 bg-blue-100',
      'text-purple-600 bg-purple-100',
      'text-orange-600 bg-orange-100',
      'text-red-600 bg-red-100',
      'text-indigo-600 bg-indigo-100'
    ]
    return colors[index % colors.length]
  }

  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Features & Solutions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive tools and features designed to make internships effective, 
            transparent, and beneficial for all stakeholders
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <motion.div
                className={`inline-flex p-4 rounded-xl mb-6 ${getIconColor(index)} group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getIcon(feature.icon)}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional info section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Built for the New Education Policy (NEP) 2020
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Our platform is designed to align with NEP 2020 guidelines for experiential learning, 
              industry partnerships, and skill-based education. Every feature supports the goal of 
              making education more holistic and practical.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Multidisciplinary Approach</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Industry Integration</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Skill Development</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Rural Accessibility</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features