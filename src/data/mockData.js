// Mock internship data
export const mockInternships = [
  {
    id: '1',
    title: 'Full Stack Development Internship',
    company: 'TechCorp Solutions',
    location: 'Mumbai, Maharashtra',
    duration: '3 months',
    stipend: '₹15,000/month',
    skills: ['React', 'Node.js', 'MongoDB'],
    description: 'Work on real-world web applications with our development team.',
    verified: true,
    rural: false,
    applications: 45
  },
  {
    id: '2',
    title: 'Digital Marketing Internship',
    company: 'Rural Connect NGO',
    location: 'Nashik, Maharashtra',
    duration: '2 months',
    stipend: '₹8,000/month',
    skills: ['Social Media', 'Content Writing', 'Analytics'],
    description: 'Help promote rural development programs through digital channels.',
    verified: true,
    rural: true,
    applications: 23
  },
  {
    id: '3',
    title: 'Data Science Internship',
    company: 'Analytics Pro',
    location: 'Pune, Maharashtra',
    duration: '4 months',
    stipend: '₹20,000/month',
    skills: ['Python', 'Machine Learning', 'SQL'],
    description: 'Analyze business data and build predictive models.',
    verified: true,
    rural: false,
    applications: 67
  }
]

// Mock student logbook entries
export const mockLogbookEntries = [
  {
    id: '1',
    studentName: 'Priya Sharma',
    date: '2024-01-15',
    company: 'TechCorp Solutions',
    hours: 8,
    description: 'Worked on frontend components for the user dashboard. Implemented responsive design using React and Tailwind CSS.',
    skills: ['React', 'CSS', 'JavaScript'],
    status: 'pending',
    location: { lat: 19.0760, lng: 72.8777 }, // Mumbai coords
    verified: true
  },
  {
    id: '2',
    studentName: 'Rahul Patel',
    date: '2024-01-14',
    company: 'Analytics Pro',
    hours: 7,
    description: 'Data cleaning and preprocessing for customer segmentation project. Used Python pandas for data manipulation.',
    skills: ['Python', 'Data Analysis'],
    status: 'approved',
    location: { lat: 18.5204, lng: 73.8567 }, // Pune coords
    verified: true
  },
  {
    id: '3',
    studentName: 'Sneha Kumar',
    date: '2024-01-13',
    company: 'Rural Connect NGO',
    hours: 6,
    description: 'Created social media content calendar for January. Designed graphics for rural education awareness campaign.',
    skills: ['Content Creation', 'Design', 'Social Media'],
    status: 'pending',
    location: { lat: 19.9975, lng: 73.7898 }, // Nashik coords
    verified: true
  }
]

// Feature data for the homepage
export const featuresData = [
  {
    id: 1,
    title: 'Verified Internships',
    description: 'Verified employers, KYC & faculty validation to prevent fake internships.',
    icon: 'shield-check'
  },
  {
    id: 2,
    title: 'Digital Logbooks',
    description: 'Time-stamped daily logs with geo-tagging and automatic report generation.',
    icon: 'book-open'
  },
  {
    id: 3,
    title: 'Skill Modules',
    description: 'Short pre-internship modules and badges to make students industry-ready.',
    icon: 'graduation-cap'
  },
  {
    id: 4,
    title: 'Faculty Dashboard',
    description: 'Approve logs, map credits, and mentor interns with ease.',
    icon: 'layout-dashboard'
  },
  {
    id: 5,
    title: 'Rural Support',
    description: 'Offline-first mobile pages and low-bandwidth friendly UI.',
    icon: 'map-pin'
  },
  {
    id: 6,
    title: 'Analytics',
    description: 'Institution-level insights on participation and skill gaps.',
    icon: 'bar-chart-3'
  }
]

// How it works steps
export const howItWorksSteps = [
  {
    id: 1,
    title: 'Register & Verify',
    description: 'Students, colleges, and industries register and complete verification',
    icon: 'user-check'
  },
  {
    id: 2,
    title: 'Apply & Monitor',
    description: 'Apply for internships and maintain daily digital logbooks',
    icon: 'clipboard-list'
  },
  {
    id: 3,
    title: 'Approve & Credit',
    description: 'Faculty approves work and certificates are issued',
    icon: 'award'
  }
]

// Industry benefits
export const industryBenefits = [
  'CSR & skill building initiatives',
  'Access to untapped talent from rural areas',
  'Simplified onboarding & verified reports'
]

// Testimonial
export const testimonial = {
  quote: "Prashikshan helped us reach students in smaller towns and find dedicated interns who brought fresh perspectives to our projects.",
  author: "Rajesh Kumar, HR Manager",
  company: "TechCorp Solutions"
}

// Navigation items
export const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Internship Guide', href: '/guide' },
  { name: 'Contact', href: 'mailto:team@prashikshan.example' }
]

// Role cards data
export const roleCardsData = [
  {
    id: 'student',
    title: 'Student',
    benefits: ['Apply for verified internships', 'Maintain digital logbooks', 'Earn industry skills'],
    icon: 'graduation-cap',
    loginType: 'student'
  },
  {
    id: 'faculty',
    title: 'Faculty',
    benefits: ['Monitor student progress', 'Approve internship credits', 'Mentor remotely'],
    icon: 'users',
    loginType: 'faculty'
  },
  {
    id: 'industry',
    title: 'Industry',
    benefits: ['Post internship roles', 'Evaluate candidates', 'Access talent pool'],
    icon: 'building-2',
    loginType: 'industry'
  }
]