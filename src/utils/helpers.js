// localStorage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error)
      return null
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error)
      return false
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
      return false
    }
  }
}

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateForm = (formData, requiredFields) => {
  const errors = {}
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field} is required`
    }
  })
  
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Application management
export const applicationStorage = {
  getApplications: () => storage.get('prashikshan_applications') || [],
  
  addApplication: (application) => {
    const applications = applicationStorage.getApplications()
    const newApplication = {
      ...application,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString(),
      status: 'pending'
    }
    applications.push(newApplication)
    storage.set('prashikshan_applications', applications)
    return newApplication
  },
  
  getApplicationsByUser: (userId) => {
    const applications = applicationStorage.getApplications()
    return applications.filter(app => app.userId === userId)
  }
}

// Logbook management
export const logbookStorage = {
  getEntries: () => storage.get('prashikshan_logbook') || [],
  
  addEntry: (entry) => {
    const entries = logbookStorage.getEntries()
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    entries.push(newEntry)
    storage.set('prashikshan_logbook', entries)
    return newEntry
  },
  
  updateEntryStatus: (entryId, status) => {
    const entries = logbookStorage.getEntries()
    const updatedEntries = entries.map(entry => 
      entry.id === entryId ? { ...entry, status } : entry
    )
    storage.set('prashikshan_logbook', updatedEntries)
    return updatedEntries.find(entry => entry.id === entryId)
  },
  
  getEntriesByStudent: (studentId) => {
    const entries = logbookStorage.getEntries()
    return entries.filter(entry => entry.studentId === studentId)
  }
}

// Smooth scroll utility
export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Format date utility
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('en-IN', options)
}

// Generate seed data for demo
export const generateSeedData = () => {
  // Applications
  if (!storage.get('prashikshan_applications')) {
    storage.set('prashikshan_applications', [])
  }

  // Logbook entries
  if (!storage.get('prashikshan_logbook')) {
    const mockLogbook = [
      {
        id: '1',
        studentId: 'stu-1',
        studentName: 'Priya Sharma',
        date: '2024-01-15',
        company: 'TechCorp Solutions',
        hours: 8,
        description:
          'Worked on frontend components for the user dashboard. Implemented responsive design using React and Tailwind CSS.',
        skills: ['React', 'CSS', 'JavaScript'],
        status: 'pending',
        createdAt: '2024-01-15T10:00:00Z'
      }
    ]
    storage.set('prashikshan_logbook', mockLogbook)
  }

  // Companies
  if (!storage.get('prashikshan_companies')) {
    storage.set('prashikshan_companies', [
      { id: 'comp-1', name: 'TechCorp Solutions' },
      { id: 'comp-2', name: 'Analytics Pro' },
      { id: 'comp-3', name: 'Rural Connect NGO' }
    ])
  }

  // Internships
  if (!storage.get('prashikshan_internships')) {
    storage.set('prashikshan_internships', [
      { id: 'int-1', title: 'Full Stack Development Internship', companyId: 'comp-1', startDate: '2024-01-10', endDate: '2024-04-10' },
      { id: 'int-2', title: 'Data Science Internship', companyId: 'comp-2', startDate: '2024-01-05', endDate: '2024-05-05' },
      { id: 'int-3', title: 'Digital Marketing Internship', companyId: 'comp-3', startDate: '2024-02-01', endDate: '2024-03-31' }
    ])
  }

  // Students
  if (!storage.get('prashikshan_students')) {
    storage.set('prashikshan_students', [
      { id: 'stu-1', name: 'Priya Sharma', batch: '2023', department: 'CSE', internshipId: 'int-1', mentorId: 'men-1', progress: 65, lastLogDate: '2024-01-15', mentorshipStatus: 'In-Progress' },
      { id: 'stu-2', name: 'Rahul Patel', batch: '2022', department: 'IT', internshipId: 'int-2', mentorId: 'men-2', progress: 80, lastLogDate: '2024-01-14', mentorshipStatus: 'Assigned' },
      { id: 'stu-3', name: 'Sneha Kumar', batch: '2024', department: 'ECE', internshipId: 'int-3', mentorId: null, progress: 40, lastLogDate: '2024-01-13', mentorshipStatus: 'Unassigned' },
      { id: 'stu-4', name: 'Aman Verma', batch: '2023', department: 'ME', internshipId: 'int-3', mentorId: null, progress: 30, lastLogDate: '2024-01-12', mentorshipStatus: 'Unassigned' },
      { id: 'stu-5', name: 'Neha Singh', batch: '2022', department: 'CSE', internshipId: 'int-1', mentorId: 'men-1', progress: 55, lastLogDate: '2024-01-13', mentorshipStatus: 'Assigned' }
    ])
  }

  // Mentors
  if (!storage.get('prashikshan_mentors')) {
    storage.set('prashikshan_mentors', [
      { id: 'men-1', name: 'Prof. Sharma', department: 'CSE', capacityLeft: 2 },
      { id: 'men-2', name: 'Prof. Iyer', department: 'IT', capacityLeft: 1 },
      { id: 'men-3', name: 'Prof. Rao', department: 'ECE', capacityLeft: 3 }
    ])
  }

  // Credits
  if (!storage.get('prashikshan_credits')) {
    storage.set('prashikshan_credits', [
      { id: 'cred-1', studentId: 'stu-2', internshipId: 'int-2', credits: 6, approvedBy: 'Prof. Iyer', date: '2024-01-14' }
    ])
  }

  // Notifications
  if (!storage.get('prashikshan_notifications')) {
    storage.set('prashikshan_notifications', [
      { id: 'noti-1', type: 'logbook', message: 'New logbook submitted by Priya Sharma', read: false, createdAt: new Date().toISOString() }
    ])
  }

  console.log('Seed data generated successfully')
}

// Students storage
export const studentsStorage = {
  getStudents: () => storage.get('prashikshan_students') || [],
  updateStudent: (id, patch) => {
    const items = studentsStorage.getStudents()
    const updated = items.map(s => (s.id === id ? { ...s, ...patch } : s))
    storage.set('prashikshan_students', updated)
    return updated.find(s => s.id === id)
  },
}

// Internships storage
export const internshipsStorage = {
  getInternships: () => storage.get('prashikshan_internships') || [],
}

// Companies storage
export const companiesStorage = {
  getCompanies: () => storage.get('prashikshan_companies') || [],
}

// Mentors storage
export const mentorsStorage = {
  getMentors: () => storage.get('prashikshan_mentors') || [],
  assign: (studentId, mentorId) => {
    const mentors = mentorsStorage.getMentors()
    const mentor = mentors.find(m => m.id === mentorId)
    if (mentor && mentor.capacityLeft > 0) {
      mentor.capacityLeft -= 1
      storage.set('prashikshan_mentors', mentors)
      studentsStorage.updateStudent(studentId, { mentorId, mentorshipStatus: 'Assigned' })
      return mentor
    }
    return null
  }
}

// Credits storage
export const creditsStorage = {
  getCredits: () => storage.get('prashikshan_credits') || [],
  addCredit: (entry) => {
    const items = creditsStorage.getCredits()
    const newEntry = { id: `cred-${Date.now()}`, date: new Date().toISOString(), ...entry }
    items.push(newEntry)
    storage.set('prashikshan_credits', items)
    return newEntry
  }
}

// Notifications storage
export const notificationsStorage = {
  get: () => storage.get('prashikshan_notifications') || [],
  add: (notification) => {
    const items = notificationsStorage.get()
    const newItem = { id: `noti-${Date.now()}`, read: false, createdAt: new Date().toISOString(), ...notification }
    items.unshift(newItem)
    storage.set('prashikshan_notifications', items)
    return newItem
  },
  markRead: (id) => {
    const items = notificationsStorage.get()
    const updated = items.map(n => (n.id === id ? { ...n, read: true } : n))
    storage.set('prashikshan_notifications', updated)
    return updated
  }
}
