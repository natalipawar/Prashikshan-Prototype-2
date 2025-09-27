import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import InternshipGuide from './pages/InternshipGuide'
import FacultyDemo from './pages/FacultyDemo'
import Faculty from './pages/Faculty'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function FacultyRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'faculty') return <Navigate to="/" replace />
  return <Faculty />
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App