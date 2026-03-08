import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router'
import Wiki from './pages/Wiki.jsx'
import Credits from './pages/Credits.jsx'
import Home from './pages/Home.jsx'
import DevDiaries from './pages/Dev-diaries.jsx'
import Dashboard from '../admin/Dashboard.jsx'
import Copyright from './assets/components/Copyright.jsx'

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen pt-20">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/wiki/:slug" element={<Wiki />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/dev-diaries" element={<DevDiaries />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

        {location.pathname !== '/' && (
          <footer className="w-full flex flex-col items-center justify-center p-4 bg-slate-950">
            <Copyright />
          </footer>
        )}
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
