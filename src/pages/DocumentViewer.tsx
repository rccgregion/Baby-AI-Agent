import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  RefreshCw,
  AlertCircle,
  ArrowRight,
  FileDown,
  BookOpen
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useResearchStore } from '../store/researchStore'
import DocumentPreview from '../components/DocumentPreview'
import { generateResearchPaper } from '../utils/documentGenerator'
import { exportToPDF, exportToDocx } from '../utils/exportUtils'

const DocumentViewer: React.FC = () => {
  const { currentProject } = useResearchStore()
  const [generatedContent, setGeneratedContent] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (currentProject) {
      generateContent()
    }
  }, [currentProject])

  const generateContent = async () => {
    if (!currentProject) return

    setIsGenerating(true)
    try {
      // Simulate generation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      const content = generateResearchPaper(currentProject)
      setGeneratedContent(content)
      toast.success('Research paper generated successfully!')
    } catch (error) {
      toast.error('Failed to generate research paper')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportPDF = async () => {
    if (!currentProject || !generatedContent) return

    setIsExporting(true)
    try {
      await exportToPDF(generatedContent, currentProject)
      toast.success('PDF exported successfully!')
    } catch (error) {
      toast.error('Failed to export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportDocx = async () => {
    if (!currentProject || !generatedContent) return

    setIsExporting(true)
    try {
      await exportToDocx(generatedContent, currentProject)
      toast.success('DOCX exported successfully!')
    } catch (error) {
      toast.error('Failed to export DOCX')
    } finally {
      setIsExporting(false)
    }
  }

  if (!currentProject) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Active Project</h2>
          <p className="text-gray-600 mb-6">
            Create a new project to generate and view research documents
          </p>
          <a
            href="/setup"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Start New Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    )
  }

  const completedPhases = currentProject.phases.filter(phase => phase.status === 'approved').length
  const canGenerate = completedPhases > 0

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Viewer</h1>
        <p className="text-gray-600">
          View and export your generated research documents
        </p>
      </motion.div>

      {/* Project Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card mb-8 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {currentProject.title}
            </h2>
            <p className="text-gray-600 mb-2">
              {currentProject.fieldOfStudy} • {currentProject.academicLevel.charAt(0).toUpperCase() + currentProject.academicLevel.slice(1)}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {completedPhases} of 6 phases completed
              </span>
              <div className="flex space-x-1">
                {currentProject.phases.map((phase) => (
                  <div
                    key={phase.id}
                    className={`w-3 h-3 rounded-full ${
                      phase.status === 'approved' 
                        ? 'bg-green-500' 
                        : phase.id === currentProject.currentPhase
                        ? 'bg-primary-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Document Status</p>
            <p className="text-lg font-semibold text-primary-600">
              {generatedContent ? 'Generated' : canGenerate ? 'Ready to Generate' : 'Pending'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Controls</h3>
            <p className="text-gray-600">
              Generate, preview, and export your research document
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={generateContent}
              disabled={!canGenerate || isGenerating}
              className={`btn-primary flex items-center space-x-2 ${
                (!canGenerate || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Generate Document</span>
                </>
              )}
            </button>
            
            {generatedContent && (
              <>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showPreview ? 'Hide Preview' : 'Preview'}</span>
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  
                  <button
                    onClick={handleExportDocx}
                    disabled={isExporting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>DOCX</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Generation Status */}
      {!canGenerate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card mb-8 border-orange-200 bg-orange-50"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-900">Complete Research Phases</h3>
              <p className="text-orange-700">
                Complete at least one research phase to generate your document. 
                <a href="/phases" className="underline ml-1">Go to Research Phases</a>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Document Preview */}
      {showPreview && generatedContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <DocumentPreview project={currentProject} content={generatedContent} />
        </motion.div>
      )}

      {/* Document Statistics */}
      {generatedContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="card text-center">
            <FileText className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {generatedContent.split(' ').length.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Words</p>
          </div>
          
          <div className="card text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {generatedContent.split('\n').filter(line => line.trim().length > 0).length}
            </p>
            <p className="text-sm text-gray-600">Paragraphs</p>
          </div>
          
          <div className="card text-center">
            <Edit className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {completedPhases}
            </p>
            <p className="text-sm text-gray-600">Sections</p>
          </div>
          
          <div className="card text-center">
            <Download className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {Math.ceil(generatedContent.split(' ').length / 250)}
            </p>
            <p className="text-sm text-gray-600">Est. Pages</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default DocumentViewer