import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RoleCards from '../components/RoleCards'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import IndustryBenefits from '../components/IndustryBenefits'
import Footer from '../components/Footer'
import { generateSeedData } from '../utils/helpers'

const HomePage = () => {
  useEffect(() => {
    // Generate seed data on first load
    generateSeedData()
  }, [])

  return (
    <div className="HomePage">
      <Navbar />
      <main>
        <Hero />
        <RoleCards />
        <Features />
        <HowItWorks />
        <IndustryBenefits />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage