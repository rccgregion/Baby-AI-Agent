import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, Edit } from 'lucide-react'

const DocumentViewer: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Viewer</h1>
        <p className="text-gray-600">
          View and manage your research documents and generated content
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card text-center py-12"
      >
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Viewer</h2>
        <p className="text-gray-600 mb-6">
          This feature will display your generated research documents
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default DocumentViewer