import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Wiki from './pages/Wiki.jsx'
import Credits from './pages/Credits.jsx'
import Home from './pages/Home.jsx'
import DevDiaries from './pages/Dev-diaries.jsx'
import Dashboard from '../admin/Dashboard.jsx'
import Copyright from './assets/components/Copyright.jsx'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Force the document to ignore system dark mode
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen pt-[72px]">
          <Navbar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/dev-diaries" element={<DevDiaries />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>

          <footer className="w-full flex flex-col items-center justify-center p-4">
            <Copyright />
          </footer>
        </div>
      </Router>
    </>
  )
}

export default App
