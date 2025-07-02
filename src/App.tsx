import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ProjectSetup from './pages/ProjectSetup'
import PhaseManager from './pages/PhaseManager'
import DocumentViewer from './pages/DocumentViewer'
import DataSimulator from './pages/DataSimulator'
import SourceManager from './pages/SourceManager'

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setup" element={<ProjectSetup />} />
          <Route path="/phases" element={<PhaseManager />} />
          <Route path="/document" element={<DocumentViewer />} />
          <Route path="/data" element={<DataSimulator />} />
          <Route path="/sources" element={<SourceManager />} />
        </Routes>
      </Layout>
    </motion.div>
  )
}

export default App