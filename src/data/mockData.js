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

// Student Dashboard Mock Data
export const studentDashboardData = {
  overview: {
    coursesEnrolled: 6,
    assignmentsPending: 3,
    overallProgress: 72,
    unreadMessages: 5
  },
  
  courses: [
    {
      id: 'cs101',
      title: 'Web Development Fundamentals',
      subject: 'Computer Science',
      progress: 85,
      instructor: 'Dr. Sarah Johnson',
      nextClass: '2024-01-20T10:00:00Z',
      thumbnail: '/course-web.jpg',
      status: 'active',
      modules: [
        { id: 1, title: 'HTML & CSS Basics', completed: true },
        { id: 2, title: 'JavaScript Fundamentals', completed: true },
        { id: 3, title: 'React Introduction', completed: false },
        { id: 4, title: 'Backend with Node.js', completed: false }
      ]
    },
    {
      id: 'ml201',
      title: 'Machine Learning Basics',
      subject: 'Data Science',
      progress: 60,
      instructor: 'Prof. Raj Patel',
      nextClass: '2024-01-21T14:00:00Z',
      thumbnail: '/course-ml.jpg',
      status: 'active',
      modules: [
        { id: 1, title: 'Python for ML', completed: true },
        { id: 2, title: 'Data Preprocessing', completed: true },
        { id: 3, title: 'Supervised Learning', completed: false },
        { id: 4, title: 'Neural Networks', completed: false }
      ]
    },
    {
      id: 'dm101',
      title: 'Digital Marketing Strategy',
      subject: 'Marketing',
      progress: 45,
      instructor: 'Ms. Priya Sharma',
      nextClass: '2024-01-22T11:00:00Z',
      thumbnail: '/course-marketing.jpg',
      status: 'active',
      modules: [
        { id: 1, title: 'Social Media Basics', completed: true },
        { id: 2, title: 'Content Strategy', completed: false },
        { id: 3, title: 'Analytics & Metrics', completed: false },
        { id: 4, title: 'Campaign Management', completed: false }
      ]
    }
  ],
  
  assignments: [
    {
      id: 'a1',
      title: 'React Component Library',
      course: 'Web Development Fundamentals',
      courseId: 'cs101',
      dueDate: '2024-01-21T23:59:00Z',
      status: 'pending',
      priority: 'high',
      description: 'Create a reusable component library with 5 components',
      submissionType: 'code',
      points: 100
    },
    {
      id: 'a2',
      title: 'Customer Segmentation Analysis',
      course: 'Machine Learning Basics',
      courseId: 'ml201',
      dueDate: '2024-01-25T23:59:00Z',
      status: 'pending',
      priority: 'medium',
      description: 'Apply clustering algorithms to customer data',
      submissionType: 'report',
      points: 150
    },
    {
      id: 'a3',
      title: 'Social Media Campaign Proposal',
      course: 'Digital Marketing Strategy',
      courseId: 'dm101',
      dueDate: '2024-01-28T23:59:00Z',
      status: 'draft',
      priority: 'low',
      description: 'Design a comprehensive social media campaign',
      submissionType: 'presentation',
      points: 80
    },
    {
      id: 'a4',
      title: 'Database Design Project',
      course: 'Web Development Fundamentals',
      courseId: 'cs101',
      dueDate: '2024-01-15T23:59:00Z',
      status: 'submitted',
      priority: 'high',
      description: 'Design and implement a relational database',
      submissionType: 'code',
      points: 120,
      grade: 'A-',
      feedback: 'Excellent work on normalization!'
    }
  ],
  
  recentActivity: [
    {
      id: 'act1',
      type: 'assignment_submitted',
      title: 'Submitted Database Design Project',
      course: 'Web Development Fundamentals',
      timestamp: '2024-01-15T16:30:00Z',
      icon: 'check-circle'
    },
    {
      id: 'act2',
      type: 'grade_received',
      title: 'Received grade for Python Basics Quiz',
      course: 'Machine Learning Basics',
      timestamp: '2024-01-14T09:15:00Z',
      icon: 'award',
      grade: 'B+'
    },
    {
      id: 'act3',
      type: 'module_completed',
      title: 'Completed JavaScript Fundamentals',
      course: 'Web Development Fundamentals',
      timestamp: '2024-01-13T14:20:00Z',
      icon: 'book-open'
    },
    {
      id: 'act4',
      type: 'message_received',
      title: 'New message from Dr. Sarah Johnson',
      course: 'Web Development Fundamentals',
      timestamp: '2024-01-12T11:45:00Z',
      icon: 'mail'
    }
  ],
  
  messages: [
    {
      id: 'm1',
      sender: {
        name: 'Dr. Sarah Johnson',
        avatar: '/avatar-sarah.jpg',
        role: 'instructor'
      },
      subject: 'Great work on your recent submission',
      preview: 'I wanted to commend you on the excellent work you submitted for the database design project...',
      timestamp: '2024-01-12T11:45:00Z',
      unread: true,
      course: 'Web Development Fundamentals'
    },
    {
      id: 'm2',
      sender: {
        name: 'Prof. Raj Patel',
        avatar: '/avatar-raj.jpg',
        role: 'instructor'
      },
      subject: 'Upcoming ML Assignment Guidelines',
      preview: 'Please find attached the detailed guidelines for the customer segmentation assignment...',
      timestamp: '2024-01-11T15:20:00Z',
      unread: true,
      course: 'Machine Learning Basics'
    },
    {
      id: 'm3',
      sender: {
        name: 'Academic Office',
        avatar: '/avatar-admin.jpg',
        role: 'admin'
      },
      subject: 'Mid-term Schedule Released',
      preview: 'The mid-term examination schedule has been published. Please check your dashboard...',
      timestamp: '2024-01-10T08:30:00Z',
      unread: false,
      course: null
    }
  ],
  
  performance: {
    overallGPA: 3.7,
    gradeDistribution: {
      'A': 3,
      'B+': 2,
      'B': 1,
      'C+': 1,
      'C': 0
    },
    progressTrend: [
      { month: 'Sep', progress: 45 },
      { month: 'Oct', progress: 62 },
      { month: 'Nov', progress: 68 },
      { month: 'Dec', progress: 72 },
      { month: 'Jan', progress: 75 }
    ],
    skillsProgress: [
      { skill: 'JavaScript', level: 85 },
      { skill: 'Python', level: 70 },
      { skill: 'React', level: 60 },
      { skill: 'Machine Learning', level: 55 },
      { skill: 'Digital Marketing', level: 40 }
    ]
  },
  
  upcomingDeadlines: [
    {
      id: 'deadline1',
      title: 'React Component Library',
      course: 'Web Development Fundamentals',
      dueDate: '2024-01-21T23:59:00Z',
      type: 'assignment',
      priority: 'high'
    },
    {
      id: 'deadline2',
      title: 'ML Midterm Exam',
      course: 'Machine Learning Basics',
      dueDate: '2024-01-24T10:00:00Z',
      type: 'exam',
      priority: 'high'
    }
  ]
}

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