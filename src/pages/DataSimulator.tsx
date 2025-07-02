import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Plus, Database, TrendingUp } from 'lucide-react'

const DataSimulator: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Simulator</h1>
        <p className="text-gray-600">
          Generate realistic datasets for your research methodology
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card text-center py-12"
      >
        <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Simulation Tools</h2>
        <p className="text-gray-600 mb-6">
          Create realistic datasets for surveys, interviews, and experiments
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Dataset</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analyze Data</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Generate Charts</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default DataSimulator