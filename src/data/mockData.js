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
  // Student Profile Information
  studentProfile: {
    name: 'Priya Sharma',
    email: 'priya.sharma@student.edu',
    avatar: '/avatar-student.jpg',
    studentId: 'ST2024001',
    institution: 'Mumbai University',
    year: '3rd Year',
    branch: 'Computer Science Engineering',
    internshipsCompleted: 2,
    skillsLearned: ['JavaScript', 'React', 'Python', 'Machine Learning', 'Digital Marketing'],
    creditsEarned: 18,
    totalCreditsRequired: 24
  },
  
  overview: {
    internshipsActive: 1,
    internshipsCompleted: 2,
    skillCertifications: 5,
    creditsEarned: 18,
    logbooksPending: 3
  },
  
  skillCertifications: [
    {
      id: 'cert001',
      title: 'Full Stack Web Development',
      provider: 'Google Career Certificates',
      category: 'Technology',
      progress: 85,
      duration: '3 months',
      difficulty: 'Intermediate',
      thumbnail: '/cert-fullstack.jpg',
      status: 'in-progress',
      creditsOffered: 4,
      modules: [
        { id: 1, title: 'HTML, CSS & JavaScript', completed: true, credits: 1 },
        { id: 2, title: 'React & Frontend Frameworks', completed: true, credits: 1 },
        { id: 3, title: 'Node.js & Backend APIs', completed: false, credits: 1 },
        { id: 4, title: 'Database & Deployment', completed: false, credits: 1 }
      ]
    },
    {
      id: 'cert002',
      title: 'Data Science with Python',
      provider: 'IBM SkillsBuild',
      category: 'Data Science',
      progress: 60,
      duration: '4 months',
      difficulty: 'Advanced',
      thumbnail: '/cert-datascience.jpg',
      status: 'in-progress',
      creditsOffered: 6,
      modules: [
        { id: 1, title: 'Python Programming Basics', completed: true, credits: 1.5 },
        { id: 2, title: 'Data Analysis with Pandas', completed: true, credits: 1.5 },
        { id: 3, title: 'Machine Learning Algorithms', completed: false, credits: 1.5 },
        { id: 4, title: 'Deep Learning & Neural Networks', completed: false, credits: 1.5 }
      ]
    },
    {
      id: 'cert003',
      title: 'Digital Marketing Fundamentals',
      provider: 'Meta Blueprint',
      category: 'Marketing',
      progress: 45,
      duration: '2 months',
      difficulty: 'Beginner',
      thumbnail: '/cert-marketing.jpg',
      status: 'in-progress',
      creditsOffered: 3,
      modules: [
        { id: 1, title: 'Social Media Marketing', completed: true, credits: 1 },
        { id: 2, title: 'Content Strategy & Creation', completed: false, credits: 1 },
        { id: 3, title: 'Analytics & Performance', completed: false, credits: 1 }
      ]
    }
  ],
  
  // Available Internships/Projects
  availableOpportunities: [
    {
      id: 'int001',
      title: 'Full Stack Developer Intern',
      company: 'TechCorp Solutions',
      type: 'internship',
      category: 'Technology',
      location: 'Mumbai, Maharashtra',
      workMode: 'hybrid',
      duration: '6 months',
      stipend: '₹25,000/month',
      credits: 6,
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      description: 'Work on real-world web applications with our development team. Gain hands-on experience in modern web technologies.',
      applicationDeadline: '2024-02-15T23:59:00Z',
      startDate: '2024-03-01T00:00:00Z',
      verified: true
    },
    {
      id: 'proj001',
      title: 'AI in Healthcare Research',
      company: 'IIT Bombay',
      type: 'research',
      category: 'Research',
      location: 'Mumbai, Maharashtra',
      workMode: 'onsite',
      duration: '4 months',
      stipend: '₹15,000/month',
      credits: 4,
      skills: ['Machine Learning', 'Python', 'Healthcare Analytics'],
      description: 'Research project on applying AI algorithms to healthcare data analysis.',
      applicationDeadline: '2024-02-20T23:59:00Z',
      startDate: '2024-03-15T00:00:00Z',
      verified: true
    },
    {
      id: 'gov001',
      title: 'Digital India Initiative',
      company: 'Ministry of Electronics & IT',
      type: 'government',
      category: 'Government',
      location: 'New Delhi',
      workMode: 'remote',
      duration: '3 months',
      stipend: '₹18,000/month',
      credits: 5,
      skills: ['Digital Literacy', 'Public Policy', 'Technology Implementation'],
      description: 'Contribute to Digital India initiatives focused on rural digitization.',
      applicationDeadline: '2024-02-25T23:59:00Z',
      startDate: '2024-03-10T00:00:00Z',
      verified: true
    }
  ],
  
  // Daily Logbook Entries
  dailyLogbook: [
    {
      id: 'log001',
      date: '2024-01-20',
      internship: 'TechCorp Solutions',
      hoursWorked: 8,
      tasksAssigned: [
        'Implement user authentication module',
        'Write unit tests for API endpoints',
        'Update documentation for new features'
      ],
      tasksCompleted: [
        'Implement user authentication module',
        'Write unit tests for API endpoints'
      ],
      tasksPending: [
        'Update documentation for new features'
      ],
      description: 'Worked on implementing JWT-based authentication system. Successfully integrated with React frontend.',
      skills: ['React', 'JWT', 'Node.js'],
      status: 'submitted',
      mentorFeedback: 'Good progress on authentication implementation.',
      location: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 'log002',
      date: '2024-01-19',
      internship: 'TechCorp Solutions',
      hoursWorked: 7,
      tasksAssigned: [
        'Research database optimization techniques',
        'Fix responsive design issues',
        'Code review for team members'
      ],
      tasksCompleted: [
        'Research database optimization techniques',
        'Fix responsive design issues',
        'Code review for team members'
      ],
      tasksPending: [],
      description: 'Completed all assigned tasks including database research and responsive fixes.',
      skills: ['CSS', 'Database Optimization', 'Code Review'],
      status: 'approved',
      mentorFeedback: 'Excellent work on all tasks! Great attention to detail.',
      location: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 'log003',
      date: '2024-01-21',
      internship: 'TechCorp Solutions',
      hoursWorked: 0,
      tasksAssigned: [
        'Prepare presentation for client demo',
        'Implement search functionality',
        'Update API documentation'
      ],
      tasksCompleted: [],
      tasksPending: [
        'Prepare presentation for client demo',
        'Implement search functionality',
        'Update API documentation'
      ],
      description: '',
      skills: [],
      status: 'pending',
      mentorFeedback: '',
      location: null
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
  
  // Notifications & Deadlines
  notifications: [
    {
      id: 'notif001',
      type: 'deadline',
      title: 'Logbook Submission Due Tomorrow',
      message: 'Please submit your daily logbook for TechCorp Solutions internship by 11:59 PM tomorrow.',
      timestamp: '2024-01-20T10:00:00Z',
      deadline: '2024-01-21T23:59:00Z',
      priority: 'high',
      unread: true,
      actionRequired: true,
      category: 'logbook'
    },
    {
      id: 'notif002',
      type: 'opportunity',
      title: 'New Government Internship Posted',
      message: 'Digital India Initiative internship applications are now open. Apply before Feb 25.',
      timestamp: '2024-01-19T14:30:00Z',
      deadline: '2024-02-25T23:59:00Z',
      priority: 'medium',
      unread: true,
      actionRequired: true,
      category: 'application'
    },
    {
      id: 'notif003',
      type: 'interview',
      title: 'Interview Scheduled - TechCorp Solutions',
      message: 'Your interview for Full Stack Developer position is scheduled for Jan 25 at 2:00 PM.',
      timestamp: '2024-01-18T16:15:00Z',
      deadline: '2024-01-25T14:00:00Z',
      priority: 'high',
      unread: false,
      actionRequired: true,
      category: 'interview'
    },
    {
      id: 'notif004',
      type: 'achievement',
      title: 'Skill Certification Completed',
      message: 'Congratulations! You have earned 3 NEP credits for completing Digital Marketing Fundamentals.',
      timestamp: '2024-01-17T12:00:00Z',
      deadline: null,
      priority: 'low',
      unread: false,
      actionRequired: false,
      category: 'achievement'
    },
    {
      id: 'notif005',
      type: 'reminder',
      title: 'Weekly Progress Review',
      message: 'Time to review your weekly progress and update your learning goals.',
      timestamp: '2024-01-16T09:00:00Z',
      deadline: '2024-01-23T23:59:00Z',
      priority: 'low',
      unread: false,
      actionRequired: false,
      category: 'progress'
    }
  ],
  
  // NEP Credits Information
  nepCredits: {
    totalCreditsEarned: 18,
    totalCreditsRequired: 24,
    creditsRemaining: 6,
    currentSemesterCredits: 8,
    creditsBreakdown: [
      {
        category: 'Internships',
        credits: 12,
        maxCredits: 16,
        percentage: 75,
        details: [
          { source: 'TechCorp Solutions (Current)', credits: 6, status: 'in-progress' },
          { source: 'StartupXYZ (Completed)', credits: 6, status: 'completed' }
        ]
      },
      {
        category: 'Skill Certifications',
        credits: 6,
        maxCredits: 8,
        percentage: 75,
        details: [
          { source: 'Full Stack Web Development', credits: 2, status: 'in-progress' },
          { source: 'Digital Marketing Fundamentals', credits: 3, status: 'completed' },
          { source: 'Python Programming', credits: 1, status: 'completed' }
        ]
      },
      {
        category: 'Research Projects',
        credits: 0,
        maxCredits: 4,
        percentage: 0,
        details: []
      }
    ],
    semesterwise: [
      { semester: 'Sem 5', credits: 6, target: 8 },
      { semester: 'Sem 6', credits: 8, target: 8 },
      { semester: 'Sem 7', credits: 4, target: 8 },
      { semester: 'Sem 8', credits: 0, target: 8 }
    ]
  },
  
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