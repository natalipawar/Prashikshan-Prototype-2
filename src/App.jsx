import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import InternshipGuide from './pages/InternshipGuide'
import FacultyDemo from './pages/FacultyDemo'
import Faculty from './pages/Faculty'
import StudentDashboard from './pages/StudentDashboard'
import Industry from './pages/Industry'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function FacultyRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'faculty') return <Navigate to="/" replace />
  return <Faculty />
}

function StudentRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'student') return <Navigate to="/" replace />
  return <StudentDashboard />
}

function IndustryRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'industry') return <Navigate to="/" replace />
  return <Industry />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guide" element={<InternshipGuide />} />
            <Route path="/faculty" element={<FacultyRoute />} />
            <Route path="/faculty-demo" element={<FacultyDemo />} />
            <Route path="/student" element={<StudentRoute />} />
            <Route path="/industry" element={<IndustryRoute />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App