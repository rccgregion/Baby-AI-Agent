import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus, Search, Filter } from 'lucide-react'

const SourceManager: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Source Manager</h1>
        <p className="text-gray-600">
          Organize and manage your research sources and citations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card text-center py-12"
      >
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Research Sources</h2>
        <p className="text-gray-600 mb-6">
          Manage your academic sources and generate proper citations
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Source</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default SourceManager