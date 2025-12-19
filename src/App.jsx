import { useState } from 'react'
import './assets/css/App.css'
import Navbar from './assets/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Wiki from './pages/Wiki.jsx'
import Credits from './pages/Credits.jsx'
import Home from './pages/Home.jsx'
import DevDiaries from './pages/Dev-diaries.jsx'
import Dashboard from '../admin/Dashboard.jsx'

function App() {

  return (
    <>
        <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/dev-diaries" element={<DevDiaries />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
