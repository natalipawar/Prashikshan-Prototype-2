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
  // Only generate if no data exists
  if (!storage.get('prashikshan_applications')) {
    storage.set('prashikshan_applications', [])
  }
  
  if (!storage.get('prashikshan_logbook')) {
    const mockLogbook = [
      {
        id: '1',
        studentId: 'demo-student',
        studentName: 'Demo Student',
        date: '2024-01-15',
        company: 'TechCorp Solutions',
        hours: 8,
        description: 'Worked on frontend components for the user dashboard. Implemented responsive design using React and Tailwind CSS.',
        skills: ['React', 'CSS', 'JavaScript'],
        status: 'pending',
        createdAt: '2024-01-15T10:00:00Z'
      }
    ]
    storage.set('prashikshan_logbook', mockLogbook)
  }
  
  console.log('Seed data generated successfully')
}