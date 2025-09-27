import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import InternshipGuide from './pages/InternshipGuide'
import FacultyDemo from './pages/FacultyDemo'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guide" element={<InternshipGuide />} />
            <Route path="/faculty-demo" element={<FacultyDemo />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App