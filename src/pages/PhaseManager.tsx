import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Clock, 
  Play, 
  FileText, 
  ArrowRight,
  AlertCircle,
  BookOpen,
  Target,
  BarChart3,
  MessageSquare,
  FileCheck,
  Settings
} from 'lucide-react'
import { useResearchStore } from '../store/researchStore'

const PhaseManager: React.FC = () => {
  const { currentProject, updatePhase, approvePhase } = useResearchStore()

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
            Create a new project to begin the research process
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

  const phaseIcons = {
    1: BookOpen,
    2: FileText,
    3: Settings,
    4: BarChart3,
    5: MessageSquare,
    6: FileCheck
  }

  const getPhaseStatus = (phase: any) => {
    if (phase.status === 'approved') return 'completed'
    if (phase.id === currentProject.currentPhase) return 'active'
    return 'pending'
  }

  const handleStartPhase = (phaseId: number) => {
    updatePhase(phaseId, { status: 'in-progress' })
  }

  const handleApprovePhase = (phaseId: number) => {
    approvePhase(phaseId)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Phases</h1>
        <p className="text-gray-600">
          Manage your research project through structured phases with AI assistance
        </p>
      </motion.div>

      {/* Project Overview */}
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
            <p className="text-gray-600">
              {currentProject.fieldOfStudy} • {currentProject.academicLevel.charAt(0).toUpperCase() + currentProject.academicLevel.slice(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Phase</p>
            <p className="text-2xl font-bold text-primary-600">
              {currentProject.currentPhase} / 6
            </p>
          </div>
        </div>
      </motion.div>

      {/* Phase Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          {currentProject.phases.map((phase, index) => {
            const status = getPhaseStatus(phase)
            const Icon = phaseIcons[phase.id as keyof typeof phaseIcons]
            
            return (
              <div key={phase.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                      status === 'completed'
                        ? 'bg-green-600 text-white'
                        : status === 'active'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {status === 'completed' ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs text-center text-gray-600 max-w-16">
                    Phase {phase.id}
                  </span>
                </div>
                {index < currentProject.phases.length - 1 && (
                  <div
                    className={`h-1 w-16 mx-2 ${
                      phase.status === 'approved' ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Phase Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        {currentProject.phases.map((phase) => {
          const status = getPhaseStatus(phase)
          const Icon = phaseIcons[phase.id as keyof typeof phaseIcons]
          
          return (
            <div
              key={phase.id}
              className={`card transition-all duration-200 ${
                status === 'active' 
                  ? 'border-primary-300 shadow-lg' 
                  : status === 'completed'
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : status === 'active'
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {phase.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : status === 'active'
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {status === 'completed' ? 'Completed' : status === 'active' ? 'Active' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {phase.description}
                    </p>
                    
                    {phase.content && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700">
                          {phase.content.substring(0, 200)}...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {status === 'active' && phase.status !== 'in-progress' && (
                    <button
                      onClick={() => handleStartPhase(phase.id)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Phase</span>
                    </button>
                  )}
                  
                  {status === 'active' && phase.status === 'in-progress' && (
                    <button
                      onClick={() => handleApprovePhase(phase.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve & Continue</span>
                    </button>
                  )}
                  
                  {status === 'completed' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Approved</span>
                    </div>
                  )}
                  
                  {status === 'pending' && (
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Waiting</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default PhaseManager